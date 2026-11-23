import { useSessaoCta } from "@/hooks/use-sessao-cta";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Compass,
  Globe2,
  GraduationCap,
  Landmark,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Section } from "@/components/shared/Section";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o programa · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Conheça o CEURS–Escolas: história, missão, metodologia e equipe por trás do programa de formação de Agentes Locais de Sustentabilidade.",
      },
      { property: "og:title", content: "Sobre o programa · CEURS–Escolas" },
      {
        property: "og:description",
        content:
          "Uma iniciativa de capacitação e estudos urbanos e regionais para sustentabilidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const pillars = [
  {
    icon: Compass,
    title: "Território",
    desc: "Reconhecer o ecossistema da escola e suas conexões com o entorno — atores, recursos e potencialidades.",
  },
  {
    icon: Users,
    title: "Comunidade",
    desc: "Mobilizar educadores, estudantes, famílias e parceiros locais em torno de objetivos comuns.",
  },
  {
    icon: Lightbulb,
    title: "Práticas",
    desc: "Mapear, classificar e compartilhar iniciativas de sustentabilidade com estrutura 5W2H.",
  },
  {
    icon: Globe2,
    title: "Impacto",
    desc: "Conectar ações locais aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU.",
  },
] as const;

const partners = [
  {
    icon: GraduationCap,
    name: "UFSC",
    role: "Coordenação científica",
    desc: "Universidade Federal de Santa Catarina",
  },
  {
    icon: Building2,
    name: "MCTI",
    role: "Financiamento e política pública",
    desc: "Ministério da Ciência, Tecnologia e Inovação",
  },
  {
    icon: Landmark,
    name: "Parlamento",
    role: "Articulação institucional",
    desc: "Frente Parlamentar de Sustentabilidade",
  },
  {
    icon: Award,
    name: "USP",
    role: "Parceria acadêmica",
    desc: "Universidade de São Paulo",
  },
] as const;

const timeline = [
  {
    ano: "2024",
    titulo: "Concepção do programa",
    desc: "Primeiras discussões sobre a arquitetura ABC e o domínio escolar como agente de sustentabilidade.",
  },
  {
    ano: "2025",
    titulo: "Piloto e validação",
    desc: "Teste com escolas parceiras, ajuste da metodologia 5W2H e validação da taxonomia de iniciativas.",
  },
  {
    ano: "2026",
    titulo: "Lançamento oficial",
    desc: "Primeira turma de 200 educadores e início da operação dos quatro módulos integrados.",
  },
  {
    ano: "2027",
    titulo: "Expansão nacional",
    desc: "Meta de 1.000 escolas participantes e integração com redes estaduais de ensino.",
  },
] as const;

function SobrePage() {
  const cta = useSessaoCta();
  return (
    <SiteShell>
      {/* Hero */}
      <section className="container-page py-12 md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar à página inicial
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow text-teal">Sobre o programa</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl">
              Uma escola que transforma o território
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              O CEURS–Escolas é uma iniciativa de capacitação e estudos urbanos
              e regionais que prepara educadores e gestores escolares para
              atuarem como{" "}
              <strong className="font-bold text-navy">
                Agentes Locais de Sustentabilidade
              </strong>{" "}
              em seus territórios.
            </p>
            <p className="mt-4 text-muted-foreground">
              Nossa metodologia conecta aprendizagem, mapeamento de práticas,
              coprodução em rede e articulação com políticas públicas de
              sustentabilidade.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link
                  to={cta.logado ? cta.destino : "/solicitar-acesso"}
                  className="inline-flex items-center gap-2"
                >
                  {cta.logado ? cta.rotulo : "Inscrever-se no programa"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/" hash="modulos">Conhecer os módulos</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-card">
            <ImageWithFallback
              src="/assets/school-territory.jpg"
              alt="Vista aérea de território escolar e comunidade"
              aspect="aspect-[4/3]"
              fallbackLabel="Território escolar"
            />
          </div>
        </div>
      </section>

      {/* Missão */}
      <Section
        id="missao"
        eyebrow="Nossa missão"
        title="Por que fazemos isso"
        align="center"
        tone="card"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-lg leading-relaxed text-muted-foreground">
            Acreditamos que a escola é o ponto de partida para transformações
            sustentáveis nos territórios. Ao capacitar educadores e gestores,
            criamos uma rede capaz de reconhecer problemas locais, mapear
            soluções e mobilizar a comunidade em coprodução.
          </p>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-line bg-soft p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-bold text-navy">Meta 2027</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Alcançar 1.000 escolas participantes em todo o Brasil,
                consolidando uma rede nacional de Agentes Locais de
                Sustentabilidade.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pilares */}
      <Section
        id="pilares"
        eyebrow="Metodologia"
        title="Nossos quatro pilares"
        lead="Um caminho estruturado que conecta reconhecimento, mobilização, prática e impacto."
        align="center"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                className="rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Linha do tempo */}
      <Section
        id="historia"
        eyebrow="História"
        title="Como chegamos até aqui"
        align="center"
        tone="card"
      >
        <ol className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-teal via-orange to-amber md:left-1/2"
          />
          {timeline.map((t, i) => (
            <li
              key={t.ano}
              className={`relative flex gap-6 pb-10 last:pb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-orange bg-card text-xs font-extrabold text-navy md:absolute md:left-1/2 md:-translate-x-1/2">
                {t.ano.slice(-2)}
              </div>
              <div
                className={`flex-1 rounded-2xl border border-line bg-soft p-5 md:w-[calc(50%-2rem)] md:flex-none ${
                  i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <p className="eyebrow text-teal">{t.ano}</p>
                <h3 className="mt-2 text-lg font-bold text-navy">{t.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Parceiros */}
      <Section
        id="parceiros"
        eyebrow="Realização"
        title="Instituições parceiras"
        lead="Um programa construído com apoio de instituições públicas e acadêmicas."
        align="center"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.name}
                className="flex flex-col items-start rounded-2xl border border-line bg-card p-6 shadow-soft"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="mt-5 text-2xl font-extrabold text-navy">
                  {p.name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-teal">
                  {p.role}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* CTA final */}
      <section className="bg-navy py-20 text-secondary-foreground md:py-24">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="eyebrow text-amber">Faça parte</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Transforme sua escola em um agente de mudança
          </h2>
          <p className="mt-5 text-lg text-sky">
            Solicite seu acesso e comece a construir uma rede de
            sustentabilidade no seu território.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link
                to={cta.logado ? cta.destino : "/solicitar-acesso"}
                className="inline-flex items-center gap-2"
              >
                {cta.logado ? cta.rotulo : "Solicitar acesso"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
            >
              <Link to="/" hash="modulos">Ver os módulos</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}