import { describe, it, expect } from "vitest";
import { nivelAcesso, PERMISSOES, metricaTerritorial } from "../acesso-iniciativa";

const u = (nome: string, papelSistema: any) => ({ id: "1", nome, email: "a@b", papelSistema, iniciais: "A" });

describe("níveis de acesso", () => {
  it("visitante vê só a vitrine", () => {
    expect(nivelAcesso(null, { autor: "Ana" })).toBe("publico");
    expect(PERMISSOES.publico.interagir).toBe(false);
  });
  it("autor é líder e edita", () => {
    expect(nivelAcesso(u("Ana", "participante"), { autor: "Ana" })).toBe("lider");
  });
  it("comunidade escolar interage mas não edita nem vê orçamento", () => {
    expect(nivelAcesso(u("Bia", "participante"), { autor: "Ana" })).toBe("comunidade");
    expect(PERMISSOES.comunidade.editar).toBe(false);
    expect(PERMISSOES.comunidade.verOrcamento).toBe(false);
  });
  it("master é líder", () => {
    expect(nivelAcesso(u("X", "master"), { autor: "Ana" })).toBe("lider");
  });
});

describe("métrica territorial", () => {
  it("calcula média por escola", () => {
    const m = metricaTerritorial([{ escola: "A" }, { escola: "A" }, { escola: "B" }]);
    expect(m.escolas).toBe(2);
    expect(m.media).toBe(1.5);
  });
});
