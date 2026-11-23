import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Info, Loader2, TrendingUp } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { fetchKpiBySlug, ApiException } from "@/lib/api";

export const Route = createFileRoute("/estatisticas/$indicador")({
  head: ({ params }) => ({
    meta: [
      { title: `Indicador: ${params.indicador} · Estatísticas · CEURS–Escolas` },
      {
        name: "description",
        content: `Detalhamento do indicador ${params.indicador} do programa CEURS–Escolas.`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IndicadorDetalhePage,
  notFoundComponent: IndicadorNotFound,
  errorComponent: IndicadorError,
});

function formatPeriodo(iso: string) {
  const [ano, mes] = iso.split("-");
  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  const idx = Number(mes) - 1;
  return `${meses[idx] ?? mes}/${ano}`;
}

function IndicadorDetalhePage() {
  const { indicador } = Route.useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["kpi", indicador],
    queryFn: () => fetchKpiBySlug(indicador),
  });

  if (isLoading) {
    return (
      <SiteShell>
        <div className="container-page flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Carregando indicador...
          </div>
        </div>
      </SiteShell>
    );
  }

  if (isError || !data) {
    const err = error as ApiException | undefined;
    if (err?.code === "KPI_NOT_FOUND") {
      throw notFound();
    }
    return <IndicadorError error={error} />;
  }

  const maxSerie = Math.max(...data.serieHistorica.map((p) => p.valor), 1);

  return (
    <SiteShell>
      <section className="container-page py-12 md:py-20">
        <Link
          to="/estatisticas"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para Estatísticas
        </Link>

        <header className="max-w-3xl">
          <p className="eyebrow text-teal">Indicador</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            {data.label}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{data.descricao}</p>
        </header>

        {/* Número principal */}
        <div className="mt-12 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-line bg-card p-8 shadow-soft">
            <p className="eyebrow text-teal">Valor atual</p>
            <p className="mt-2 text-6xl font-extrabold tracking-tight text-navy">
              {data.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{data.hint}</p>
          </div>

          <div className="rounded-2xl bg-navy p-8 text-secondary-foreground">
            <p className="eyebrow text-amber">Como calculamos</p>
            <p className="mt-3 text-sm text-sky">{data.metodologia}</p>
          </div>
        </div>

        {/* Série histórica */}
        <div className="mt-12 rounded-2xl border border-line bg-card p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-teal" aria-hidden />
            <h2 className="text-xl font-extrabold text-navy">Evolução</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Série histórica dos últimos meses.
          </p>

          <ul className="mt-8 space-y-4">
            {data.serieHistorica.map((p) => {
              const pct = Math.round((p.valor / maxSerie) * 100);
              return (
                <li key={p.periodo}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">
                      {formatPeriodo(p.periodo)}
                    </span>
                    <span className="font-bold text-navy">
                      {p.valor.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-2.5 overflow-hidden rounded-full bg-soft"
                    role="progressbar"
                    aria-valuenow={p.valor}
                    aria-valuemin={0}
                    aria-valuemax={maxSerie}
                    aria-label={`${formatPeriodo(p.periodo)}: ${p.valor}`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal to-orange transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Distribuição */}
        {data.distribuicao && data.distribuicao.length > 0 && (
          <div className="mt-12 rounded-2xl border border-line bg-card p-8 shadow-soft">
            <h2 className="text-xl font-extrabold text-navy">Distribuição</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Detalhamento por categoria.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {data.distribuicao.map((d) => (
                <li
                  key={d.categoria}
                  className="flex items-center justify-between rounded-xl border border-line bg-soft p-4"
                >
                  <span className="font-semibold text-navy">{d.categoria}</span>
                  <span className="text-lg font-extrabold text-navy">
                    {d.valor.toLocaleString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nota metodológica */}
        <div className="mt-12 flex items-start gap-3 rounded-2xl border border-line bg-soft p-6 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
          <p className="text-muted-foreground">
            Os dados apresentados são agregados e não identificam indivíduos,
            em conformidade com a LGPD. Atualização segue o calendário descrito na
            metodologia. Para dados detalhados, entre em contato pelo e-mail{" "}
            <a
              href="mailto:dados@ceurs.org.br"
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              dados@ceurs.org.br
            </a>
            .
          </p>
        </div>
      </section>
    </SiteShell>
  );
}

function IndicadorNotFound() {
  return (
    <SiteShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-teal">Indicador não encontrado</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Este indicador não existe
          </h1>
          <p className="mt-4 text-muted-foreground">
            O indicador que você procura pode ter sido removido ou o endereço está
            incorreto.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link to="/estatisticas">Ver todos os indicadores</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function IndicadorError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : "Erro ao carregar o indicador.";
  return (
    <SiteShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div role="alert" aria-live="assertive" className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-orange">Algo saiu do previsto</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Não foi possível carregar o indicador
          </h1>
          <p className="mt-4 text-muted-foreground">{message}</p>
          <div className="mt-8">
            <Button asChild>
              <Link to="/estatisticas">Voltar para Estatísticas</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}