import { describe, it, expect } from "vitest";
import { resolverPerfil } from "./perfil-home";
describe("resolverPerfil", () => {
  it("master vira gestor", () => expect(resolverPerfil("master", "diretor")).toBe("gestor"));
  it("diretor", () => expect(resolverPerfil("participante", "diretor")).toBe("diretor"));
  it("educador vira líder", () => expect(resolverPerfil(undefined, "educador")).toBe("lider"));
  it("estudante vira comunidade", () => expect(resolverPerfil(undefined, "estudante")).toBe("comunidade"));
});
