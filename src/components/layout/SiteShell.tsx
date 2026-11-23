import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Casca do site público: header + conteúdo + footer.
 * Usada em todas as rotas públicas (landing, sobre, mídia, login, etc.)
 * NÃO é o AdminShell (sidebar administrativa) — este fica em /admin.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}