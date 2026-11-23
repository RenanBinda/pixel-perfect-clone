import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  server: {
    port: 5173,
    host: true,
  },

  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
  ],

  resolve: {
    tsconfigPaths: true,
  },

  build: {
    target: "es2022",
    sourcemap: mode !== "production",
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 800,

    /* ============================================================
       Rolldown (Vite 8) só aceita `manualChunks` como FUNÇÃO.
       A versão como objeto é do Rollup antigo — causa o erro
       "Expected Function but received Object".
       ============================================================ */
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // TanStack Router / Start
          if (
            id.includes("@tanstack/react-router") ||
            id.includes("@tanstack/react-start") ||
            id.includes("@tanstack/router")
          ) {
            return "vendor-router";
          }
          // TanStack Query
          if (id.includes("@tanstack/react-query")) {
            return "vendor-query";
          }
          // Radix UI (shadcn)
          if (id.includes("@radix-ui/")) {
            return "vendor-ui";
          }
          // Ícones
          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }
          // Formulários
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform/resolvers") ||
            id.includes("zod")
          ) {
            return "vendor-form";
          }
          // Sonner (toasts)
          if (id.includes("sonner")) {
            return "vendor-toast";
          }
          // Sem chunk específico
          return undefined;
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-query",
      "sonner",
    ],
  },
}));