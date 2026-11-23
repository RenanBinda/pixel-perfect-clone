import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Filter,
  Mail,
  MoreVertical,
  Search,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/admin-access.functions";
import type { PapelSistema, PapelDominio } from "@/lib/auth-store";

export const Route = createFileRoute("/admin/usuarios")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAdmin();
  },
  head: () => ({
    meta: [
      { title: "Usuários · Admin · CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UsuariosPage,
});

/* ============================================================
   TIPOS LOCAIS
   ============================================================ */

type UsuarioRow = {
  id: string;
  nome: string;
  email: string;
  papelSistema: PapelSistema;
  papelDominio?: PapelDominio | undefined;
  vinculo: string;
  ultimoAcesso: string;
  ativo: boolean;
};

/* ============================================================
   MAPEAMENTOS VISUAIS
   ============================================================ */

const papelSistemaMap: Record<
  PapelSistema,
  { label: string; className: string }
> = {
  master: { label: "Master", className: "bg-orange/15 text-orange" },
  admin: { label: "Admin", className: "bg-navy/10 text-navy" },
  curador: { label: "Curador", className: "bg-teal/15 text-teal" },
  participante: {
    label: "Participante",
    className: "bg-soft text-muted-foreground",
  },
};

const papelDominioLabel: Record<PapelDominio, string> = {
  educador: "Educador(a)",
  coordenador: "Coordenador(a)",
  diretor: "Diretor(a)",
  estudante: "Estudante",
  pesquisador: "Pesquisador(a)",
  "gestor-publico": "Gestor(a) público(a)",
  outro: "Outro",
};

/* ============================================================
   MOCK
   ============================================================ */

const mockUsuarios: UsuarioRow[] = [
  {
    id: "u_1",
    nome: "Maria Clara Andrade",
    email: "maria@escola.br",
    papelSistema: "participante",
    papelDominio: "coordenador",
    vinculo: "Escola Municipal Vila Verde",
    ultimoAcesso: "2026-10-12",
    ativo: true,
  },
  {
    id: "u_2",
    nome: "João Pedro Silva",
    email: "joao@escola.br",
    papelSistema: "participante",
    papelDominio: "educador",
    vinculo: "Escola Estadual Central",
    ultimoAcesso: "2026-10-11",
    ativo: true,
  },
  {
    id: "u_3",
    nome: "Carla Mendes",
    email: "carla@admin.ceurs.br",
    papelSistema: "admin",
    papelDominio: "estudante",
    vinculo: "Equipe CEURS",
    ultimoAcesso: "2026-10-10",
    ativo: true,
  },
  {
    id: "u_4",
    nome: "Roberto Alves",
    email: "roberto@outro.com",
    papelSistema: "participante",
    papelDominio: "estudante",
    vinculo: "—",
    ultimoAcesso: "2026-09-15",
    ativo: false,
  },
];

/* ============================================================
   HELPERS
   ============================================================ */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ============================================================
   PÁGINA
   ============================================================ */

function UsuariosPage() {
  const [busca, setBusca] = useState("");
  const [papelFiltro, setPapelFiltro] = useState<PapelSistema | "todos">(
    "todos",
  );

  const filtrados = mockUsuarios.filter((u) => {
    const q = busca.toLowerCase();
    const matchBusca =
      !q ||
      u.nome.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.vinculo.toLowerCase().includes(q);

    const matchPapel =
      papelFiltro === "todos" || u.papelSistema === papelFiltro;

    return matchBusca && matchPapel;
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

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-teal">Admin · Usuários</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Gestão de usuários
          </h1>
          <p className="mt-3 text-muted-foreground">
            Papéis de sistema, vínculos, permissões e status das contas.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" aria-hidden />
          Convidar usuário
        </Button>
      </header>

      {/* Filtros */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar por nome, e-mail ou vínculo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
            aria-label="Buscar usuários"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" aria-hidden />
          <select
            value={papelFiltro}
            onChange={(e) =>
              setPapelFiltro(e.target.value as PapelSistema | "todos")
            }
            className="rounded-md border border-line bg-card px-3 py-2 text-sm font-semibold text-navy focus-visible:outline-none"
            aria-label="Filtrar por papel no sistema"
          >
            <option value="todos">Todos os papéis</option>
            <option value="master">Master</option>
            <option value="admin">Admin</option>
            <option value="curador">Curador</option>
            <option value="participante">Participante</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-soft text-left">
              <tr>
                <th className="px-4 py-3 font-bold text-navy">Usuário</th>
                <th className="px-4 py-3 font-bold text-navy">
                  Papel no sistema
                </th>
                <th className="px-4 py-3 font-bold text-navy">
                  Papel no domínio
                </th>
                <th className="px-4 py-3 font-bold text-navy">Vínculo</th>
                <th className="px-4 py-3 font-bold text-navy">
                  Último acesso
                </th>
                <th className="px-4 py-3 font-bold text-navy">Status</th>
                <th className="px-4 py-3 text-right font-bold text-navy">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => {
                const ps = papelSistemaMap[u.papelSistema];
                return (
                  <tr
                    key={u.id}
                    className="border-b border-line last:border-0 hover:bg-soft/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-bold text-navy"
                        >
                          {u.nome
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div>
                          <p className="font-semibold text-navy">{u.nome}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" aria-hidden />
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ps.className}`}
                      >
                        {ps.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {u.papelDominio
                        ? papelDominioLabel[u.papelDominio]
                        : "—"}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {u.vinculo}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(u.ultimoAcesso)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          u.ativo ? "text-teal" : "text-muted-foreground"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${
                            u.ativo ? "bg-teal" : "bg-muted-foreground"
                          }`}
                        />
                        {u.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label={`Ações para ${u.nome}`}
                      >
                        <MoreVertical className="h-4 w-4" aria-hidden />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtrados.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-bold text-navy">
              Nenhum usuário encontrado
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ajuste os filtros ou convide novos usuários.
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Mostrando {filtrados.length} de {mockUsuarios.length} usuários.
      </p>
    </section>
  );
}