/**
 * Módulo AWA2030 · Comunidade de Prática (CoP-ABC aplicada ao CEURS–Escolas)
 *
 * Tipos, mock data e helpers. Quando o backend Python estiver pronto,
 * trocamos as funções `fetch*` por chamadas à API.
 */

import type { IniciativaTema } from "./smis";

/* ============================================================
   TIPOS
   ============================================================ */

export type PapelComunidade = "coordenador" | "editor" | "membro";

export type MembroComunidade = {
  id: string;
  nome: string;
  iniciais: string;
  papel: PapelComunidade;
  desde: string; // ISO
};

export type Discussao = {
  id: string;
  titulo: string;
  autor: string;
  autorIniciais: string;
  criadoEm: string; // ISO
  respostas: number;
  fixada?: boolean;
};

export type Comunidade = {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  tema: IniciativaTema;
  coordenador: MembroComunidade;
  membros: MembroComunidade[];
  discussoes: Discussao[];
  escola?: string;
  criadaEm: string;
  /** IDs de iniciativas do SMIS vinculadas (referência) */
  iniciativasVinculadas: string[];
};

export type MaterialBiblioteca = {
  id: string;
  titulo: string;
  tipo: "guia" | "vídeo" | "artigo" | "documento";
  autor: string;
  autorIniciais: string;
  tema: IniciativaTema;
  descricao: string;
  publicadoEm: string;
  href: string;
};

/* ============================================================
   LABELS
   ============================================================ */

export const PAPEL_COMUNIDADE_LABEL: Record<PapelComunidade, string> = {
  coordenador: "Coordenador(a)",
  editor: "Editor(a)",
  membro: "Membro",
};

export const PAPEL_COMUNIDADE_COR: Record<
  PapelComunidade,
  { bg: string; text: string }
> = {
  coordenador: { bg: "bg-orange/15", text: "text-orange-900" },
  editor: { bg: "bg-navy/10", text: "text-navy" },
  membro: { bg: "bg-soft", text: "text-muted-foreground" },
};

export const TIPO_MATERIAL_LABEL: Record<MaterialBiblioteca["tipo"], string> = {
  guia: "Guia",
  vídeo: "Vídeo",
  artigo: "Artigo",
  documento: "Documento",
};

/* ============================================================
   MOCK · COMUNIDADES
   ============================================================ */

const COORD_MARIA: MembroComunidade = {
  id: "u_1",
  nome: "Maria Clara Andrade",
  iniciais: "MC",
  papel: "coordenador",
  desde: "2026-03-01",
};

export const COMUNIDADES: Comunidade[] = [
  {
    id: "com_001",
    slug: "hortas-escolares",
    nome: "Hortas Escolares do Brasil",
    descricao:
      "Comunidade de educadores e escolas que mantêm hortas comunitárias com participação de famílias e estudantes.",
    tema: "alimentacao",
    escola: "Escola Municipal Vila Verde",
    criadaEm: "2026-03-01",
    coordenador: COORD_MARIA,
    membros: [
      COORD_MARIA,
      {
        id: "u_2",
        nome: "João Pedro Silva",
        iniciais: "JP",
        papel: "editor",
        desde: "2026-04-15",
      },
      {
        id: "u_3",
        nome: "Carla Mendes",
        iniciais: "CM",
        papel: "membro",
        desde: "2026-05-20",
      },
      {
        id: "u_4",
        nome: "Roberto Alves",
        iniciais: "RA",
        papel: "membro",
        desde: "2026-06-10",
      },
    ],
    discussoes: [
      {
        id: "d_001",
        titulo: "Como envolver as famílias na manutenção da horta?",
        autor: "Maria Clara Andrade",
        autorIniciais: "MC",
        criadoEm: "2026-10-10",
        respostas: 8,
        fixada: true,
      },
      {
        id: "d_002",
        titulo: "Compostagem com restos da merenda: relato de experiência",
        autor: "João Pedro Silva",
        autorIniciais: "JP",
        criadoEm: "2026-10-05",
        respostas: 12,
      },
      {
        id: "d_003",
        titulo: "Sementes nativas: onde encontrar?",
        autor: "Carla Mendes",
        autorIniciais: "CM",
        criadoEm: "2026-09-28",
        respostas: 5,
      },
    ],
    iniciativasVinculadas: ["ini_001"],
  },
  {
    id: "com_002",
    slug: "residuos-escolares",
    nome: "Resíduos e Compostagem",
    descricao:
      "Práticas de redução, reutilização e compostagem de resíduos no ambiente escolar.",
    tema: "residuos",
    escola: "Escola Estadual Central",
    criadaEm: "2026-04-01",
    coordenador: {
      id: "u_2",
      nome: "João Pedro Silva",
      iniciais: "JP",
      papel: "coordenador",
      desde: "2026-04-01",
    },
    membros: [
      {
        id: "u_2",
        nome: "João Pedro Silva",
        iniciais: "JP",
        papel: "coordenador",
        desde: "2026-04-01",
      },
      {
        id: "u_1",
        nome: "Maria Clara Andrade",
        iniciais: "MC",
        papel: "membro",
        desde: "2026-05-15",
      },
    ],
    discussoes: [
      {
        id: "d_004",
        titulo: "Composteira em escola pequena: dicas",
        autor: "João Pedro Silva",
        autorIniciais: "JP",
        criadoEm: "2026-10-08",
        respostas: 6,
      },
    ],
    iniciativasVinculadas: ["ini_002"],
  },
  {
    id: "com_003",
    slug: "captacao-agua",
    nome: "Água na Escola",
    descricao:
      "Captação de água da chuva, uso consciente e projetos de irrigação sustentável.",
    tema: "agua",
    escola: "Colégio Santa Cruz",
    criadaEm: "2026-05-15",
    coordenador: {
      id: "u_3",
      nome: "Carla Mendes",
      iniciais: "CM",
      papel: "coordenador",
      desde: "2026-05-15",
    },
    membros: [
      {
        id: "u_3",
        nome: "Carla Mendes",
        iniciais: "CM",
        papel: "coordenador",
        desde: "2026-05-15",
      },
    ],
    discussoes: [],
    iniciativasVinculadas: ["ini_003"],
  },
  {
    id: "com_004",
    slug: "jardins-polinizadores",
    nome: "Jardins de Polinizadores",
    descricao:
      "Plantio de espécies nativas, hotel de insetos e observação de biodiversidade.",
    tema: "biodiversidade",
    escola: "Colégio Santa Cruz",
    criadaEm: "2026-03-20",
    coordenador: {
      id: "u_3",
      nome: "Carla Mendes",
      iniciais: "CM",
      papel: "coordenador",
      desde: "2026-03-20",
    },
    membros: [
      {
        id: "u_3",
        nome: "Carla Mendes",
        iniciais: "CM",
        papel: "coordenador",
        desde: "2026-03-20",
      },
      {
        id: "u_1",
        nome: "Maria Clara Andrade",
        iniciais: "MC",
        papel: "editor",
        desde: "2026-06-01",
      },
    ],
    discussoes: [
      {
        id: "d_005",
        titulo: "Espécies nativas por região: um mapa colaborativo",
        autor: "Carla Mendes",
        autorIniciais: "CM",
        criadoEm: "2026-10-01",
        respostas: 3,
      },
    ],
    iniciativasVinculadas: ["ini_006"],
  },
];

/* ============================================================
   MOCK · BIBLIOTECA
   ============================================================ */

export const BIBLIOTECA: MaterialBiblioteca[] = [
  {
    id: "mat_001",
    titulo: "Guia prático: como criar uma horta escolar",
    tipo: "guia",
    autor: "Maria Clara Andrade",
    autorIniciais: "MC",
    tema: "alimentacao",
    descricao:
      "Passo a passo para planejar, implantar e manter uma horta comunitária na escola.",
    publicadoEm: "2026-09-15",
    href: "#",
  },
  {
    id: "mat_002",
    titulo: "Compostagem escolar em 5 etapas",
    tipo: "vídeo",
    autor: "João Pedro Silva",
    autorIniciais: "JP",
    tema: "residuos",
    descricao:
      "Vídeo tutorial mostrando como montar uma composteira de baixo custo.",
    publicadoEm: "2026-09-10",
    href: "#",
  },
  {
    id: "mat_003",
    titulo: "Captação de água da chuva: cálculo e instalação",
    tipo: "guia",
    autor: "Carla Mendes",
    autorIniciais: "CM",
    tema: "agua",
    descricao:
      "Como dimensionar reservatórios e instalar calhas para irrigação.",
    publicadoEm: "2026-08-20",
    href: "#",
  },
  {
    id: "mat_004",
    titulo: "Polinizadores do Brasil: guia ilustrado",
    tipo: "documento",
    autor: "Carla Mendes",
    autorIniciais: "CM",
    tema: "biodiversidade",
    descricao:
      "Espécies nativas que atraem abelhas e borboletas, com fotos e dicas de plantio.",
    publicadoEm: "2026-08-05",
    href: "#",
  },
  {
    id: "mat_005",
    titulo: "Mobilidade ativa: rotas seguras para estudantes",
    tipo: "artigo",
    autor: "Maria Clara Andrade",
    autorIniciais: "MC",
    tema: "mobilidade",
    descricao:
      "Reflexão sobre caminhos seguros e autonomia das crianças no trajeto escolar.",
    publicadoEm: "2026-07-15",
    href: "#",
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

export function getComunidadePorSlug(slug: string): Comunidade | undefined {
  return COMUNIDADES.find((c) => c.slug === slug);
}

export function getComunidadesPorTema(
  tema: IniciativaTema | "todos",
): Comunidade[] {
  if (tema === "todos") return COMUNIDADES;
  return COMUNIDADES.filter((c) => c.tema === tema);
}

export function getMateriaisPorTema(
  tema: IniciativaTema | "todos",
): MaterialBiblioteca[] {
  if (tema === "todos") return BIBLIOTECA;
  return BIBLIOTECA.filter((m) => m.tema === tema);
}

export function formatarDataCurta(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function formatarDataRelativa(iso: string): string {
  try {
    const d = new Date(iso);
    const agora = new Date();
    const diff = Math.floor((agora.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "hoje";
    if (diff === 1) return "ontem";
    if (diff < 7) return `há ${diff} dias`;
    if (diff < 30) return `há ${Math.floor(diff / 7)} semanas`;
    if (diff < 365) return `há ${Math.floor(diff / 30)} meses`;
    return `há ${Math.floor(diff / 365)} anos`;
  } catch {
    return iso;
  }
}

/* ============================================================
   API MOCK
   ============================================================ */

export async function fetchComunidades(): Promise<Comunidade[]> {
  // TODO: request<Comunidade[]>("/awa/comunidades")
  return new Promise((r) => setTimeout(() => r(COMUNIDADES), 300));
}

export async function fetchComunidadePorSlug(
  slug: string,
): Promise<Comunidade | undefined> {
  // TODO: request<Comunidade>(`/awa/comunidades/${slug}`)
  return new Promise((r) =>
    setTimeout(() => r(getComunidadePorSlug(slug)), 300),
  );
}

export async function fetchBiblioteca(): Promise<MaterialBiblioteca[]> {
  // TODO: request<MaterialBiblioteca[]>("/awa/biblioteca")
  return new Promise((r) => setTimeout(() => r(BIBLIOTECA), 300));
}