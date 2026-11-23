/**
 * Módulo Curso · CCA2030 (e expansão para Equipes-ABC)
 *
 * Tipos, mock data e helpers. O progresso é salvo em localStorage
 * (mock). Quando o backend Python estiver pronto, trocamos por
 * chamadas à API e/ou tabelas `curso_progresso` no Supabase.
 */

/* ============================================================
   TIPOS
   ============================================================ */

export type TipoModulo = "video" | "texto" | "atividade" | "quiz";

export type AtividadeModulo =
  | { tipo: "registrar_iniciativa" } // chama o SMIS
  | { tipo: "quiz"; perguntas: QuizPergunta[] }
  | { tipo: "reflexao"; prompt: string };

export type QuizPergunta = {
  pergunta: string;
  opcoes: string[];
  correta: number; // índice em `opcoes`
};

export type Modulo = {
  id: string;
  numero: number;
  titulo: string;
  duracao: number; // minutos
  tipo: TipoModulo;
  conteudo: string; // markdown ou URL (mock: texto simples)
  atividade?: AtividadeModulo;
};

export type Trilha = {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  cargaHoraria: number; // horas
  publico: string;
  certificado: boolean;
  modulos: Modulo[];
};

export type ProgressoTrilha = {
  trilhaSlug: string;
  modulosConcluidos: string[]; // array de modulo.id
  iniciadoEm: string; // ISO
  concluidoEm?: string; // ISO
};

/* ============================================================
   MOCK DE TRILHAS
   ============================================================ */

export const TRILHAS: Trilha[] = [
  {
    id: "trilha_cca2030",
    slug: "cca2030",
    titulo: "CCA2030 · Curso Individual",
    descricao:
      "Formação de sensibilização de 10h no domínio ABC. Você vai reconhecer o território da sua escola, identificar uma iniciativa de sustentabilidade e registrá-la no SMIS.",
    cargaHoraria: 10,
    publico: "Educadores, coordenadores e diretores",
    certificado: true,
    modulos: [
      {
        id: "mod_01",
        numero: 1,
        titulo: "Boas-vindas ao CEURS–Escolas",
        duracao: 15,
        tipo: "video",
        conteudo:
          "Neste módulo, você conhece a proposta do programa, o papel da escola como agente local de sustentabilidade e o que esperar da sua jornada de aprendizagem.",
      },
      {
        id: "mod_02",
        numero: 2,
        titulo: "O domínio ABC e a Plataforma",
        duracao: 30,
        tipo: "texto",
        conteudo:
          "O domínio ABC articula Aprendizagem, Boas práticas e Coprodução. Conheça como a plataforma conecta curso, comunidade e instrumento de mapeamento.",
      },
      {
        id: "mod_03",
        numero: 3,
        titulo: "Reconhecer o território",
        duracao: 45,
        tipo: "texto",
        conteudo:
          "Antes de propor caminhos, é preciso ler o contexto. Este módulo apresenta ferramentas para mapear atores, recursos e potencialidades da escola e do entorno.",
      },
      {
        id: "mod_04",
        numero: 4,
        titulo: "Identificar uma iniciativa",
        duracao: 60,
        tipo: "atividade",
        conteudo:
          "Agora é sua vez. Identifique uma prática de sustentabilidade da sua escola e registre-a no SMIS-Escolas. Você pode salvar como rascunho e completar depois.",
        atividade: { tipo: "registrar_iniciativa" },
      },
      {
        id: "mod_05",
        numero: 5,
        titulo: "Reflexão final",
        duracao: 30,
        tipo: "atividade",
        conteudo:
          "Reserve um tempo para refletir sobre o que aprendeu e como pretende aplicar na sua escola.",
        atividade: {
          tipo: "reflexao",
          prompt:
            "Qual foi a principal descoberta desta jornada? Como você pretende mobilizar a comunidade escolar?",
        },
      },
    ],
  },
  {
    id: "trilha_equipes",
    slug: "equipes-abc",
    titulo: "Curso Equipes-ABC · Expansão",
    descricao:
      "Formação de 40h para equipes escolares, com jornada Iniciativa → Projeto → Programa Estratégico. Consolidação por consenso no SMIS.",
    cargaHoraria: 40,
    publico: "Equipes escolares e gestores",
    certificado: true,
    modulos: [
      {
        id: "eq_01",
        numero: 1,
        titulo: "Do individual ao coletivo",
        duracao: 60,
        tipo: "texto",
        conteudo:
          "Neste módulo, você entende a diferença entre a jornada individual e a jornada de equipe, e como consolidar iniciativas por consenso.",
      },
      {
        id: "eq_02",
        numero: 2,
        titulo: "Jornada Iniciativa → Projeto → Programa",
        duracao: 90,
        tipo: "video",
        conteudo:
          "Cada etapa tem seus artefatos e critérios. Aprenda a estruturar o caminho da sua equipe no SMIS.",
      },
      {
        id: "eq_03",
        numero: 3,
        titulo: "Reunião de consenso",
        duracao: 120,
        tipo: "atividade",
        conteudo:
          "Registre as iniciativas individuais da equipe e conduza a reunião de consenso para escolher a melhor.",
        atividade: { tipo: "registrar_iniciativa" },
      },
    ],
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

export function getTrilhaPorSlug(slug: string): Trilha | undefined {
  return TRILHAS.find((t) => t.slug === slug);
}

export function getModuloPorId(trilha: Trilha, moduloId: string): Modulo | undefined {
  return trilha.modulos.find((m) => m.id === moduloId);
}

export function formatDuracao(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

/* ============================================================
   PROGRESSO (localStorage)
   ============================================================ */

const PROGRESSO_KEY = "ceurs-curso-progresso";

type ProgressoMap = Record<string, ProgressoTrilha>;

function lerProgresso(): ProgressoMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESSO_KEY);
    return raw ? (JSON.parse(raw) as ProgressoMap) : {};
  } catch {
    return {};
  }
}

function salvarProgresso(map: ProgressoMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESSO_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getProgresso(trilhaSlug: string): ProgressoTrilha {
  const map = lerProgresso();
  return (
    map[trilhaSlug] ?? {
      trilhaSlug,
      modulosConcluidos: [],
      iniciadoEm: new Date().toISOString(),
    }
  );
}

export function marcarModuloConcluido(
  trilhaSlug: string,
  moduloId: string,
  totalModulos: number,
): ProgressoTrilha {
  const map = lerProgresso();
  const atual = map[trilhaSlug] ?? {
    trilhaSlug,
    modulosConcluidos: [],
    iniciadoEm: new Date().toISOString(),
  };

  if (!atual.modulosConcluidos.includes(moduloId)) {
    atual.modulosConcluidos = [...atual.modulosConcluidos, moduloId];
  }

  if (atual.modulosConcluidos.length >= totalModulos && !atual.concluidoEm) {
    atual.concluidoEm = new Date().toISOString();
  }

  map[trilhaSlug] = atual;
  salvarProgresso(map);
  return atual;
}

export function calcularProgresso(
  trilha: Trilha,
): { concluidos: number; total: number; percentual: number; concluido: boolean } {
  const progresso = getProgresso(trilha.slug);
  const total = trilha.modulos.length;
  const concluidos = progresso.modulosConcluidos.length;
  const percentual = total === 0 ? 0 : Math.round((concluidos / total) * 100);
  return {
    concluidos,
    total,
    percentual,
    concluido: Boolean(progresso.concluidoEm),
  };
}

export function resetarProgresso(trilhaSlug: string): void {
  const map = lerProgresso();
  delete map[trilhaSlug];
  salvarProgresso(map);
}