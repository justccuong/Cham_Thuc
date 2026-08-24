import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const product = searchParams.get("product");
    const format = searchParams.get("format") || "png";
    const customUrl = searchParams.get("url");

    const host = request.headers.get("host") || "cham-thuc.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    let targetUrl = customUrl;
    if (!targetUrl) {
      targetUrl = product
        ? `${baseUrl}/huong-dan?product=${encodeURIComponent(product)}`
        : `${baseUrl}/huong-dan`;
    }

    const qrSize = 1000;
    const logoSize = 230;
    const borderSize = 260;

    const logoPath = path.join(process.cwd(), "public", "logo.png");

    if (format === "svg") {
      const svgRaw = await QRCode.toString(targetUrl, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#9A1B1F",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H",
      });

      if (fs.existsSync(logoPath)) {
        const logoBase64 = fs.readFileSync(logoPath).toString("base64");
        const viewBoxMatch = svgRaw.match(/viewBox="0 0 (\d+) (\d+)"/);
        const svgDimension = viewBoxMatch ? parseInt(viewBoxMatch[1], 10) : 45;
        const centerSize = svgDimension * 0.24;
        const centerOffset = (svgDimension - centerSize) / 2;
        const badgeSize = svgDimension * 0.27;

        const embeddedLogoSvg = `
          <circle cx="${svgDimension / 2}" cy="${svgDimension / 2}" r="${badgeSize / 2}" fill="#FFFFFF" />
          <defs>
            <clipPath id="logoClip-dynamic">
              <circle cx="${svgDimension / 2}" cy="${svgDimension / 2}" r="${centerSize / 2}" />
            </clipPath>
          </defs>
          <image
            x="${centerOffset}"
            y="${centerOffset}"
            width="${centerSize}"
            height="${centerSize}"
            href="data:image/png;base64,${logoBase64}"
            clip-path="url(#logoClip-dynamic)"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>`;

        const finalSvg = svgRaw.replace("</svg>", embeddedLogoSvg);
        return new NextResponse(finalSvg, {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }

      return new NextResponse(svgRaw, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Default PNG with center logo
    const rawQrBuffer = await QRCode.toBuffer(targetUrl, {
      width: qrSize,
      margin: 2,
      color: {
        dark: "#9A1B1F",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    if (fs.existsSync(logoPath)) {
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

      const circularLogo = await sharp(logoPath)
        .resize(logoSize, logoSize)
        .composite([{ input: logoCircleMask, blend: "dest-in" }])
        .png()
        .toBuffer();

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

      const compositedBuffer = await sharp(rawQrBuffer)
        .composite([{ input: centerLogoBadge, gravity: "center" }])
        .png()
        .toBuffer();

      return new NextResponse(new Uint8Array(compositedBuffer), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse(new Uint8Array(rawQrBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("QR Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}
