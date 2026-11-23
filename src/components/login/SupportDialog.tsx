import { Mail, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SupportDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-xs font-semibold text-muted-foreground transition-colors hover:text-navy"
        >
          Ajuda e suporte
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <p className="eyebrow text-teal">Suporte CEURS–Escolas</p>
          <DialogTitle className="text-2xl font-extrabold text-navy">
            Como podemos ajudar?
          </DialogTitle>
          <DialogDescription className="pt-2">
            Escolha um dos canais abaixo para falar com nossa equipe. Respondemos
            em até 1 dia útil.
          </DialogDescription>
        </DialogHeader>

        <ul className="mt-2 space-y-3">
          <li>
            <a
              href="mailto:suporte@ceurs.org.br"
              className="flex items-center gap-3 rounded-xl border border-line bg-soft p-4 transition-colors hover:border-teal"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-bold text-navy">E-mail</p>
                <p className="text-xs text-muted-foreground">
                  suporte@ceurs.org.br
                </p>
              </div>
            </a>
          </li>

          <li>
            <a
              href="mailto:dpo@ceurs.org.br"
              className="flex items-center gap-3 rounded-xl border border-line bg-soft p-4 transition-colors hover:border-teal"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-bold text-navy">Encarregado de Dados (DPO)</p>
                <p className="text-xs text-muted-foreground">
                  dpo@ceurs.org.br
                </p>
              </div>
            </a>
          </li>
        </ul>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Para dúvidas frequentes, visite nossa{" "}
          <a
            href="/ajuda"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Central de Ajuda
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}