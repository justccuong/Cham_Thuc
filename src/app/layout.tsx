import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chạm Thức | Đánh Thức Giá Trị Văn Hóa Việt Nam",
  description:
    "Dự án phát triển các hộp trải nghiệm văn hóa Việt Nam theo chủ đề làng nghề truyền thống. Mô hình Hộp Khám Phá Ngẫu Nhiên (Blind Box) kết hợp DIY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${beVietnamPro.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-paper-ivory text-text-wood font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
