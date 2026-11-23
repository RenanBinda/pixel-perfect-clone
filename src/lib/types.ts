/**
 * Tipos compartilhados do CEURS–Escolas.
 * Centraliza contratos entre frontend e backend.
 */

/* ============================================================
   MÍDIA
   ============================================================ */

export type MediaTipo = "Notícia" | "Vídeo" | "Documento" | "Podcast";

export interface MediaItem {
  slug: string;
  tipo: MediaTipo;
  titulo: string;
  resumo: string;
  data: string; // ISO 8601
  autor?: string;
  href?: string;
  conteudo?: string; // markdown ou HTML
  tags?: string[];
  imagemCapa?: string;
}

/* ============================================================
   ESTATÍSTICAS
   ============================================================ */

export type IndicadorSlug =
  | "escolas"
  | "educadores"
  | "iniciativas"
  | "municipios";

export interface Kpi {
  slug: IndicadorSlug;
  label: string;
  value: string;
  valueNumerico: number;
  hint: string;
  descricao: string;
  metodologia: string;
  serieHistorica: { periodo: string; valor: number }[];
  distribuicao?: { categoria: string; valor: number }[];
}

export interface IniciativaPorTipo {
  tipo: string;
  valor: number;
}

/* ============================================================
   SOLICITAÇÃO DE ACESSO
   ============================================================ */

export interface SolicitacaoAcesso {
  nome: string;
  email: string;
  instituicao: string;
  cargo: string;
  justificativa?: string;
}

export interface SolicitacaoResposta {
  id: string;
  status: "recebida" | "em_analise" | "aprovada" | "recusada";
  mensagem: string;
  prazoEstimado: string;
}

/* ============================================================
   API — ERROS
   ============================================================ */

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown> | undefined;
}