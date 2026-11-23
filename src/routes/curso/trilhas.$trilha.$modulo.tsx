import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  FileText,
  ListChecks,
  Play,
} from "lucide-react";
import { CursoShell } from "@/components/curso/CursoShell";
import { ProgressBar } from "@/components/curso/ProgressBar";
import { Button } from "@/components/ui/button";
import {
  calcularProgresso,
  formatDuracao,
  getModuloPorId,
  getProgresso,
  getTrilhaPorSlug,
  marcarModuloConcluido,
} from "@/lib/curso";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/curso/trilhas/$trilha/$modulo")({
  head: ({ params }) => {
    const trilha = getTrilhaPorSlug(params.trilha);
    const modulo = trilha ? getModuloPorId(trilha, params.modulo) : undefined;
    return {
      meta: [
        {
          title: `${modulo?.titulo ?? "Módulo"} · ${trilha?.titulo ?? "Curso"} · CEURS–Escolas`,
        },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
  component: ModuloPage,
  notFoundComponent: ModuloNotFound,
});

function ModuloPage() {
  const navigate = useNavigate();
  const { trilha: slug, modulo: moduloId } = Route.useParams();
  const trilha = getTrilhaPorSlug(slug);

  if (!trilha) throw notFound();

  const modulo = getModuloPorId(trilha, moduloId);
  if (!modulo) throw notFound();

  const [progresso, setProgresso] = useState(() => getProgresso(trilha.slug));
  const [resposta, setResposta] = useState("");

  const idxAtual = trilha.modulos.findIndex((m) => m.id === modulo.id);
  const proximoModulo = trilha.modulos[idxAtual + 1];
  const anteriorModulo = trilha.modulos[idxAtual - 1];
  const totalModulos = trilha.modulos.length;
  const jaConcluido = progresso.modulosConcluidos.includes(modulo.id);

  function concluir() {
    const novo = marcarModuloConcluido(trilha!.slug, modulo!.id, totalModulos);
    setProgresso(novo);

    if (proximoModulo) {
      navigate({
        to: "/curso/trilhas/$trilha/$modulo",
        params: { trilha: trilha!.slug, modulo: proximoModulo.id },
      });
    } else {
      navigate({
        to: "/curso/trilhas/$trilha",
        params: { trilha: trilha!.slug },
      });
    }
  }

  const progressoCalculado = calcularProgresso(trilha);

  const IconeTipo = {
    video: Play,
    texto: FileText,
    atividade: ListChecks,
    quiz: ListChecks,
  }[modulo.tipo];

  return (
    <CursoShell>
      <section className="container-page py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/curso/trilhas/$trilha"
            params={{ trilha: trilha.slug }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para {trilha.titulo}
          </Link>

          <ProgressBar
            percentual={progressoCalculado.percentual}
            concluido={progressoCalculado.concluido}
            label={`Módulo ${modulo.numero} de ${totalModulos}`}
          />

          <header className="mt-8">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-teal">
              <IconeTipo className="h-3.5 w-3.5" aria-hidden />
              {modulo.tipo}
              <span aria-hidden className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                <Clock className="mr-1 inline h-3 w-3" aria-hidden />
                {formatDuracao(modulo.duracao)}
              </span>
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              {modulo.titulo}
            </h1>
          </header>

          <div className="mt-8 prose-ish rounded-2xl border border-line bg-card p-6 md:p-8">
            <p className="whitespace-pre-line text-base leading-relaxed text-ink">
              {modulo.conteudo}
            </p>

            {/* Atividade: registrar iniciativa */}
            {modulo.atividade?.tipo === "registrar_iniciativa" && (
              <div className="mt-6 rounded-xl bg-navy p-6 text-secondary-foreground">
                <p className="eyebrow text-amber">Atividade prática</p>
                <h2 className="mt-2 text-xl font-extrabold">
                  Registre sua iniciativa no SMIS
                </h2>
                <p className="mt-2 text-sm text-sky">
                  Você será levado ao formulário do SMIS-Escolas. Pode salvar
                  como rascunho e completar depois.
                </p>
                <Button asChild className="mt-4">
                  <Link
                    to="/smis/iniciativas/nova"
                    search={{ contexto: "curso" }}
                  >
                    Abrir SMIS e registrar
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            )}

            {/* Atividade: reflexão */}
            {modulo.atividade?.tipo === "reflexao" && (
              <div className="mt-6">
                <label
                  htmlFor="reflexao"
                  className="block text-sm font-bold text-navy"
                >
                  {modulo.atividade.prompt}
                </label>
                <textarea
                  id="reflexao"
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                  rows={6}
                  className="mt-2 w-full rounded-lg border border-line bg-soft p-3 text-sm text-ink focus-visible:outline-none"
                  placeholder="Escreva sua reflexão aqui..."
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Sua reflexão fica salva apenas neste navegador.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            {anteriorModulo ? (
              <Button asChild variant="outline">
                <Link
                  to="/curso/trilhas/$trilha/$modulo"
                  params={{ trilha: trilha.slug, modulo: anteriorModulo.id }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                  Anterior
                </Link>
              </Button>
            ) : (
              <div />
            )}

            <Button onClick={concluir} size="lg">
              {jaConcluido ? "Continuar" : "Concluir módulo"}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </div>

          {jaConcluido && (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              Você já concluiu este módulo
            </p>
          )}

          {progressoCalculado.concluido && (
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-amber/20 via-teal/10 to-orange/10 p-8 text-center">
              <Award className="mx-auto h-10 w-10 text-amber-600" aria-hidden />
              <h2 className="mt-4 text-2xl font-extrabold text-navy">
                Parabéns! Você concluiu a trilha.
              </h2>
              <p className="mt-2 text-muted-foreground">
                Seu certificado está disponível na página da trilha.
              </p>
              <Button asChild className="mt-4">
                <Link
                  to="/curso/trilhas/$trilha"
                  params={{ trilha: trilha.slug }}
                >
                  Ver certificado
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </CursoShell>
  );
}

function ModuloNotFound() {
  return (
    <CursoShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-teal">Módulo não encontrado</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">
            Este módulo não existe
          </h1>
          <Button asChild className="mt-8">
            <Link to="/curso/trilhas">Ver trilhas</Link>
          </Button>
        </div>
      </div>
    </CursoShell>
  );
}