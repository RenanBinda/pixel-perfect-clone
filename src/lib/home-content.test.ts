import { describe, expect, it } from "vitest";
import { defaultContent, defaultRecords, homeContentSchema, normalizeRecords } from "./home-content";

describe("Publicação dos caminhos", () => {
  it("mantém edição de diretor isolada do líder e da comunidade", () => {
    const content = defaultContent("diretor");
    content.hero.primary.to = "/iniciativas";
    const records = normalizeRecords([{ profile: "diretor", content, revision: 2, updated_at: "2026-11-23T00:00:00Z" }]);
    expect(records.diretor.content.hero.primary.to).toBe("/iniciativas");
    expect(records.lider.content.hero.primary.to).toBe("/smis/iniciativas");
    expect(records.comunidade.content.hero.primary.to).toBe("/curso/trilhas");
  });
  it("restauração não altera outros perfis nem os padrões originais", () => {
    const records = defaultRecords();
    records.diretor.content.hero.primary.to = "/conta";
    records.diretor.content = defaultContent("diretor");
    expect(records.diretor.content.hero.primary.to).toBe("/smis/credenciamento");
    expect(defaultContent("diretor").hero.primary.to).toBe("/smis/credenciamento");
    expect(records.lider.content.hero.primary.to).toBe("/smis/iniciativas");
  });
  it("bloqueia destinos externos e execução de scripts", () => {
    const content = defaultContent("visitante");
    expect(homeContentSchema.safeParse({ ...content, hero: { ...content.hero, primary: { ...content.hero.primary, to: "https://other.example" } } }).success).toBe(false);
    expect(homeContentSchema.safeParse({ ...content, card: { ...content.card, action: { ...content.card.action, to: "javascript:alert(1)" } } }).success).toBe(false);
  });
  it("aceita imagem HTTPS mas exige descrição para imagem de cartão", () => {
    const content = defaultContent("lider");
    content.card.image = "https://example.org/school.jpg";
    expect(homeContentSchema.safeParse(content).success).toBe(false);
    content.card.imageAlt = "Escola";
    expect(homeContentSchema.safeParse(content).success).toBe(true);
    content.card.image = "data:image/svg+xml,test";
    expect(homeContentSchema.safeParse(content).success).toBe(false);
  });
  it("ignora conteúdo inválido ou perfil desconhecido sem perder padrões", () => {
    const records = normalizeRecords([{ profile: "diretor", content: {}, revision: 1, updated_at: "2026-11-23T00:00:00Z" }, { profile: "intruso", content: defaultContent("diretor"), revision: 1, updated_at: "2026-11-23T00:00:00Z" }]);
    expect(records.diretor.revision).toBe(0);
    expect(Object.keys(records)).toHaveLength(5);
  });
});