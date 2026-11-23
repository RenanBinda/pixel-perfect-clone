import { useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { authStore } from "@/lib/auth-store";

type Props = { onForgot: () => void };

const providers = [
  { id: "google", label: "Google", mark: "G", className: "text-[#4285f4]" },
  {
    id: "microsoft",
    label: "Microsoft",
    mark: "⊞",
    className: "text-[#f25022] text-lg",
  },
] as const;

const otherProviders = [
  { id: "apple", label: "Apple", mark: "" },
  { id: "facebook", label: "Facebook", mark: "f" },
  { id: "linkedin", label: "LinkedIn", mark: "in" },
  { id: "x", label: "X", mark: "𝕏" },
] as const;

export function LoginForm({ onForgot }: Props) {
  const navigate = useNavigate();

  // 🔑 Lê o parâmetro ?redirect= da URL
  const { redirect: redirectTo } = useSearch({ from: "/login" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState<{
    kind: "info" | "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage({
        kind: "error",
        text: "Informe seu e-mail para continuar.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({
        kind: "error",
        text: "E-mail não reconhecido. Verifique ou solicite acesso.",
      });
      return;
    }
    if (password.length < 6) {
      setMessage({
        kind: "error",
        text: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    setLoading(true);
    try {
      await authStore.signIn(email, password);
      setMessage({ kind: "success", text: "Bem-vindo(a)! Redirecionando..." });
      // Sessão já confirmada no store: navega imediatamente.
      const destino =
        redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/conta";
      await navigate({ to: destino, replace: true });
    } catch (err) {
      setMessage({
        kind: "error",
        text:
          err instanceof Error
            ? err.message
            : "Não foi possível entrar. Tente novamente.",
      });
      setLoading(false);
    }
  }

  function handleProvider(_providerId: string, label: string) {
    setMessage({
      kind: "info",
      text: `Conexão com ${label} será ativada quando o backend OAuth for integrado.`,
    });
  }

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow text-teal">Área do participante</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Entre para continuar
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {redirectTo
            ? "Faça login para acessar a página solicitada."
            : "Retome sua jornada de aprendizagem no território."}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail institucional ou pessoal</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <button
                type="button"
                onClick={onForgot}
                className="text-xs font-semibold text-navy underline-offset-4 hover:text-teal hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:text-navy"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <Checkbox
              checked={remember}
              onCheckedChange={(v) => setRemember(v === true)}
            />
            Lembrar meu acesso neste dispositivo
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-6 w-full justify-between"
          disabled={loading}
        >
          {loading ? (
            <>
              Entrando... <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Entrar na plataforma <span aria-hidden>→</span>
            </>
          )}
        </Button>

        {message && (
          <p
            role={message.kind === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`mt-3 text-xs font-semibold ${
              message.kind === "error"
                ? "text-red-600"
                : message.kind === "success"
                  ? "text-teal"
                  : "text-navy"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>

      <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="h-px flex-1 bg-line" />
        ou continue com
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {providers.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleProvider(p.id, p.label)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-card px-3 text-sm font-semibold text-navy transition-all hover:border-teal hover:shadow-soft"
          >
            <span
              aria-hidden
              className={`text-base font-extrabold ${p.className}`}
            >
              {p.mark}
            </span>
            {p.label}
          </button>
        ))}
      </div>

      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-center text-xs font-semibold text-muted-foreground transition-colors hover:text-navy">
          Outras formas de acesso
        </summary>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {otherProviders.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleProvider(p.id, p.label)}
              className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-line bg-card px-3 text-xs font-semibold text-navy transition-all hover:border-teal"
            >
              <span aria-hidden className="text-sm font-bold">
                {p.mark}
              </span>
              {p.label}
            </button>
          ))}
        </div>
      </details>

      <div className="mt-8 space-y-2 text-center text-xs text-muted-foreground">
        <p>
          Não tem conta?{" "}
          <Link
            to="/signup"
            className="font-semibold text-navy underline-offset-4 hover:text-teal hover:underline"
          >
            Criar conta
          </Link>
        </p>
        <p>
          Ou{" "}
          <Link
            to="/solicitar-acesso"
            className="font-semibold text-navy underline-offset-4 hover:text-teal hover:underline"
          >
            solicite um convite
          </Link>{" "}
          para o programa.
        </p>
      </div>
    </div>
  );
}