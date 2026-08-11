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

    const orderCode = generateOrderCode();

    // Insert order into Supabase orders table
    const { error: dbError } = await supabase.from("orders").insert([
      {
        order_code: orderCode,
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        product_name: productName,
        product_price: price,
        payment_method: paymentMethod || "COD",
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

    // Format summary plain text message
    const formattedMessage = [
      "DON HANG MOI TRAT CHAM THUC",
      `MA DON HANG: ${orderCode}`,
      `Nguoi nhan: ${name}`,
      `So dien thoai: ${phone}`,
      `Dia chi: ${address}`,
      `San pham: ${productName} - ${price}`,
      `Phuong thuc: ${paymentMethod || "COD"}`,
      `Ghi chu: ${notes || ""}`,
    ].join("\n");

    // Send HTTP POST request containing { text: formattedMessage } to ORDER_WEBHOOK_URL
    const webhookUrl = process.env.ORDER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: formattedMessage }),
        });
      } catch (webhookError) {
        console.error("Webhook POST error:", webhookError);
      }
    }

    return NextResponse.json({ success: true, orderCode });
  } catch (err: any) {
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
