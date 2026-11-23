import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  Mail,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin/solicitacoes")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAdmin();
  },
  head: () => ({
    meta: [
      { title: "Solicitações · Admin · CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SolicitacoesPage,
});

type Status = "pendente" | "aprovada" | "recusada";

type Solicitacao = {
  id: string;
  nome: string;
  email: string;
  instituicao: string;
  cargo: string;
  data: string;
  status: Status;
};

const mockSolicitacoes: Solicitacao[] = [
  {
    id: "sol_1",
    nome: "Ana Paula Costa",
    email: "ana.costa@escola.br",
    instituicao: "Escola Estadual Central",
    cargo: "Coordenadora pedagógica",
    data: "2026-10-12",
    status: "pendente",
  },
  {
    id: "sol_2",
    nome: "João Pedro Silva",
    email: "joao.silva@escola.br",
    instituicao: "Escola Municipal Vila Verde",
    cargo: "Professor(a)",
    data: "2026-10-11",
    status: "pendente",
  },
  {
    id: "sol_3",
    nome: "Carla Mendes",
    email: "carla.mendes@edu.br",
    instituicao: "Colégio Santa Cruz",
    cargo: "Diretor(a)",
    data: "2026-10-10",
    status: "aprovada",
  },
  {
    id: "sol_4",
    nome: "Roberto Alves",
    email: "roberto@outro.com",
    instituicao: "Sem instituição",
    cargo: "Outro",
    data: "2026-10-09",
    status: "recusada",
  },
];

const statusMap: Record<
  Status,
  { label: string; className: string; icon: typeof Clock }
> = {
  pendente: {
    label: "Pendente",
    className: "bg-amber/15 text-amber-700 border-amber/30",
    icon: Clock,
  },
  aprovada: {
    label: "Aprovada",
    className: "bg-teal/15 text-teal border-teal/30",
    icon: Check,
  },
  recusada: {
    label: "Recusada",
    className: "bg-destructive/15 text-destructive border-destructive/30",
    icon: X,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SolicitacoesPage() {
  const [filtro, setFiltro] = useState<Status | "todas">("pendente");
  const [busca, setBusca] = useState("");

  const filtradas = mockSolicitacoes.filter((s) => {
    const matchStatus = filtro === "todas" || s.status === filtro;
    const q = busca.toLowerCase();
    const matchBusca =
      !q ||
      s.nome.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.instituicao.toLowerCase().includes(q);
    return matchStatus && matchBusca;
  });

  return (
    <section className="container-page py-12 md:py-20">
      <Link
        to="/admin"
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao painel
      </Link>

      <header>
        <p className="eyebrow text-teal">Admin · Solicitações</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Gestão de solicitações de acesso
        </h1>
        <p className="mt-3 text-muted-foreground">
          Aprove, recuse ou acompanhe os pedidos de convite.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar por nome, e-mail ou instituição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
            aria-label="Buscar solicitações"
          />
        </div>

        <div className="flex gap-1 rounded-lg border border-line bg-card p-1">
          {(["pendente", "aprovada", "recusada", "todas"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFiltro(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                  filtro === s
                    ? "bg-navy text-secondary-foreground"
                    : "text-navy hover:bg-navy/5"
                }`}
              >
                {s}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-soft text-left">
              <tr>
                <th className="px-4 py-3 font-bold text-navy">Nome</th>
                <th className="px-4 py-3 font-bold text-navy">Instituição</th>
                <th className="px-4 py-3 font-bold text-navy">Cargo</th>
                <th className="px-4 py-3 font-bold text-navy">Data</th>
                <th className="px-4 py-3 font-bold text-navy">Status</th>
                <th className="px-4 py-3 text-right font-bold text-navy">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((s) => {
                const st = statusMap[s.status];
                const Icon = st.icon;
                return (
                  <tr
                    key={s.id}
                    className="border-b border-line last:border-0 hover:bg-soft/50"
                  >
                    <td className="px-4 py-4">
                      <p className="font-semibold text-navy">{s.nome}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" aria-hidden />
                        {s.email}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {s.instituicao}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {s.cargo}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(s.data)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${st.className}`}
                      >
                        <Icon className="h-3 w-3" aria-hidden />
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {s.status === "pendente" && (
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            aria-label="Aprovar"
                          >
                            <Check
                              className="h-4 w-4 text-teal"
                              aria-hidden
                            />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            aria-label="Recusar"
                          >
                            <X
                              className="h-4 w-4 text-destructive"
                              aria-hidden
                            />
                          </Button>
                        </div>
                      )}
                      {s.status !== "pendente" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          aria-label="Excluir"
                        >
                          <Trash2
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden
                          />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtradas.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-bold text-navy">
              Nenhuma solicitação encontrada
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ajuste os filtros ou aguarde novas solicitações.
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Mostrando {filtradas.length} de {mockSolicitacoes.length} solicitações.
      </p>
    </section>
  );
}