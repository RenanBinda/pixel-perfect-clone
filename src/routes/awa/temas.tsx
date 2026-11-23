import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AwaShell } from "@/components/awa/AwaShell";
import { ComunidadeCard } from "@/components/awa/ComunidadeCard";
import { Input } from "@/components/ui/input";
import { COMUNIDADES, type Comunidade } from "@/lib/awa";
import { TEMA_LABEL, TEMA_ICON } from "@/lib/smis";
import type { IniciativaTema } from "@/lib/smis";

export const Route = createFileRoute("/awa/temas")({
  head: () => ({
    meta: [
      { title: "Comunidades · AWA2030" },
      {
        name: "description",
        content:
          "Explore as comunidades temáticas do AWA2030: hortas, resíduos, água, energia, mobilidade e biodiversidade.",
      },
      { property: "og:title", content: "Comunidades · AWA2030" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TemasPage,
});

const TEMAS: IniciativaTema[] = [
  "agua",
  "residuos",
  "energia",
  "alimentacao",
  "mobilidade",
  "biodiversidade",
];

function TemasPage() {
  const [busca, setBusca] = useState("");
  const [temaFiltro, setTemaFiltro] = useState<IniciativaTema | "todos">("todos");

  const filtradas = COMUNIDADES.filter((c: Comunidade) => {
    const q = busca.toLowerCase();
    const matchBusca =
      !q ||
      c.nome.toLowerCase().includes(q) ||
      c.descricao.toLowerCase().includes(q) ||
      c.escola?.toLowerCase().includes(q);

    const matchTema = temaFiltro === "todos" || c.tema === temaFiltro;

    return matchBusca && matchTema;
  });

  return (
    <AwaShell
      title="Comunidades temáticas"
      description="Escolha uma comunidade por interesse e participe. Todas são abertas a educadores, gestores e parceiros."
      activeNav="temas"
    >
      {/* Filtros */}
      <div className="space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar por nome, escola ou palavra-chave..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
            aria-label="Buscar comunidades"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            Tema:
          </span>
          <button
            type="button"
            onClick={() => setTemaFiltro("todos")}
            className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
              temaFiltro === "todos"
                ? "border-navy bg-navy text-secondary-foreground"
                : "border-line bg-card text-navy hover:border-teal"
            }`}
          >
            Todos
          </button>
          {TEMAS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTemaFiltro(t)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                temaFiltro === t
                  ? "border-navy bg-navy text-secondary-foreground"
                  : "border-line bg-card text-navy hover:border-teal"
              }`}
            >
              <span aria-hidden>{TEMA_ICON[t]}</span>
              {TEMA_LABEL[t]}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          {filtradas.length} {filtradas.length === 1 ? "comunidade" : "comunidades"} encontradas
        </p>
      </div>

      {/* Grid */}
      {filtradas.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((c) => (
            <li key={c.id}>
              <ComunidadeCard comunidade={c} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="mt-4 text-lg font-bold text-navy">
            Nenhuma comunidade encontrada
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ajuste os filtros ou crie uma nova comunidade.
          </p>
        </div>
      )}
    </AwaShell>
  );
}