/**
 * Store de autenticação do CEURS–Escolas.
 *
 * Papéis de sistema vêm da tabela user_roles (Supabase).
 * Apenas o master raiz é reconhecido pelo e-mail exato.
 */

import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase/client";

/* ============================================================
   TIPOS
   ============================================================ */

export type PapelSistema = "participante" | "curador" | "admin" | "master";
const MASTER_EMAIL = "suporte@leful.com.br";

export type PapelDominio =
  | "educador"
  | "coordenador"
  | "diretor"
  | "estudante"
  | "pesquisador"
  | "gestor-publico"
  | "outro";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  papelSistema: PapelSistema;
  papelDominio?: PapelDominio | undefined;
  iniciais: string;
  avatarUrl?: string | undefined;
};

export type AuthState = {
  usuario: Usuario | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
};

/* ============================================================
   ESTADO INTERNO
   ============================================================ */

let state: AuthState = {
  usuario: null,
  status: "idle",
};

const listeners = new Set<() => void>();
let initPromise: Promise<void> | null = null;
let authListenerAttached = false;

function emit() {
  for (const l of listeners) l();
}

function setState(next: Partial<AuthState>) {
  state = { ...state, ...next };
  emit();
}

/* ============================================================
   HELPERS
   ============================================================ */

function readMetadataString(
  metadata: Record<string, unknown> | undefined,
  key: string,
): string | undefined {
  const value = metadata?.[key];
  return typeof value === "string" ? value : undefined;
}

function mapUser(user: User | null): Usuario | null {
  if (!user) return null;

  const email = user.email ?? "";
  const nome =
    readMetadataString(user.user_metadata, "nome") ??
    email.split("@")[0] ??
    "Usuário";

  const iniciais = nome
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Papel definitivo vem de user_roles (ver comPapel).
  // Aqui o padrão é participante; master raiz tem exceção explícita.
  const papelSistema: PapelSistema =
    email.trim().toLowerCase() === MASTER_EMAIL ? "master" : "participante";

  const papelDominioRaw = readMetadataString(user.user_metadata, "papel_dominio");
  const papelDominio: PapelDominio | undefined =
    papelDominioRaw === "educador" ||
    papelDominioRaw === "coordenador" ||
    papelDominioRaw === "diretor" ||
    papelDominioRaw === "estudante" ||
    papelDominioRaw === "pesquisador" ||
    papelDominioRaw === "gestor-publico" ||
    papelDominioRaw === "outro"
      ? papelDominioRaw
      : undefined;

  const avatarUrl = readMetadataString(user.user_metadata, "avatar_url");

  const usuario: Usuario = {
    id: user.id,
    nome,
    email,
    papelSistema,
    iniciais,
  };

  if (papelDominio) usuario.papelDominio = papelDominio;
  if (avatarUrl) usuario.avatarUrl = avatarUrl;

  return usuario;
}

async function comPapel(usuario: Usuario | null): Promise<Usuario | null> {
  if (!usuario) return null;
  try {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", usuario.id)
      .maybeSingle();
    const role = (data as { role?: string } | null)?.role;
    if (
      role === "master" ||
      role === "admin" ||
      role === "curador" ||
      role === "participante"
    ) {
      return { ...usuario, papelSistema: role };
    }
  } catch (err) {
    console.error("[authStore] Erro ao ler papel:", err);
  }
  return usuario;
}

/* ============================================================
   INIT NO CLIENTE
   ============================================================ */

async function initClient(): Promise<void> {
  setState({ status: "loading" });

  try {
    const { data } = await supabase.auth.getSession();
    const usuario = await comPapel(mapUser(data.session?.user ?? null));

    setState({
      usuario,
      status: data.session ? "authenticated" : "unauthenticated",
    });
  } catch (err) {
    console.error("[authStore.initClient] Erro:", err);
    setState({ usuario: null, status: "unauthenticated" });
  }

  if (!authListenerAttached) {
    authListenerAttached = true;
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") return;
      void comPapel(mapUser(session?.user ?? null)).then((usuario) => {
        setState({
          usuario,
          status: session ? "authenticated" : "unauthenticated",
        });
      });
    });
  }
}

/* ============================================================
   API PÚBLICA
   ============================================================ */

export const authStore = {
  getState(): AuthState {
    return state;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  async init(): Promise<void> {
    if (initPromise) return initPromise;

    if (typeof window === "undefined") {
      setState({ usuario: null, status: "unauthenticated" });
      initPromise = Promise.resolve();
    } else {
      initPromise = initClient();
    }

    return initPromise;
  },

  async signIn(email: string, password: string): Promise<Usuario> {
    setState({ status: "loading" });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setState({ status: "unauthenticated" });
      throw new Error(traduzErroSupabase(error.message));
    }

    const usuario = await comPapel(mapUser(data.user));
    if (!usuario) {
      setState({ status: "unauthenticated" });
      throw new Error("Usuário inválido.");
    }

    setState({ usuario, status: "authenticated" });
    return usuario;
  },

  /**
   * Cria conta no Supabase Auth.
   *
   * O papel de sistema é atribuído automaticamente pelo trigger
   * `on_auth_user_created_role` (participante por padrão).
   * O `papel_dominio` é gravado nos metadados do usuário.
   */
  async signUp(params: {
    email: string;
    password: string;
    nome: string;
    papelDominio?: PapelDominio;
  }): Promise<Usuario | null> {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          nome: params.nome,
          ...(params.papelDominio && { papel_dominio: params.papelDominio }),
        },
      },
    });

    if (error) {
      throw new Error(traduzErroSupabase(error.message));
    }

    if (data.session && data.user) {
      const usuario = await comPapel(mapUser(data.user));
      if (usuario) {
        setState({ usuario, status: "authenticated" });
      }
      return usuario;
    }

    return null;
  },

  /**
   * Atualiza o papel de domínio do próprio usuário.
   * Chamado na edição de perfil.
   */
  async setPapelDominio(papelDominio: PapelDominio): Promise<void> {
    const { data, error } = await supabase.auth.updateUser({
      data: { papel_dominio: papelDominio },
    });

    if (error) {
      throw new Error(error.message);
    }

    setState({
      usuario: mapUser(data.user),
    });
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
    setState({ usuario: null, status: "unauthenticated" });
    initPromise = null;
  },
};

/* ============================================================
   TRADUÇÃO DE ERROS
   ============================================================ */

function traduzErroSupabase(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("invalid login credentials"))
    return "E-mail ou senha incorretos.";
  if (lower.includes("email not confirmed"))
    return "Confirme seu e-mail antes de entrar.";
  if (lower.includes("user already registered"))
    return "Este e-mail já está cadastrado.";
  if (lower.includes("password should be"))
    return "A senha deve ter pelo menos 6 caracteres.";
  if (lower.includes("invalid email")) return "Informe um e-mail válido.";
  if (lower.includes("rate limit"))
    return "Muitas tentativas. Aguarde alguns minutos.";
  return msg;
}

/* ============================================================
   HOOKS
   ============================================================ */

export function useAuth(): AuthState {
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.getState,
    authStore.getState,
  );
}

export function useUsuario(): Usuario | null {
  return useAuth().usuario;
}

export function useIsAuthenticated(): boolean {
  return useAuth().status === "authenticated";
}

export function useHasPapelSistema(...papeis: PapelSistema[]): boolean {
  const usuario = useUsuario();
  return Boolean(usuario && papeis.includes(usuario.papelSistema));
}

export function useHasPapelDominio(...papeis: PapelDominio[]): boolean {
  const usuario = useUsuario();
  return Boolean(
    usuario?.papelDominio && papeis.includes(usuario.papelDominio),
  );
}