import type { PapelDominio } from "@/lib/auth-store";

export type PerfilHome = "gestor" | "diretor" | "lider" | "comunidade";

export type AcaoPerfil = { rotulo: string; to: string };

export type ConfigPerfil = {
  perfil: PerfilHome;
  selo: string;
  titulo: string;
  primaria: AcaoPerfil;
  secundaria: AcaoPerfil;
  personaId: string;
};

/** Decide o perfil da página inicial a partir do papel no sistema e do papel na escola. */
export function resolverPerfil(
  papelSistema: string | undefined,
  papelDominio: PapelDominio | undefined,
): PerfilHome {
  if (papelSistema === "admin" || papelSistema === "master") return "gestor";
  if (papelDominio === "diretor" || papelDominio === "gestor-publico") return "diretor";
  if (papelDominio === "coordenador" || papelDominio === "educador") return "lider";
  return "comunidade";
}

export const CONFIG_PERFIL: Record<PerfilHome, ConfigPerfil> = {
  gestor: {
    perfil: "gestor",
    selo: "Gestão do programa",
    titulo: "Acompanhe a rede e as escolas do programa.",
    primaria: { rotulo: "Ir para o painel", to: "/admin" },
    secundaria: { rotulo: "Histórico de reuniões", to: "/admin/reunioes" },
    personaId: "",
  },
  diretor: {
    perfil: "diretor",
    selo: "Diretor(a) de escola",
    titulo: "Engaje sua escola e credencie os líderes das iniciativas.",
    primaria: { rotulo: "Credenciar líderes", to: "/smis/credenciamento" },
    secundaria: { rotulo: "Ver escola no mapa", to: "/iniciativas" },
    personaId: "diretor",
  },
  lider: {
    perfil: "lider",
    selo: "Líder da iniciativa",
    titulo: "Estruture sua prática e dê visibilidade a ela.",
    primaria: { rotulo: "Minhas iniciativas", to: "/smis/iniciativas" },
    secundaria: { rotulo: "Nova iniciativa", to: "/smis/iniciativas/nova" },
    personaId: "promotor",
  },
  comunidade: {
    perfil: "comunidade",
    selo: "Comunidade escolar",
    titulo: "Aprenda na prática e conquiste seu certificado UFSC.",
    primaria: { rotulo: "Continuar curso", to: "/curso/trilhas" },
    secundaria: { rotulo: "Comunidade AWA2030", to: "/awa" },
    personaId: "participante",
  },
};
