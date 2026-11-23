import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  FileText,
  Loader2,
  Newspaper,
  User,
  Video,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { fetchMediaBySlug, ApiException } from "@/lib/api";
import type { MediaTipo } from "@/lib/types";

export const Route = createFileRoute("/midia/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} · Mídia · CEURS–Escolas` },
      {
        name: "description",
        content: `Detalhe do conteúdo de mídia "${params.slug}" do CEURS–Escolas.`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MidiaDetalhePage,
  notFoundComponent: MidiaNotFound,
  errorComponent: MidiaError,
});

const iconByTipo: Record<MediaTipo, typeof Newspaper> = {
  Notícia: Newspaper,
  Vídeo: Video,
  Documento: FileText,
  Podcast: FileText,
};

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

function MidiaDetalhePage() {
  const { slug } = Route.useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["media", slug],
    queryFn: () => fetchMediaBySlug(slug),
  });

  if (isLoading) {
    return (
      <SiteShell>
        <div className="container-page flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Carregando conteúdo...
          </div>
        </div>
      </SiteShell>
    );
  }

  if (isError || !data) {
    const err = error as ApiException | undefined;
    if (err?.code === "MEDIA_NOT_FOUND") {
      // TanStack Router lança notFound para renderizar o notFoundComponent
      throw notFound();
    }
    return <MidiaError error={error} />;
  }

  const Icon = iconByTipo[data.tipo];

  return (
    <SiteShell>
      <article className="container-page max-w-3xl py-12 md:py-20">
        <Link
          to="/midia"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para Mídia
        </Link>

        <header>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
              <Icon className="h-3.5 w-3.5 text-orange" aria-hidden />
              {data.tipo}
            </span>
            {data.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl">
            {data.titulo}
          </h1>

          <p className="mt-5 text-lg text-muted-foreground">{data.resumo}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatDate(data.data)}
            </span>
            {data.autor && (
              <span className="flex items-center gap-2">
                <User className="h-3.5 w-3.5" aria-hidden />
                {data.autor}
              </span>
            )}
          </div>
        </header>

        <hr className="my-10 border-line" />

        {data.conteudo ? (
          <div className="whitespace-pre-line text-base leading-relaxed text-ink">
            {data.conteudo}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Conteúdo completo em breve.
          </p>
        )}

        {data.href && (
          <div className="mt-10">
            <Button asChild size="lg">
              <a
                href={data.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Acessar conteúdo externo <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        )}

        <div className="mt-16 rounded-2xl border border-line bg-soft p-6 text-sm">
          <p className="text-muted-foreground">
            Gostou deste conteúdo? Veja mais em{" "}
            <Link
              to="/midia"
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              Mídia e materiais
            </Link>
            .
          </p>
        </div>
      </article>
    </SiteShell>
  );
}

function MidiaNotFound() {
  return (
    <SiteShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-teal">Conteúdo não encontrado</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Este item de mídia não existe
          </h1>
          <p className="mt-4 text-muted-foreground">
            O conteúdo que você procura pode ter sido removido ou o endereço está incorreto.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link to="/midia">Ver todos os conteúdos</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function MidiaError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : "Erro ao carregar o conteúdo.";
  return (
    <SiteShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div role="alert" aria-live="assertive" className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-orange">Algo saiu do previsto</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Não foi possível carregar o conteúdo
          </h1>
          <p className="mt-4 text-muted-foreground">{message}</p>
          <div className="mt-8">
            <Button asChild>
              <Link to="/midia">Voltar para Mídia</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}