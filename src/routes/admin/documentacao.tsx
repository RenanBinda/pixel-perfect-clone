import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { requireRole } from "@/lib/admin-access.functions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  BookOpen,
  Crown,
  Database,
  FileText,
  Globe,
  Lock,
  Shield,
  User,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/admin/documentacao")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["admin", "master"], "/admin/documentacao");
  },
  head: () => ({
    meta: [
      { title: "Documentação · Admin CEURS–Escolas" },
      {
        name: "description",
        content:
          "Documentação técnica e conceitual da plataforma CEURS–Escolas.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DocumentacaoPage,
});

/* ============================================================
   TIPOS
   ============================================================ */

type Bloco =
  | { tipo: "texto"; titulo?: string; paragrafo: string }
  | { tipo: "lista"; titulo?: string; itens: string[] }
  | { tipo: "code"; titulo?: string; codigo: string }
  | { tipo: "flow"; titulo?: string; fluxo: FluxoNode[] }
  | { tipo: "db"; titulo?: string; tabelas: TabelaDB[] }
  | { tipo: "perfis"; titulo?: string; perfis: PerfilAcesso[] };

type FluxoNode = {
  icone: "globe" | "lock" | "user" | "users" | "shield" | "crown" | "database" | "file";
  label: string;
  descricao?: string;
  cor: "navy" | "teal" | "orange" | "amber" | "soft";
  filhos?: FluxoNode[];
};

type TabelaDB = {
  nome: string;
  tipo: "auth" | "principal" | "planejada";
  campos: { nome: string; tipo: string; descricao?: string }[];
  relacoes?: string[];
};

type PerfilAcesso = {
  papel: "participante" | "curador" | "admin" | "master";
  icone: "user" | "file" | "shield" | "crown";
  cor: "soft" | "teal" | "navy" | "orange";
  pode: string[];
  naoPode: string[];
};

type Secao = {
  id: string;
  titulo: string;
  publico: string;
  blocos: Bloco[];
};

/* ============================================================
   DADOS
   ============================================================ */

const FLUXO_VISITANTE: FluxoNode[] = [
  {
    icone: "globe",
    label: "Visitante (público)",
    descricao: "Sem autenticação",
    cor: "soft",
    filhos: [
      { icone: "file", label: "Landing & institucional", descricao: "/ · /sobre · /comunidade · /ajuda · /identidade", cor: "teal" },
      { icone: "file", label: "Conteúdo & dados", descricao: "/midia · /estatisticas · /manual-ceurs/", cor: "teal" },
      { icone: "file", label: "Módulos (apresentação)", descricao: "/awa · /cop → /awa · /curso · /smis", cor: "teal" },
      { icone: "file", label: "Serviço público", descricao: "/iniciativas (busca de iniciativas aprovadas)", cor: "amber" },
      { icone: "file", label: "Legal", descricao: "/privacidade · /lgpd · /termos", cor: "teal" },
      { icone: "lock", label: "Autenticação", descricao: "/login?redirect= · /signup · /solicitar-acesso", cor: "orange" },
    ],
  },
];

const FLUXO_PARTICIPANTE: FluxoNode[] = [
  {
    icone: "user",
    label: "Participante autenticado",
    descricao: "papelSistema = participante",
    cor: "teal",
    filhos: [
      { icone: "user", label: "Conta pessoal", descricao: "/conta · perfil · vínculos · módulos · segurança", cor: "teal" },
      { icone: "database", label: "SMIS-Escolas", descricao: "/smis/painel → /iniciativas → /nova → /$id", cor: "teal" },
      { icone: "file", label: "Curso", descricao: "/curso · /curso/trilhas · /curso/$trilha/$modulo", cor: "teal" },
      { icone: "users", label: "Comunidade", descricao: "/comunidade · /awa/temas · /awa/discussoes", cor: "teal" },
    ],
  },
];

const FLUXO_ADMIN: FluxoNode[] = [
  {
    icone: "shield",
    label: "Painel /admin",
    descricao: "AdminShell · sidebar por papel",
    cor: "navy",
    filhos: [
      {
        icone: "shield",
        label: "Admin da plataforma",
        descricao: "papelSistema = admin",
        cor: "navy",
        filhos: [
          { icone: "file", label: "/admin", descricao: "Dashboard", cor: "navy" },
          { icone: "file", label: "/admin/solicitacoes", descricao: "Pedidos de acesso", cor: "navy" },
          { icone: "file", label: "/admin/usuarios", descricao: "Gestão de usuários", cor: "navy" },
          { icone: "file", label: "/admin/conteudo", descricao: "Conteúdo e mídia", cor: "navy" },
          { icone: "file", label: "/admin/curadoria", descricao: "Curadoria SMIS", cor: "navy" },
          { icone: "file", label: "/admin/jornadas", descricao: "Jornadas de persona", cor: "navy" },
          { icone: "file", label: "/admin/documentacao", descricao: "Documentação", cor: "navy" },
          { icone: "file", label: "/admin/design-system", descricao: "Design System", cor: "navy" },
        ],
      },
      {
        icone: "crown",
        label: "Master (único)",
        descricao: "papelSistema = master",
        cor: "orange",
        filhos: [
          { icone: "crown", label: "/admin/configuracoes", descricao: "Domínios · Taxonomia · Integrações · LGPD · Backups", cor: "orange" },
        ],
      },
    ],
  },
];

const PERFIS: PerfilAcesso[] = [
  {
    papel: "participante",
    icone: "user",
    cor: "soft",
    pode: ["/conta", "/smis/painel", "/smis/iniciativas", "/curso", "/comunidade", "/iniciativas (público)"],
    naoPode: ["Nenhuma rota /admin/*", "Ver dados de outros participantes"],
  },
  {
    papel: "curador",
    icone: "file",
    cor: "teal",
    pode: ["Tudo do participante", "/admin/conteudo", "/admin/curadoria", "Revisar iniciativas SMIS de outros autores"],
    naoPode: ["/admin", "/admin/usuarios", "/admin/solicitacoes", "/admin/design-system", "/admin/configuracoes"],
  },
  {
    papel: "admin",
    icone: "shield",
    cor: "navy",
    pode: [
      "Tudo do curador",
      "/admin",
      "/admin/solicitacoes",
      "/admin/usuarios",
      "/admin/jornadas",
      "/admin/documentacao",
      "/admin/design-system",
      "Promover/rebaixar curadores e participantes",
    ],
    naoPode: ["/admin/configuracoes", "Promover master", "Alterar configurações críticas"],
  },
  {
    papel: "master",
    icone: "crown",
    cor: "orange",
    pode: [
      "Tudo do admin",
      "/admin/configuracoes",
      "Domínios, taxonomia, integrações",
      "Política LGPD e segurança",
      "Backups e restauração",
      "Nomear/revogar admins",
      "Único master da plataforma",
    ],
    naoPode: [],
  },
];

const TABELAS_DB: TabelaDB[] = [
  {
    nome: "auth.users",
    tipo: "auth",
    campos: [
      { nome: "id", tipo: "uuid PK" },
      { nome: "email", tipo: "text unique" },
      { nome: "raw_user_meta_data", tipo: "jsonb", descricao: "{ nome, papel_dominio }" },
      { nome: "created_at", tipo: "timestamptz" },
    ],
    relacoes: ["user_roles.user_id", "convites.convidado_por", "smis_iniciativas.autor_id"],
  },
  {
    nome: "user_roles",
    tipo: "principal",
    campos: [
      { nome: "user_id", tipo: "uuid PK/FK", descricao: "→ auth.users.id" },
      { nome: "role", tipo: "app_role", descricao: "participante | curador | admin | master" },
      { nome: "created_at", tipo: "timestamptz" },
    ],
    relacoes: ["⚑ apenas UM master na plataforma", "⚑ trigger: on_auth_user_created_role"],
  },
  {
    nome: "convites",
    tipo: "principal",
    campos: [
      { nome: "id", tipo: "uuid PK" },
      { nome: "email", tipo: "text unique" },
      { nome: "role", tipo: "app_role", descricao: "≠ master" },
      { nome: "convidado_por", tipo: "uuid FK" },
      { nome: "aceito_em", tipo: "timestamptz" },
    ],
  },
  {
    nome: "smis_iniciativas",
    tipo: "planejada",
    campos: [
      { nome: "id", tipo: "uuid PK" },
      { nome: "autor_id", tipo: "uuid FK" },
      { nome: "escola", tipo: "text" },
      { nome: "tema", tipo: "enum" },
      { nome: "what/why/who/where/when/how/how_much", tipo: "text", descricao: "5W2H" },
      { nome: "status", tipo: "enum", descricao: "rascunho | em_curadoria | revisao | aprovada" },
      { nome: "curador_id", tipo: "uuid FK" },
    ],
  },
];

const SECOES: Secao[] = [
  {
    id: "apresentacao",
    titulo: "Apresentação da plataforma",
    publico: "Todos",
    blocos: [
      {
        tipo: "texto",
        titulo: "O que é (visão conceitual)",
        paragrafo:
          "O CEURS–Escolas é a plataforma digital que conecta escolas, educadores, gestores e estudantes a um programa de formação e inovação educacional. Duas portas de entrada — o curso CCA2030 e a comunidade AWA2030 — e um instrumento de mapeamento (SMIS-Escolas) que acompanha cada iniciativa do início ao programa estratégico.",
      },
      {
        tipo: "lista",
        titulo: "Para quem",
        itens: [
          "Escolas e redes de ensino que aderem ao programa",
          "Educadores, coordenadores e diretores",
          "Curadores pedagógicos e editoriais",
          "Equipe de gestão (admin) e governança (master)",
        ],
      },
      {
        tipo: "lista",
        titulo: "Princípios",
        itens: [
          "Acesso nominal: papéis concedidos por convite",
          "Acessibilidade WCAG 2.1 AA",
          "Identidade visual do mini-manual CEURS",
          "Dados protegidos por RLS no banco",
        ],
      },
    ],
  },
  {
    id: "perfis",
    titulo: "Perfis e permissões",
    publico: "Gestores · Admins",
    blocos: [
      { tipo: "perfis", titulo: "Matriz de acesso", perfis: PERFIS },
      {
        tipo: "texto",
        titulo: "Fluxo de entrada",
        paragrafo:
          "Visitante → Solicitar acesso → Admin aprova → Convite com papel → Cadastro → Trigger atribui papel em user_roles.",
      },
    ],
  },
  {
    id: "rotas",
    titulo: "Fluxograma de rotas",
    publico: "Todos",
    blocos: [
      { tipo: "flow", titulo: "1. Visitante (público)", fluxo: FLUXO_VISITANTE },
      { tipo: "flow", titulo: "2. Participante autenticado", fluxo: FLUXO_PARTICIPANTE },
      { tipo: "flow", titulo: "3. Admin e Master", fluxo: FLUXO_ADMIN },
    ],
  },
  {
    id: "banco",
    titulo: "Visão do banco de dados",
    publico: "Desenvolvedores",
    blocos: [
      { tipo: "db", titulo: "Estrutura de tabelas", tabelas: TABELAS_DB },
    ],
  },
  {
    id: "desenvolvimento",
    titulo: "Guia técnico de desenvolvimento",
    publico: "Desenvolvedores",
    blocos: [
      {
        tipo: "lista",
        titulo: "Stack do frontend",
        itens: [
          "React 19 + TypeScript, TanStack Start v1 (SSR) sobre Vite 7",
          "Roteamento por arquivos em src/routes (TanStack Router); nunca react-router-dom",
          "Tailwind CSS v4 com tokens semânticos em src/styles.css; componentes shadcn/ui",
          "TanStack Query para dados; camada de API única em src/lib/api.ts e src/lib/smis.ts",
          "Testes com Vitest (bunx vitest run) em src/test",
        ],
      },
      {
        tipo: "lista",
        titulo: "Convenções de rotas",
        itens: [
          "Arquivo com sub-rotas vira layout e precisa renderizar <Outlet />; nunca duplique páginas (causa de bug já corrigido em /smis/iniciativas)",
          "Áreas protegidas (/admin/*, /conta, /smis/*) usam ssr: false + beforeLoad no cliente",
          "Navegação sempre com <Link to params>, nunca <a href> interno",
          "Vitrine pública: /iniciativas → detalhe /smis/iniciativas/$id (leitura aberta, sem login)",
          "Cada página define head() próprio (title, description, og:*)",
        ],
      },
      {
        tipo: "lista",
        titulo: "Estado atual dos dados",
        itens: [
          "Iniciativas: MOCK_INICIATIVAS em src/lib/smis.ts (substituir por GET /api/v1/iniciativas)",
          "Sessão, usuários, solicitações e configurações: localStorage (migrar para o backend)",
          "Papéis: sql/roles_convites.sql pronto, ainda não executado no banco",
          "Exceção temporária: MASTER_EMAIL em src/lib/auth-store.ts — remover após a tabela user_roles existir",
        ],
      },
      {
        tipo: "code",
        titulo: "Variáveis do frontend (.env)",
        codigo: `# Expostas ao navegador (somente valores públicos)
VITE_API_BASE_URL=https://api.ceurs-escolas.org.br/api/v1
VITE_SUPABASE_URL=https://<projeto>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<chave pública>

# Somente servidor (TanStack server functions)
ADMIN_ACCESS_CODE=<código de acesso do admin>`,
      },
    ],
  },
  {
    id: "backend-python",
    titulo: "Integração do backend em Python",
    publico: "Desenvolvedores",
    blocos: [
      {
        tipo: "texto",
        titulo: "Arquitetura recomendada",
        paragrafo:
          "API REST em FastAPI (Python 3.12) versionada em /api/v1, SQLAlchemy 2 + asyncpg sobre PostgreSQL, validação com Pydantic v2. O frontend envia Authorization: Bearer <access_token>; a API valida o JWT, lê o papel em user_roles e aplica as permissões. Respostas em JSON camelCase, datas ISO-8601, paginação ?page=&pageSize=.",
      },
      {
        tipo: "code",
        titulo: "Variáveis de ambiente do backend (.env)",
        codigo: `# --- Aplicação ---
ENVIRONMENT=production            # development | staging | production
API_PREFIX=/api/v1
SECRET_KEY=<gerar com: openssl rand -hex 32>
LOG_LEVEL=info
CORS_ORIGINS=http://localhost:8080,https://*.lovable.app,https://ceurs-escolas.org.br

# --- Banco de dados ---
DATABASE_URL=postgresql+asyncpg://<usuario>:<senha>@<host>:5432/<banco>
DB_POOL_SIZE=10

# --- Autenticação ---
SUPABASE_URL=https://<projeto>.supabase.co
SUPABASE_JWT_SECRET=<segredo JWT para validar tokens>
SUPABASE_SERVICE_ROLE_KEY=<chave privilegiada — nunca no frontend>
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
MASTER_EMAIL=<e-mail da conta Master única>
ADMIN_ACCESS_CODE=<mesmo código usado pelo frontend>

# --- Convites e e-mail ---
INVITE_EXPIRE_DAYS=7
FRONTEND_URL=https://ceurs-escolas.org.br
SMTP_HOST=<host>  SMTP_PORT=587  SMTP_USER=<usuario>  SMTP_PASSWORD=<senha>
EMAIL_FROM="CEURS–Escolas <nao-responda@ceurs-escolas.org.br>"

# --- Arquivos (capas de iniciativas, mídia) ---
STORAGE_BUCKET_INICIATIVAS=iniciativas
STORAGE_BUCKET_MIDIA=midia
MAX_UPLOAD_SIZE_MB=5

# --- LGPD ---
DATA_RETENTION_DAYS=1825
DPO_EMAIL=<e-mail do encarregado de dados>`,
      },
      {
        tipo: "code",
        titulo: "Endpoints esperados pelo frontend",
        codigo: `GET    /iniciativas?q=&tema=&uf=&ods=&page=   público (somente publicadas)
GET    /iniciativas/{id}                        público
POST   /iniciativas                             autenticado (rascunho)
PATCH  /iniciativas/{id}                        autor | curador | admin
POST   /iniciativas/{id}/curadoria              curador | admin
GET    /me                                      autenticado (perfil + papel)
POST   /solicitacoes-acesso                     público
GET    /solicitacoes-acesso                     admin | master
POST   /convites                                admin (curador/participante) | master (admin)
POST   /convites/{token}/aceitar                público com token
GET    /usuarios   PATCH /usuarios/{id}/papel   admin | master (papel admin: só master)
GET    /estatisticas/{indicador}                público
GET    /midia  GET /midia/{slug}                público
GET    /curso/trilhas  POST /curso/progresso    autenticado`,
      },
      {
        tipo: "code",
        titulo: "Campos da iniciativa (contrato JSON)",
        codigo: `{
  "id": "ini_001", "slug": "horta-sementes-do-amanha",
  "titulo": "string", "resumo": "string", "tema": "agua|energia|residuos|...",
  "escola": "string", "autor": "string", "imagemCapa": "url|null",
  "what": "", "why": "", "who": "", "where": "Cidade/UF", "when": "", "how": "", "howMuch": "",
  "ods": [2, 4, 12], "tags": ["horta"],
  "status": "rascunho|em_curadoria|revisao|publicada",
  "dataCriacao": "2026-01-10", "dataAtualizacao": "2026-02-01"
}`,
      },
      {
        tipo: "code",
        titulo: "Validação do token no FastAPI (exemplo)",
        codigo: `from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
import jwt, os

bearer = HTTPBearer()

def usuario_atual(cred=Depends(bearer)):
    try:
        return jwt.decode(cred.credentials, os.environ["SUPABASE_JWT_SECRET"],
                          algorithms=["HS256"], audience="authenticated")
    except jwt.PyJWTError:
        raise HTTPException(401, "Token inválido")`,
      },
    ],
  },
];

/* ============================================================
   COMPONENTES VISUAIS
   ============================================================ */

const COR_MAP = {
  soft: { bg: "bg-soft", border: "border-line", text: "text-ink" },
  teal: { bg: "bg-teal/10", border: "border-teal/40", text: "text-teal-900" },
  navy: { bg: "bg-navy/10", border: "border-navy/40", text: "text-navy" },
  orange: { bg: "bg-orange/10", border: "border-orange/40", text: "text-orange-900" },
  amber: { bg: "bg-amber/20", border: "border-amber/50", text: "text-amber-900" },
} as const;

const ICONE_MAP = {
  globe: Globe, lock: Lock, user: User, users: Users,
  shield: Shield, crown: Crown, database: Database, file: FileText,
};

function FluxoNodeView({ node }: { node: FluxoNode }) {
  const Icone = ICONE_MAP[node.icone];
  const cores = COR_MAP[node.cor];
  return (
    <div className="flex flex-col items-center">
      <div className={`flex min-w-[200px] flex-col items-center gap-1 rounded-xl border-2 ${cores.border} ${cores.bg} px-4 py-3 text-center shadow-sm`}>
        <Icone className={`h-5 w-5 ${cores.text}`} aria-hidden />
        <span className={`text-sm font-bold ${cores.text}`}>{node.label}</span>
        {node.descricao && <span className={`text-[11px] ${cores.text} opacity-75`}>{node.descricao}</span>}
      </div>
      {node.filhos && node.filhos.length > 0 && (
        <>
          <ArrowDown className="my-1 h-4 w-4 text-muted-foreground" aria-hidden />
          <div className="flex flex-wrap items-start justify-center gap-3">
            {node.filhos.map((filho, i) => <FluxoNodeView key={`${filho.label}-${i}`} node={filho} />)}
          </div>
        </>
      )}
    </div>
  );
}

function PerfilCard({ perfil }: { perfil: PerfilAcesso }) {
  const cores = COR_MAP[perfil.cor];
  const Icone = ICONE_MAP[perfil.icone];
  return (
    <div className={`rounded-xl border-2 ${cores.border} ${cores.bg} p-4`}>
      <div className="flex items-center gap-2">
        <Icone className={`h-5 w-5 ${cores.text}`} aria-hidden />
        <h4 className={`text-base font-extrabold uppercase tracking-wide ${cores.text}`}>{perfil.papel}</h4>
      </div>
      <div className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wider text-green-700">✅ Pode</p>
        <ul className="mt-1 space-y-1 text-xs">
          {perfil.pode.map((item) => <li key={item} className={`${cores.text} opacity-90`}>• {item}</li>)}
        </ul>
      </div>
      {perfil.naoPode.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-red-700">❌ Não pode</p>
          <ul className="mt-1 space-y-1 text-xs">
            {perfil.naoPode.map((item) => <li key={item} className={`${cores.text} opacity-90`}>• {item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function TabelaCard({ tabela }: { tabela: TabelaDB }) {
  const tipoCor =
    tabela.tipo === "auth" ? "bg-amber/20 border-amber/50 text-amber-900"
    : tabela.tipo === "principal" ? "bg-teal/10 border-teal/40 text-teal-900"
    : "bg-soft border-line text-muted-foreground";
  const tipoLabel = tabela.tipo === "auth" ? "Supabase Auth" : tabela.tipo === "principal" ? "Em uso" : "Planejada";
  return (
    <div className={`rounded-xl border-2 ${tipoCor} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4" aria-hidden />
          <h4 className="font-mono text-sm font-extrabold">{tabela.nome}</h4>
        </div>
        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{tipoLabel}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {tabela.campos.map((campo) => (
          <li key={campo.nome} className="flex flex-wrap items-baseline gap-2 text-xs">
            <code className="font-mono font-bold">{campo.nome}</code>
            <span className="text-[10px] opacity-70">{campo.tipo}</span>
            {campo.descricao && <span className="w-full text-[11px] opacity-70">↳ {campo.descricao}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderBloco(bloco: Bloco, i: number): ReactNode {
  switch (bloco.tipo) {
    case "texto":
      return (
        <div key={i}>
          {bloco.titulo && <h3 className="mb-1 font-bold text-ink">{bloco.titulo}</h3>}
          <p className="leading-relaxed text-ink/85">{bloco.paragrafo}</p>
        </div>
      );
    case "lista":
      return (
        <div key={i}>
          {bloco.titulo && <h3 className="mb-1 font-bold text-ink">{bloco.titulo}</h3>}
          <ul className="list-disc space-y-1 pl-5 text-ink/85">
            {bloco.itens.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      );
    case "code":
      return (
        <div key={i}>
          {bloco.titulo && <h3 className="mb-2 font-bold text-ink">{bloco.titulo}</h3>}
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-navy p-4 text-xs leading-relaxed text-secondary-foreground"><code>{bloco.codigo}</code></pre>
            <Button size="sm" variant="secondary" className="absolute right-2 top-2" onClick={() => navigator.clipboard.writeText(bloco.codigo)}>Copiar</Button>
          </div>
        </div>
      );
    case "flow":
      return (
        <div key={i} className="rounded-xl border border-line bg-card p-5">
          {bloco.titulo && <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-teal">{bloco.titulo}</h4>}
          <div className="flex flex-wrap items-start justify-center gap-4">
            {bloco.fluxo.map((node, j) => <FluxoNodeView key={j} node={node} />)}
          </div>
        </div>
      );
    case "perfis":
      return (
        <div key={i}>
          {bloco.titulo && <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-teal">{bloco.titulo}</h4>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bloco.perfis.map((p) => <PerfilCard key={p.papel} perfil={p} />)}
          </div>
        </div>
      );
    case "db":
      return (
        <div key={i}>
          {bloco.titulo && <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-teal">{bloco.titulo}</h4>}
          <div className="grid gap-4 md:grid-cols-2">
            {bloco.tabelas.map((t) => <TabelaCard key={t.nome} tabela={t} />)}
          </div>
        </div>
      );
  }
}

/* ============================================================
   PÁGINA
   ============================================================ */

function DocumentacaoPage() {
  const [busca, setBusca] = useState("");
  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return SECOES;
    return SECOES.filter((s) => JSON.stringify(s).toLowerCase().includes(q));
  }, [busca]);

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <p className="text-xs font-bold uppercase tracking-wider text-teal">
        Admin · Referência
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-navy">
        Documentação da plataforma
      </h1>
      <p className="mt-2 max-w-2xl text-ink/80">
        Visão conceitual, operacional, de design e técnica do CEURS–Escolas —
        inclusive para a integração do backend em Python.
      </p>

      <div className="mt-6">
        <Input
          placeholder="Buscar na documentação…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="max-w-sm"
          aria-label="Buscar na documentação"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-6 space-y-1 text-sm">
            {SECOES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded px-2 py-1 font-semibold text-ink hover:bg-navy/5">{s.titulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8">
          {filtradas.length === 0 && (
            <p className="text-ink/70">Nada encontrado para “{busca}”.</p>
          )}
          {filtradas.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-6 rounded-xl border border-line bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-navy">{s.titulo}</h2>
                <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-ink">{s.publico}</span>
              </div>
              <div className="mt-4 space-y-6">{s.blocos.map(renderBloco)}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
