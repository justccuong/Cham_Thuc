import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const product = searchParams.get("product");
    const format = searchParams.get("format") || "png";
    const customUrl = searchParams.get("url");

    const host = request.headers.get("host") || "chamthuc.vn";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    let targetUrl = customUrl;
    if (!targetUrl) {
      targetUrl = product
        ? `${baseUrl}/huong-dan?product=${encodeURIComponent(product)}`
        : `${baseUrl}/huong-dan`;
    }

    if (format === "svg") {
      const svg = await QRCode.toString(targetUrl, {
        type: "svg",
        margin: 2,
        color: {
          dark: "#9A1B1F",
          light: "#FFFFFF",
        },
      });
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Default PNG buffer
    const pngBuffer = await QRCode.toBuffer(targetUrl, {
      width: 600,
      margin: 2,
      color: {
        dark: "#9A1B1F",
        light: "#FFFFFF",
      },
    });

    return new NextResponse(new Uint8Array(pngBuffer), {
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
