import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Globe2,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { COMUNIDADES } from "@/lib/awa";

export const Route = createFileRoute("/awa")({
  head: () => ({
    meta: [
      { title: "AWA2030 · Comunidade de Prática · CEURS–Escolas" },
      {
        name: "description",
        content:
          "AWA2030 é a CoP-ABC aplicada ao CEURS–Escolas: comunidades temáticas, biblioteca compartilhada e trocas entre escolas brasileiras.",
      },
      { property: "og:title", content: "AWA2030 · CEURS–Escolas" },
      {
        property: "og:description",
        content: "Comunidade de prática, biblioteca e trocas entre escolas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AwaPage,
});

const pilares = [
  {
    icon: MessageCircle,
    titulo: "Comunidades temáticas",
    desc: "Grupos organizados por interesse: hortas, resíduos, água, energia, mobilidade e biodiversidade.",
  },
  {
    icon: Users,
    titulo: "Papéis na comunidade",
    desc: "Cada comunidade tem coordenador, editores e membros com papéis claros e moderação.",
  },
  {
    icon: BookOpen,
    titulo: "Biblioteca compartilhada",
    desc: "Guias, vídeos e materiais produzidos pelas escolas e pela equipe CEURS.",
  },
  {
    icon: Globe2,
    titulo: "Continuidade após os cursos",
    desc: "A comunidade permanece ativa depois do CCA2030, conectando escolas e parceiros.",
  },
] as const;

const comunidadesDestaque = COMUNIDADES.slice(0, 3);

function AwaPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-secondary-foreground md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,139,18,0.15),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(24,185,176,0.12),transparent_50%)]"
        />

        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-teal">
              <span aria-hidden className="h-2 w-2 rounded-full bg-orange" />
              CoP-ABC · Instância AWA2030
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              A comunidade de prática do CEURS–Escolas
            </h1>
            <p className="mt-5 max-w-xl text-lg text-sky">
              O AWA2030 é a instância da CoP-ABC aplicada ao contexto escolar:
              comunidades temáticas, biblioteca compartilhada e trocas contínuas
              entre escolas, equipes e parceiros.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/awa/temas" className="inline-flex items-center gap-2">
                  Explorar comunidades
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
              >
                <Link to="/awa/biblioteca">Ver biblioteca</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/5 p-8 backdrop-blur-md">
            <p className="eyebrow text-amber">O que é o AWA2030</p>
            <p className="mt-4 text-sm leading-relaxed text-sky">
              O AWA2030 materializa a CoP-ABC (Comunidade de Prática). No
              CEURS–Escolas, ele conecta educadores e gestores em comunidades
              temáticas, sustenta a continuidade após os cursos e conecta cada
              iniciativa registrada no SMIS à comunidade mais adequada.
            </p>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <Section
        id="pilares"
        eyebrow="Como funciona"
        title="Quatro pilares da comunidade"
        align="center"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.titulo}
                className="rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Comunidades em destaque */}
      <Section
        id="destaque"
        eyebrow="Comunidades ativas"
        title="Algumas comunidades em destaque"
        tone="card"
        align="center"
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {comunidadesDestaque.map((c) => (
            <li
              key={c.id}
              className="rounded-2xl border border-line bg-soft p-6 shadow-soft"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal">
                {c.tema}
              </p>
              <h3 className="mt-2 text-lg font-bold text-navy">{c.nome}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {c.descricao}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {c.membros.length} membros · {c.discussoes.length} discussões
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link to="/awa/temas" className="inline-flex items-center gap-2">
              Ver todas as comunidades
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA final */}
      <section className="bg-navy py-20 text-secondary-foreground md:py-24">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="eyebrow text-amber">Participe</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Conecte-se a outras escolas e transforme juntos
          </h2>
          <p className="mt-5 text-lg text-sky">
            A comunidade está aberta para educadores, gestores e parceiros do
            programa. Crie sua conta e participe.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/awa/temas" className="inline-flex items-center gap-2">
                Explorar comunidades
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button              asChild
              size="lg"
              variant="outline"
              className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
            >
              <Link to="/solicitar-acesso">Solicitar acesso</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}