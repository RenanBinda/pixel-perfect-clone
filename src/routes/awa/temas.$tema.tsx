import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  MessageCircle,
  Plus,
  Users,
} from "lucide-react";
import { AwaShell } from "@/components/awa/AwaShell";
import { DiscussaoItem } from "@/components/awa/DiscussaoItem";
import { TemaBadge } from "@/components/smis/TemaBadge";
import { Button } from "@/components/ui/button";
import {
  PAPEL_COMUNIDADE_COR,
  PAPEL_COMUNIDADE_LABEL,
  formatarDataCurta,
  getComunidadePorSlug,
} from "@/lib/awa";

export const Route = createFileRoute("/awa/temas/$tema")({
  head: ({ params }) => {
    const comunidade = getComunidadePorSlug(params.tema);
    return {
      meta: [
        { title: `${comunidade?.nome ?? "Comunidade"} · AWA2030` },
        {
          name: "description",
          content:
            comunidade?.descricao ?? "Comunidade temática do AWA2030.",
        },
        { property: "og:title", content: comunidade?.nome ?? "AWA2030" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ComunidadePage,
  notFoundComponent: ComunidadeNotFound,
});

function ComunidadePage() {
  const { tema } = Route.useParams();
  const comunidade = getComunidadePorSlug(tema);

  if (!comunidade) throw notFound();

  return (
    <AwaShell
      backTo={{ to: "/awa/temas", label: "Voltar às comunidades" }}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Nova discussão
        </Button>
      }
    >
      <article>
        {/* Cabeçalho da comunidade */}
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <TemaBadge tema={comunidade.tema} size="md" />
            {comunidade.escola && (
              <span className="text-xs text-muted-foreground">
                {comunidade.escola}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
            {comunidade.nome}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {comunidade.descricao}
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" aria-hidden />
              <dt className="sr-only">Membros</dt>
              <dd>{comunidade.membros.length} membros</dd>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              <dt className="sr-only">Discussões</dt>
              <dd>{comunidade.discussoes.length} discussões</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              <dt className="sr-only">Criada em</dt>
              <dd>Criada em {formatarDataCurta(comunidade.criadaEm)}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Discussões */}
          <div>
            <h2 className="text-lg font-extrabold text-navy">
              Discussões recentes
            </h2>

            {comunidade.discussoes.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {comunidade.discussoes.map((d) => (
                  <DiscussaoItem key={d.id} discussao={d} />
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-line bg-card p-8 text-center">
                <MessageCircle
                  className="mx-auto h-8 w-8 text-muted-foreground"
                  aria-hidden
                />
                <p className="mt-3 font-bold text-navy">
                  Nenhuma discussão ainda
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Seja o primeiro a iniciar uma conversa.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: membros + iniciativas vinculadas */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-line bg-card p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
                Membros
              </h2>
              <ul className="mt-3 space-y-2">
                {comunidade.membros.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy"
                    >
                      {m.iniciais}
                    </span>
                    <span className="flex-1 truncate font-semibold text-navy">
                      {m.nome}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PAPEL_COMUNIDADE_COR[m.papel].bg} ${PAPEL_COMUNIDADE_COR[m.papel].text}`}
                    >
                      {PAPEL_COMUNIDADE_LABEL[m.papel]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {comunidade.iniciativasVinculadas.length > 0 && (
              <section className="rounded-2xl border border-line bg-card p-6">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  Iniciativas vinculadas
                </h2>
                <p className="mt-3 text-xs text-muted-foreground">
                  {comunidade.iniciativasVinculadas.length} iniciativa(s) do
                  SMIS referenciada(s) por esta comunidade.
                </p>
                <Link
                  to="/smis/iniciativas"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-teal"
                >
                  Ver no SMIS →
                </Link>
              </section>
            )}

            <div className="rounded-2xl bg-navy p-6 text-secondary-foreground">
              <p className="eyebrow text-amber">Sobre a comunidade</p>
              <p className="mt-3 text-sm text-sky">
                Coordenada por {comunidade.coordenador.nome}.
              </p>
              <Link
                to="/awa/temas"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber underline-offset-4 hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                Ver outras comunidades
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </AwaShell>
  );
}

function ComunidadeNotFound() {
  return (
    <AwaShell>
      <div className="rounded-2xl border border-dashed border-line bg-card p-12 text-center">
        <p className="text-lg font-bold text-navy">
          Comunidade não encontrada
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          O endereço pode estar incorreto ou a comunidade foi removida.
        </p>
        <Button asChild className="mt-6">
          <Link to="/awa/temas">Ver todas as comunidades</Link>
        </Button>
      </div>
    </AwaShell>
  );
}