import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, field, value } = body;

    if (!orderId || !field) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: orderId, field." },
        { status: 400 }
      );
    }

    // Validate field is either 'payment_status' or 'order_status'
    if (field !== "payment_status" && field !== "order_status") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid field. Field must be 'payment_status' or 'order_status'.",
        },
        { status: 400 }
      );
    }

    // Update record in Supabase orders table matching id = orderId
    const { error: dbError } = await supabase
      .from("orders")
      .update({ [field]: value })
      .eq("id", orderId);

    if (dbError) {
      console.error("Supabase update error:", dbError);
      return NextResponse.json(
        { success: false, error: dbError.message || "Failed to update order status." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Admin update order API error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
