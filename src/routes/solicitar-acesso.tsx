import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/solicitar-acesso")({
  head: () => ({
    meta: [
      { title: "Solicitar acesso · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Solicite seu convite para acessar a plataforma CEURS–Escolas. Análise em até 5 dias úteis.",
      },
      { property: "og:title", content: "Solicitar acesso · CEURS–Escolas" },
      {
        property: "og:description",
        content: "Acesso por convite. Análise em até 5 dias úteis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SolicitarAcessoPage,
});

const cargos = [
  "Professor(a)",
  "Coordenador(a) pedagógico(a)",
  "Diretor(a)",
  "Vice-diretor(a)",
  "Gestor(a) público(a)",
  "Pesquisador(a)",
  "Estudante",
  "Outro",
] as const;

function SolicitarAcessoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    instituicao: "",
    cargo: "",
    justificativa: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!form.nome.trim()) {
      setStatus("error");
      setMessage("Informe seu nome completo.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setMessage("Informe um e-mail válido.");
      return;
    }
    if (!form.instituicao.trim()) {
      setStatus("error");
      setMessage("Informe sua instituição ou escola.");
      return;
    }
    if (!form.cargo) {
      setStatus("error");
      setMessage("Selecione seu cargo ou função.");
      return;
    }

    setStatus("loading");
    // TODO: POST /api/solicitacoes no backend Python
    setTimeout(() => {
      setStatus("success");
      setMessage(
        "Solicitação enviada! Analisaremos em até 5 dias úteis e responderemos por e-mail.",
      );
    }, 1200);
  }

  if (status === "success") {
    return (
      <SiteShell>
        <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-teal">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </div>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Solicitação recebida
            </h1>
            <p className="mt-4 text-muted-foreground">{message}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/">Voltar à página inicial</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Já tenho acesso</Link>
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
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar à página inicial
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Contexto lateral */}
          <aside>
            <p className="eyebrow text-teal">Acesso por convite</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              Solicite seu acesso à plataforma
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              O CEURS–Escolas é um programa com acesso controlado. Preencha o formulário
              abaixo e nossa equipe analisará sua solicitação.
            </p>

            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="font-bold text-navy">Dados protegidos</p>
                  <p className="text-sm text-muted-foreground">
                    Suas informações são tratadas conforme a LGPD e usadas apenas para
                    análise de elegibilidade.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                <div>
                  <p className="font-bold text-navy">Análise em até 5 dias úteis</p>
                  <p className="text-sm text-muted-foreground">
                    Responderemos por e-mail com as instruções de acesso.
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
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
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
                <Label htmlFor="instituicao">Instituição ou escola *</Label>
                <Input
                  id="instituicao"
                  autoComplete="organization"
                  placeholder="Nome da escola, rede ou instituição"
                  value={form.instituicao}
                  onChange={(e) => update("instituicao", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo ou função *</Label>
                <Select value={form.cargo} onValueChange={(v) => update("cargo", v)}>
                  <SelectTrigger id="cargo">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargos.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justificativa">Justificativa (opcional)</Label>
                <Textarea
                  id="justificativa"
                  placeholder="Conte brevemente por que deseja acessar a plataforma."
                  value={form.justificativa}
                  onChange={(e) => update("justificativa", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-line bg-soft p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                <p>
                  Ao enviar, você concorda com a{" "}
                  <Link to="/privacidade" className="font-semibold text-navy underline-offset-4 hover:underline">
                    Política de Privacidade
                  </Link>{" "}
                  e o tratamento dos seus dados conforme a{" "}
                  <Link to="/lgpd" className="font-semibold text-navy underline-offset-4 hover:underline">
                    LGPD
                  </Link>
                  .
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full justify-between" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    Enviando... <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar solicitação <span aria-hidden>→</span>
                  </>
                )}
              </Button>

              {status === "error" && message && (
                <p role="alert" aria-live="polite" className="text-xs font-semibold text-red-600">
                  {message}
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Já tem acesso?{" "}
              <Link to="/login" className="font-semibold text-navy underline-offset-4 hover:underline">
                Entrar na plataforma
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}