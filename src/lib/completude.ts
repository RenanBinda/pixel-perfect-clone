import type { W2HFormValues } from "@/components/smis/W2HForm";

export type Vinculo = "lider" | "participante" | "conhecida";

export const VINCULO_OPCOES: { value: Vinculo; label: string }[] = [
  { value: "lider", label: "Sou o líder responsável por esta iniciativa na minha escola" },
  { value: "participante", label: "Sou participante/colaborador desta iniciativa" },
  { value: "conhecida", label: "Estou documentando uma prática que conheço/pesquisei na escola" },
];

/** 12 itens contados: 11 campos do formulário + vínculo. */
export function calcularCompletude(v: W2HFormValues, vinculo: Vinculo | ""): number {
  const campos = [v.titulo, v.resumo, v.tema, v.escola, v.what, v.why, v.who, v.where, v.when, v.how, v.howMuch, vinculo];
  const preenchidos = campos.filter((c) => String(c).trim() !== "").length;
  return Math.round((preenchidos / campos.length) * 100);
}

export function nivelCompletude(p: number): "inicial" | "em andamento" | "completa" {
  if (p >= 100) return "completa";
  if (p >= 60) return "em andamento";
  return "inicial";
}
