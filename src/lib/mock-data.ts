import type { Kpi, MediaItem, IniciativaPorTipo } from "./types";

/**
 * Dados mockados para desenvolvimento.
 * Substituir por chamadas reais quando o backend Python estiver pronto.
 */

/* ============================================================
   MÍDIA
   ============================================================ */

export const mediaItems: MediaItem[] = [
  {
    slug: "ceurs-escolas-200-educadores-2026",
    tipo: "Notícia",
    titulo: "CEURS–Escolas inicia formação de 200 educadores em 2026",
    resumo:
      "Primeira turma do programa reúne professores e gestores de escolas públicas de cinco regiões.",
    data: "2026-10-12",
    autor: "Equipe de Comunicação CEURS",
    tags: ["formação", "educadores", "2026"],
    conteudo: `
A primeira turma do programa **CEURS–Escolas** iniciou suas atividades em outubro de 2026, reunindo 200 educadores de escolas públicas de cinco regiões brasileiras. A formação tem como objetivo preparar professores e gestores para atuarem como **Agentes Locais de Sustentabilidade** em seus territórios.

## Sobre o programa

O CEURS–Escolas é uma iniciativa conjunta da UFSC, MCTI, Parlamento e USP, que integra quatro módulos complementares:

- **AWA2030** — comunidade de prática e intercâmbio contínuo
- **CCA2030** — curso de sensibilização de 10h
- **SMIS-Escolas** — sistema de mapeamento de iniciativas
- **CoP-ABC** — comunidade de prática permanente

## Próximos passos

Os participantes iniciam agora a jornada **Iniciativa → Projeto → Programa Estratégico**, registrando suas primeiras práticas no SMIS-Escolas. A expectativa é que, até o fim de 2026, mais de 800 iniciativas de sustentabilidade escolar estejam mapeadas na plataforma.
    `.trim(),
  },
  {
    slug: "o-que-e-ceurs-escolas-video",
    tipo: "Vídeo",
    titulo: "O que é o CEURS–Escolas?",
    resumo:
      "Vídeo institucional de 3 minutos apresenta o programa, seus módulos e a jornada de coprodução.",
    data: "2026-10-05",
    autor: "Equipe de Comunicação CEURS",
    tags: ["institucional", "vídeo"],
    conteudo: `
Vídeo institucional de 3 minutos que apresenta o programa CEURS–Escolas, seus quatro módulos integrados e a jornada de coprodução que conecta escola, território e comunidade.

**Duração:** 3min12s
**Idioma:** Português (BR)
**Legendas:** disponíveis
    `.trim(),
  },
  {
    slug: "caderno-diretrizes-arquitetura-abc",
    tipo: "Documento",
    titulo: "Caderno de Diretrizes — Arquitetura ABC",
    resumo:
      "Documento técnico que orienta a implementação da Plataforma ABC em diferentes domínios.",
    data: "2026-09-28",
    autor: "Roberto Pacheco",
    tags: ["documento", "arquitetura", "técnico"],
    conteudo: `
O Caderno de Diretrizes de Arquitetura ABC consolida as decisões técnicas que orientam a implementação da Plataforma ABC em diferentes domínios (CEURS-Escolas, ANATEL-S, entre outros).

## Conteúdo

1. Visão geral dos oito elementos da Plataforma ABC
2. Arquitetura de dados, identidade e integração
3. Modelo do SMIS e fluxo de registro
4. Agentes IA-ABC e serviços transversais
5. Governança, LGPD e isolamento por projeto

**Formato:** PDF
**Páginas:** 48
    `.trim(),
  },
  {
    slug: "smis-escolas-primeiras-iniciativas",
    tipo: "Notícia",
    titulo: "SMIS-Escolas recebe primeiras iniciativas de sustentabilidade",
    resumo:
      "Escolas já registram hortas, compostagem e projetos de energia limpa no sistema de mapeamento.",
    data: "2026-09-20",
    autor: "Equipe SMIS",
    tags: ["SMIS", "iniciativas", "sustentabilidade"],
    conteudo: `
O **SMIS-Escolas** já registra suas primeiras iniciativas de sustentabilidade, enviadas por educadores das escolas participantes do programa. Entre as práticas mais comuns estão hortas escolares comunitárias, compostagem de resíduos vegetais e projetos de energia limpa.

## Como registrar

O registro é feito em quatro etapas:

1. **Entrada** — relato ou formulário guiado
2. **Estruturação** — organização em 5W2H
3. **Classificação** — taxonomia e ODS
4. **Validação** — canvas e autoria

Todo o processo conta com apoio de **agentes IA-ABC**, que sugerem estruturações e classificações, sempre com confirmação humana.
    `.trim(),
  },
  {
    slug: "como-registrar-iniciativa-smis-video",
    tipo: "Vídeo",
    titulo: "Como registrar uma iniciativa no SMIS",
    resumo:
      "Tutorial passo a passo para educadores que estão começando a usar a plataforma.",
    data: "2026-09-15",
    autor: "Equipe SMIS",
    tags: ["tutorial", "SMIS", "vídeo"],
    conteudo: `
Tutorial em vídeo que mostra, passo a passo, como registrar uma iniciativa de sustentabilidade no SMIS-Escolas.

**Duração:** 6min45s
**Público:** educadores e gestores escolares
    `.trim(),
  },
  {
    slug: "guia-rapido-participante",
    tipo: "Documento",
    titulo: "Guia rápido do participante",
    resumo:
      "Material de apoio com instruções sobre acesso, módulos e jornada de aprendizagem.",
    data: "2026-09-10",
    autor: "Equipe CEURS",
    tags: ["guia", "participante", "onboarding"],
    conteudo: `
Guia rápido com orientações essenciais para participantes do CEURS–Escolas:

- Como acessar a plataforma
- Como navegar pelos quatro módulos
- Como participar da comunidade de prática
- Como registrar iniciativas no SMIS
- Como obter suporte

**Formato:** PDF
**Páginas:** 12
    `.trim(),
  },
];

export function getMediaBySlug(slug: string): MediaItem | undefined {
  return mediaItems.find((m) => m.slug === slug);
}

/* ============================================================
   ESTATÍSTICAS
   ============================================================ */

export const kpis: Kpi[] = [
  {
    slug: "escolas",
    label: "Escolas participantes",
    value: "200+",
    valueNumerico: 208,
    hint: "em 5 regiões do país",
    descricao:
      "Número de escolas públicas que aderiram formalmente ao programa CEURS–Escolas e possuem ao menos um educador cadastrado na plataforma.",
    metodologia:
      "Contagem de escolas com vínculo ativo no sistema de identidade, com pelo menos uma matrícula confirmada em qualquer módulo do programa. Atualização mensal.",
    serieHistorica: [
      { periodo: "2026-06", valor: 42 },
      { periodo: "2026-07", valor: 87 },
      { periodo: "2026-08", valor: 134 },
      { periodo: "2026-09", valor: 178 },
      { periodo: "2026-10", valor: 208 },
    ],
    distribuicao: [
      { categoria: "Sudeste", valor: 78 },
      { categoria: "Nordeste", valor: 52 },
      { categoria: "Sul", valor: 41 },
      { categoria: "Centro-Oeste", valor: 22 },
      { categoria: "Norte", valor: 15 },
    ],
  },
  {
    slug: "educadores",
    label: "Educadores formados",
    value: "1.240",
    valueNumerico: 1240,
    hint: "professores e gestores",
    descricao:
      "Total de educadores (professores, coordenadores, diretores e gestores) que concluíram ao menos um módulo de formação do programa.",
    metodologia:
      "Somatório de certificados emitidos pelo AVA/Moodle, considerando matrículas com progresso ≥ 80% e avaliação final aprovada. Atualização semanal.",
    serieHistorica: [
      { periodo: "2026-06", valor: 180 },
      { periodo: "2026-07", valor: 420 },
      { periodo: "2026-08", valor: 760 },
      { periodo: "2026-09", valor: 1050 },
      { periodo: "2026-10", valor: 1240 },
    ],
    distribuicao: [
      { categoria: "Professores", valor: 720 },
      { categoria: "Coordenadores", valor: 280 },
      { categoria: "Diretores", valor: 180 },
      { categoria: "Outros", valor: 60 },
    ],
  },
  {
    slug: "iniciativas",
    label: "Iniciativas mapeadas",
    value: "860",
    valueNumerico: 860,
    hint: "no SMIS-Escolas",
    descricao:
      "Total de iniciativas de sustentabilidade registradas e validadas por seus autores no SMIS-Escolas.",
    metodologia:
      "Contagem de registros com status 'validado pelo autor' no SMIS-Escolas. Rascunhos e registros não validados não entram na contagem. Atualização semanal.",
    serieHistorica: [
      { periodo: "2026-07", valor: 95 },
      { periodo: "2026-08", valor: 320 },
      { periodo: "2026-09", valor: 610 },
      { periodo: "2026-10", valor: 860 },
    ],
    distribuicao: [
      { categoria: "Horta escolar", valor: 327 },
      { categoria: "Compostagem", valor: 206 },
      { categoria: "Reciclagem", valor: 155 },
      { categoria: "Energia limpa", valor: 103 },
      { categoria: "Mobilidade sustentável", valor: 69 },
    ],
  },
  {
    slug: "municipios",
    label: "Municípios alcançados",
    value: "72",
    valueNumerico: 72,
    hint: "em 18 estados",
    descricao:
      "Número de municípios brasileiros com pelo menos uma escola participante do programa.",
    metodologia:
      "Contagem de municípios únicos a partir do cadastro INEP das escolas vinculadas. Atualização mensal.",
    serieHistorica: [
      { periodo: "2026-06", valor: 18 },
      { periodo: "2026-07", valor: 34 },
      { periodo: "2026-08", valor: 51 },
      { periodo: "2026-09", valor: 64 },
      { periodo: "2026-10", valor: 72 },
    ],
    distribuicao: [
      { categoria: "SP", valor: 14 },
      { categoria: "MG", valor: 11 },
      { categoria: "BA", valor: 8 },
      { categoria: "PR", valor: 7 },
      { categoria: "RS", valor: 6 },
      { categoria: "Outros", valor: 26 },
    ],
  },
];

export function getKpiBySlug(slug: string): Kpi | undefined {
  return kpis.find((k) => k.slug === slug);
}

export const iniciativasPorTipo: IniciativaPorTipo[] = [
  { tipo: "Horta escolar", valor: 38 },
  { tipo: "Compostagem", valor: 24 },
  { tipo: "Reciclagem", valor: 18 },
  { tipo: "Energia limpa", valor: 12 },
  { tipo: "Mobilidade sustentável", valor: 8 },
];