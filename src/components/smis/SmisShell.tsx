import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  LayoutDashboard,
  ListChecks,
  Plus,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { useUsuario } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/smis/painel", label: "Painel", icon: LayoutDashboard },
  { to: "/smis/iniciativas", label: "Iniciativas", icon: ListChecks },
  { to: "/smis/iniciativas/nova", label: "Nova iniciativa", icon: Plus },
  { to: "/smis/credenciamento", label: "Credenciar líderes", icon: UserCheck },
] as const;

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  backTo?: { to: string; label: string };
};

export function SmisShell({
  children,
  title,
  description,
  actions,
  backTo,
}: Props) {
  const usuario = useUsuario();
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <div className="flex min-h-screen bg-soft">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-navy text-secondary-foreground lg:flex">
        <div className="border-b border-secondary-foreground/15 p-5">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-sky transition-colors hover:text-secondary-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar ao site
          </Link>

          <div className="rounded-lg bg-card px-3 py-2">
            <Logo size="sm" />
          </div>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-teal">
            SMIS-Escolas
          </p>
          <p className="text-[10px] text-sky">
            Sistema de Mapeamento
          </p>
        </div>

        <nav aria-label="Navegação do SMIS" className="flex-1 p-3">
          <ul className="space-y-1">
            {nav.map((n) => {
              const Icon = n.icon;
              const isActive =
                pathname === n.to ||
                (n.to !== "/smis/painel" && pathname.startsWith(n.to));
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-secondary-foreground/10 text-secondary-foreground"
                        : "text-sky hover:bg-secondary-foreground/5 hover:text-secondary-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-teal" : "text-sky/70",
                      )}
                      aria-hidden
                    />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {usuario && (
          <div className="border-t border-secondary-foreground/15 p-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-xs font-bold text-navy"
              >
                {usuario.iniciais}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  {usuario.nome}
                </p>
                <p className="truncate text-[11px] text-sky">
                  {usuario.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header mobile */}
        <header className="flex h-14 items-center justify-between gap-3 border-b border-line bg-card px-4 lg:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Site
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            SMIS-Escolas
          </span>
          <Link
            to="/smis/painel"
            className="text-xs font-semibold text-navy"
          >
            Painel
          </Link>
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

                {actions && (
                  <div className="flex flex-wrap gap-2">{actions}</div>
                )}
              </div>
            </div>
          </div>
        )}

        <main id="conteudo" className="flex-1 px-5 py-8 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-6xl">
            {children ?? null}
          </div>
        </main>
      </div>
    </div>
  );
}