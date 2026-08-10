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
  metadataBase: new URL("https://chamthuc.vn"),
  title: "Chạm Thức | Chạm tinh hoa - Mở văn hóa",
  description:
    "Dự án phát triển các hộp trải nghiệm văn hóa Việt Nam và bộ kit DIY làng nghề truyền thống.",
  keywords: [
    "Chạm Thức",
    "Trải nghiệm văn hóa Việt Nam",
    "Bộ kit DIY làng nghề",
    "Làng nón Chuông",
    "Làng tò he Xuân La",
    "Làng tre Thạch Xá",
    "Quà tặng di sản",
    "ESG",
  ],
  authors: [{ name: "Ngũ Sắc Team" }],
  openGraph: {
    title: "Chạm Thức | Chạm tinh hoa - Mở văn hóa",
    description:
      "Dự án phát triển các hộp trải nghiệm văn hóa Việt Nam và bộ kit DIY làng nghề truyền thống.",
    url: "https://chamthuc.vn",
    siteName: "Chạm Thức",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Chạm Thức — Chạm tinh hoa, Mở văn hóa",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chạm Thức | Chạm tinh hoa - Mở văn hóa",
    description:
      "Dự án phát triển các hộp trải nghiệm văn hóa Việt Nam và bộ kit DIY làng nghề truyền thống.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
