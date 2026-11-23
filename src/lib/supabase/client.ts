import { createClient } from "@supabase/supabase-js";

// Preserve the existing account backend independently from the Cloud content database.
const url = "https://qhlovdhrejskboublmvf.supabase.co";
const key = "sb_publishable_S22BaQCZN5zATruQJRldOA_J1Yzl_2G";

export const supabase = createClient(
  url ?? "https://placeholder.supabase.co",
  key ?? "placeholder",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "ceurs-auth-token",
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    },
  }
);

export const isSupabaseConfigured = Boolean(url && key);
