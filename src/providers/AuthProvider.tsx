import { useEffect, type ReactNode } from "react";
import { authStore } from "@/lib/auth-store";

/**
 * Provider que inicializa o authStore na montagem do app.
 *
 * O init() é idempotente — chamar múltiplas vezes retorna a
 * mesma Promise, sem race condition.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    authStore.init().catch((err) => {
      console.error("[AuthProvider] Falha ao inicializar:", err);
    });
  }, []);

  return <>{children}</>;
}