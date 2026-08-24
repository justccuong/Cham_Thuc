import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cham-thuc.vercel.app";

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
  const logoPath = path.join(process.cwd(), "public", "logo.png");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating QR codes with Base URL: ${BASE_URL}\n`);

  const qrSize = 1200;
  const logoSize = 280; // ~23% of QR size for optimal scanning with Error Correction Level H
  const borderSize = 310; // White circular border badge around logo

  // Prepare circular logo with white background badge
  const circleBadgeSvg = Buffer.from(`
    <svg width="${borderSize}" height="${borderSize}">
      <circle cx="${borderSize / 2}" cy="${borderSize / 2}" r="${borderSize / 2}" fill="#FFFFFF" />
    </svg>
  `);

  const logoCircleMask = Buffer.from(`
    <svg width="${logoSize}" height="${logoSize}">
      <circle cx="${logoSize / 2}" cy="${logoSize / 2}" r="${logoSize / 2}" fill="#000000" />
    </svg>
  `);

  // Process logo: resize and mask to circle
  const circularLogo = await sharp(logoPath)
    .resize(logoSize, logoSize)
    .composite([
      {
        input: logoCircleMask,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  // Combine white badge and circular logo
  const centerLogoBadge = await sharp(circleBadgeSvg)
    .composite([
      {
        input: circularLogo,
        top: Math.round((borderSize - logoSize) / 2),
        left: Math.round((borderSize - logoSize) / 2),
      },
    ])
    .png()
    .toBuffer();

  const logoBase64 = fs.readFileSync(logoPath).toString("base64");

  for (const item of QR_ITEMS) {
    // 1. Generate Base Red QR Code PNG
    const rawQrRedBuffer = await QRCode.toBuffer(item.url, {
      width: qrSize,
      margin: 2,
      color: {
        dark: "#9A1B1F", // Brand Red
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    const pngRedPath = path.join(outputDir, `${item.name}.png`);
    await sharp(rawQrRedBuffer)
      .composite([
        {
          input: centerLogoBadge,
          gravity: "center",
        },
      ])
      .png()
      .toFile(pngRedPath);

    // 2. Generate Base Black & White QR Code PNG
    const rawQrBwBuffer = await QRCode.toBuffer(item.url, {
      width: qrSize,
      margin: 2,
      color: {
        dark: "#1A1A1A",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    const pngBwPath = path.join(outputDir, `${item.name}-bw.png`);
    await sharp(rawQrBwBuffer)
      .composite([
        {
          input: centerLogoBadge,
          gravity: "center",
        },
      ])
      .png()
      .toFile(pngBwPath);

    // 3. Generate Vector SVG with Embedded Circular Logo
    const svgRaw = await QRCode.toString(item.url, {
      type: "svg",
      margin: 2,
      color: {
        dark: "#9A1B1F",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    // Parse SVG viewBox to accurately position center logo
    const viewBoxMatch = svgRaw.match(/viewBox="0 0 (\d+) (\d+)"/);
    const svgDimension = viewBoxMatch ? parseInt(viewBoxMatch[1], 10) : 45;
    const centerSize = svgDimension * 0.24;
    const centerOffset = (svgDimension - centerSize) / 2;
    const badgeSize = svgDimension * 0.27;
    const badgeOffset = (svgDimension - badgeSize) / 2;

    const embeddedLogoSvg = `
      <circle cx="${svgDimension / 2}" cy="${svgDimension / 2}" r="${badgeSize / 2}" fill="#FFFFFF" />
      <defs>
        <clipPath id="logoClip-${item.name}">
          <circle cx="${svgDimension / 2}" cy="${svgDimension / 2}" r="${centerSize / 2}" />
        </clipPath>
      </defs>
      <image
        x="${centerOffset}"
        y="${centerOffset}"
        width="${centerSize}"
        height="${centerSize}"
        href="data:image/png;base64,${logoBase64}"
        clip-path="url(#logoClip-${item.name})"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>`;

    const finalSvg = svgRaw.replace("</svg>", embeddedLogoSvg);
    const svgPath = path.join(outputDir, `${item.name}.svg`);
    fs.writeFileSync(svgPath, finalSvg, "utf8");

    console.log(`✅ [${item.label}] -> Generated with Center Logo: ${item.url}`);
  }

  console.log(`\n🎉 Tất cả mã QR đã được gắn Logo tròn Chạm Thức ở chính giữa!`);
}

generateQRCodes().catch(console.error);
