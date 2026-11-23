import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = { onBack: () => void };

export function RecoveryForm({ onBack }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ kind: "error", text: "Informe um e-mail válido para continuar." });
      return;
    }
    setMessage({
      kind: "success",
      text: `Se existir uma conta para ${email}, enviaremos as instruções de recuperação.`,
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-10 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar para o login
      </button>

      <div className="mb-8">
        <p className="eyebrow text-teal">Recuperação de acesso</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Redefina sua senha
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enviaremos um link seguro para o e-mail cadastrado.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="recoveryEmail">E-mail de acesso</Label>
          <Input
            id="recoveryEmail"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit" size="lg" className="mt-6 w-full justify-between">
          Enviar link de recuperação <span aria-hidden>→</span>
        </Button>

        {message && (
          <p
            role={message.kind === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`mt-3 text-xs font-semibold ${
              message.kind === "error" ? "text-red-600" : "text-teal"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>

      <div className="mt-7 flex items-start gap-3 border-t border-line pt-4 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
        <p>
          Se você não receber o e-mail em alguns minutos, verifique a caixa de spam ou fale com o
          suporte.
        </p>
      </div>
    </div>
  );
}