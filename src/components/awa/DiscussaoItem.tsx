import { MessageCircle, Pin } from "lucide-react";
import type { Discussao } from "@/lib/awa";
import { formatarDataRelativa } from "@/lib/awa";

export function DiscussaoItem({ discussao }: { discussao: Discussao }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-line bg-card p-4 transition-colors hover:border-teal">
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy"
      >
        {discussao.autorIniciais}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          {discussao.fixada && (
            <Pin
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange"
              aria-label="Discussão fixada"
            />
          )}
          <h3 className="font-bold leading-snug text-navy">
            {discussao.titulo}
          </h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {discussao.autor} · {formatarDataRelativa(discussao.criadoEm)}
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground">
        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
        {discussao.respostas}
      </span>
    </li>
  );
}