import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { requireRole } from "@/lib/admin-access.functions";
import { REUNIAO_3 } from "@/lib/platform-reference";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/reunioes")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["admin", "master"], "/admin/reunioes");
  },
  head: () => ({
    meta: [
      { title: "Memória de reuniões · Admin CEURS–Escolas" },
      { name: "description", content: "Histórico das reuniões do projeto CEURS–Escolas: decisões, impactos e pendências." },
      { property: "og:title", content: "Memória de reuniões · CEURS–Escolas" },
      { property: "og:description", content: "Decisões e impactos das reuniões da equipe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReunioesPage,
});

type Reuniao = {
  id: string;
  titulo: string;
  fonte: string;
  participantes: string;
  resumo: string;
  decisoes: string[];
  impactos: string[];
  pendencias: string[];
};

const REUNIOES: Reuniao[] = [
  REUNIAO_3,
  {
    id: "r1",
    titulo: "Reunião 1 · Arquitetura de produto e redução de cliques",
    fonte: "Transcrição CEURS.txt + análise da reunião (DeepSeek)",
    participantes: "Renan Binda, coordenação do projeto, Cecília",
    resumo:
      "Reunião de design de produto que corrige a arquitetura conceitual: o Landing Place orquestra o ecossistema e o SMIS deixa de ser porta de entrada.",
    decisoes: [
      "O SMIS não é um serviço, é um instrumento: é chamado pelo curso e pela comunidade.",
      "Serviços de entrada da página inicial: Curso, Iniciativas e Comunidade.",
      "CoP-ABC e AWA2030 são o mesmo módulo (AWA2030).",
      "O curso chama o SMIS em modo rascunho como atividade didática (1 a 3 iniciativas).",
      "Curso para equipes: SMIS em modo Equipe com reunião de consenso.",
      "Reduzir o caminho do usuário até o que ele quer para no máximo 2 cliques.",
      "Comunidade e iniciativa são independentes.",
      "Formulário de iniciativa com 12 campos (5W2H, ODS, evidências) e régua de completude.",
      "Equipe do SMIS começa pelo modelo de dados (5W2H conectado a bases do MEC/INEP).",
    ],
    impactos: [
      "Removido o atalho direto 'Acessar SMIS' da página inicial.",
      "Criada a vitrine pública /iniciativas com busca e mapa.",
      "Página inicial com chamadas conforme a sessão (entrar, ir para o painel, continuar curso).",
    ],
    pendencias: [
      "Modo Equipe e consenso no SMIS (smis_equipes, equipe_id).",
      "Botão 'Registrar iniciativa' dentro dos módulos do curso.",
    ],
  },
  {
    id: "r2",
    titulo: "Reunião 2 · Alinhamento da equipe de desenvolvimento",
    fonte: "Áudio Voz_097.m4a (1h 13min 52s)",
    participantes: "Renan Binda, Mônica e coordenação do projeto",
    resumo:
      "Alinhamento ao Método ABC da UFSC, novas nomenclaturas e seis frentes de implementação. O Landing Place é a porta de entrada única do ecossistema.",
    decisoes: [
      "Etapas oficiais: Descoberta (Landing Place), Sensibilização (curso 10h), Aculturamento, Coprodução (AWA2030).",
      "Aculturamento desacoplado: quem cadastrou iniciativa no SMIS pode entrar na comunidade sem o curso de 40h.",
      "'Promotor' passa a ser 'Líder da Iniciativa'.",
      "'Participante' passa a ser 'Comunidade Escolar'.",
      "'Público geral' passa a ser 'Visitante Anônimo' ou 'Público Interessado / Amigo da Escola'.",
      "'Jornada da persona' passa a ser 'Caminho do Usuário' ('Jornada' é termo pedagógico do ABC).",
      "Módulos: SMIS em Python (Alexandre), Comunidade AWA2030 (Denilson), Curso CCA2030 (Rita).",
      "O design deste site é referência obrigatória de interface para os demais módulos.",
    ],
    impactos: [
      "A. Credenciamento de líderes: diretor indica líder por e-mail com convite oficial.",
      "B. Níveis de acesso no SMIS: Líder edita, Comunidade Escolar vê e interage, público vê só a vitrine.",
      "C. Pergunta de vínculo no rascunho do curso (líder, colaborador ou prática conhecida).",
      "D. Régua de completude no SMIS e métrica territorial da escola no mapa.",
      "E. Identidade visual consistente; avaliar elemento do livro na marca.",
      "F. Atualizar Jornadas e cards da página inicial com as novas nomenclaturas.",
    ],
    pendencias: [
      "Etapa 2: nomenclaturas em Jornadas e página inicial.",
      "Etapa 3: credenciamento de líderes.",
      "Etapa 4: régua de completude e pergunta de vínculo.",
      "Etapa 5: níveis de acesso e métricas territoriais.",
    ],
  },
];

function Bloco({ titulo, itens }: { titulo: string; itens: string[] }) {
  if (!itens.length) return null;
  return (
    <div className="border-t border-border py-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{titulo}</h3>
      <ul className="space-y-2 text-sm text-foreground/90">
        {itens.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReunioesPage() {
  const [ativa, setAtiva] = useState("r3");
  const [busca, setBusca] = useState("");
  const r = REUNIOES.find((x) => x.id === ativa) ?? REUNIAO_3;
  const f = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const filt = (l: string[]) => (q ? l.filter((s) => s.toLowerCase().includes(q)) : l);
    return { decisoes: filt(r.decisoes), impactos: filt(r.impactos), pendencias: filt(r.pendencias) };
  }, [r, busca]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <CalendarClock className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Memória do projeto</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Histórico de reuniões</h1>
        <p className="text-muted-foreground">Decisões, impactos na plataforma e pendências de cada reunião.</p>
        <p className="text-sm text-muted-foreground">Os registros anteriores preservam o contexto da época; a Reunião 3 e o plano integrado orientam a próxima execução.</p>
        <Button asChild variant="outline"><Link to="/admin/documentacao" hash="plano-execucao">Consultar plano de execução</Link></Button>
      </header>

      <Tabs value={ativa} onValueChange={setAtiva}>
      <TabsList aria-label="Selecionar reunião" className="h-auto flex-wrap justify-start gap-1">
        {REUNIOES.map((x) => (
          <TabsTrigger
            key={x.id}
            value={x.id}
          >
            {x.titulo.split(" · ")[0]}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={ativa} className="mt-6 space-y-4">
        <div className="border-l-4 border-primary pl-5">
          <h2 className="text-xl font-semibold text-foreground">{r.titulo}</h2>
          <p className="mt-1 text-xs text-muted-foreground">Fonte: {r.fonte} · Participantes: {r.participantes}</p>
          <p className="mt-3 text-sm text-foreground/90">{r.resumo}</p>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            aria-label="Buscar nesta reunião"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar nesta reunião…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Bloco titulo="Decisões" itens={f.decisoes} />
          <Bloco titulo="Impactos na plataforma" itens={f.impactos} />
          <Bloco titulo="Pendências" itens={f.pendencias} />
        </div>
        {!f.decisoes.length && !f.impactos.length && !f.pendencias.length && <p className="text-sm text-muted-foreground">Nenhum registro encontrado nesta reunião.</p>}
      </TabsContent>
      </Tabs>
    </div>
  );
}
