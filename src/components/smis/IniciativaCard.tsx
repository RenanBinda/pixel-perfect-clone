import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Calendar,
  ImageIcon,
  MapPin,
  User,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TemaBadge } from "./TemaBadge";
import { formatDate, type Iniciativa } from "@/lib/smis";

export function IniciativaCard({
  iniciativa,
  variant = "default",
}: {
  iniciativa: Iniciativa;
  variant?: "default" | "compact";
}) {
  const compact = variant === "compact";
  const temImagem = Boolean(iniciativa.imagemCapa);

  return (
    <Link
      to="/smis/iniciativas/$id"
      params={{ id: iniciativa.id }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card focus-visible:-translate-y-1 focus-visible:border-teal"
    >
      {/* Capa */}
      {temImagem ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-soft">
          <img
            src={iniciativa.imagemCapa}
            alt={`Imagem da iniciativa: ${iniciativa.titulo}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3">
            <TemaBadge tema={iniciativa.tema} />
          </div>
        </div>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-soft">
          <div className="text-center">
            <ImageIcon
              className="mx-auto h-8 w-8 text-muted-foreground"
              aria-hidden
            />
            <p className="mt-2 text-[11px] text-muted-foreground">Sem imagem</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {!temImagem && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <TemaBadge tema={iniciativa.tema} />
            <StatusBadge status={iniciativa.status} />
          </div>
        )}

        <h3
          className={
            compact
              ? "text-base font-bold leading-snug text-navy"
              : "text-lg font-bold leading-snug text-navy md:text-xl"
          }
        >
          {iniciativa.titulo}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {iniciativa.resumo}
        </p>

        {!compact && (
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              <dt className="sr-only">Escola</dt>
              <dd className="truncate">{iniciativa.escola}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" aria-hidden />
              <dt className="sr-only">Autor</dt>
              <dd>{iniciativa.autor}</dd>
            </div>
          </dl>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDate(iniciativa.dataAtualizacao)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-navy transition-colors group-hover:text-teal">
            Ver detalhes
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}