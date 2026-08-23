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

let cachedServerClient: SupabaseClient | null = null;

/**
 * Gets or creates a singleton Supabase server-side client instance.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (cachedServerClient) {
    return cachedServerClient;
  }

  const url = sanitizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = sanitizeKey(
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  cachedServerClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedServerClient;
}

/**
 * Proxy export for backward compatibility that delegates to the cached server client singleton.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseServerClient();
    const value = Reflect.get(client, prop);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default supabase;
