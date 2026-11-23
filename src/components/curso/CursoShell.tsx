import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

/**
 * Casca do módulo Curso. Diferente de SiteShell (landing) e
 * AdminShell (painel administrativo). Aqui o foco é a trilha:
 * header enxuto + conteúdo + footer simples.
 */
export function CursoShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <header className="sticky top-0 z-30 border-b border-line bg-card/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="CEURS – página inicial">
            <Logo />
            <span className="hidden rounded-full bg-teal/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal sm:inline">
              Curso
            </span>
          </Link>
          <Link
            to="/curso"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar ao início do curso
          </Link>
        </div>
      </header>

      <main id="conteudo" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-line bg-card">
        <div className="container-page flex flex-col justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>CEURS–Escolas · Curso</span>
          <Link
            to="/"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Voltar ao site
          </Link>
        </div>
      </footer>
    </div>
  );
}