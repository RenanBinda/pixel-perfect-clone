import { describe, expect, it } from "vitest";
import { agruparLocalizacoes } from "../mapa-iniciativas";
import { MOCK_INICIATIVAS } from "../smis";

describe("pins da vitrine", () => {
  it("agrupa as duas iniciativas de São Paulo sem sobrepor pins", () => {
    const grupos = agruparLocalizacoes(MOCK_INICIATIVAS);
    expect(grupos).toHaveLength(2);
    expect(grupos.find((grupo) => grupo.coordenadas[0] === -23.5505)?.iniciativas.map((i) => i.id)).toEqual(["ini_003", "ini_006"]);
  });
  it("não inventa coordenadas para compostagem nem mostra rascunhos", () => {
    const ids = agruparLocalizacoes(MOCK_INICIATIVAS).flatMap((grupo) => grupo.iniciativas.map((i) => i.id));
    expect(ids).toEqual(["ini_001", "ini_003", "ini_006"]);
  });
  it("aplica os mesmos resultados filtrados aos pins", () => {
    const grupos = agruparLocalizacoes(MOCK_INICIATIVAS.filter((i) => i.tema === "agua"));
    expect(grupos).toHaveLength(1);
    expect(grupos[0]?.iniciativas[0]?.id).toBe("ini_003");
    expect(agruparLocalizacoes([])).toEqual([]);
  });
  it("ignora coordenadas inválidas", () => {
    const iniciativa = MOCK_INICIATIVAS[0];
    if (!iniciativa) throw new Error("Dados de exemplo ausentes");
    expect(agruparLocalizacoes([{ ...iniciativa, coordenadas: [91, 0] }])).toEqual([]);
    expect(agruparLocalizacoes([{ ...iniciativa, coordenadas: [0, NaN] }])).toEqual([]);
  });
});