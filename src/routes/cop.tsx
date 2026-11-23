import { createFileRoute, redirect } from "@tanstack/react-router";

// A Comunidade de Prática (CoP) é o AWA2030 — rota antiga redireciona.
export const Route = createFileRoute("/cop")({
  beforeLoad: () => {
    throw redirect({ to: "/awa" });
  },
});
