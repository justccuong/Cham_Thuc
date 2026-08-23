import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "cham_thuc_admin_session";
const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PIN || "cham_thuc_default_secure_secret_key_2026";

/**
 * Creates a signed admin token with timestamp.
 */
export function createAdminToken(): string {
  const timestamp = Date.now().toString();
  const payload = `admin_${timestamp}`;
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Verifies if a token is a valid signed admin token (valid for 24 hours).
 */
export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  try {
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(payload)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedSignature, "hex");

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return false;
    }

    // Check expiration (24h)
    const timestamp = parseInt(payload.replace("admin_", ""), 10);
    if (isNaN(timestamp)) return false;

    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    return Date.now() - timestamp < maxAge;
  } catch {
    return false;
  }
}

/**
 * Validates admin authentication from Next.js request cookies or Authorization header.
 */
export async function isAuthenticatedAdmin(request?: Request): Promise<boolean> {
  // Check authorization header first if provided
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      if (verifyAdminToken(token)) return true;
    }
  }

  // Check HTTP-only cookie
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

export { ADMIN_COOKIE_NAME };
