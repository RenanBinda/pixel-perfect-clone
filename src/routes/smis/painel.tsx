import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  CheckCircle2,
  FileEdit,
  ListChecks,
  Plus,
  Sparkles,
} from "lucide-react";
import { SmisShell } from "@/components/smis/SmisShell";
import { IniciativaCard } from "@/components/smis/IniciativaCard";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/admin-access.functions";
import { fetchIniciativas, computeStats } from "@/lib/smis";
import { metricaTerritorial } from "@/lib/acesso-iniciativa";

export const Route = createFileRoute("/smis/painel")({
  // ⚠️ beforeLoad DEVE ser async quando usa await
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAuth("/smis/painel");
  },
  head: () => ({
    meta: [
      { title: "Painel · SMIS-Escolas" },
      { name: "description", content: "Acompanhamento de iniciativas escolares de sustentabilidade no CEURS–Escolas." },
      { property: "og:title", content: "Painel · SMIS-Escolas" },
      { property: "og:description", content: "Acompanhe suas iniciativas e o progresso do mapeamento escolar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PainelPage,
});

function PainelPage() {
  const { data: iniciativas = [], isLoading } = useQuery({
    queryKey: ["smis", "iniciativas"],
    queryFn: fetchIniciativas,
  });

  const stats = computeStats(iniciativas);
  const recentes = [...iniciativas]
    .sort((a, b) => b.dataAtualizacao.localeCompare(a.dataAtualizacao))
    .slice(0, 3);

  return (
    <SmisShell
      title="Painel do SMIS-Escolas"
      description="Acompanhe suas iniciativas, rascunhos e o progresso do mapeamento."
      actions={
        <Button asChild>
          <Link
            to="/smis/iniciativas/nova"
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Nova iniciativa
          </Link>
        </Button>
      }
    >
      {/* KPIs */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={ListChecks}
          label="Total de iniciativas"
          value={stats.total}
          color="text-navy"
        />
        <KpiCard
          icon={CheckCircle2}
          label="Publicadas"
          value={stats.publicadas}
          color="text-teal"
        />
        <KpiCard
          icon={FileEdit}
          label="Rascunhos"
          value={stats.rascunhos}
          color="text-orange"
        />
        <KpiCard
          icon={Sparkles}
          label="Temas ativos"
          value={Object.values(stats.porTema).filter((n) => n > 0).length}
          color="text-amber-600"
        />
      </ul>

      {/* Métrica territorial */}
      {(() => {
        const m = metricaTerritorial(iniciativas);
        if (!m.escolas) return null;
        return (
          <section className="mt-10 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-extrabold text-navy">Sua escola no mapa</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Média de {m.media} iniciativa(s) por escola em {m.escolas} escolas. Mapeie mais práticas para ampliar o selo da escola.
            </p>
            <ul className="mt-4 space-y-2">
              {m.porEscola.slice(0, 5).map(([escola, n]) => (
                <li key={escola} className="flex items-center gap-3 text-sm">
                  <span className="w-56 truncate text-foreground">{escola}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-primary" style={{ width: `${(n / (m.porEscola[0]?.[1] ?? 1)) * 100}%` }} />
                  </span>
                  <span className={n >= m.media ? "font-bold text-primary" : "text-muted-foreground"}>{n}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}

      {/* Ações rápidas */}
      <section className="mt-10">
        <h2 className="text-lg font-extrabold text-navy">Ações rápidas</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            to="/smis/iniciativas/nova"
            icon={Plus}
            title="Registrar iniciativa"
            description="Documente uma prática de sustentabilidade da sua escola."
          />
          <QuickAction
            to="/smis/iniciativas"
            icon={ListChecks}
            title="Ver todas"
            description="Explore o acervo de iniciativas registradas."
          />
          <QuickAction
            to="/awa"
            icon={Sparkles}
            title="Ir para a comunidade"
            description="Compartilhe sua iniciativa e conecte-se a outras escolas."
          />
        </ul>
      </section>

      {/* Atividade recente */}
      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Carregando atividades...
        </p>
      ) : recentes.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-extrabold text-navy">
              Atividade recente
            </h2>
            <Link
              to="/smis/iniciativas"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-teal"
            >
              Ver todas
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {recentes.map((i) => (
              <li key={i.id}>
                <IniciativaCard iniciativa={i} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
          <p className="text-lg font-bold text-navy">
            Nenhuma iniciativa ainda
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Comece registrando a primeira prática de sustentabilidade da sua
            escola.
          </p>
          <Button asChild className="mt-6">
            <Link to="/smis/iniciativas/nova">
              Registrar primeira iniciativa
            </Link>
          </Button>
        </div>
      )}
    </SmisShell>
  );
}

/* ============================================================
   COMPONENTES INTERNOS
   ============================================================ */

function KpiCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof ListChecks;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <li className="rounded-2xl border border-line bg-card p-6 shadow-soft">
      <Icon className={`h-6 w-6 ${color}`} aria-hidden />
      <p className="mt-5 text-4xl font-extrabold tracking-tight text-navy">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </li>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string;
  icon: typeof Plus;
  title: string;
  description: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-4 font-bold text-navy">{title}</p>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">
          {description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-navy group-hover:text-teal">
          Acessar
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </Link>
    </li>
  );
}