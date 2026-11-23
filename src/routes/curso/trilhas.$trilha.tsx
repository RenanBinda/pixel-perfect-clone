import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
import { CursoShell } from "@/components/curso/CursoShell";
import { ModuloItem } from "@/components/curso/ModuloItem";
import { ProgressBar } from "@/components/curso/ProgressBar";
import { Button } from "@/components/ui/button";
import {
  calcularProgresso,
  formatDuracao,
  getProgresso,
  getTrilhaPorSlug,
} from "@/lib/curso";

export const Route = createFileRoute("/curso/trilhas/$trilha")({
  head: ({ params }) => {
    const trilha = getTrilhaPorSlug(params.trilha);
    return {
      meta: [
        { title: `${trilha?.titulo ?? "Trilha"} · Curso · CEURS–Escolas` },
        {
          name: "description",
          content: trilha?.descricao ?? "Trilha de formação do CEURS–Escolas.",
        },
        { property: "og:title", content: trilha?.titulo ?? "Trilha" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: TrilhaPage,
  notFoundComponent: TrilhaNotFound,
});

function TrilhaPage() {
  const { trilha: slug } = Route.useParams();
  const trilha = getTrilhaPorSlug(slug);

  if (!trilha) throw notFound();

  const progresso = calcularProgresso(trilha);
  const progressoDetalhado = getProgresso(trilha.slug);
  const proximoModulo = trilha.modulos.find(
    (m) => !progressoDetalhado.modulosConcluidos.includes(m.id),
  );

  return (
    <CursoShell>
      <section className="container-page py-12 md:py-20">
        <Link
          to="/curso/trilhas"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar às trilhas
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <header>
              <p className="eyebrow text-teal">Trilha</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
                {trilha.titulo}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {trilha.descricao}
              </p>
            </header>

            <dl className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-soft">
                <Clock className="h-4 w-4 text-teal" aria-hidden />
                <dd className="font-semibold text-navy">
                  {formatDuracao(trilha.cargaHoraria * 60)}
                </dd>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-soft">
                <Users className="h-4 w-4 text-teal" aria-hidden />
                <dd className="font-semibold text-navy">{trilha.publico}</dd>
              </div>
              {trilha.certificado && (
                <div className="flex items-center gap-2 rounded-lg bg-amber/15 px-3 py-2">
                  <Award className="h-4 w-4 text-amber-700" aria-hidden />
                  <dd className="font-semibold text-amber-800">
                    Com certificado
                  </dd>
                </div>
              )}
            </dl>

            <section className="mt-12">
              <h2 className="text-lg font-extrabold text-navy">
                Módulos da trilha
              </h2>
              <ol className="mt-4 space-y-3">
                {trilha.modulos.map((modulo) => (
                  <ModuloItem
                    key={modulo.id}
                    trilhaSlug={trilha.slug}
                    modulo={modulo}
                    concluido={progressoDetalhado.modulosConcluidos.includes(
                      modulo.id,
                    )}
                  />
                ))}
              </ol>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-soft">
              <p className="eyebrow text-teal">Seu progresso</p>
              <div className="mt-4">
                <ProgressBar
                  percentual={progresso.percentual}
                  concluido={progresso.concluido}
                  label={`${progresso.concluidos} de ${progresso.total} módulos`}
                />
              </div>

              {progresso.concluido ? (
                <Button asChild className="mt-6 w-full">
                  <Link
                    to="/curso/trilhas/$trilha/$modulo"
                    params={{
                      trilha: trilha.slug,
                      modulo: trilha.modulos[0]?.id ?? "",
                    }}
                  >
                    Ver certificado
                  </Link>
                </Button>
              ) : proximoModulo ? (
                <Button asChild className="mt-6 w-full">
                  <Link
                    to="/curso/trilhas/$trilha/$modulo"
                    params={{
                      trilha: trilha.slug,
                      modulo: proximoModulo.id,
                    }}
                  >
                    {progresso.concluidos === 0 ? "Começar" : "Continuar"} o
                    curso
                  </Link>
                </Button>
              ) : null}

              {progresso.concluido && (
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-teal">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  Trilha concluída
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </CursoShell>
  );
}

function TrilhaNotFound() {
  return (
    <CursoShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-teal">Trilha não encontrada</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">
            Esta trilha não existe
          </h1>
          <p className="mt-4 text-muted-foreground">
            O endereço pode estar incorreto ou a trilha foi removida.
          </p>
          <Button asChild className="mt-8">
            <Link to="/curso/trilhas">Ver todas as trilhas</Link>
          </Button>
        </div>
      </div>
    </CursoShell>
  );
}