import { QueryClient } from "@tanstack/react-query";
import { createRouter, createMemoryHistory } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth-store", () => ({
  authStore: {
    init: vi.fn(async () => undefined),
    getState: () => ({ status: "unauthenticated", usuario: null }),
    subscribe: () => () => undefined,
  },
  useUsuario: () => null,
  useAuthState: () => ({ status: "unauthenticated", usuario: null }),
}));

import { routeTree } from "@/routeTree.gen";
import { Route as adminRoute } from "@/routes/admin";

describe("Administrative access on direct navigation", () => {
  it("defers the entire admin tree until the browser can check the session", () => {
    expect(adminRoute.options.ssr).toBe(false);
  });

  it.each(["/admin/reunioes", "/admin/documentacao"])(
    "redirects signed-out access to %s to login with its return path",
    async (path) => {
      const router = createRouter({
        routeTree,
        context: { queryClient: new QueryClient() },
        history: createMemoryHistory({ initialEntries: [path] }),
      });
      await router.load();
      expect(router.state.location.pathname).toBe("/login");
      expect(router.state.location.search).toMatchObject({ redirect: path });
    },
  );
});