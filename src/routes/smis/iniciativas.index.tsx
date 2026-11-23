import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { SmisShell } from "@/components/smis/SmisShell";
import { IniciativaCard } from "@/components/smis/IniciativaCard";
import {
  IniciativaFilters,
  EMPTY_FILTERS,
  type Filters,
} from "@/components/smis/IniciativaFilters";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/admin-access.functions";
import { fetchIniciativas } from "@/lib/smis";

export const Route = createFileRoute("/smis/iniciativas/")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAuth("/smis/iniciativas");
  },
  head: () => ({
    meta: [
      { title: "Iniciativas · SMIS-Escolas" },
      { name: "description", content: "Acervo de iniciativas de sustentabilidade escolar do CEURS–Escolas." },
      { property: "og:title", content: "Iniciativas · SMIS-Escolas" },
      { property: "og:description", content: "Consulta e gestão das iniciativas escolares registradas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IniciativasPage,
});

function IniciativasPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  const { data: iniciativas = [], isLoading } = useQuery({
    queryKey: ["smis", "iniciativas"],
    queryFn: fetchIniciativas,
  });

  const filtradas = iniciativas.filter((i) => {
    const q = filters.busca.toLowerCase();
    const matchBusca =
      !q ||
      i.titulo.toLowerCase().includes(q) ||
      i.resumo.toLowerCase().includes(q) ||
      i.escola.toLowerCase().includes(q) ||
      i.autor.toLowerCase().includes(q) ||
      i.tags?.some((t) => t.toLowerCase().includes(q));

    const matchTema = filters.tema === "todos" || i.tema === filters.tema;
    const matchStatus =
      filters.status === "todos" || i.status === filters.status;

    return matchBusca && matchTema && matchStatus;
  });

  return (
    <SmisShell
      title="Iniciativas mapeadas"
      description="Explore e gerencie as práticas de sustentabilidade registradas."
      actions={
        <Button asChild>
          <Link to="/smis/iniciativas/nova" className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Nova iniciativa
          </Link>
        </Button>
      }
    >
      {/* Filtros */}
      <IniciativaFilters
        filters={filters}
        onChange={setFilters}
        total={filtradas.length}
      />

      {/* Lista */}
      {isLoading ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="h-64 animate-pulse rounded-2xl border border-line bg-card"
            />
          ))}
        </ul>
      ) : filtradas.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((i) => (
            <li key={i.id}>
              <IniciativaCard iniciativa={i} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="mt-4 text-lg font-bold text-navy">
            Nenhuma iniciativa encontrada
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ajuste os filtros ou registre uma nova iniciativa.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => setFilters(EMPTY_FILTERS)}>
              Limpar filtros
            </Button>
            <Button asChild>
              <Link to="/smis/iniciativas/nova">Registrar iniciativa</Link>
            </Button>
          </div>
        </div>
      )}
    </SmisShell>
  );
}