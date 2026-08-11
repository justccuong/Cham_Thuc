import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Creates and returns a Supabase server-side client using Service Role Key.
 * Throws an error if required environment variables are missing.
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
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
 * Exported default Supabase client instance.
 * Gracefully handles missing environment variables with a warning during build / client init.
 */
export const supabase: SupabaseClient = (() => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Warning: Supabase client initialized without NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
      );
    }
  }

  return createClient(
    supabaseUrl || "https://placeholder-url.supabase.co",
    supabaseServiceRoleKey || "placeholder-service-role-key",
    {
      auth: {
        persistSession: false,
      },
    }
  );
})();

export default supabase;
