import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass, Megaphone, School, Sprout, Target, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomePathEditor } from "@/components/admin/HomePathEditor";
import { homeContentQuery } from "@/lib/home-content-query";
import type { HomeProfile } from "@/lib/home-content";
import { requireRole } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin/jornadas")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["admin", "master"], "/admin/jornadas");
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(homeContentQuery),
  head: () => ({
    meta: [
      { title: "Caminhos do usuário · Admin CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Estratégia dos caminhos e edição da página inicial por perfil no CEURS–Escolas." },
      { property: "og:title", content: "Caminhos do usuário · CEURS–Escolas" },
      { property: "og:description", content: "Personalização da abertura e dos cartões da página inicial por perfil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JornadasPage,
});

type Persona = {
  id: string;
  nome: string;
  quem: string;
  icon: LucideIcon;
  motivacoes: string[];
  dores: string[];
  servicos: string[];
  jornada: { etapa: string; acao: string }[];
  mensagem: string;
  cta: string;
  metrica: string;
};

const PERSONAS: Persona[] = [
  {
    id: "diretor",
    nome: "Diretor de escola",
    quem: "Gestor que decide a adesão da escola e precisa mostrar resultados à comunidade e à rede.",
    icon: School,
    motivacoes: [
      "Dar visibilidade às práticas sustentáveis da escola",
      "Alinhar o projeto pedagógico aos ODS e à Agenda 2030",
      "Acompanhar indicadores e evidências das iniciativas",
      "Formar a equipe com baixo custo e tempo",
    ],
    dores: ["Pouco tempo para novas ferramentas", "Dificuldade de comprovar impacto", "Iniciativas dispersas e sem registro"],
    servicos: ["Curso CCA2030 para a equipe", "SMIS-Escolas (painel e completude)", "Estatísticas e indicadores", "Vitrine pública de iniciativas"],
    jornada: [
      { etapa: "Descobre", acao: "Vê na vitrine iniciativas de escolas parecidas com a sua" },
      { etapa: "Avalia", acao: "Lê casos, números e benefícios institucionais" },
      { etapa: "Adere", acao: "Solicita acesso para a escola" },
      { etapa: "Engaja", acao: "Inscreve a equipe no curso e acompanha o painel SMIS" },
      { etapa: "Divulga", acao: "Publica iniciativas completas e compartilha resultados" },
    ],
    mensagem: "Mostre o que sua escola já faz pela sustentabilidade — com evidências.",
    cta: "Cadastrar minha escola",
    metrica: "Escolas aderidas e iniciativas publicadas por escola",
  },
  {
    id: "promotor",
    nome: "Líder da iniciativa",
    quem: "Quem lidera uma prática (horta, feira, energia, resíduos) e quer estruturá-la e ampliá-la.",
    icon: Sprout,
    motivacoes: [
      "Organizar a iniciativa com método (matriz de 12 campos)",
      "Ganhar reconhecimento e apoio para o projeto",
      "Trocar experiências com quem faz algo parecido",
      "Construir consenso com a equipe",
    ],
    dores: ["Projeto depende de uma só pessoa", "Falta de registro e de método", "Isolamento"],
    servicos: ["SMIS-Escolas: registrar e completar iniciativa", "Comunidade AWA2030 (coordenar ou editar)", "Curso CCA2030", "Vitrine pública"],
    jornada: [
      { etapa: "Descobre", acao: "Encontra o mapa de iniciativas ou recebe convite" },
      { etapa: "Registra", acao: "Cria um rascunho da iniciativa no SMIS" },
      { etapa: "Amadurece", acao: "Completa os campos com a equipe e anexa evidências" },
      { etapa: "Conecta", acao: "Cria ou participa de uma comunidade temática" },
      { etapa: "Inspira", acao: "Publica a iniciativa e vira referência" },
    ],
    mensagem: "Transforme sua prática em referência — registre, melhore e inspire outras escolas.",
    cta: "Registrar iniciativa",
    metrica: "Iniciativas criadas e índice médio de completude",
  },
  {
    id: "participante",
    nome: "Comunidade escolar (alunos, professores, funcionários, pais)",
    quem: "Membro da comunidade escolar que quer aprender e contribuir com ações concretas.",
    icon: Users,
    motivacoes: [
      "Aprender sobre sustentabilidade de forma prática",
      "Participar de ações da própria escola",
      "Obter certificado de formação",
      "Fazer parte de um grupo com propósito",
    ],
    dores: ["Não sabe por onde começar", "Muitos cliques e logins", "Conteúdo pouco aplicável"],
    servicos: ["Curso CCA2030 com certificado", "Comunidade AWA2030 (membro)", "Contribuir em iniciativas do SMIS", "Mídia e eventos"],
    jornada: [
      { etapa: "Descobre", acao: "Recebe convite da escola ou vê na página inicial" },
      { etapa: "Entra", acao: "Cria conta em poucos passos" },
      { etapa: "Aprende", acao: "Começa o curso e continua de onde parou" },
      { etapa: "Participa", acao: "Entra numa comunidade e contribui com uma iniciativa" },
      { etapa: "Permanece", acao: "Recebe eventos, conquista certificado" },
    ],
    mensagem: "Aprenda, participe e faça diferença na sua escola.",
    cta: "Começar o curso",
    metrica: "Inscrições, conclusão do curso e participação em comunidades",
  },
  {
    id: "publico",
    nome: "Visitante / Público interessado",
    quem: "Amigo da escola, pesquisador ou interessado no tema que ainda não tem vínculo formal.",
    icon: Compass,
    motivacoes: [
      "Conhecer práticas sustentáveis reais",
      "Apoiar ou se voluntariar em escolas",
      "Debater temas em comunidades (ex.: hortas)",
      "Acompanhar dados e notícias",
    ],
    dores: ["Acha que precisa ser da escola para participar", "Não encontra informação aberta"],
    servicos: ["Vitrine e mapa de iniciativas (sem login)", "Estatísticas públicas", "Mídia e notícias", "Comunidade AWA2030 aberta"],
    jornada: [
      { etapa: "Descobre", acao: "Chega por busca, rede social ou notícia" },
      { etapa: "Explora", acao: "Navega no mapa e nas estatísticas sem login" },
      { etapa: "Se interessa", acao: "Lê uma iniciativa ou notícia de perto" },
      { etapa: "Converte", acao: "Entra em uma comunidade temática" },
      { etapa: "Apoia", acao: "Compartilha e se torna amigo de uma escola" },
    ],
    mensagem: "Veja o que as escolas estão fazendo — e junte-se a quem transforma.",
    cta: "Explorar iniciativas",
    metrica: "Visitas à vitrine e conversões em membros de comunidade",
  },
];

const LANDING = [
  { bloco: "1. Abertura", objetivo: "Vender a plataforma", conteudo: "Promessa única + 2 botões: 'Explorar iniciativas' (público) e 'Começar' (aderir)." },
  { bloco: "2. Escolha seu caminho", objetivo: "Segmentar", conteudo: "4 cartões por objetivo: Quero mostrar minha escola · Quero registrar uma iniciativa · Quero aprender e participar · Quero conhecer." },
  { bloco: "3. Prova", objetivo: "Credibilidade", conteudo: "Números reais, mapa resumido e iniciativas em destaque." },
  { bloco: "4. Serviços", objetivo: "Explicar o valor", conteudo: "Curso e Comunidade como portas de entrada; SMIS como instrumento de trabalho." },
  { bloco: "5. Como funciona", objetivo: "Reduzir atrito", conteudo: "3 passos: Entrar · Aprender · Agir — no máximo 2 cliques até a ação." },
  { bloco: "6. Comunidade viva", objetivo: "Engajamento", conteudo: "Eventos, notícias e comunidades temáticas ativas." },
  { bloco: "7. Chamada final", objetivo: "Converter", conteudo: "Botão que muda conforme a persona: visitante, conectado, gestor." },
];

function JornadasPage() {
  const [ativa, setAtiva] = useState("diretor");
  const [dirty, setDirty] = useState(false);
  const p = PERSONAS.find((x) => x.id === ativa) ?? PERSONAS.find((x) => x.id === "diretor");
  if (!p) return null;
  const Icon = p.icon;
  const editorProfile: HomeProfile = ativa === "gestor" ? "gestor" : ativa === "promotor" ? "lider" : ativa === "participante" ? "comunidade" : ativa === "publico" ? "visitante" : "diretor";
  return (
    <div className="space-y-10">
      <header className="rounded-2xl bg-navy p-8 text-secondary-foreground shadow-card">
        <p className="text-xs font-bold uppercase tracking-widest text-amber">Estratégia · Administração</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Caminhos do usuário</h1>
        <p className="mt-3 max-w-3xl text-sky">
          Personas definidas pelos <strong className="text-secondary-foreground">objetivos e serviços</strong> que buscam — não pelo cargo.
          Uma professora pode fazer parte da Comunidade escolar no curso e ser Líder de uma iniciativa ao mesmo tempo. Etapas do Método ABC: Descoberta → Sensibilização → Aculturamento → Coprodução.
        </p>
      </header>

      <div role="tablist" aria-label="Personas" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {PERSONAS.map((x) => {
          const XI = x.icon;
          const on = x.id === ativa;
          return (
            <Button
              variant="ghost"
              key={x.id}
              role="tab"
              aria-selected={on}
              onClick={() => { if (ativa !== x.id && dirty && !window.confirm("Mudar de perfil? Alterações não publicadas serão descartadas.")) return; setDirty(false); setAtiva(x.id); }}
              className={`h-auto whitespace-normal justify-start flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${on ? "border-teal bg-teal/10 shadow-soft" : "border-border bg-card hover:border-teal"}`}
            >
              <span className={`rounded-lg p-2 ${on ? "bg-teal text-primary-foreground" : "bg-muted text-navy"}`}><XI className="h-5 w-5" /></span>
              <span>
                <span className="block font-bold text-navy">{x.nome}</span>
                <span className="block text-xs text-muted-foreground">{x.cta}</span>
              </span>
            </Button>
          );
        })}
        <Button variant="ghost" role="tab" aria-selected={ativa === "gestor"} className={`h-auto whitespace-normal justify-start rounded-lg border p-4 text-left ${ativa === "gestor" ? "border-teal bg-teal/10" : "border-border bg-card"}`} onClick={() => { if (dirty && !window.confirm("Mudar de perfil? Alterações não publicadas serão descartadas.")) return; setDirty(false); setAtiva("gestor"); }}><Users className="h-5 w-5" />Admin / Master</Button>
      </div>

      <HomePathEditor key={editorProfile} profile={editorProfile} onDirtyChange={setDirty} />
      {ativa !== "gestor" && <details className="border-b border-border pb-6"><summary className="cursor-pointer text-lg font-bold text-navy">Estratégia e caminho de {p.nome}</summary>
      <section role="tabpanel" className="mt-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-teal/10 p-3 text-teal"><Icon className="h-7 w-7" /></div>
          <div>
            <h2 className="text-2xl font-extrabold text-navy">{p.nome}</h2>
            <p className="text-muted-foreground">{p.quem}</p>
          </div>
        </div>

        <blockquote className="rounded-xl border-l-4 border-orange bg-card p-5 text-lg font-semibold text-navy shadow-soft">
          “{p.mensagem}”
        </blockquote>

        <div className="grid gap-4 md:grid-cols-3">
          <Lista titulo="O que motiva" icon={Target} itens={p.motivacoes} />
          <Lista titulo="Dores e barreiras" icon={Megaphone} itens={p.dores} />
          <Lista titulo="Serviços que usa" icon={Sprout} itens={p.servicos} />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal">
            <Compass className="h-4 w-4" /> Caminho em 5 passos
          </h3>
          <ol className="relative grid gap-4 md:grid-cols-5">
            <span aria-hidden className="absolute left-0 right-0 top-4 hidden h-0.5 bg-border md:block" />
            {p.jornada.map((j, i) => (
              <li key={j.etapa} className="relative">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-secondary-foreground">{i + 1}</span>
                <p className="mt-3 font-bold text-navy">{j.etapa}</p>
                <p className="mt-1 text-sm text-muted-foreground">{j.acao}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-teal/10 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-teal">Botão principal</p>
            <p className="mt-2 inline-flex items-center gap-2 font-bold text-navy">{p.cta} <ArrowRight className="h-4 w-4" /></p>
          </div>
          <div className="rounded-xl bg-amber/15 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-navy">Como medir</p>
            <p className="mt-2 text-navy">{p.metrica}</p>
          </div>
        </div>
      </section>
      </details>}

      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-navy"><Users className="h-5 w-5 text-teal" /> Estrutura recomendada da página inicial</h2>
        <p className="mt-1 text-muted-foreground">Vender a plataforma e gerar engajamento, levando cada persona à ação em até 2 cliques.</p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {LANDING.map((l) => (
            <li key={l.bloco} className="rounded-xl border border-border bg-background p-4">
              <p className="font-bold text-navy">{l.bloco}</p>
              <span className="mt-1 inline-block rounded-full bg-orange/10 px-2 py-0.5 text-xs font-bold text-orange">{l.objetivo}</span>
              <p className="mt-2 text-sm text-muted-foreground">{l.conteudo}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Lista({ titulo, icon: Icon, itens }: { titulo: string; icon: LucideIcon; itens: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="h-4 w-4" /> {titulo}
      </h3>
      <ul className="space-y-1 text-sm text-foreground">
        {itens.map((t) => <li key={t}>• {t}</li>)}
      </ul>
    </div>
  );
}
