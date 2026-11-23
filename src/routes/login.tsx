import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Logo } from "@/components/layout/Logo";
import { LoginStory } from "@/components/login/LoginStory";
import { LoginForm } from "@/components/login/LoginForm";
import { RecoveryForm } from "@/components/login/RecoveryForm";
import { SupportDialog } from "@/components/login/SupportDialog";

/* ============================================================
   SCHEMA DE BUSCA
   ------------------------------------------------------------
   Aceita ?redirect=/smis/painel para voltar à rota desejada
   após o login.
   ============================================================ */

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Entrar · CEURS–Escolas" },
      {
        name: "description",
        content: "Acesse a plataforma de aprendizagem CEURS–Escolas.",
      },
      { property: "og:title", content: "Entrar · CEURS–Escolas" },
      {
        property: "og:description",
        content: "Aprender o território. Transformar o futuro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [view, setView] = useState<"login" | "recovery">("login");

  return (
    <div className="grid min-h-screen lg:grid-cols-[55fr_45fr]">
      <LoginStory />

      <main
        id="conteudo"
        className="flex flex-col bg-soft px-5 py-6 md:px-12 md:py-8"
      >
        <header className="flex items-center justify-between gap-4 text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar ao site
          </Link>

          <SupportDialog />
        </header>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <Link
            to="/"
            className="mb-10 inline-block lg:hidden"
            aria-label="CEURS – página inicial"
          >
            <Logo />
          </Link>

          {view === "login" ? (
            <LoginForm onForgot={() => setView("recovery")} />
          ) : (
            <RecoveryForm onBack={() => setView("login")} />
          )}
        </div>

        <footer className="text-center text-[10px] leading-relaxed text-muted-foreground">
          Ao entrar, você concorda com os{" "}
          <Link
            to="/termos"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link
            to="/privacidade"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Política de Privacidade
          </Link>
          .
        </footer>
      </main>
    </div>
  );
}