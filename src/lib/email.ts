import nodemailer from "nodemailer";

export interface OrderEmailData {
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  finalAmount: number;
  paymentMethod: string;
  notes?: string;
}

/**
 * Sends order notification email to Admin via Gmail SMTP.
 */
export async function sendOrderEmailToAdmin(order: OrderEmailData): Promise<{ success: boolean; error?: string }> {
  const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || "chamthuc2026@gmail.com";
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASSWORD || "";
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || gmailUser;

  if (!gmailAppPassword) {
    console.warn("⚠️ GMAIL_APP_PASSWORD is not set in environment variables. Email notification skipped.");
    return { success: false, error: "GMAIL_APP_PASSWORD not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword.replace(/\s+/g, ""), // Remove spaces in app password
      },
    });

    const paymentLabel =
      order.paymentMethod === "VIETQR"
        ? "Chuyển khoản Ngân hàng (VietQR)"
        : "Thanh toán khi nhận hàng (COD)";

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F5F0; margin: 0; padding: 20px; color: #2A1B12; }
    .card { max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E8E0D5; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #9A1B1F; color: #F4E8C1; padding: 24px 28px; text-align: center; }
    .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: bold; letter-spacing: 1px; }
    .header p { margin: 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 28px; }
    .badge { display: inline-block; background: #9A1B1F; color: #FFFFFF; font-weight: bold; padding: 4px 12px; border-radius: 8px; font-size: 15px; letter-spacing: 1px; }
    .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; color: #9A1B1F; border-bottom: 2px solid #F0EAE1; padding-bottom: 6px; margin: 20px 0 12px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; border-bottom: 1px dashed #F0EAE1; }
    .info-label { color: #6E5D4F; font-weight: 500; }
    .info-value { color: #2A1B12; font-weight: 600; text-align: right; }
    .total-box { background: #FAF7F2; border: 1px solid #E8E0D5; border-radius: 12px; padding: 16px; margin-top: 20px; text-align: center; }
    .total-amount { font-size: 24px; font-weight: 900; color: #9A1B1F; }
    .footer { text-align: center; padding: 18px; font-size: 12px; color: #8C7B6E; background: #F8F5F0; border-top: 1px solid #E8E0D5; }
    .btn { display: inline-block; background: #285834; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 13px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>CHẠM THỨC — ĐƠN HÀNG MỚI</h1>
      <p>Thông báo tự động từ hệ thống đặt hàng trực tuyến</p>
    </div>
    <div class="content">
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="font-size: 13px; color: #6E5D4F; display: block; margin-bottom: 4px;">MÃ ĐƠN HÀNG</span>
        <span class="badge">${order.orderCode}</span>
      </div>

      <div class="section-title">Thông Tin Khách Hàng</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #6E5D4F; width: 35%;">Họ và tên:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #2A1B12;">${order.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6E5D4F;">Số điện thoại:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #9A1B1F;"><a href="tel:${order.customerPhone}" style="color: #9A1B1F; text-decoration: none;">${order.customerPhone}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6E5D4F;">Địa chỉ giao hàng:</td>
          <td style="padding: 6px 0; font-weight: 500; color: #2A1B12;">${order.customerAddress}</td>
        </tr>
        ${
          order.notes
            ? `<tr>
          <td style="padding: 6px 0; color: #6E5D4F;">Ghi chú của khách:</td>
          <td style="padding: 6px 0; font-style: italic; color: #2A1B12;">${order.notes}</td>
        </tr>`
            : ""
        }
      </table>

      <div class="section-title">Chi Tiết Đơn Mua</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #6E5D4F; width: 35%;">Sản phẩm:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #2A1B12;">${order.productName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6E5D4F;">Phương thức:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #285834;">${paymentLabel}</td>
        </tr>
      </table>

      <div class="total-box">
        <div style="font-size: 12px; font-weight: bold; color: #6E5D4F; text-transform: uppercase;">TỔNG TIỀN THANH TOÁN</div>
        <div class="total-amount">${order.finalAmount.toLocaleString("vi-VN")} đ</div>
      </div>

      <div style="text-align: center;">
        <a href="https://cham-thuc.vercel.app/admin" class="btn">Mở Trang Quản Trị Đơn Hàng</a>
      </div>
    </div>
    <div class="footer">
      © 2026 Chạm Thức — Dự án bảo tồn & trải nghiệm thủ công làng nghề Việt Nam.
    </div>
  </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: `"Chạm Thức — Đơn Hàng" <${gmailUser}>`,
      to: adminEmail,
      subject: `[CHẠM THỨC] 🔔 Có Đơn Hàng Mới #${order.orderCode} - ${order.customerName} (${order.finalAmount.toLocaleString("vi-VN")}đ)`,
      text: `Có đơn hàng mới #${order.orderCode}\nKhách: ${order.customerName} - ${order.customerPhone}\nĐịa chỉ: ${order.customerAddress}\nSản phẩm: ${order.productName}\nTổng tiền: ${order.finalAmount.toLocaleString("vi-VN")} đ\nThanh toán: ${paymentLabel}\nGhi chú: ${order.notes || "Không có"}`,
      html: htmlContent,
    });

    console.log(`✅ [Gmail Notification] Order email sent to ${adminEmail}! MessageID: ${info.messageId}`);
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("❌ [Gmail Notification Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}
