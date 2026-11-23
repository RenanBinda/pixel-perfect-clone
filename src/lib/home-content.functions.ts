import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, setResponseHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { homeContentSchema, normalizeRecords, PROFILE_IDS } from "./home-content";

const COOKIE = "ceurs-content-editor";
async function signature(expires: string) {
  const secret = process.env["ADMIN_ACCESS_CODE"];
  if (!secret) throw new Error("O código administrativo não está configurado.");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const buffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`content-editor:${expires}`));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function authorized() {
  const cookie = getCookie(COOKIE);
  if (!cookie) return false;
  const [expires, mac] = cookie.split(".");
  if (!expires || !mac || Number(expires) <= Date.now()) return false;
  return mac === await signature(expires);
}
export const editorStatus = createServerFn({ method: "GET" }).handler(async () => {
  setResponseHeader("cache-control", "no-store");
  return { authorized: await authorized() };
});
export const unlockEditor = createServerFn({ method: "POST" })
  .inputValidator(z.object({ code: z.string().min(1).max(256) }))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_ACCESS_CODE"];
    if (!expected) throw new Error("O código administrativo não está configurado.");
    // Compare fixed-length digests rather than a variable-length secret.
    const digest = async (value: string) => new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
    const a = await digest(data.code); const b = await digest(expected);
    let difference = 0;
    for (let i = 0; i < a.length; i++) difference |= (a[i] ?? 0) ^ (b[i] ?? 0);
    if (difference !== 0) throw new Error("Código administrativo incorreto.");
    const expires = String(Date.now() + 3600000);
    setCookie(COOKIE, `${expires}.${await signature(expires)}`, { httpOnly: true, secure: process.env["NODE_ENV"] === "production", sameSite: "strict", path: "/", maxAge: 3600 });
    return { authorized: true };
  });
export const readHomeContent = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Não foi possível conectar aos conteúdos publicados.");
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from("landing_path_content").select("profile, content, revision, updated_at");
  if (error) throw new Error("Não foi possível carregar os conteúdos publicados.");
  return normalizeRecords(data ?? []);
});
export const publishHomeContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ profile: z.enum(PROFILE_IDS), content: homeContentSchema, revision: z.number().int().min(0) }))
  .handler(async ({ data }) => {
    if (!await authorized()) throw new Error("Confirme o código administrativo para publicar.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const values = { profile: data.profile, content: data.content, revision: data.revision + 1, updated_at: new Date().toISOString() };
    const request = data.revision === 0
      ? supabaseAdmin.from("landing_path_content").insert(values).select().single()
      : supabaseAdmin.from("landing_path_content").update(values).eq("profile", data.profile).eq("revision", data.revision).select().single();
    const { data: row, error } = await request;
    if (error || !row) throw new Error("Não foi possível publicar. Recarregue os conteúdos: outra pessoa pode ter alterado este perfil.");
    return { profile: data.profile, record: { content: data.content, revision: row.revision, updatedAt: row.updated_at } };
  });
