import { describe, it, expect } from "vitest";
import { calcularCompletude, nivelCompletude } from "../completude";
import { EMPTY_FORM } from "@/components/smis/W2HForm";

describe("completude", () => {
  it("formulário vazio conta só o tema (1 de 12)", () => {
    expect(calcularCompletude(EMPTY_FORM, "")).toBe(8);
  });
  it("tudo preenchido = 100% e completa", () => {
    const f = Object.fromEntries(Object.keys(EMPTY_FORM).map((k) => [k, "x"])) as typeof EMPTY_FORM;
    expect(calcularCompletude(f, "lider")).toBe(100);
    expect(nivelCompletude(100)).toBe("completa");
  });
  it("60% é em andamento", () => {
    expect(nivelCompletude(60)).toBe("em andamento");
    expect(nivelCompletude(59)).toBe("inicial");
  });
});
