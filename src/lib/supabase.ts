import { createClient, SupabaseClient } from "@supabase/supabase-js";

function sanitizeUrl(rawUrl: string | undefined): string {
  if (!rawUrl) return "https://placeholder-url.supabase.co";
  let cleaned = rawUrl.trim().replace(/^["']|["']$/g, "");
  // Strip trailing slashes to prevent PostgREST PGRST125 URL path error
  cleaned = cleaned.replace(/\/+$/, "");
  return cleaned;
}

function sanitizeKey(rawKey: string | undefined): string {
  if (!rawKey) return "placeholder-service-role-key";
  return rawKey.trim().replace(/^["']|["']$/g, "");
}

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = sanitizeUrl(rawUrl);
const supabaseServiceRoleKey = sanitizeKey(rawServiceKey);

/**
 * Creates and returns a Supabase server-side client using Service Role Key.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (!rawUrl || !rawServiceKey) {
    throw new Error(
      "Missing required Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

/**
 * Exported default Supabase client instance with auto-cleaned URL & Key.
 */
export const supabase: SupabaseClient = (() => {
  if (!rawUrl || !rawServiceKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Warning: Supabase client initialized without NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
      );
    }
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
})();

export default supabase;
