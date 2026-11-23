import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AwaShell } from "@/components/awa/AwaShell";
import { MaterialCard } from "@/components/awa/MaterialCard";
import { Input } from "@/components/ui/input";
import { BIBLIOTECA } from "@/lib/awa";
import { TEMA_LABEL, TEMA_ICON, type IniciativaTema } from "@/lib/smis";

export const Route = createFileRoute("/awa/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca · AWA2030" },
      {
        name: "description",
        content:
          "Biblioteca compartilhada do AWA2030: guias, vídeos, artigos e documentos sobre sustentabilidade escolar.",
      },
      { property: "og:title", content: "Biblioteca · AWA2030" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BibliotecaPage,
});

const TEMAS: IniciativaTema[] = [
  "agua",
  "residuos",
  "energia",
  "alimentacao",
  "mobilidade",
  "biodiversidade",
];

function BibliotecaPage() {
  const [busca, setBusca] = useState("");
  const [temaFiltro, setTemaFiltro] = useState<IniciativaTema | "todos">("todos");

  const filtrados = BIBLIOTECA.filter((m) => {
    const q = busca.toLowerCase();
    const matchBusca =
      !q ||
      m.titulo.toLowerCase().includes(q) ||
      m.descricao.toLowerCase().includes(q) ||
      m.autor.toLowerCase().includes(q);

    const matchTema = temaFiltro === "todos" || m.tema === temaFiltro;

    return matchBusca && matchTema;
  });

  return (
    <AwaShell
      title="Biblioteca compartilhada"
      description="Guias, vídeos e materiais produzidos pelas escolas e pela equipe CEURS–Escolas. Todos os recursos são abertos à comunidade."
      activeNav="biblioteca"
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
            placeholder="Buscar por título, autor ou palavra-chave..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
            aria-label="Buscar na biblioteca"
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
          {filtrados.length} {filtrados.length === 1 ? "material" : "materiais"} encontrados
        </p>
      </div>

      {/* Grid */}
      {filtrados.length > 0 ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((m) => (
            <li key={m.id}>
              <MaterialCard material={m} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="mt-4 text-lg font-bold text-navy">
            Nenhum material encontrado
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ajuste os filtros ou explore outros temas.
          </p>
        </div>
      )}
    </AwaShell>
  );
}