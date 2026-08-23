import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const isAuthed = await isAuthenticatedAdmin(request);
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, error: "Yêu cầu quyền quản trị viên (Unauthorized)." },
        { status: 401 }
      );
    }

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

    // Validate allowed status values
    const allowedPaymentStatuses = ["PENDING", "PAID", "CANCELLED"];
    const allowedOrderStatuses = ["PROCESSING", "SHIPPING", "DELIVERED"];

    if (field === "payment_status" && !allowedPaymentStatuses.includes(value)) {
      return NextResponse.json(
        { success: false, error: "Invalid payment_status value." },
        { status: 400 }
      );
    }

    if (field === "order_status" && !allowedOrderStatuses.includes(value)) {
      return NextResponse.json(
        { success: false, error: "Invalid order_status value." },
        { status: 400 }
      );
    }

    // Update record in Supabase orders table matching id = orderId
    const supabase = getSupabaseServerClient();
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error.";
    console.error("Admin update order API error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
