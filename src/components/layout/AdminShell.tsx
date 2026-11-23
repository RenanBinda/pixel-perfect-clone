import type { ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brush,
  Compass,
  Crown,
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Palette,
  Settings,
  Shield,
  UserPlus,
  Users,
  type LucideIcon,
  CalendarClock,
} from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { authStore, useUsuario, type PapelSistema } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

/* ============================================================
   NAVEGAÇÃO
   ------------------------------------------------------------
   Cada item tem `roles` — o mínimo de papel para ver.
   - admin/master veem tudo (exceto Configurações)
   - curador vê Conteúdo e Curadoria
   - master vê Configurações
   ============================================================ */

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  roles: PapelSistema[];
};

const nav: NavItem[] = [
  {
    to: "/admin",
    label: "Visão geral",
    icon: LayoutDashboard,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/solicitacoes",
    label: "Solicitações",
    icon: UserPlus,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/usuarios",
    label: "Usuários",
    icon: Users,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/conteudo",
    label: "Conteúdo",
    icon: FileText,
    roles: ["curador", "admin", "master"],
  },
  {
    to: "/admin/curadoria",
    label: "Curadoria SMIS",
    icon: ListChecks,
    roles: ["curador", "admin", "master"],
  },
  {
    to: "/admin/jornadas",
    label: "Caminhos do usuário",
    icon: Compass,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/reunioes",
    label: "Reuniões",
    icon: CalendarClock,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/documentacao",
    label: "Documentação",
    icon: BookOpen,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/marca",
    label: "Marca e aplicações",
    icon: Brush,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/design-system",
    label: "Design System",
    icon: Palette,
    roles: ["admin", "master"],
  },
  {
    to: "/admin/configuracoes",
    label: "Configurações",
    icon: Settings,
    roles: ["master"],
  },
];

const papelLabel: Record<PapelSistema, string> = {
  master: "Master",
  admin: "Admin",
  curador: "Curador",
  participante: "Participante",
};

const papelCor: Record<PapelSistema, string> = {
  master: "bg-orange/20 text-orange-900",
  admin: "bg-navy/15 text-navy",
  curador: "bg-teal/15 text-teal-900",
  participante: "bg-soft text-muted-foreground",
};

/* ============================================================
   COMPONENTE
   ============================================================ */

export function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const usuario = useUsuario();
  const router = useRouterState();
  const pathname = router.location.pathname;

  const papel = usuario?.papelSistema ?? "participante";
  const itens = nav.filter((n) => n.roles.includes(papel));

  async function sair() {
    await authStore.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-soft">
      {/* Sidebar (desktop) */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r border-line bg-card lg:flex"
        aria-label="Navegação administrativa"
      >
        <div className="border-b border-line p-5">
          <Link to="/" aria-label="CEURS – página inicial">
            <Logo />
          </Link>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-teal">
            Painel administrativo
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {itens.map((n) => {
              const Icon = n.icon;
              const isActive =
                pathname === n.to ||
                (n.to !== "/admin" && pathname.startsWith(n.to));

              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-navy text-secondary-foreground"
                        : "text-ink hover:bg-navy/5",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-line p-3">
          {usuario && (
            <div className="mb-3 flex items-center gap-3 px-2">
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-secondary-foreground"
              >
                {usuario.iniciais}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy">
                  {usuario.nome}
                </p>
                <p
                  className={cn(
                    "mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    papelCor[usuario.papelSistema],
                  )}
                >
                  {papelLabel[usuario.papelSistema]}
                </p>
              </div>
            </div>
          )}

          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
              Voltar ao site
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={sair}
          >
            <LogOut className="mr-2 h-4 w-4" aria-hidden />
            Sair
          </Button>
        </div>
      </aside>

      {/* Conteúdo */}
      <main id="conteudo" className="flex flex-1 flex-col">
        {/* Header mobile */}
        <header className="flex h-14 items-center justify-between gap-3 border-b border-line bg-card px-4 lg:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Site
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal"
          >
            <Shield className="h-4 w-4" aria-hidden />
            Admin
          </Link>

          {usuario && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                papelCor[usuario.papelSistema],
              )}
            >
              {papelLabel[usuario.papelSistema]}
            </span>
          )}
        </header>

        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}