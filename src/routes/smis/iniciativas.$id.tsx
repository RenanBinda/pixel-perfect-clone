import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  School,
  User,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { TemaBadge } from "@/components/smis/TemaBadge";
import { Button } from "@/components/ui/button";
import { fetchIniciativaById, formatDate } from "@/lib/smis";
import { useUsuario } from "@/lib/auth-store";
import { nivelAcesso, PERMISSOES } from "@/lib/acesso-iniciativa";

export const Route = createFileRoute("/smis/iniciativas/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Iniciativa · CEURS–Escolas` },
      {
        name: "description",
        content: "Conheça uma iniciativa de sustentabilidade de escola brasileira.",
      },
      { property: "og:title", content: "Iniciativa · CEURS–Escolas" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IniciativaPublicaPage,
  notFoundComponent: IniciativaNotFound,
});

function IniciativaPublicaPage() {
  const { id } = Route.useParams();
  const usuario = useUsuario();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["iniciativa-publica", id],
    queryFn: () => fetchIniciativaById(id),
  });

  if (isLoading) {
    return (
      <SiteShell>
        <div className="container-page py-20 text-center">
          <p className="text-sm text-muted-foreground">Carregando iniciativa...</p>
        </div>
      </SiteShell>
    );
  }

  if (isError || !data) {
    throw notFound();
  }

  return (
    <SiteShell>
      <article className="container-page max-w-3xl py-12 md:py-20">
        {/* Voltar */}
        <Link
          to="/iniciativas"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para o mapa de iniciativas
        </Link>

        {/* Capa */}
        {data.imagemCapa && (
          <div className="mb-8 overflow-hidden rounded-2xl shadow-card">
            <img
              src={data.imagemCapa}
              alt={`Imagem da iniciativa: ${data.titulo}`}
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Cabeçalho */}
        <header>
          <div className="flex flex-wrap items-center gap-2">
            <TemaBadge tema={data.tema} size="md" />
            {data.status === "publicada" && (
              <span className="rounded-full bg-teal/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal-900">
                Publicada
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy md:text-4xl">
            {data.titulo}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">{data.resumo}</p>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <School className="h-4 w-4" aria-hidden />
              <dt className="sr-only">Escola</dt>
              <dd>{data.escola}</dd>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden />
              <dt className="sr-only">Autor</dt>
              <dd>{data.autor}</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden />
              <dt className="sr-only">Local</dt>
              <dd>{data.where}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden />
              <dt className="sr-only">Atualizado em</dt>
              <dd>{formatDate(data.dataAtualizacao)}</dd>
            </div>
          </dl>
        </header>

        <hr className="my-10 border-line" />

        {/* Narrativa (não 5W2H explícito) */}
        <section className="space-y-5 text-[16px] leading-relaxed text-ink">
          <p className="text-lg font-semibold text-navy">{data.what}</p>
          <p>{data.why}</p>
          <p>{data.how}</p>
          <p>
            A iniciativa envolve {data.who.toLowerCase()} O trabalho acontece
            em {data.where.toLowerCase()} {data.when.toLowerCase()}
          </p>
          {PERMISSOES[nivelAcesso(usuario, data)].verOrcamento && data.howMuch && (
            <p className="text-sm text-muted-foreground">{data.howMuch}</p>
          )}
          <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            {{
              lider: "Você é líder desta iniciativa: pode editar e anexar evidências.",
              comunidade: "Você faz parte da comunidade escolar: pode acompanhar e participar, sem editar os dados.",
              publico: "Você está vendo a versão pública. Entre para participar da comunidade.",
            }[nivelAcesso(usuario, data)]}
          </p>
        </section>

        {/* ODS */}
        {data.ods && data.ods.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-extrabold text-navy">
              ODS relacionados
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.ods.map((n) => (
                <li
                  key={n}
                  className="rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-navy"
                >
                  ODS {n}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-extrabold text-navy">Tags</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-muted-foreground"
                >
                  #{t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA final */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy p-6 text-secondary-foreground md:p-8">
          <div>
            <p className="text-sm font-bold">
              Quer ver sua escola neste mapa?
            </p>
            <p className="mt-1 text-xs text-sky">
              Registre sua primeira iniciativa pelo SMIS-Escolas.
            </p>
          </div>
          <Button asChild>
            <Link to="/curso/trilhas" className="inline-flex items-center gap-2">
              Começar pelo curso
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </article>
    </SiteShell>
  );
}

function IniciativaNotFound() {
  return (
    <SiteShell>
      <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-teal">Iniciativa não encontrada</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy">
            Esta iniciativa não existe
          </h1>
          <p className="mt-4 text-muted-foreground">
            O endereço pode estar incorreto ou a iniciativa foi removida.
          </p>
          <Button asChild className="mt-8">
            <Link to="/iniciativas">Voltar ao mapa de iniciativas</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}