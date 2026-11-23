import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { IniciativaStatus, IniciativaTema } from "@/lib/smis";
import { TEMA_LABEL, TEMA_ICON } from "@/lib/smis";

export type Filters = {
  busca: string;
  tema: IniciativaTema | "todos";
  status: IniciativaStatus | "todos";
};

export const EMPTY_FILTERS: Filters = {
  busca: "",
  tema: "todos",
  status: "todos",
};

const TEMAS: IniciativaTema[] = [
  "agua",
  "residuos",
  "energia",
  "alimentacao",
  "mobilidade",
  "biodiversidade",
];

export function IniciativaFilters({
  filters,
  onChange,
  total,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
}) {
  const hasActive =
    filters.busca !== "" ||
    filters.tema !== "todos" ||
    filters.status !== "todos";

  return (
    <div className="space-y-4">
      {/* Linha 1: busca + status */}
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar por título, escola ou palavra-chave..."
            value={filters.busca}
            onChange={(e) => onChange({ ...filters, busca: e.target.value })}
            className="pl-10"
            aria-label="Buscar iniciativas"
          />
        </div>

        <div className="flex gap-1 rounded-lg border border-line bg-card p-1">
          {(["todos", "publicada", "rascunho", "arquivada"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...filters, status: s })}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-colors",
                  filters.status === s
                    ? "bg-navy text-secondary-foreground"
                    : "text-navy hover:bg-navy/5",
                )}
              >
                {s === "todos" ? "Todas" : s}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Linha 2: temas */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">
          Tema:
        </span>
        <button
          type="button"
          onClick={() => onChange({ ...filters, tema: "todos" })}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-bold transition-colors",
            filters.tema === "todos"
              ? "border-navy bg-navy text-secondary-foreground"
              : "border-line bg-card text-navy hover:border-teal",
          )}
        >
          Todos
        </button>
        {TEMAS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange({ ...filters, tema: t })}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors",
              filters.tema === t
                ? "border-navy bg-navy text-secondary-foreground"
                : "border-line bg-card text-navy hover:border-teal",
            )}
          >
            <span aria-hidden>{TEMA_ICON[t]}</span>
            {TEMA_LABEL[t]}
          </button>
        ))}
      </div>

      {/* Resultado + limpar */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {total} {total === 1 ? "iniciativa" : "iniciativas"} encontradas
        </span>
        {hasActive && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="inline-flex items-center gap-1 font-semibold text-navy transition-colors hover:text-teal"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}