import { Link } from "@tanstack/react-router";
import { Check, Clock, Play, FileText, ListChecks, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Modulo } from "@/lib/curso";
import { formatDuracao } from "@/lib/curso";

const tipoIcone = {
  video: Play,
  texto: FileText,
  atividade: ListChecks,
  quiz: HelpCircle,
} as const;

type Props = {
  trilhaSlug: string;
  modulo: Modulo;
  concluido: boolean;
  bloqueado?: boolean;
};

export function ModuloItem({ trilhaSlug, modulo, concluido, bloqueado }: Props) {
  const Icone = tipoIcone[modulo.tipo];

  const conteudo = (
    <>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          concluido
            ? "bg-teal text-white"
            : bloqueado
              ? "bg-soft text-muted-foreground"
              : "bg-teal/10 text-teal",
        )}
      >
        {concluido ? (
          <Check className="h-5 w-5" aria-hidden />
        ) : (
          <Icone className="h-5 w-5" aria-hidden />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-teal">
          Módulo {String(modulo.numero).padStart(2, "0")}
        </p>
        <p className="mt-0.5 font-bold text-navy">{modulo.titulo}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" aria-hidden />
          {formatDuracao(modulo.duracao)}
          <span aria-hidden className="mx-1">·</span>
          <span className="capitalize">{modulo.tipo}</span>
        </p>
      </div>
    </>
  );

  if (bloqueado) {
    return (
      <li className="flex items-center gap-3 rounded-xl border border-line bg-soft/50 p-4 opacity-60">
        {conteudo}
      </li>
    );
  }

  return (
    <li>
      <Link
        to="/curso/trilhas/$trilha/$modulo"
        params={{ trilha: trilhaSlug, modulo: modulo.id }}
        className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-teal hover:shadow-soft"
      >
        {conteudo}
      </Link>
    </li>
  );
}