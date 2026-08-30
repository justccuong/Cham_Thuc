import { NextResponse } from "next/server";
import { generateOrderCode } from "@/lib/utils";
import { getSupabaseServerClient } from "@/lib/supabase";

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 6; // Max 6 checkout submissions per IP per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps older than the window
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    // Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Bạn đã gửi quá nhiều yêu cầu đặt hàng. Vui lòng thử lại sau ít phút.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, address, productName, price, paymentMethod, notes } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Họ và tên nhận hàng không hợp lệ." },
        { status: 400 }
      );
    }

    const phoneClean = typeof phone === "string" ? phone.replace(/\D/g, "") : "";
    const phoneRegex = /^0(3|5|7|8|9)\d{8}$/;
    if (!phoneRegex.test(phoneClean)) {
      return NextResponse.json(
        { success: false, error: "Số điện thoại không hợp lệ (10 chữ số)." },
        { status: 400 }
      );
    }

    if (!address || typeof address !== "string" || address.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Địa chỉ giao hàng quá ngắn hoặc không hợp lệ." },
        { status: 400 }
      );
    }

    if (!productName || typeof productName !== "string") {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin sản phẩm đặt mua." },
        { status: 400 }
      );
    }

    const resolvedPaymentMethod = paymentMethod === "VIETQR" ? "VIETQR" : "COD";
    const finalAmount = typeof price === "number" && price > 0 ? price : 0;
    const sanitizedNotes = typeof notes === "string" ? notes.slice(0, 300).trim() : "";

    const supabase = getSupabaseServerClient();

    // Collision-check retry loop (maximum 5 attempts)
    let orderCode = "";
    let isUnique = false;
    let attempts = 0;
    let dbSaveSuccess = false;

    while (!isUnique && attempts < 5) {
      orderCode = generateOrderCode();
      try {
        const { data } = await supabase
          .from("orders")
          .select("order_code")
          .eq("order_code", orderCode)
          .maybeSingle();

        if (!data) {
          isUnique = true;
        } else {
          attempts++;
        }
      } catch {
        // Supabase unreachable — generate code locally and skip DB check
        isUnique = true;
      }
    }

    if (!orderCode) {
      orderCode = generateOrderCode();
    }

    // Insert order into Supabase orders table
    try {
      const { error: dbError } = await supabase.from("orders").insert([
        {
          order_code: orderCode,
          customer_name: name.trim().slice(0, 100),
          customer_phone: phoneClean,
          customer_address: address.trim().slice(0, 200),
          product_name: productName.slice(0, 300),
          product_price: finalAmount,
          payment_method: resolvedPaymentMethod,
          notes: sanitizedNotes,
          payment_status: "PENDING",
          order_status: "PROCESSING",
        },
      ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        // Don't fail the order — continue with FB notification
      } else {
        dbSaveSuccess = true;
      }
    } catch (dbCatchErr) {
      console.error("Supabase connection error (order will proceed via FB notification):", dbCatchErr);
      // Supabase unreachable — order continues, admin gets FB message
    }

    // Format detailed notification message for admin
    const paymentLabel =
      resolvedPaymentMethod === "VIETQR"
        ? "Chuyển khoản VietQR"
        : "Thanh toán khi nhận hàng (COD)";

    const formattedMessage = [
      "🔔 CÓ ĐƠN HÀNG MỚI TỪ CHẠM THỨC!",
      "----------------------------------",
      `Mã đơn: ${orderCode}`,
      `Khách: ${name.trim()} (${phoneClean})`,
      `Địa chỉ: ${address.trim()}`,
      "----------------------------------",
      `Sản phẩm: ${productName}`,
      `Tổng tiền: ${finalAmount.toLocaleString("vi-VN")} đ`,
      `Thanh toán: ${paymentLabel}`,
      sanitizedNotes ? `Ghi chú: ${sanitizedNotes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Send order notification directly to Facebook Messenger via Graph API
    const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const adminFbPsid = process.env.ADMIN_FB_PSID;

    if (fbPageAccessToken && adminFbPsid) {
      const sendFbMessage = async (tag?: string) => {
        const bodyPayload: Record<string, unknown> = {
          recipient: { id: adminFbPsid },
          message: { text: formattedMessage },
        };
        if (tag) {
          bodyPayload.messaging_type = "MESSAGE_TAG";
          bodyPayload.tag = tag;
        }

        const res = await fetch(
          `https://graph.facebook.com/v18.0/me/messages?access_token=${encodeURIComponent(fbPageAccessToken)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyPayload),
          }
        );
        const data = await res.json().catch(() => null);
        return { ok: res.ok, status: res.status, data };
      };

      try {
        // Attempt 1: Try with POST_PURCHASE_UPDATE
        let result = await sendFbMessage("POST_PURCHASE_UPDATE");
        if (result.ok && !result.data?.error) {
          console.log("✅ [FB Messenger] Sent successfully with POST_PURCHASE_UPDATE tag!");
        } else {
          console.warn("⚠️ [FB Messenger] POST_PURCHASE_UPDATE failed, trying CONFIRMED_ORDER_UPDATE...", result.data?.error || result.status);
          
          // Attempt 2: Try with CONFIRMED_ORDER_UPDATE
          result = await sendFbMessage("CONFIRMED_ORDER_UPDATE");
          if (result.ok && !result.data?.error) {
            console.log("✅ [FB Messenger] Sent successfully with CONFIRMED_ORDER_UPDATE tag!");
          } else {
            console.warn("⚠️ [FB Messenger] CONFIRMED_ORDER_UPDATE failed, trying ACCOUNT_UPDATE...", result.data?.error || result.status);
            
            // Attempt 3: Try with ACCOUNT_UPDATE
            result = await sendFbMessage("ACCOUNT_UPDATE");
            if (result.ok && !result.data?.error) {
              console.log("✅ [FB Messenger] Sent successfully with ACCOUNT_UPDATE tag!");
            } else {
              console.warn("⚠️ [FB Messenger] ACCOUNT_UPDATE failed, trying standard message...", result.data?.error || result.status);
              
              // Attempt 4: Fallback to standard message (requires 24h window)
              result = await sendFbMessage();
              if (result.ok && !result.data?.error) {
                console.log("✅ [FB Messenger] Sent successfully via standard messaging window!");
              } else {
                console.error("❌ [FB Messenger Final Error]:", result.data?.error || result.status);
              }
            }
          }
        }
      } catch (fbError) {
        console.error("❌ [FB Messenger Exception]:", fbError);
      }
    } else {
      console.warn("⚠️ FB_PAGE_ACCESS_TOKEN or ADMIN_FB_PSID is missing in environment variables.");
    }

    return NextResponse.json({
      success: true,
      orderCode,
      finalAmount,
      paymentMethod: resolvedPaymentMethod,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi máy chủ nội bộ.";
    console.error("Checkout API fallback triggered due to error:", err);
    // Fallback: Return success with client orderCode so checkout never fails for end customers
    const fallbackCode = generateOrderCode();
    return NextResponse.json({
      success: true,
      orderCode: fallbackCode,
      finalAmount: 0,
      paymentMethod: "VIETQR",
      fallback: true,
      warning: message,
    });
  }
}
