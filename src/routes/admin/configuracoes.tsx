import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Crown,
  Database,
  Mail,
  Save,
  Scale,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { requireRole } from "@/lib/admin-access.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsuario } from "@/lib/auth-store";

export const Route = createFileRoute("/admin/configuracoes")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["master"], "/admin/configuracoes");
  },
  head: () => ({
    meta: [
      { title: "Configurações · Admin CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConfiguracoesPage,
});

type Config = {
  ciclo: string;
  emailSuporte: string;
  status: "aberto" | "avaliacao" | "encerrado";
  sessaoHoras: string;
  dpoNome: string;
  dpoEmail: string;
  versaoTermos: string;
};

const PADRAO: Config = {
  ciclo: "Ciclo 2026",
  emailSuporte: "suporte@leful.com.br",
  status: "aberto",
  sessaoHoras: "8",
  dpoNome: "",
  dpoEmail: "",
  versaoTermos: "1.0",
};

const CHAVE = "ceurs-config";

function Cartao({
  icon: Icon,
  titulo,
  desc,
  children,
}: {
  icon: typeof Settings;
  titulo: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-card p-6">
      <div className="flex items-start gap-3">
        <span className="rounded-lg bg-navy/5 p-2 text-navy">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-bold text-navy">{titulo}</h2>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Campo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-ink">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function ConfiguracoesPage() {
  const usuario = useUsuario();
  const [cfg, setCfg] = useState<Config>(PADRAO);
  const [salvoEm, setSalvoEm] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) {
        const p = JSON.parse(raw) as { cfg: Config; salvoEm: string };
        setCfg({ ...PADRAO, ...p.cfg });
        setSalvoEm(p.salvoEm);
      }
    } catch {
      /* ignora */
    }
  }, []);

  const set = <K extends keyof Config>(k: K, v: Config[K]) =>
    setCfg((c) => ({ ...c, [k]: v }));

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    const quando = new Date().toLocaleString("pt-BR");
    localStorage.setItem(CHAVE, JSON.stringify({ cfg, salvoEm: quando }));
    setSalvoEm(quando);
  }

  const supabaseOk = Boolean(import.meta.env.VITE_SUPABASE_URL);

  return (
    <form onSubmit={salvar} className="container-page space-y-6 py-12 md:py-16">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao painel
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-teal">Painel administrativo</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Configurações
          </h1>
          <p className="mt-3 text-muted-foreground">
            Parâmetros globais da plataforma.{" "}
            {salvoEm ? `Último salvamento: ${salvoEm}.` : "Ainda não salvo."}
          </p>
        </div>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" aria-hidden />
          Salvar alterações
        </Button>
      </header>

      <Cartao
        icon={Crown}
        titulo="Conta Master"
        desc="Conta raiz única, com controle total e poder de nomear ou revogar administradores."
      >
        <Campo label="E-mail da conta">
          <Input value={usuario?.email ?? "suporte@leful.com.br"} readOnly />
        </Campo>
        <Campo label="Papel">
          <Input value="Master (único)" readOnly />
        </Campo>
      </Cartao>

      <Cartao
        icon={Settings}
        titulo="Programa"
        desc="Informações institucionais exibidas na plataforma."
      >
        <Campo label="Ciclo vigente">
          <Input
            value={cfg.ciclo}
            onChange={(e) => set("ciclo", e.target.value)}
          />
        </Campo>
        <Campo label="E-mail de suporte">
          <Input
            type="email"
            value={cfg.emailSuporte}
            onChange={(e) => set("emailSuporte", e.target.value)}
          />
        </Campo>
        <Campo label="Status das adesões">
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={cfg.status}
            onChange={(e) => set("status", e.target.value as Config["status"])}
          >
            <option value="aberto">Aberto para novas escolas</option>
            <option value="avaliacao">Período de avaliação</option>
            <option value="encerrado">Encerrado</option>
          </select>
        </Campo>
      </Cartao>

      <Cartao
        icon={ShieldCheck}
        titulo="Acesso e segurança"
        desc="Regras de sessão e hierarquia de papéis."
      >
        <Campo label="Duração da sessão (horas)">
          <Input
            type="number"
            min={1}
            max={72}
            value={cfg.sessaoHoras}
            onChange={(e) => set("sessaoHoras", e.target.value)}
          />
        </Campo>
        <div className="text-sm text-muted-foreground md:col-span-2">
          <p className="font-semibold text-ink">Hierarquia</p>
          <p>
            Master → nomeia Admins · Admin → convida Curadores e Participantes ·
            Curador → curadoria editorial · Participante → área pessoal.
          </p>
        </div>
      </Cartao>

      <Cartao
        icon={Scale}
        titulo="Privacidade e LGPD"
        desc="Encarregado de dados e versão dos documentos legais."
      >
        <Campo label="Encarregado (DPO)">
          <Input
            value={cfg.dpoNome}
            onChange={(e) => set("dpoNome", e.target.value)}
            placeholder="Nome completo"
          />
        </Campo>
        <Campo label="E-mail do encarregado">
          <Input
            type="email"
            value={cfg.dpoEmail}
            onChange={(e) => set("dpoEmail", e.target.value)}
            placeholder="dpo@exemplo.org"
          />
        </Campo>
        <Campo label="Versão dos Termos e Política">
          <Input
            value={cfg.versaoTermos}
            onChange={(e) => set("versaoTermos", e.target.value)}
          />
        </Campo>
      </Cartao>

      <Cartao
        icon={Database}
        titulo="Conexões"
        desc="Situação dos serviços usados pela plataforma."
      >
        <div className="flex items-center gap-2 text-sm">
          <Database className="h-4 w-4 text-navy" aria-hidden /> Banco e login:
          <span
            className={
              supabaseOk
                ? "font-bold text-teal"
                : "font-bold text-destructive"
            }
          >
            {supabaseOk ? "Conectado" : "Não configurado"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-navy" aria-hidden /> E-mails automáticos:
          <span className="font-bold text-muted-foreground">
            Padrão do provedor
          </span>
        </div>
      </Cartao>
    </form>
  );
}
