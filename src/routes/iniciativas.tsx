import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  School,
  Search,
  X,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { IniciativaCard } from "@/components/smis/IniciativaCard";
import { TemaBadge } from "@/components/smis/TemaBadge";
import { Button } from "@/components/ui/button";
import {
  MOCK_INICIATIVAS,
  TEMA_ICON,
  TEMA_LABEL,
  type Iniciativa,
  type IniciativaTema,
} from "@/lib/smis";

/* ============================================================
   TIPOS DE BUSCA
   ============================================================ */

type Busca = {
  q?: string | undefined;
  tema?: string | undefined;
  uf?: string | undefined;
  ods?: string | undefined;
};

/* ============================================================
   HELPERS DE LOCALIZAÇÃO
   ============================================================ */

const UF_REGEX = /\b([A-Z]{2})\b\.?$/;

function ufDe(ini: Iniciativa): string {
  const m =
    ini.where.trim().replace(/\.$/, "").match(/\/([A-Z]{2})/) ??
    ini.where.match(UF_REGEX);
  return m?.[1] ?? "—";
}

function municipioDe(ini: Iniciativa): string {
  const m = ini.where.match(/([A-ZÀ-Ú][\wÀ-ú ]+)\/[A-Z]{2}/);
  return m?.[1]?.trim().split(", ").pop() ?? "";
}

/* ============================================================
   GRADE DO BRASIL (linha, coluna) — mapa estilizado
   ============================================================ */

const GRADE_UF: Record<string, [number, number]> = {
  RR: [0, 2], AP: [0, 4],
  AM: [1, 1], PA: [1, 3], MA: [1, 4], CE: [1, 5], RN: [1, 6],
  AC: [2, 0], RO: [2, 1], TO: [2, 3], PI: [2, 4], PB: [2, 6],
  MT: [3, 2], BA: [3, 4], PE: [3, 5], AL: [3, 6],
  GO: [4, 3], DF: [4, 4], SE: [4, 5],
  MS: [5, 2], MG: [5, 3], ES: [5, 4],
  SP: [6, 3], RJ: [6, 4],
  PR: [7, 2],
  SC: [8, 2],
  RS: [9, 2],
};

/* ============================================================
   ROTA
   ============================================================ */

export const Route = createFileRoute("/iniciativas")({
  validateSearch: (s: Record<string, unknown>): Busca => ({
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
    tema: typeof s["tema"] === "string" && s["tema"] ? s["tema"] : undefined,
    uf: typeof s["uf"] === "string" && s["uf"] ? s["uf"] : undefined,
    ods:
      s["ods"] != null && s["ods"] !== ""
        ? String(s["ods"])
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Mapa de iniciativas · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Consulte iniciativas de sustentabilidade em escolas de todo o Brasil, com filtros por tema, escola, estado e ODS.",
      },
      { property: "og:title", content: "Mapa de iniciativas · CEURS–Escolas" },
      {
        property: "og:description",
        content:
          "Vitrine pública das práticas sustentáveis mapeadas pelo SMIS-Escolas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IniciativasPage,
});

/* ============================================================
   PÁGINA
   ============================================================ */

function IniciativasPage() {
  const raw = Route.useSearch();
  const busca = {
    q: raw.q ?? "",
    tema: raw.tema ?? "",
    uf: raw.uf ?? "",
    ods: raw.ods ?? "",
  };

  const navigate = useNavigate({ from: "/iniciativas" });

  const set = (patch: Partial<Busca>) =>
    navigate({
      search: (prev) => {
        const next = { ...prev, ...patch };
        (Object.keys(next) as (keyof Busca)[]).forEach((k) => {
          if (!next[k]) delete next[k];
        });
        return next;
      },
      replace: true,
    });

  const publicadas = MOCK_INICIATIVAS.filter((i) => i.status === "publicada");
  const destaque = publicadas.find((i) => i.id === "ini_001");

  const odsDisponiveis = [
    ...new Set(publicadas.flatMap((i) => i.ods ?? [])),
  ].sort((a, b) => a - b);

  const temas = Object.keys(TEMA_LABEL) as IniciativaTema[];

  const q = busca.q.trim().toLowerCase();
  const filtradas = publicadas.filter((i) => {
    if (busca.tema && i.tema !== busca.tema) return false;
    if (busca.uf && ufDe(i) !== busca.uf) return false;
    if (busca.ods && !(i.ods ?? []).includes(Number(busca.ods))) return false;
    if (q) {
      const texto = `${i.titulo} ${i.resumo} ${i.escola} ${i.where} ${(i.tags ?? []).join(" ")}`.toLowerCase();
      if (!texto.includes(q)) return false;
    }
    return true;
  });

  const porUf = publicadas.reduce<Record<string, number>>((acc, i) => {
    const uf = ufDe(i);
    acc[uf] = (acc[uf] ?? 0) + 1;
    return acc;
  }, {});

  const temFiltro = busca.q || busca.tema || busca.uf || busca.ods;

  const selectCls =
    "h-11 rounded-md border border-line bg-card px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal";

  return (
    <SiteShell>
      {/* Hero editorial */}
      <section className="relative isolate overflow-hidden bg-navy py-16 text-secondary-foreground md:py-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(24,185,176,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,139,18,0.12),transparent_50%)]"
        />
        <div className="container-page">
          <p className="eyebrow flex items-center gap-2 text-teal">
            <span aria-hidden className="h-2 w-2 rounded-full bg-orange" />
            Serviço de informação
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Mapa de iniciativas de escolas
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sky">
            Conheça práticas de sustentabilidade realizadas por escolas de todo
            o Brasil. Não é preciso entrar na plataforma para consultar.
          </p>
        </div>
      </section>

      {/* Destaque */}
      {destaque && !temFiltro && (
        <section className="container-page -mt-10 relative z-10">
          <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-card">
            <div className="grid md:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[16/9] bg-soft md:aspect-auto md:min-h-[320px]">
                {destaque.imagemCapa ? (
                  <img
                    src={destaque.imagemCapa}
                    alt={destaque.titulo}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Sem imagem</p>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
                  Em destaque
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="eyebrow text-teal">{destaque.escola}</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-navy">
                  {destaque.titulo}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {destaque.resumo}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">
                    12 canteiros
                  </span>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
                    3 ODS
                  </span>
                  <span className="rounded-full bg-amber/15 px-3 py-1 text-xs font-bold text-amber-700">
                    +200 estudantes
                  </span>
                </div>
                <div className="mt-5">
                  <Button asChild>
                    <Link
                      to="/smis/iniciativas/$id"
                      params={{ id: destaque.id }}
                      className="inline-flex items-center gap-2"
                    >
                      Ver iniciativa completa
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Grid principal: mapa + lista */}
      <div className="container-page grid gap-8 py-12 lg:grid-cols-[320px_1fr] lg:py-16">
        {/* Sidebar: mapa */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-card p-5 shadow-soft">
            <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
              Mapa por estado
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Clique em um estado para filtrar
            </p>
            <div
              className="mt-4 grid grid-cols-7 gap-1"
              role="group"
              aria-label="Filtrar por estado"
            >
              {Object.entries(GRADE_UF).map(([uf, [r, c]]) => {
                const n = porUf[uf] ?? 0;
                const ativo = busca.uf === uf;
                return (
                  <button
                    key={uf}
                    type="button"
                    style={{ gridRow: r + 1, gridColumn: c + 1 }}
                    disabled={n === 0}
                    onClick={() => set({ uf: ativo ? "" : uf })}
                    aria-pressed={ativo}
                    title={`${uf}: ${n} iniciativa(s)`}
                    className={`aspect-square rounded text-[10px] font-bold transition-colors ${
                      ativo
                        ? "bg-navy text-secondary-foreground"
                        : n > 0
                          ? "bg-teal/20 text-teal-900 hover:bg-navy hover:text-secondary-foreground"
                          : "bg-soft text-muted-foreground/40"
                    }`}
                  >
                    {uf}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[12px] text-muted-foreground">
              Estados destacados têm iniciativas publicadas.
            </p>
          </div>

          {temFiltro && (
            <div className="rounded-2xl border border-line bg-card p-5 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-wider text-teal">
                Filtros ativos
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {busca.q && (
                  <li className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      Busca: <b className="text-navy">{busca.q}</b>
                    </span>
                    <button
                      type="button"
                      onClick={() => set({ q: "" })}
                      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-soft hover:text-navy"
                      aria-label="Remover busca"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )}
                {busca.tema && (
                  <li className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      Tema:{" "}
                      <b className="text-navy">
                        {TEMA_LABEL[busca.tema as IniciativaTema]}
                      </b>
                    </span>
                    <button
                      type="button"
                      onClick={() => set({ tema: "" })}
                      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-soft hover:text-navy"
                      aria-label="Remover tema"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )}
                {busca.uf && (
                  <li className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      UF: <b className="text-navy">{busca.uf}</b>
                    </span>
                    <button
                      type="button"
                      onClick={() => set({ uf: "" })}
                      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-soft hover:text-navy"
                      aria-label="Remover UF"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )}
                {busca.ods && (
                  <li className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      ODS: <b className="text-navy">{busca.ods}</b>
                    </span>
                    <button
                      type="button"
                      onClick={() => set({ ods: "" })}
                      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-soft hover:text-navy"
                      aria-label="Remover ODS"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )}
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() =>
                  set({ q: undefined, tema: undefined, uf: undefined, ods: undefined })
                }
              >
                <X className="mr-1 h-3.5 w-3.5" /> Limpar todos
              </Button>
            </div>
          )}
        </aside>

        {/* Conteúdo principal */}
        <div>
          {/* Filtros */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="relative sm:col-span-2 lg:col-span-1">
              <span className="sr-only">Buscar</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={busca.q}
                onChange={(e) => set({ q: e.target.value })}
                placeholder="Escola, município, palavra…"
                className={`${selectCls} w-full pl-9`}
              />
            </label>

            <select
              aria-label="Tema"
              value={busca.tema}
              onChange={(e) => set({ tema: e.target.value })}
              className={selectCls}
            >
              <option value="">Todos os temas</option>
              {temas.map((t) => (
                <option key={t} value={t}>
                  {TEMA_LABEL[t]}
                </option>
              ))}
            </select>

            <select
              aria-label="Estado"
              value={busca.uf}
              onChange={(e) => set({ uf: e.target.value })}
              className={selectCls}
            >
              <option value="">Todos os estados</option>
              {Object.keys(GRADE_UF)
                .sort()
                .map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
            </select>

            <select
              aria-label="ODS"
              value={busca.ods}
              onChange={(e) => set({ ods: e.target.value })}
              className={selectCls}
            >
              <option value="">Todos os ODS</option>
              {odsDisponiveis.map((o) => (
                <option key={o} value={String(o)}>
                  ODS {o}
                </option>
              ))}
            </select>
          </div>

          {/* Resultado */}
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span aria-live="polite">
              <b className="text-navy">{filtradas.length}</b>{" "}
              {filtradas.length === 1 ? "iniciativa" : "iniciativas"}{" "}
              {temFiltro ? "com esses filtros" : "publicadas"}
            </span>
            {temFiltro && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  set({
                    q: undefined,
                    tema: undefined,
                    uf: undefined,
                    ods: undefined,
                  })
                }
              >
                <X className="mr-1 h-4 w-4" /> Limpar
              </Button>
            )}
          </div>

          {/* Lista */}
          {filtradas.length > 0 ? (
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {filtradas.map((i) => (
                <li key={i.id}>
                  <IniciativaCard iniciativa={i} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
              <Search
                className="mx-auto h-8 w-8 text-muted-foreground"
                aria-hidden
              />
              <p className="mt-4 text-lg font-bold text-navy">
                Nenhuma iniciativa encontrada
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ajuste os filtros ou explore outros temas.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  set({
                    q: undefined,
                    tema: undefined,
                    uf: undefined,
                    ods: undefined,
                  })
                }
                className="mt-6"
              >
                Limpar filtros
              </Button>
            </div>
          )}

          {/* CTA final */}
          <div className="mt-14 rounded-2xl bg-navy p-8 text-secondary-foreground md:p-10">
            <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="eyebrow text-amber">
                  Sua escola também tem uma iniciativa?
                </p>
                <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                  Registre pelo SMIS-Escolas
                </h2>
                <p className="mt-3 max-w-lg text-sky">
                  Faça login, comece o curso e mapeie sua primeira prática. Sua
                  escola passa a integrar este mapa.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild size="lg">
                  <Link to="/curso/trilhas" className="inline-flex items-center gap-2">
                    Começar pelo curso
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
                >
                  <Link to="/login">Entrar</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
