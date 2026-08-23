import QRCode from "qrcode";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chamthuc.vn";

const QR_ITEMS = [
  {
    name: "qr-hdsd-tong-hop",
    url: `${BASE_URL}/huong-dan`,
    label: "QR Hướng Dẫn Tổng Hợp (Tất cả sản phẩm)",
  },
  {
    name: "qr-hdsd-non-la",
    url: `${BASE_URL}/huong-dan?product=non-la`,
    label: "QR Hướng Dẫn — Hộp DIY Nón Lá Mini",
  },
  {
    name: "qr-hdsd-to-he",
    url: `${BASE_URL}/huong-dan?product=to-he`,
    label: "QR Hướng Dẫn — Hộp DIY Tò He Dân Gian",
  },
  {
    name: "qr-hdsd-chuon-chuon",
    url: `${BASE_URL}/huong-dan?product=chuon-chuon`,
    label: "QR Hướng Dẫn — Hộp DIY Chuồn Chuồn Tre",
  },
];

async function generateQRCodes() {
  const outputDir = path.join(process.cwd(), "public", "qr");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating high-res QR codes with Base URL: ${BASE_URL}\n`);

  for (const item of QR_ITEMS) {
    // 1. High-Res PNG (1200x1200px print ready)
    const pngPath = path.join(outputDir, `${item.name}.png`);
    await QRCode.toFile(pngPath, item.url, {
      width: 1200,
      margin: 2,
      color: {
        dark: "#9A1B1F", // Brand Red
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    // 2. High-Res PNG Black & White (Classic for simple offset printing)
    const pngBwPath = path.join(outputDir, `${item.name}-bw.png`);
    await QRCode.toFile(pngBwPath, item.url, {
      width: 1200,
      margin: 2,
      color: {
        dark: "#1A1A1A",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    // 3. Vector SVG (Lossless infinite scaling for packaging design)
    const svgPath = path.join(outputDir, `${item.name}.svg`);
    const svgString = await QRCode.toString(item.url, {
      type: "svg",
      margin: 2,
      color: {
        dark: "#9A1B1F",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });
    fs.writeFileSync(svgPath, svgString, "utf8");

    console.log(`✅ [${item.label}] -> Generated PNG & SVG for: ${item.url}`);
  }

  console.log(`\nAll QR codes generated in: public/qr/`);
}

generateQRCodes().catch(console.error);
