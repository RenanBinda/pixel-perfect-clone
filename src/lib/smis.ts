/**
 * SMIS-Escolas — Sistema de Mapeamento de Iniciativas de Sustentabilidade.
 *
 * Tipos, dados mockados e helpers. Substituir as funções `fetch*`
 * por chamadas ao backend Python quando estiver pronto.
 *
 * NOTA: a estrutura 5W2H é usada no CADASTRO (formulário), mas NÃO
 * é apresentada explicitamente na leitura da iniciativa. Na página
 * de detalhe, o conteúdo é lido como narrativa contínua.
 */

/* ============================================================
   TIPOS
   ============================================================ */
import hortaImg from "@/assets/horta.jpg";
import compostagemImg from "@/assets/compostagem.jpg";
import captacaoImg from "@/assets/captacao.webp";
import polinizadoresImg from "@/assets/polinizadores.jpg";
import mobilidadeImg from "@/assets/mobilidade.avif";
import energiaImg from "@/assets/energia.jpeg";



export type IniciativaStatus = "rascunho" | "publicada" | "arquivada";

export type IniciativaTema =
  | "agua"
  | "residuos"
  | "energia"
  | "alimentacao"
  | "mobilidade"
  | "biodiversidade";

export type Iniciativa = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  status: IniciativaStatus;
  tema: IniciativaTema;
  escola: string;
  autor: string;
  dataCriacao: string;
  dataAtualizacao: string;

  /** URL da imagem de capa (opcional). */
  imagemCapa?: string | undefined;
  /** Latitude/longitude; exemplos usam o centro do município, não a escola. */
  coordenadas?: [number, number];
  localizacaoMapa?: string;

  // Estrutura 5W2H — usada no cadastro, mas NÃO exibida como tabela.
  // Na leitura, esses campos são combinados em um texto narrativo.
  what: string;
  why: string;
  who: string;
  where: string;
  when: string;
  how: string;
  howMuch: string;

  // Metadados
  ods?: number[];
  tags?: string[];
};

export type IniciativaInput = Omit<
  Iniciativa,
  "id" | "slug" | "dataCriacao" | "dataAtualizacao" | "autor"
>;

/* ============================================================
   MAPEAMENTOS
   ============================================================ */

export const TEMA_LABEL: Record<IniciativaTema, string> = {
  agua: "Água",
  residuos: "Resíduos",
  energia: "Energia",
  alimentacao: "Alimentação",
  mobilidade: "Mobilidade",
  biodiversidade: "Biodiversidade",
};

export const TEMA_ICON: Record<IniciativaTema, string> = {
  agua: "💧",
  residuos: "♻️",
  energia: "⚡",
  alimentacao: "🌱",
  mobilidade: "🚲",
  biodiversidade: "🌳",
};

export const TEMA_COLOR: Record<
  IniciativaTema,
  { bg: string; text: string; border: string }
> = {
  agua: { bg: "bg-teal/10", text: "text-teal", border: "border-teal/30" },
  residuos: { bg: "bg-orange/10", text: "text-orange", border: "border-orange/30" },
  energia: { bg: "bg-amber/15", text: "text-amber-700", border: "border-amber/30" },
  alimentacao: { bg: "bg-teal/15", text: "text-teal-700", border: "border-teal/40" },
  mobilidade: { bg: "bg-navy/10", text: "text-navy", border: "border-navy/30" },
  biodiversidade: { bg: "bg-teal/10", text: "text-teal-800", border: "border-teal/30" },
};

export const STATUS_LABEL: Record<IniciativaStatus, string> = {
  rascunho: "Rascunho",
  publicada: "Publicada",
  arquivada: "Arquivada",
};

/* ============================================================
   MOCK
   ============================================================ */

export const MOCK_INICIATIVAS: Iniciativa[] = [
  {
    id: "ini_001",
    slug: "horta-comunitaria-sementes-do-amanha",
    titulo: "Horta Comunitária 'Sementes do Amanhã'",
    resumo:
      "Horta escolar com 12 canteiros, composteira e irrigação por gotejamento, mantida por estudantes e famílias da comunidade.",
    status: "publicada",
    tema: "alimentacao",
    escola: "Escola Municipal Vila Verde",
    autor: "Maria Clara Andrade",
    dataCriacao: "2026-03-15",
    dataAtualizacao: "2026-10-20",
    imagemCapa: hortaImg,
    coordenadas: [-27.5954, -48.548],
    localizacaoMapa: "Florianópolis/SC · localização aproximada",
    what: "Uma horta comunitária com 12 canteiros de hortaliças e ervas medicinais, composteira de 1,5 m³ e sistema de irrigação por gotejamento.",
    why: "Promover educação alimentar, reduzir os resíduos orgânicos da merenda e fortalecer os vínculos entre a escola e as famílias.",
    who: "Cerca de 200 estudantes do 4º ao 9º ano, famílias voluntárias, professores de ciências e equipe de coordenação.",
    where: "Pátio traseiro da Escola Municipal Vila Verde, em Florianópolis/SC, em uma área de 60 m².",
    when: "Desde março de 2026, com atividades semanais às quartas-feiras e colheitas mensais.",
    how: "Rotação de equipes por turma; compostagem com restos da merenda; irrigação por gotejamento alimentada por captação de água da chuva.",
    howMuch: "Cerca de R$ 1.200 iniciais em ferramentas, sementes e mudas, com R$ 200 mensais de manutenção.",
    ods: [2, 12, 13],
    tags: ["horta", "compostagem", "alimentação saudável", "comunidade"],
  },
  {
    id: "ini_002",
    slug: "compostagem-residuos-vegetais",
    titulo: "Compostagem de resíduos vegetais",
    resumo:
      "Aproveitamento dos restos de vegetais da merenda para produção de adubo usado na horta.",
    status: "publicada",
    tema: "residuos",
    escola: "Escola Estadual Central",
    autor: "João Pedro Silva",
    dataCriacao: "2026-07-22",
    dataAtualizacao: "2026-09-28",
    imagemCapa: captacaoImg,
    coordenadas: [-23.5505, -46.6333],
    localizacaoMapa: "São Paulo/SP · localização aproximada",
    what: "Uma composteira de 1,5 m³ para resíduos vegetais da merenda.",
    why: "Reduzir em 40% o volume de resíduos orgânicos enviados ao aterro.",
    who: "Equipe de serviço, professores de ciências e estudantes do 6º ano.",
    where: "Área externa próxima à cozinha da Escola Estadual Central.",
    when: "Iniciado em maio de 2026, com manutenção diária.",
    how: "Separação na origem, revolvimento semanal e controle de umidade.",
    howMuch: "R$ 350 em materiais (caixas, termômetro, forquilha).",
    ods: [11, 12],
    tags: ["compostagem", "resíduos", "merenda"],
  },
  {
    id: "ini_003",
    slug: "captacao-agua-chuva",
    titulo: "Captação de água da chuva para irrigação",
    resumo:
      "Sistema de captação em calhas para irrigação dos canteiros e limpeza externa.",
    status: "publicada",
    tema: "agua",
    escola: "Colégio Santa Cruz",
    autor: "Carla Mendes",
    dataCriacao: "2026-06-10",
    dataAtualizacao: "2026-09-15",
    imagemCapa: captacaoImg,
    coordenadas: [-23.5505, -46.6333],
    localizacaoMapa: "São Paulo/SP · localização aproximada",
    what: "Dois reservatórios de 1.000 L conectados às calhas do telhado.",
    why: "Reduzir o consumo de água tratada em até 30% na irrigação.",
    who: "Equipe de manutenção, professores de geografia e estudantes do 8º ano.",
    where: "Telhado e área externa do Colégio Santa Cruz, em São Paulo/SP.",
    when: "Instalado em abril de 2026, em uso contínuo.",
    how: "Calhas, filtro de folhas, reservatório e irrigação por gotejamento.",
    howMuch: "R$ 1.200 em materiais e instalação.",
    ods: [6, 11, 12],
    tags: ["água", "captação", "irrigação"],
  },
  {
    id: "ini_004",
    slug: "mobilidade-ativa-caminhos-seguros",
    titulo: "Mobilidade ativa e caminhos seguros",
    resumo:
      "Mapeamento colaborativo de rotas seguras para estudantes irem a pé ou de bicicleta.",
    status: "rascunho",
    tema: "mobilidade",
    escola: "Escola Municipal Vila Verde",
    autor: "Maria Clara Andrade",
    dataCriacao: "2026-09-20",
    dataAtualizacao: "2026-10-10",
    imagemCapa: mobilidadeImg,
    coordenadas: [-23.5505, -46.6333],
    localizacaoMapa: "São Paulo/SP · localização aproximada",
    what: "Mapeamento colaborativo de rotas seguras casa-escola.",
    why: "Reduzir o uso de carro e promover autonomia dos estudantes.",
    who: "Estudantes, famílias, associação de moradores e guarda municipal.",
    where: "Bairro do entorno da Escola Municipal Vila Verde.",
    when: "Fase de mapeamento iniciada em agosto de 2026.",
    how: "Oficinas com famílias, app de mapeamento e sinalização.",
    howMuch: "Em avaliação — depende de parceria com a prefeitura.",
    ods: [3, 11],
    tags: ["mobilidade", "caminhos seguros", "bicicleta"],
  },
  {
    id: "ini_005",
    slug: "energia-solar-cantina",
    titulo: "Energia solar na cantina",
    resumo:
      "Instalação de painéis solares para alimentar a cantina e a iluminação externa.",
    status: "rascunho",
    tema: "energia",
    escola: "Escola Estadual Central",
    autor: "João Pedro Silva",
    dataCriacao: "2026-10-02",
    dataAtualizacao: "2026-10-12",
    imagemCapa: energiaImg,
    coordenadas: [-23.5505, -46.6333],
    localizacaoMapa: "São Paulo/SP · localização aproximada",
    what: "Sistema fotovoltaico de 2 kWp instalado no telhado da cantina.",
    why: "Reduzir a conta de energia e usar a instalação como laboratório vivo.",
    who: "Direção, professores de física e equipe administrativa.",
    where: "Telhado da cantina da Escola Estadual Central.",
    when: "Previsão de instalação: janeiro de 2027.",
    how: "Painéis, inversor e monitoramento pelo próprio grêmio estudantil.",
    howMuch: "Estimativa: R$ 12.000 com possível financiamento.",
    ods: [7, 12, 13],
    tags: ["energia solar", "cantina", "laboratório vivo"],
  },
  {
    id: "ini_006",
    slug: "jardim-polinizadores",
    titulo: "Jardim de polinizadores",
    resumo:
      "Plantio de espécies nativas para atrair abelhas e borboletas ao pátio.",
    status: "publicada",
    tema: "biodiversidade",
    escola: "Colégio Santa Cruz",
    autor: "Carla Mendes",
    dataCriacao: "2026-05-18",
    dataAtualizacao: "2026-09-30",
    imagemCapa: polinizadoresImg,
    coordenadas: [-23.5505, -46.6333],
    localizacaoMapa: "São Paulo/SP · localização aproximada",
    what: "Canteiro de 20 m² com plantas nativas e hotel de insetos.",
    why: "Educar para a biodiversidade e recuperar polinizadores no bairro.",
    who: "Estudantes do 3º ano, professores de biologia e famílias voluntárias.",
    where: "Pátio frontal do Colégio Santa Cruz, em São Paulo/SP.",
    when: "Plantio em março de 2026, com monitoramento mensal.",
    how: "Espécies nativas, hotel de insetos e observação semanal.",
    howMuch: "R$ 480 em mudas, substrato e materiais.",
    ods: [15, 4, 11],
    tags: ["biodiversidade", "polinizadores", "jardim"],
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

export function formatDate(iso: string): string {
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

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Constrói um texto narrativo a partir dos campos 5W2H. */
export function narrativaIniciativa(i: Iniciativa): string {
  const partes = [i.what, i.why, i.how].filter(Boolean);
  return partes.join(" ");
}

function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ============================================================
   API MOCK
   ============================================================ */

export async function fetchIniciativas(): Promise<Iniciativa[]> {
  return delay(MOCK_INICIATIVAS);
}

export async function fetchIniciativaById(id: string): Promise<Iniciativa> {
  const found = MOCK_INICIATIVAS.find((i) => i.id === id || i.slug === id);
  if (!found) {
    throw new Error(`Iniciativa "${id}" não encontrada.`);
  }
  return delay(found);
}

export async function criarIniciativa(
  input: IniciativaInput,
): Promise<Iniciativa> {
  const now = new Date().toISOString().slice(0, 10);
  const nova: Iniciativa = {
    ...input,
    id: `ini_${Date.now().toString(36)}`,
    slug: slugify(input.titulo),
    autor: "Você",
    dataCriacao: now,
    dataAtualizacao: now,
  };
  return delay(nova, 700);
}

export async function atualizarIniciativa(
  id: string,
  input: Partial<IniciativaInput>,
): Promise<Iniciativa> {
  const found = MOCK_INICIATIVAS.find((i) => i.id === id);
  if (!found) {
    throw new Error(`Iniciativa "${id}" não encontrada.`);
  }
  return delay({
    ...found,
    ...input,
    dataAtualizacao: new Date().toISOString().slice(0, 10),
  });
}

/* ============================================================
   ESTATÍSTICAS
   ============================================================ */

export type SmisStats = {
  total: number;
  publicadas: number;
  rascunhos: number;
  porTema: Record<IniciativaTema, number>;
};

export function computeStats(iniciativas: Iniciativa[]): SmisStats {
  const stats: SmisStats = {
    total: iniciativas.length,
    publicadas: 0,
    rascunhos: 0,
    porTema: {
      agua: 0,
      residuos: 0,
      energia: 0,
      alimentacao: 0,
      mobilidade: 0,
      biodiversidade: 0,
    },
  };

  for (const i of iniciativas) {
    if (i.status === "publicada") stats.publicadas++;
    if (i.status === "rascunho") stats.rascunhos++;
    stats.porTema[i.tema]++;
  }

  return stats;
}