import { useSessaoCta } from "@/hooks/use-sessao-cta";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MessageCircle,
  Users,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/comunidade")({
  head: () => ({
    meta: [
      { title: "Comunidade · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Conheça a comunidade de prática do CEURS–Escolas: redes, encontros, temas e projetos colaborativos entre escolas.",
      },
      { property: "og:title", content: "Comunidade · CEURS–Escolas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ComunidadePage,
});

const temas = [
  {
    titulo: "Água",
    desc: "Uso consciente, captação de chuva, qualidade hídrica.",
    count: 12,
  },
  {
    titulo: "Resíduos",
    desc: "Compostagem, reciclagem, redução de plásticos.",
    count: 18,
  },
  {
    titulo: "Energia",
    desc: "Fontes renováveis, eficiência energética.",
    count: 9,
  },
  {
    titulo: "Alimentação",
    desc: "Hortas escolares, alimentação saudável, agroecologia.",
    count: 24,
  },
  {
    titulo: "Mobilidade",
    desc: "Caminhos seguros, transporte sustentável.",
    count: 7,
  },
  {
    titulo: "Biodiversidade",
    desc: "Reflorestamento, jardins, fauna local.",
    count: 11,
  },
] as const;

const encontros = [
  {
    data: "2026-11-08",
    titulo: "Encontro nacional de Agentes Locais",
    local: "Florianópolis · SC",
    tipo: "Presencial",
  },
  {
    data: "2026-11-22",
    titulo: "Roda de conversa: hortas escolares",
    local: "Online",
    tipo: "Remoto",
  },
  {
    data: "2026-12-06",
    titulo: "Oficina de compostagem comunitária",
    local: "São Paulo · SP",
    tipo: "Presencial",
  },
] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ComunidadePage() {
  const cta = useSessaoCta();
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

        <header className="max-w-3xl">
          <p className="eyebrow text-teal">Comunidade de prática</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
            Educadores que transformam juntos
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Um espaço permanente de encontro, troca e coprodução entre escolas,
            educadores e parceiros do programa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link
                to={cta.logado ? "/awa" : "/solicitar-acesso"}
                className="inline-flex items-center gap-2"
              >
                {cta.logado ? "Ir para a comunidade" : "Participar da comunidade"}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/awa">Conhecer o AWA2030</Link>
            </Button>
          </div>
        </header>
      </section>

      {/* Temas */}
      <Section
        id="temas"
        eyebrow="Comunidades temáticas"
        title="Escolha um tema para se aprofundar"
        align="center"
        tone="card"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {temas.map((t) => (
            <li key={t.titulo}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-soft p-6 transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card">
                <div className="flex items-center justify-between">
                  <MessageCircle
                    className="h-5 w-5 text-teal"
                    aria-hidden
                  />
                  <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal">
                    {t.count} membros
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{t.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {t.desc}
                </p>
                <Link
                  to={cta.logado ? "/awa" : "/login"}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-teal"
                >
                  Entrar na comunidade →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Encontros */}
      <Section
        id="encontros"
        eyebrow="Agenda"
        title="Próximos encontros"
        lead="Atividades abertas à comunidade de prática do CEURS–Escolas."
        align="center"
      >
        <ul className="mx-auto max-w-3xl space-y-4">
          {encontros.map((e) => (
            <li
              key={e.titulo}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6 shadow-soft transition-colors hover:border-teal sm:flex-row sm:items-center"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-secondary-foreground">
                <span className="text-[10px] font-bold uppercase">
                  {new Date(e.data).toLocaleDateString("pt-BR", {
                    month: "short",
                  })}
                </span>
                <span className="text-xl font-extrabold leading-none">
                  {new Date(e.data).getDate()}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-teal">
                  {e.tipo}
                </p>
                <h3 className="mt-1 text-lg font-bold text-navy">{e.titulo}</h3>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  {formatDate(e.data)} · {e.local}
                </p>
              </div>

              <Button asChild size="sm" variant="outline">
                <Link to={cta.logado ? "/conta" : "/login"}>Inscrever-se</Link>
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      {/* Números */}
      <Section
        id="numeros"
        eyebrow="Em números"
        title="Uma rede em crescimento"
        align="center"
        tone="navy"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "200+", label: "Escolas participantes" },
            { value: "1.240", label: "Educadores na rede" },
            { value: "72", label: "Municípios" },
            { value: "860", label: "Iniciativas mapeadas" },
          ].map((s) => (
            <li
              key={s.label}
              className="rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/5 p-6 text-center"
            >
              <Users className="mx-auto h-6 w-6 text-teal" aria-hidden />
              <p className="mt-4 text-4xl font-extrabold tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-sky">{s.label}</p>
            </li>
          ))}
        </ul>
      </Section>
    </SiteShell>
  );
}