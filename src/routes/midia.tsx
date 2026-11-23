import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  FileText,
  Loader2,
  Newspaper,
  Video,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { fetchMedia } from "@/lib/api";
import type { MediaItem, MediaTipo } from "@/lib/types";

export const Route = createFileRoute("/midia")({
  head: () => ({
    meta: [
      { title: "Mídia · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Notícias, materiais institucionais e cobertura do programa CEURS–Escolas.",
      },
      { property: "og:title", content: "Mídia · CEURS–Escolas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MidiaPage,
});

/* Mapeamento tipo → ícone */
const iconByTipo: Record<MediaTipo, typeof Newspaper> = {
  Notícia: Newspaper,
  Vídeo: Video,
  Documento: FileText,
  Podcast: FileText,
};

/** Formata ISO 8601 (YYYY-MM-DD) em pt-BR. */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function MidiaPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["media"],
    queryFn: ({ signal }) => fetchMedia({ signal }),
  });

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
          <p className="eyebrow text-teal">Comunicação institucional</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Mídia e materiais
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Notícias, vídeos e documentos oficiais do programa CEURS–Escolas.
          </p>
        </header>

        {/* Estados de carregamento e erro */}
        {isLoading && <MidiaSkeleton />}

        {isError && (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-12 rounded-2xl border border-line bg-card p-8 text-center"
          >
            <p className="text-lg font-bold text-navy">
              Não foi possível carregar os conteúdos
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Tente novamente em alguns instantes."}
            </p>
            <Button onClick={() => refetch()} className="mt-6">
              Tentar novamente
            </Button>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
            <p className="text-lg font-bold text-navy">
              Nenhum conteúdo publicado ainda
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Volte em breve para conferir as novidades do programa.
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => {
              const Icon = iconByTipo[item.tipo];
              return (
                <li key={item.slug}>
                  <Link
                    to="/midia/$slug"
                    params={{ slug: item.slug }}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card focus-visible:-translate-y-1 focus-visible:border-teal"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
                        <Icon className="h-3.5 w-3.5 text-orange" aria-hidden />
                        {item.tipo}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                        aria-hidden
                      />
                    </div>

                    <h2 className="mt-4 text-lg font-bold leading-snug text-navy">
                      {item.titulo}
                    </h2>

                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {item.resumo}
                    </p>

                    <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />
                      {formatDate(item.data)}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Bloco de imprensa */}
        <div className="mt-16 rounded-2xl border border-line bg-navy p-8 text-secondary-foreground md:p-12">
          <p className="eyebrow text-amber">Imprensa</p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
            Precisa de materiais ou entrevistas?
          </h2>
          <p className="mt-3 max-w-lg text-sky">
            Nossa equipe de comunicação pode fornecer logos, fotos, dados e
            contatos institucionais para veículos de imprensa.
          </p>
          <a
            href="mailto:imprensa@ceurs.org.br"
            className="mt-6 inline-flex items-center gap-2 font-bold text-amber underline-offset-4 hover:underline"
          >
            imprensa@ceurs.org.br
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>
    </SiteShell>
  );
}

/* ============================================================
   SKELETON
   ============================================================ */

function MidiaSkeleton() {
  return (
    <ul
      aria-busy="true"
      aria-label="Carregando conteúdos"
      className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="flex h-full flex-col rounded-2xl border border-line bg-card p-6"
        >
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 animate-pulse rounded-full bg-soft" />
            <div className="h-4 w-4 animate-pulse rounded bg-soft" />
          </div>
          <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-soft" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-soft" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-soft" />
          <div className="mt-6 h-3 w-24 animate-pulse rounded bg-soft" />
        </li>
      ))}
      <li className="sr-only">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      </li>
    </ul>
  );
}