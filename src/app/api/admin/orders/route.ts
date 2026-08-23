import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const isAuthed = await isAuthenticatedAdmin(request);
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, error: "Yêu cầu quyền quản trị viên (Unauthorized)." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin fetch orders database error:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Không thể tải danh sách đơn hàng." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: data || [],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi máy chủ nội bộ.";
    console.error("Admin fetch orders API error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
