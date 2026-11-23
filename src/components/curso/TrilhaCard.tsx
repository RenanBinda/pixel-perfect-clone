import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Clock, Users } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import {
  calcularProgresso,
  formatDuracao,
  type Trilha,
} from "@/lib/curso";

export function TrilhaCard({ trilha }: { trilha: Trilha }) {
  const progresso = calcularProgresso(trilha);
  const iniciado = progresso.concluidos > 0;

  return (
    <Link
      to="/curso/trilhas/$trilha"
      params={{ trilha: trilha.slug }}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
          <Award className="h-6 w-6" aria-hidden />
        </span>
        {trilha.certificado && (
          <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            Certificado
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold leading-snug text-navy">
        {trilha.titulo}
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {trilha.descricao}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          <dd>{formatDuracao(trilha.cargaHoraria * 60)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden />
          <dd className="truncate">{trilha.publico}</dd>
        </div>
      </dl>

      {iniciado && (
        <div className="mt-4">
          <ProgressBar
            percentual={progresso.percentual}
            concluido={progresso.concluido}
            label={`${progresso.concluidos} de ${progresso.total} módulos`}
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs font-bold text-navy">
          {progresso.concluido
            ? "Ver certificado"
            : iniciado
              ? "Continuar"
              : "Começar"}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-navy transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </Link>
  );
}