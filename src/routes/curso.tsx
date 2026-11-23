import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  ExternalLink,
  FileText,
  ListChecks,
  Play,
  Sparkles,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";

export const Route = createFileRoute("/curso")({
  head: () => ({
    meta: [
      { title: "CCA2030 · Curso Individual · CEURS–Escolas" },
      {
        name: "description",
        content:
          "CCA2030: curso de sensibilização de 10h do CEURS–Escolas, com e-Book, vídeos e atividades para educadores e gestores escolares.",
      },
      { property: "og:title", content: "CCA2030 · CEURS–Escolas" },
      {
        property: "og:description",
        content: "Curso de sensibilização de 10h com certificado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CursoPage,
});

const funcionalidades = [
  {
    icon: BookOpen,
    titulo: "e-Book do domínio ABC",
    desc: "Material de referência curado por especialistas, disponível para consulta offline.",
  },
  {
    icon: Play,
    titulo: "Vídeos e objetos de aprendizagem",
    desc: "Aulas curtas, estudos de caso e entrevistas com educadores da rede.",
  },
  {
    icon: ListChecks,
    titulo: "Atividades práticas",
    desc: "Exercícios que conectam o conteúdo à realidade da sua escola e do seu território.",
  },
  {
    icon: FileText,
    titulo: "SMIS como instrumento",
    desc: "Ao final, você terá registrado uma iniciativa de sustentabilidade no SMIS-Escolas.",
  },
  {
    icon: Sparkles,
    titulo: "Tutor IA-ABC",
    desc: "Assistente apoia a aprendizagem individual, sugerindo caminhos e tirando dúvidas.",
  },
  {
    icon: Award,
    titulo: "Certificado",
    desc: "Certificado de conclusão emitido pela UFSC, com carga horária de 10h.",
  },
] as const;

const passos = [
  {
    numero: "01",
    titulo: "Reconhecer",
    desc: "Conheça o domínio ABC e o papel da escola como agente local de sustentabilidade.",
  },
  {
    numero: "02",
    titulo: "Explorar",
    desc: "Identifique o ecossistema da sua escola: atores, território, práticas e potenciais.",
  },
  {
    numero: "03",
    titulo: "Registrar",
    desc: "Mapeie uma iniciativa no SMIS-Escolas e receba feedback da comunidade.",
  },
] as const;

function CursoPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-secondary-foreground md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(24,185,176,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,139,18,0.12),transparent_50%)]"
        />

        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-teal">
              <span aria-hidden className="h-2 w-2 rounded-full bg-orange" />
              Curso Individual · 10h
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              CCA2030
            </h1>
            <p className="mt-5 max-w-xl text-lg text-sky">
              Curso online de sensibilização no domínio ABC, com e-Book curado
              por especialistas, vídeos, atividades práticas e certificado. Ao
              final, você terá mapeado uma iniciativa da sua escola.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/curso/trilhas" className="inline-flex items-center gap-2">
                  Ver trilhas disponíveis
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
              >
                <a
                  href="https://ava.ceurs.stela.org.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Acessar o Moodle (AVA)
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>

            <p className="mt-6 text-xs text-sky/80">
              Acesso por convite · Progresso salvo no navegador · Certificado ao
              final
            </p>
          </div>

          {/* Card lateral */}
          <div className="rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/5 p-8 backdrop-blur-md">
            <p className="eyebrow text-amber">Sobre o curso</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-bold">Público-alvo</dt>
                <dd className="mt-0.5 text-sky">
                  Educadores, coordenadores, diretores e gestores escolares
                </dd>
              </div>
              <div>
                <dt className="font-bold">Carga horária</dt>
                <dd className="mt-0.5 text-sky">
                  10 horas · autoinstrucional
                </dd>
              </div>
              <div>
                <dt className="font-bold">Trilha</dt>
                <dd className="mt-0.5 text-sky">
                  CCA2030 (individual) e Equipes-ABC (expansão futura)
                </dd>
              </div>
              <div>
                <dt className="font-bold">Certificado</dt>
                <dd className="mt-0.5 text-sky">
                  Emitido pela UFSC ao concluir todos os módulos
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Descrição */}
      <Section
        id="sobre"
        eyebrow="O programa"
        title="O que é o CCA2030"
        align="center"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-lg leading-relaxed text-muted-foreground">
            O CCA2030 é a porta de entrada do CEURS–Escolas. Em 10 horas de
            formação, educadores e gestores escolares conhecem o domínio ABC,
            aprendem a reconhecer o ecossistema da escola e utilizam o
            SMIS-Escolas como instrumento pedagógico para registrar sua primeira
            iniciativa.
          </p>
        </div>
      </Section>

      {/* Funcionalidades */}
      <Section
        id="funcionalidades"
        eyebrow="O que você encontra"
        title="Funcionalidades do curso"
        tone="card"
        align="center"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {funcionalidades.map((f) => {
            const Icon = f.icon;
            return (
              <li
                key={f.titulo}
                className="rounded-2xl border border-line bg-soft p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {f.titulo}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Passos */}
      <Section
        id="jornada"
        eyebrow="Jornada de aprendizagem"
        title="Como funciona"
        align="center"
      >
        <ol className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-teal/40 via-orange/40 to-amber/40 md:block"
          />
          {passos.map((p) => (
            <li
              key={p.numero}
              className="relative rounded-2xl border border-line bg-card p-8 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal ring-4 ring-teal/20">
                  <BookOpen className="h-6 w-6" aria-hidden />
                </span>
                <span
                  aria-hidden
                  className="text-5xl font-extrabold leading-none tracking-tight text-line"
                >
                  {p.numero}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-navy">{p.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Integração com SMIS */}
      <section className="bg-card py-20 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-teal">Instrumento do curso</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              O SMIS-Escolas é usado dentro do curso
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No módulo de atividade, você é convidado a registrar sua primeira
              iniciativa de sustentabilidade no SMIS. É aprendendo a mapear que
              a escola se reconhece como agente local.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-soft p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">
                Registre no SMIS
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                O formulário guiado em 5W2H ajuda a estruturar a prática. Você
                pode salvar como rascunho e completar depois.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-soft p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy">
                Compartilhe na comunidade
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Depois de registrar, você pode publicar sua iniciativa na
                comunidade AWA2030 e inspirar outras escolas.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/curso/trilhas" className="inline-flex items-center gap-2">
                Começar pela trilha CCA2030
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/awa">Ir para a comunidade</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-navy py-20 text-secondary-foreground md:py-24">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="eyebrow text-amber">Pronto para começar?</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Transforme sua escola em um agente local de sustentabilidade
          </h2>
          <p className="mt-5 text-lg text-sky">
            Escolha uma trilha, avance no seu ritmo e ao final registre sua
            primeira iniciativa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/curso/trilhas" className="inline-flex items-center gap-2">
                Ver trilhas
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
            >
              <a
                href="https://ava.ceurs.stela.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Acessar o Moodle
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}