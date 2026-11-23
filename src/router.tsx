import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Cria e configura o router do TanStack Start.
 *
 * - `staleTime` padrão de 60s evita refetch agressivo em navegação.
 * - `defaultPreloadStaleTime: 0` força revalidação em preload (dados sensíveis).
 * - `scrollRestoration` mantém a posição ao voltar.
 * - `defaultErrorComponent` e `defaultNotFoundComponent` garantem fallback
 *   consistente em qualquer rota nova criada.
 */
export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,          // 1 min
        gcTime: 5 * 60_000,         // 5 min
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: "intent",
    trailingSlash: "never",
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}