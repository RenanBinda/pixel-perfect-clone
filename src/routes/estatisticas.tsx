import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, MapPin, School, Users } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";

export const Route = createFileRoute("/estatisticas")({
  head: () => ({
    meta: [
      { title: "Estatísticas · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Indicadores do programa CEURS–Escolas: escolas, educadores, iniciativas e territórios.",
      },
      { property: "og:title", content: "Estatísticas · CEURS–Escolas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EstatisticasPage,
});

type Kpi = {
  label: string;
  value: string;
  hint: string;
  icon: typeof Users;
};

const kpis: Kpi[] = [
  { label: "Escolas participantes", value: "200+", hint: "em 5 regiões do país", icon: School },
  { label: "Educadores formados", value: "1.240", hint: "professores e gestores", icon: Users },
  { label: "Iniciativas mapeadas", value: "860", hint: "no SMIS-Escolas", icon: BarChart3 },
  { label: "Municípios alcançados", value: "72", hint: "em 18 estados", icon: MapPin },
];

const iniciativas = [
  { tipo: "Horta escolar", valor: 38 },
  { tipo: "Compostagem", valor: 24 },
  { tipo: "Reciclagem", valor: 18 },
  { tipo: "Energia limpa", valor: 12 },
  { tipo: "Mobilidade sustentável", valor: 8 },
];

function EstatisticasPage() {
  return (
    <SiteShell>
      <section className="container-page py-12 md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar à página inicial
        </Link>

        <header className="max-w-2xl">
          <p className="eyebrow text-teal">Transparência e impacto</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Estatísticas do programa
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Indicadores consolidados do CEURS–Escolas. Dados atualizados periodicamente.
          </p>
        </header>

        {/* KPIs */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <li
                key={k.label}
                className="rounded-2xl border border-line bg-card p-6 shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-5 text-4xl font-extrabold tracking-tight text-navy">
                  {k.value}
                </p>
                <p className="mt-1 font-bold text-navy">{k.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
              </li>
            );
          })}
        </ul>

        {/* Distribuição de iniciativas */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-line bg-card p-8 shadow-soft">
            <h2 className="text-xl font-extrabold text-navy">Iniciativas por tipo</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Distribuição das práticas registradas no SMIS-Escolas.
            </p>

            <ul className="mt-8 space-y-5">
              {iniciativas.map((i) => (
                <li key={i.tipo}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{i.tipo}</span>
                    <span className="font-bold text-navy">{i.valor}%</span>
                  </div>
                  <div
                    className="mt-2 h-2.5 overflow-hidden rounded-full bg-soft"
                    role="progressbar"
                    aria-valuenow={i.valor}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${i.tipo}: ${i.valor}%`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal to-orange transition-all"
                      style={{ width: `${i.valor}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl bg-navy p-8 text-secondary-foreground">
            <p className="eyebrow text-amber">Sobre os dados</p>
            <h2 className="mt-3 text-2xl font-extrabold">Metodologia</h2>
            <p className="mt-4 text-sm text-sky">
              Os indicadores são calculados a partir dos registros validados no SMIS-Escolas
              e das matrículas nos cursos do programa. Dados agregados, sem identificação
              individual.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-sky">
              <li className="flex gap-2">
                <span aria-hidden className="text-teal">●</span>
                Atualização mensal
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="text-teal">●</span>
                Fontes: SMIS + AVA/Moodle
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="text-teal">●</span>
                Conformidade LGPD
              </li>
            </ul>
            <a
              href="mailto:dados@ceurs.org.br"
              className="mt-8 inline-flex items-center gap-2 font-bold text-amber underline-offset-4 hover:underline"
            >
              Solicitar dados detalhados →
            </a>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}