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
        attempts++;
      }
    }

    if (!isUnique) {
      return NextResponse.json(
        { success: false, error: "Lỗi tạo mã đơn hàng. Vui lòng thử lại." },
        { status: 500 }
      );
    }

    // Insert order into Supabase orders table
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
      return NextResponse.json(
        { success: false, error: dbError.message || "Không thể lưu đơn hàng." },
        { status: 500 }
      );
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

    // Send order notification directly to Facebook Messenger via Graph API (fire and forget / async)
    const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const adminFbPsid = process.env.ADMIN_FB_PSID;

    if (fbPageAccessToken && adminFbPsid) {
      try {
        fetch(
          `https://graph.facebook.com/v18.0/me/messages?access_token=${fbPageAccessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipient: { id: adminFbPsid },
              message: { text: formattedMessage },
            }),
          }
        ).catch((fbErr) => {
          console.error("Facebook Messenger notification background error:", fbErr);
        });
      } catch (fbError) {
        console.error("Facebook Messenger notification dispatch error:", fbError);
      }
    }

    return NextResponse.json({
      success: true,
      orderCode,
      finalAmount,
      paymentMethod: resolvedPaymentMethod,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi máy chủ nội bộ.";
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
