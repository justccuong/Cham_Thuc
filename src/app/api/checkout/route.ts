import { NextResponse } from "next/server";
import { generateOrderCode } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, productName, price, paymentMethod, notes } = body;

    if (!name || !phone || !address || !productName) {
      return NextResponse.json(
        { success: false, error: "Missing required order fields." },
        { status: 400 }
      );
    }

    const resolvedPaymentMethod = paymentMethod === "VIETQR" ? "VIETQR" : "COD";
    const finalAmount = typeof price === "number" ? price : 0;

    // Collision-check retry loop (maximum 5 attempts)
    let orderCode = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      orderCode = generateOrderCode();
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
    }

    if (!isUnique) {
      return NextResponse.json(
        { success: false, error: "Failed to generate unique order code. Please try again." },
        { status: 500 }
      );
    }

    // Insert order into Supabase orders table
    const { error: dbError } = await supabase.from("orders").insert([
      {
        order_code: orderCode,
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        product_name: productName,
        product_price: finalAmount,
        payment_method: resolvedPaymentMethod,
        notes: notes || "",
        payment_status: "PENDING",
        order_status: "PROCESSING",
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { success: false, error: dbError.message || "Failed to save order." },
        { status: 500 }
      );
    }

    // Format detailed notification message for admin
    const paymentLabel = resolvedPaymentMethod === "VIETQR"
      ? "Chuyen khoan VietQR"
      : "Thanh toan khi nhan hang (COD)";

    const formattedMessage = [
      "CO DON HANG MOI TU CHAM THUC!",
      "----------------------------------",
      `Ma don: ${orderCode}`,
      `Khach: ${name} (${phone})`,
      `Dia chi: ${address}`,
      "----------------------------------",
      `San pham: ${productName}`,
      `Tong tien: ${finalAmount.toLocaleString("vi-VN")}d`,
      `Thanh toan: ${paymentLabel}`,
      notes ? `Ghi chu: ${notes}` : "",
    ].filter(Boolean).join("\n");

    // Send order notification directly to Facebook Messenger via Graph API
    const fbPageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const adminFbPsid = process.env.ADMIN_FB_PSID;

    if (fbPageAccessToken && adminFbPsid) {
      try {
        await fetch(
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
        );
      } catch (fbError) {
        console.error("Facebook Messenger notification error:", fbError);
      }
    }

    return NextResponse.json({
      success: true,
      orderCode,
      finalAmount,
      paymentMethod: resolvedPaymentMethod,
    });
  } catch (err: any) {
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
