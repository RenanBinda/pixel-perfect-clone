import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authStore, type PapelDominio } from "@/lib/auth-store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Criar conta · CEURS–Escolas" },
      {
        name: "description",
        content: "Cadastro de participantes na plataforma CEURS–Escolas.",
      },
      { property: "og:title", content: "Criar conta · CEURS–Escolas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SignupPage,
});

const PAPEIS_DOMINIO: { value: PapelDominio; label: string }[] = [
  { value: "educador", label: "Educador(a)" },
  { value: "coordenador", label: "Coordenador(a) pedagógico(a)" },
  { value: "diretor", label: "Diretor(a)" },
  { value: "estudante", label: "Estudante" },
  { value: "pesquisador", label: "Pesquisador(a)" },
  { value: "gestor-publico", label: "Gestor(a) público(a)" },
  { value: "outro", label: "Outro" },
];

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    papelDominio: "" as PapelDominio | "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.nome.trim()) {
      setMessage({ kind: "error", text: "Informe seu nome completo." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage({ kind: "error", text: "Informe um e-mail válido." });
      return;
    }
    if (form.password.length < 6) {
      setMessage({
        kind: "error",
        text: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage({ kind: "error", text: "As senhas não coincidem." });
      return;
    }
    if (!form.papelDominio) {
      setMessage({
        kind: "error",
        text: "Selecione seu papel na escola ou instituição.",
      });
      return;
    }

    setStatus("loading");

    try {
      await authStore.signUp({
        email: form.email,
        password: form.password,
        nome: form.nome,
        papelDominio: form.papelDominio as PapelDominio,
      });

      setStatus("success");
      setMessage({
        kind: "success",
        text: "Conta criada com sucesso! Redirecionando para o login...",
      });
      setTimeout(() => navigate({ to: "/login" }), 2000);
    } catch (err) {
      setStatus("idle");
      setMessage({
        kind: "error",
        text:
          err instanceof Error
            ? err.message
            : "Não foi possível criar a conta. Tente novamente.",
      });
    }
  }

  // Estado de sucesso
  if (status === "success") {
    return (
      <SiteShell>
        <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-teal">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Conta criada!
            </h1>
            <p className="mt-4 text-muted-foreground">{message?.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/login">Ir para o login</Link>
              </Button>
            </div>
          </div>
        </section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="container-page py-12 md:py-20">
        <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Contexto lateral */}
          <aside className="lg:pt-8">
            <p className="eyebrow text-teal">Acesso por convite</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl">
              Crie sua conta no CEURS–Escolas
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Ao criar sua conta, você poderá acessar o SMIS-Escolas, os cursos
              e a comunidade de prática AWA2030.
            </p>

            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              <li className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden
                />
                <div>
                  <p className="font-bold text-navy">Dados protegidos</p>
                  <p className="text-sm text-muted-foreground">
                    Suas informações são tratadas conforme a LGPD.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                  aria-hidden
                />
                <div>
                  <p className="font-bold text-navy">
                    Acesso imediato aos módulos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Comece pelo curso CCA2030 e avance para o SMIS e a
                    comunidade.
                  </p>
                </div>
              </li>
            </ul>
          </aside>

          {/* Formulário */}
          <div className="rounded-2xl border border-line bg-card p-6 shadow-soft md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo *</Label>
                <Input
                  id="nome"
                  autoComplete="name"
                  placeholder="Como devemos chamá-lo(a)"
                  value={form.nome}
                  onChange={(e) => update("nome", e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail institucional ou pessoal *</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="voce@exemplo.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="papel">Seu papel na escola *</Label>
                <Select
                  value={form.papelDominio}
                  onValueChange={(v) => update("papelDominio", v as PapelDominio)}
                >
                  <SelectTrigger id="papel">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAPEIS_DOMINIO.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Usado para personalizar sua experiência. Você pode alterar
                  depois na sua conta.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repita a senha"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      update("confirmPassword", e.target.value)
                    }
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Ao criar conta, você concorda com os{" "}
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
              </p>

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="w-full justify-between"
              >
                {status === "loading" ? (
                  <>
                    Criando conta...{" "}
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  </>
                ) : (
                  <>
                    Criar conta <span aria-hidden>→</span>
                  </>
                )}
              </Button>

              {message && message.kind === "error" && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="text-xs font-semibold text-red-600"
                >
                  {message.text}
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link
                to="/login"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                Entrar na plataforma
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}