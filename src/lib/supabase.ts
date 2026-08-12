import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Sanitizes Supabase URL to guarantee it only contains protocol and host (e.g., https://xyz.supabase.co).
 * Strips any trailing slashes, quotes, or path suffixes like /rest/v1 which cause PostgREST PGRST125 Invalid path errors.
 */
export function sanitizeUrl(rawUrl: string | undefined): string {
  if (!rawUrl) return "https://placeholder-url.supabase.co";
  let cleaned = rawUrl.trim().replace(/^["']|["']$/g, "").trim();
  if (!cleaned) return "https://placeholder-url.supabase.co";

  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = `https://${cleaned}`;
  }

  try {
    const parsed = new URL(cleaned);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return cleaned.replace(/\/+$/, "");
  }
}

/**
 * Sanitizes API keys by trimming whitespace and quotes.
 */
export function sanitizeKey(rawKey: string | undefined): string {
  if (!rawKey) return "placeholder-service-role-key";
  return rawKey.trim().replace(/^["']|["']$/g, "").trim();
}

/**
 * Dynamically gets a clean Supabase server-side client instance.
 */
export function getSupabaseServerClient(): SupabaseClient {
  const url = sanitizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = sanitizeKey(
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}

/**
 * Default exported Supabase client instance.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseServerClient();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default supabase;
