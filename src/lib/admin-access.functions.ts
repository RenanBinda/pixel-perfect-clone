/**
 * Funções de acesso administrativo.
 *
 * - Funções síncronas (checkAdminSession) para componentes.
 * - Funções assíncronas (requireAuth, requireAdmin, requireRole)
 *   para beforeLoad.
 *
 * Todas usam o authStore, que usa Supabase Auth + tabela user_roles.
 */

import { redirect } from "@tanstack/react-router";
import { authStore, type PapelSistema, type Usuario } from "./auth-store";

const ADMIN_ROLES: PapelSistema[] = ["admin", "master"];

/* ============================================================
   SESSÃO (SÍNCRONO)
   ============================================================ */

export function checkAdminSession(): boolean {
  const { status, usuario } = authStore.getState();
  return (
    status === "authenticated" &&
    Boolean(usuario) &&
    ADMIN_ROLES.includes(usuario!.papelSistema)
  );
}

export function getAdminUser() {
  const { status, usuario } = authStore.getState();
  if (
    status === "authenticated" &&
    usuario &&
    ADMIN_ROLES.includes(usuario.papelSistema)
  ) {
    return usuario;
  }
  return null;
}

export function isPlatformAdmin(): boolean {
  return checkAdminSession();
}

export const isAdmin = checkAdminSession;

export function currentPapelSistema(): PapelSistema | null {
  return authStore.getState().usuario?.papelSistema ?? null;
}

/* ============================================================
   HELPERS DE REDIRECT
   ============================================================ */

const REDIRECT_STORAGE_KEY = "ceurs-post-login-redirect";

function savePostLoginRedirect(path: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(REDIRECT_STORAGE_KEY, path);
  } catch {
    /* ignore */
  }
}

export function consumePostLoginRedirect(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const path = window.sessionStorage.getItem(REDIRECT_STORAGE_KEY);
    window.sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
    return path;
  } catch {
    return null;
  }
}

/* ============================================================
   GUARDS ASSÍNCRONOS
   ============================================================ */

/**
 * Garante que o usuário está autenticado.
 * Aguarda init() do authStore antes de decidir.
 */
export async function requireAuth(redirectTo?: string): Promise<Usuario> {
  await authStore.init();

  const { status, usuario } = authStore.getState();

  if (status !== "authenticated" || !usuario) {
    if (redirectTo) savePostLoginRedirect(redirectTo);

    if (redirectTo) {
      throw redirect({
        to: "/login",
        search: { redirect: redirectTo },
      });
    }
    throw redirect({ to: "/login" });
  }

  return usuario;
}

/**
 * Garante que o usuário é admin/master da plataforma.
 */
export async function requireAdmin(): Promise<Usuario> {
  const usuario = await requireAuth();

  if (!ADMIN_ROLES.includes(usuario.papelSistema)) {
    throw redirect({ to: "/" });
  }

  return usuario;
}

/**
 * Garante que o usuário tem um dos papéis informados.
 * Usado por rotas que podem ser acessadas por curador/admin/master.
 */
export async function requireRole(
  roles: PapelSistema[],
  redirectTo?: string,
): Promise<Usuario> {
  const usuario = await requireAuth(redirectTo);

  if (!roles.includes(usuario.papelSistema)) {
    throw redirect({ to: "/" });
  }

  return usuario;
}

/* ============================================================
   VERIFICAÇÃO POR CÓDIGO (PIN) — mantida por compatibilidade
   ============================================================ */

const ADMIN_CODE_KEY = "ceurs-admin-code";
const DEFAULT_ADMIN_CODE = "2030";

export function verifyAdminCode(code: string): boolean {
  const isValid = code === DEFAULT_ADMIN_CODE;
  if (isValid && typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(ADMIN_CODE_KEY, "verified");
    } catch {
      /* ignore */
    }
  }
  return isValid;
}

export function hasVerifiedAdminCode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(ADMIN_CODE_KEY) === "verified";
  } catch {
    return false;
  }
}

export function clearAdminCode(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(ADMIN_CODE_KEY);
  } catch {
    /* ignore */
  }
}

/* ============================================================
   LOGOUT
   ============================================================ */

export async function logoutAdmin(): Promise<void> {
  clearAdminCode();
  await authStore.signOut();
}

export async function logout(): Promise<void> {
  await logoutAdmin();
}