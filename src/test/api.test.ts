import { describe, expect, it } from "vitest";
import {
  ApiException,
  fetchKpiBySlug,
  fetchMediaBySlug,
  submitSolicitacaoAcesso,
} from "@/lib/api";

describe("api", () => {
  describe("fetchMediaBySlug", () => {
    it("retorna item existente", async () => {
      const item = await fetchMediaBySlug("ceurs-escolas-200-educadores-2026");
      expect(item.titulo).toContain("CEURS–Escolas");
      expect(item.tipo).toBe("Notícia");
    });

    it("lança ApiException para slug inexistente", async () => {
      await expect(fetchMediaBySlug("nao-existe")).rejects.toBeInstanceOf(ApiException);
    });
  });

  describe("fetchKpiBySlug", () => {
    it("retorna KPI existente", async () => {
      const kpi = await fetchKpiBySlug("escolas");
      expect(kpi.label).toBe("Escolas participantes");
      expect(kpi.serieHistorica.length).toBeGreaterThan(0);
    });

    it("lança ApiException para slug inexistente", async () => {
      await expect(fetchKpiBySlug("nao-existe")).rejects.toBeInstanceOf(ApiException);
    });
  });

  describe("submitSolicitacaoAcesso", () => {
    it("aceita payload válido", async () => {
      const resposta = await submitSolicitacaoAcesso({
        nome: "Maria Silva",
        email: "maria@escola.br",
        instituicao: "Escola Municipal X",
        cargo: "Professor(a)",
      });
      expect(resposta.status).toBe("recebida");
      expect(resposta.id).toMatch(/^sol_/);
    });

    it("rejeita e-mail inválido", async () => {
      await expect(
        submitSolicitacaoAcesso({
          nome: "Maria",
          email: "invalido",
          instituicao: "Escola X",
          cargo: "Professor(a)",
        }),
      ).rejects.toMatchObject({ code: "INVALID_EMAIL" });
    });

    it("rejeita payload incompleto", async () => {
      await expect(
        submitSolicitacaoAcesso({
          nome: "",
          email: "teste@escola.br",
          instituicao: "",
          cargo: "Professor(a)",
        }),
      ).rejects.toMatchObject({ code: "INVALID_PAYLOAD" });
    });
  });
});