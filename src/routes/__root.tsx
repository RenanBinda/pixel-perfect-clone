import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/providers/AuthProvider";

/* ---------------------------------------------------------------
   Error reporting
   --------------------------------------------------------------- */
function reportError(error: unknown, context: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.error("[CEURS] Erro capturado:", error, context);
  // Integração futura: Sentry, LogRocket, etc.
}

/* ---------------------------------------------------------------
   NotFound — página 404 em PT-BR com identidade CEURS
   --------------------------------------------------------------- */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow text-teal">Erro 404</p>
        <h1 className="mt-3 text-6xl font-extrabold tracking-tight text-navy md:text-7xl">
          404
        </h1>
        <h2 className="mt-4 text-xl font-bold text-navy md:text-2xl">
          Página não encontrada
        </h2>
        <p className="mt-3 text-muted-foreground">
          O endereço que você procura não existe ou foi movido. Verifique o link
          ou retorne à página inicial.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-navy transition-all hover:brightness-105 focus-visible:outline-none"
          >
            Voltar à página inicial
          </Link>
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-navy px-5 py-2.5 text-sm font-bold text-navy transition-all hover:bg-navy hover:text-soft"
          >
            Acessar plataforma
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ErrorComponent — fallback de erro em PT-BR
   --------------------------------------------------------------- */
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft px-4 py-16">
      <div
        role="alert"
        aria-live="assertive"
        className="mx-auto max-w-lg text-center"
      >
        <p className="eyebrow text-orange">Algo saiu do previsto</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Não foi possível carregar esta página
        </h1>
        <p className="mt-3 text-muted-foreground">
          Ocorreu um erro inesperado. Você pode tentar novamente ou voltar à
          página inicial.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-navy transition-all hover:brightness-105"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-navy px-5 py-2.5 text-sm font-bold text-navy transition-all hover:bg-navy hover:text-soft"
          >
            Voltar à página inicial
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Root Route
   --------------------------------------------------------------- */
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#0A3153" },
      { name: "color-scheme", content: "light" },
      { title: "CEURS–Escolas" },
      {
        name: "description",
        content:
          "Plataforma de formação de Agentes Locais de Sustentabilidade — CEURS–Escolas.",
      },
      { name: "author", content: "CEURS · UFSC · MCTI · Parlamento · USP" },
      { property: "og:site_name", content: "CEURS–Escolas" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },

      /* PWA / iOS / Android */
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "CEURS" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { name: "application-name", content: "CEURS–Escolas" },

      /* SEO */
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* ---------------------------------------------------------------
   RootShell
   --------------------------------------------------------------- */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-soft text-ink antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:font-bold focus:text-navy focus:shadow-lg"
        >
          Pular para o conteúdo
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* ---------------------------------------------------------------
   RootComponent
   --------------------------------------------------------------- */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{ classNames: { toast: "font-sans" } }}
      />
    </QueryClientProvider>
  );
}