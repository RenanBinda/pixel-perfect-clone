import type { Usuario } from "@/lib/auth-store";

export type NivelAcesso = "lider" | "comunidade" | "publico";

/** Líder (autor, Admin ou Master) edita; Comunidade escolar (logado) vê tudo exceto orçamento e interage; Público vê só a vitrine. */
export function nivelAcesso(usuario: Usuario | null, iniciativa: { autor: string }): NivelAcesso {
  if (!usuario) return "publico";
  if (usuario.papelSistema === "admin" || usuario.papelSistema === "master") return "lider";
  if (usuario.nome.trim().toLowerCase() === iniciativa.autor.trim().toLowerCase()) return "lider";
  return "comunidade";
}

export const PERMISSOES: Record<NivelAcesso, { editar: boolean; verOrcamento: boolean; interagir: boolean }> = {
  lider: { editar: true, verOrcamento: true, interagir: true },
  comunidade: { editar: false, verOrcamento: false, interagir: true },
  publico: { editar: false, verOrcamento: false, interagir: false },
};

/** Compara quantas iniciativas cada escola tem com a média das escolas. */
export function metricaTerritorial(iniciativas: { escola: string }[]) {
  const porEscola = new Map<string, number>();
  for (const i of iniciativas) porEscola.set(i.escola, (porEscola.get(i.escola) ?? 0) + 1);
  const escolas = porEscola.size;
  const media = escolas ? Math.round((iniciativas.length / escolas) * 10) / 10 : 0;
  return { escolas, media, porEscola: [...porEscola.entries()].sort((a, b) => b[1] - a[1]) };
}
