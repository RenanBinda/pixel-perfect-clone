import { z } from "zod";
import { CONFIG_PERFIL } from "./perfil-home";

export const PROFILE_IDS = ["visitante", "diretor", "lider", "comunidade", "gestor"] as const;
export type HomeProfile = (typeof PROFILE_IDS)[number];
export const PROFILE_LABELS: Record<HomeProfile, string> = {
  visitante: "Visitante / Público interessado", diretor: "Diretor de escola", lider: "Líder da iniciativa", comunidade: "Comunidade escolar", gestor: "Admin / Master",
};
export const DESTINATIONS = [
  { to: "/solicitar-acesso", label: "Participar do programa" },
  { to: "/iniciativas", label: "Vitrine de iniciativas" },
  { to: "/smis/credenciamento", label: "Credenciar líderes" },
  { to: "/smis/iniciativas", label: "Minhas iniciativas" },
  { to: "/smis/iniciativas/nova", label: "Nova iniciativa" },
  { to: "/curso/trilhas", label: "Curso de formação" },
  { to: "/awa", label: "Comunidade de prática" },
  { to: "/conta", label: "Minha conta" },
  { to: "/admin", label: "Painel administrativo" },
  { to: "/admin/reunioes", label: "Histórico de reuniões" },
] as const;
const destinationSchema = z.enum(["/solicitar-acesso", "/iniciativas", "/smis/credenciamento", "/smis/iniciativas", "/smis/iniciativas/nova", "/curso/trilhas", "/awa", "/conta", "/admin", "/admin/reunioes"]);
export const ICON_IDS = ["school", "clipboard", "graduation", "map", "users", "leaf", "compass", "award"] as const;
const text = (max: number) => z.string().trim().min(1, "Preencha este campo.").max(max, `Use até ${max} caracteres.`);
const image = z.string().max(2048).refine((value) => {
  if (!value) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}, "Use um endereço de imagem HTTPS ou deixe vazio.");
const action = z.object({ rotulo: text(48), to: destinationSchema });
export const homeContentSchema = z.object({
  hero: z.object({ eyebrow: text(80), heading: text(140), description: text(300), image, badge: text(64), welcome: text(180), primary: action, secondary: action }),
  card: z.object({ title: text(80), description: text(240), benefit: text(48), icon: z.enum(ICON_IDS), image, imageAlt: z.string().max(120), action }),
}).strict().superRefine((value, ctx) => {
  if (value.card.image && !value.card.imageAlt.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["card", "imageAlt"], message: "Descreva a imagem para acessibilidade." });
});
export type HomeContent = z.infer<typeof homeContentSchema>;
export type HomeRecord = { content: HomeContent; revision: number; updatedAt: string | null };
export type HomeRecords = Record<HomeProfile, HomeRecord>;
const heroBase = {
  eyebrow: "Programa CEURS–Escolas", heading: "Sua escola pode transformar o território onde está.",
  description: "Um programa de formação, comunidade e mapeamento de práticas sustentáveis que conecta educadores, estudantes e gestores em rede.", image: "",
};
const cards: Record<HomeProfile, HomeContent["card"]> = {
  diretor: { title: "Sou diretor(a)", description: "Quero engajar minha escola, dar visibilidade às práticas e credenciar os líderes das iniciativas.", benefit: "Visibilidade da escola", icon: "school", image: "", imageAlt: "", action: { rotulo: "Participar do programa", to: "/solicitar-acesso" } },
  lider: { title: "Sou líder de uma iniciativa", description: "Tenho um projeto sustentável na escola e quero estruturá-lo e conectá-lo a outras escolas.", benefit: "Método 5W2H", icon: "clipboard", image: "", imageAlt: "", action: { rotulo: "Mapear meu projeto", to: "/smis/iniciativas/nova" } },
  comunidade: { title: "Faço parte da comunidade escolar", description: "Sou aluno, professor, funcionário ou familiar e quero aprender e participar das ações da escola.", benefit: "Certificado UFSC", icon: "graduation", image: "", imageAlt: "", action: { rotulo: "Começar o curso", to: "/curso/trilhas" } },
  visitante: { title: "Quero conhecer e apoiar", description: "Quero explorar iniciativas reais e apoiar escolas de todo o país.", benefit: "Acesso livre", icon: "map", image: "", imageAlt: "", action: { rotulo: "Explorar iniciativas", to: "/iniciativas" } },
  gestor: { title: "Gestão do programa", description: "Acompanhe a rede e as escolas do programa.", benefit: "Administração", icon: "users", image: "", imageAlt: "", action: { rotulo: "Ir para o painel", to: "/admin" } },
};
export function defaultContent(profile: HomeProfile): HomeContent {
  const config = profile === "visitante" ? null : CONFIG_PERFIL[profile];
  return homeContentSchema.parse({
    hero: { ...heroBase, badge: config?.selo ?? "Acesso livre", welcome: config?.titulo ?? "Conheça a rede e encontre seu caminho.", primary: config?.primaria ?? { rotulo: "Participar do programa", to: "/solicitar-acesso" }, secondary: config?.secundaria ?? { rotulo: "Explorar iniciativas", to: "/iniciativas" } },
    card: cards[profile],
  });
}
export function defaultRecords(): HomeRecords {
  return Object.fromEntries(PROFILE_IDS.map((profile) => [profile, { content: defaultContent(profile), revision: 0, updatedAt: null }])) as HomeRecords;
}
export function normalizeRecords(rows: { profile: string; content: unknown; revision: number; updated_at: string }[]): HomeRecords {
  const result = defaultRecords();
  for (const row of rows) {
    const profile = PROFILE_IDS.find((id) => id === row.profile);
    const parsed = homeContentSchema.safeParse(row.content);
    if (profile && parsed.success) result[profile] = { content: parsed.data, revision: row.revision, updatedAt: row.updated_at };
  }
  return result;
}
