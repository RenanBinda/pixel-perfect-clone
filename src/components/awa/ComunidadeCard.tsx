import { Link } from "@tanstack/react-router";
import { MessageCircle, Users } from "lucide-react";
import { TemaBadge } from "@/components/smis/TemaBadge";
import {
  PAPEL_COMUNIDADE_LABEL,
  PAPEL_COMUNIDADE_COR,
  type Comunidade,
} from "@/lib/awa";

export function ComunidadeCard({ comunidade }: { comunidade: Comunidade }) {
  const totalMembros = comunidade.membros.length;
  const totalDiscussoes = comunidade.discussoes.length;

  return (
    <Link
      to="/awa/temas/$tema"
      params={{ tema: comunidade.slug }}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-2">
        <TemaBadge tema={comunidade.tema} />
        <span className="rounded-full bg-soft px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {PAPEL_COMUNIDADE_LABEL[comunidade.coordenador.papel]}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-navy">
        {comunidade.nome}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
        {comunidade.descricao}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden />
          <dd>{totalMembros} membros</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden />
          <dd>{totalDiscussoes} discussões</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy"
          >
            {comunidade.coordenador.iniciais}
          </span>
          <span className="text-xs font-semibold text-navy">
            {comunidade.coordenador.nome.split(" ")[0]}
          </span>
        </div>
        <span className="text-xs font-bold text-navy group-hover:text-teal">
          Entrar →
        </span>
      </div>
    </Link>
  );
}