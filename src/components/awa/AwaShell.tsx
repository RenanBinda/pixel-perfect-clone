import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, MessageCircle, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  backTo?: { to: string; label: string };
  activeNav?: "temas" | "biblioteca";
};

const nav = [
  { key: "temas" as const, to: "/awa/temas", label: "Comunidades", icon: MessageCircle },
  { key: "biblioteca" as const, to: "/awa/biblioteca", label: "Biblioteca", icon: BookOpen },
];

export function AwaShell({
  children,
  title,
  description,
  actions,
  backTo,
  activeNav,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line bg-card/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="CEURS – página inicial">
            <Logo />
            <span className="hidden rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange sm:inline">
              AWA2030
            </span>
          </Link>

          <nav aria-label="Navegação AWA" className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const Icon = n.icon;
              const isActive = activeNav === n.key;
              return (
                <Link
                  key={n.key}
                  to={n.to}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-navy text-secondary-foreground"
                      : "text-navy hover:bg-navy/5",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/awa"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar ao início
          </Link>
        </div>
      </header>

      {/* Header do conteúdo */}
      {(title || actions || backTo) && (
        <div className="border-b border-line bg-card px-5 py-6 md:px-10 md:py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
            {backTo && (
              <Link
                to={backTo.to}
                className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-navy"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                {backTo.label}
              </Link>
            )}

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                {title && (
                  <h1 className="text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>

              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <main id="conteudo" className="flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line bg-card">
        <div className="container-page flex flex-col justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>CEURS–Escolas · AWA2030 · Comunidade de Prática</span>
          <Link to="/awa" className="font-semibold text-navy underline-offset-4 hover:underline">
            Sobre o AWA2030
          </Link>
        </div>
      </footer>
    </div>
  );
}