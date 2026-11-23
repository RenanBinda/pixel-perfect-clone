import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  LifeBuoy,
  Mail,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/ajuda")({
  head: () => ({
    meta: [
      { title: "Ajuda e suporte · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Central de ajuda do CEURS–Escolas: perguntas frequentes, tutoriais e contato com o suporte.",
      },
      { property: "og:title", content: "Ajuda e suporte · CEURS–Escolas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AjudaPage,
});

const categorias = [
  {
    icon: BookOpen,
    title: "Primeiros passos",
    desc: "Como criar conta, acessar e navegar na plataforma.",
    to: "#primeiros-passos",
  },
  {
    icon: Sparkles,
    title: "Módulos do programa",
    desc: "Como usar AWA, CCA2030, SMIS e CoP.",
    to: "#modulos",
  },
  {
    icon: MessageCircle,
    title: "Comunidade",
    desc: "Como participar das comunidades temáticas.",
    to: "#comunidade",
  },
  {
    icon: LifeBuoy,
    title: "Suporte técnico",
    desc: "Problemas de acesso, senha e erros.",
    to: "#suporte",
  },
] as const;

const faqs = [
  {
    q: "Como solicito acesso à plataforma?",
    a: "O acesso é por convite. Preencha o formulário em /solicitar-acesso e aguarde nossa análise em até 5 dias úteis. Você receberá as instruções por e-mail.",
  },
  {
    q: "Esqueci minha senha. Como recupero?",
    a: "Na tela de login, clique em 'Esqueci minha senha'. Enviaremos um link seguro para o e-mail cadastrado. Se não receber em alguns minutos, verifique a caixa de spam.",
  },
  {
    q: "Preciso de autenticação em dois fatores?",
    a: "Sim, para administradores é obrigatório. Para demais usuários, é opcional mas recomendado. Configure pelo aplicativo autenticador (Google Authenticator, Authy ou similar).",
  },
  {
    q: "Como registro uma iniciativa no SMIS-Escolas?",
    a: "Acesse o módulo SMIS-Escolas, clique em 'Nova iniciativa' e siga as quatro etapas: relato, estruturação em 5W2H, classificação e validação. O agente IA-ABC pode ajudar em cada passo.",
  },
  {
    q: "Posso usar a plataforma pelo celular?",
    a: "Sim, a plataforma é totalmente responsiva. Recomendamos também instalar como aplicativo (PWA) para acesso rápido pela tela inicial.",
  },
  {
    q: "Como entro em contato com outras escolas?",
    a: "Participe das comunidades temáticas no módulo AWA2030. Você pode buscar escolas por tema, território ou tipo de prática e iniciar conversas diretas.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Adotamos criptografia TLS, autenticação multifator para administradores, backups regulares e controle de acesso baseado em papéis. Estamos em conformidade com a LGPD.",
  },
  {
    q: "Como excluo minha conta?",
    a: "Envie uma solicitação para dpo@ceurs.org.br. Atenderemos em até 15 dias, conforme previsto na LGPD, após confirmar sua identidade.",
  },
] as const;

function AjudaPage() {
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

        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-teal">Central de ajuda</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
            Como podemos ajudar?
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Encontre respostas rápidas ou entre em contato com nossa equipe.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-lg gap-2"
            role="search"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Buscar por dúvida, tema ou palavra-chave..."
                aria-label="Buscar na central de ajuda"
                className="pl-10"
              />
            </div>
            <Button type="submit">Buscar</Button>
          </form>
        </header>

        {/* Categorias */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.title}>
                <a
                  href={c.to}
                  className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-5 text-lg font-bold text-navy">
                    {c.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {c.desc}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="Perguntas frequentes"
        title="Respostas rápidas"
        align="center"
        tone="card"
      >
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-bold text-navy hover:text-teal">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contato */}
      <section className="bg-navy py-20 text-secondary-foreground md:py-24">
        <div className="container-page mx-auto max-w-3xl text-center">
          <p className="eyebrow text-amber">Suporte</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Não encontrou o que procurava?
          </h2>
          <p className="mt-5 text-lg text-sky">
            Nossa equipe responde em até 1 dia útil. Entre em contato pelos
            canais abaixo.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a
                href="mailto:suporte@ceurs.org.br"
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" aria-hidden />
                suporte@ceurs.org.br
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
            >
              <Link to="/login">Voltar ao login</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}