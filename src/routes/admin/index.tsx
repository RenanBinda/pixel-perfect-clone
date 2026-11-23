import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAdmin();
  },
  head: () => ({
    meta: [
      { title: "Painel administrativo · CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

const kpis = [
  { label: "Solicitações pendentes", value: 12, icon: Clock, cor: "text-orange" },
  { label: "Usuários ativos", value: 1240, icon: Users, cor: "text-teal" },
  { label: "Iniciativas publicadas", value: 860, icon: FileText, cor: "text-navy" },
  { label: "Escolas cadastradas", value: 208, icon: BarChart3, cor: "text-amber-600" },
] as const;

const atalhos = [
  {
    title: "Gerenciar solicitações",
    desc: "Aprovar, recusar e acompanhar pedidos de acesso.",
    to: "/admin/solicitacoes",
    icon: UserPlus,
  },
  {
    title: "Gerenciar usuários",
    desc: "Papéis, permissões, vínculos e suspensões.",
    to: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Conteúdo e mídia",
    desc: "Publicar notícias, materiais e comunicados.",
    to: "/admin/conteudo",
    icon: FileText,
  },
  {
    title: "Configurações",
    desc: "Domínios, taxonomia, integrações e LGPD.",
    to: "/admin/configuracoes",
    icon: Settings,
  },
] as const;

function AdminDashboardPage() {
  return (
    <section className="container-page py-12 md:py-20">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-teal">Painel administrativo</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Visão geral
          </h1>
          <p className="mt-3 text-muted-foreground">
            Bem-vindo(a) de volta. Aqui está o resumo do programa.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/">Voltar ao site</Link>
        </Button>
      </header>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <li
              key={k.label}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <Icon className={`h-6 w-6 ${k.cor}`} aria-hidden />
              <p className="mt-5 text-4xl font-extrabold tracking-tight text-navy">
                {k.value.toLocaleString("pt-BR")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{k.label}</p>
            </li>
          );
        })}
      </ul>

      <Section
        id="atalhos"
        eyebrow="Ações rápidas"
        title="O que você precisa fazer hoje?"
        size="compact"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {atalhos.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.title}>
                <Link
                  to={a.to}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {a.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-navy group-hover:text-teal">
                    Acessar
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        id="atividade"
        eyebrow="Atividade"
        title="Últimos eventos"
        tone="card"
        size="compact"
      >
        <ul className="space-y-3">
          {[
            {
              icon: CheckCircle2,
              titulo: "Solicitação aprovada",
              desc: "João Silva · Escola Estadual Central",
              tempo: "há 5 minutos",
              cor: "text-teal",
            },
            {
              icon: FileText,
              titulo: "Nova iniciativa publicada",
              desc: "Horta comunitária · Escola Municipal Vila Verde",
              tempo: "há 2 horas",
              cor: "text-orange",
            },
            {
              icon: UserPlus,
              titulo: "Novo usuário cadastrado",
              desc: "Ana Costa · Coordenadora pedagógica",
              tempo: "há 4 horas",
              cor: "text-navy",
            },
            {
              icon: CheckCircle2,
              titulo: "Curso concluído",
              desc: "CCA2030 · 12 novos certificados emitidos",
              tempo: "há 1 dia",
              cor: "text-teal",
            },
          ].map((e, i) => {
            const Icon = e.icon;
            return (
              <li
                key={i}
                className="flex items-start gap-4 rounded-xl border border-line bg-soft p-4"
              >
                <Icon className={`mt-0.5 h-5 w-5 ${e.cor}`} aria-hidden />
                <div className="flex-1">
                  <p className="font-bold text-navy">{e.titulo}</p>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {e.tempo}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>
    </section>
  );
}