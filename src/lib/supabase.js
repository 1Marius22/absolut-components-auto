import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Fără date demonstrative în frontend: aplicația așteaptă configurarea Supabase.
export const isSupabaseConfigured = Boolean(
  url && key && url.startsWith("https://") && !url.includes("YOUR_PROJECT"),
);

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;
