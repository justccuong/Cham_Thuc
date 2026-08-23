import { NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    const serverAdminPin = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";

    if (!pin || typeof pin !== "string" || pin.trim() !== serverAdminPin.trim()) {
      return NextResponse.json(
        { success: false, error: "Mã PIN không chính xác. Vui lòng thử lại." },
        { status: 401 }
      );
    }

    const token = createAdminToken();

    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập admin thành công.",
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login API error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi xử lý đăng nhập từ máy chủ." },
      { status: 500 }
    );
  }
}
