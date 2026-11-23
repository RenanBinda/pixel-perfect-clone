import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { CONFIG_PERFIL, resolverPerfil } from "@/lib/perfil-home";

/**
 * Destino principal de chamadas para ação conforme a sessão.
 * Só considera logado após montar no cliente (evita hydration mismatch).
 */
export function useSessaoCta() {
  const { usuario, status } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const logado = mounted && status === "authenticated" && Boolean(usuario);
  const gestor =
    logado && (usuario?.papelSistema === "admin" || usuario?.papelSistema === "master");

  const config = logado
    ? CONFIG_PERFIL[resolverPerfil(usuario?.papelSistema, usuario?.papelDominio)]
    : null;

  return {
    config,
    logado,
    gestor,
    usuario: logado ? usuario : null,
    destino: gestor ? "/admin" : "/conta",
    rotulo: gestor ? "Ir para o painel" : "Ir para minha área",
  } as const;
}
