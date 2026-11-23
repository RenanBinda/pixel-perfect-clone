import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Building2,
  Key,
  LogOut,
  Map,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/shared/Section";
import { requireAuth } from "@/lib/admin-access.functions";
import { useUsuario, authStore } from "@/lib/auth-store";

export const Route = createFileRoute("/conta")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAuth("/conta");
  },
  head: () => ({
    meta: [
      { title: "Minha conta · CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContaPage,
});

const tabs = [
  { id: "perfil", icon: User, label: "Perfil" },
  { id: "vinculos", icon: Building2, label: "Vínculos" },
  { id: "modulos", icon: BookOpen, label: "Meus módulos" },
  { id: "seguranca", icon: Shield, label: "Segurança" },
  { id: "notificacoes", icon: Bell, label: "Notificações" },
] as const;

function ContaPage() {
  const usuario = useUsuario();

  return (
    <SiteShell>
      <section className="container-page py-12 md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar à página inicial
        </Link>

        <header className="max-w-3xl">
          <p className="eyebrow text-teal">Área do participante</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Minha conta
          </h1>
          <p className="mt-4 text-muted-foreground">
            Gerencie seus dados, vínculos, módulos e preferências.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav
            aria-label="Seções da conta"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
              {tabs.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-navy/5 hover:text-navy lg:shrink"
                    >
                      <Icon className="h-4 w-4 text-teal" aria-hidden />
                      {t.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <Button
              variant="outline"
              className="mt-4 hidden w-full lg:flex"
              onClick={() => authStore.signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden />
              Sair da conta
            </Button>
          </nav>

          <div className="space-y-8">
            {/* Perfil */}
            <Section
              id="perfil"
              tone="card"
              size="compact"
              className="rounded-2xl"
            >
              <header className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-navy">Perfil</h2>
                  <p className="text-sm text-muted-foreground">
                    Seus dados pessoais e de contato.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-3.5 w-3.5" aria-hidden />
                  Editar
                </Button>
              </header>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" defaultValue={usuario?.nome ?? ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={usuario?.email ?? ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    defaultValue="(48) 99999-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" defaultValue="Florianópolis · SC" />
                </div>
              </div>
            </Section>

            {/* Vínculos */}
            <Section
              id="vinculos"
              tone="card"
              size="compact"
              className="rounded-2xl"
            >
              <header className="mb-6">
                <h2 className="text-xl font-extrabold text-navy">Vínculos</h2>
                <p className="text-sm text-muted-foreground">
                  Escolas e equipes às quais você está associado(a).
                </p>
              </header>

              <ul className="space-y-3">
                <li className="flex items-center justify-between rounded-xl border border-line bg-soft p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                      <Building2 className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-bold text-navy">
                        Escola Municipal Vila Verde
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Coordenadora pedagógica
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal">
                    Ativo
                  </span>
                </li>
              </ul>

              <Button variant="outline" size="sm" className="mt-4">
                <Building2 className="mr-2 h-3.5 w-3.5" aria-hidden />
                Adicionar vínculo
              </Button>
            </Section>

            {/* Módulos */}
            <Section
              id="modulos"
              tone="card"
              size="compact"
              className="rounded-2xl"
            >
              <header className="mb-6">
                <h2 className="text-xl font-extrabold text-navy">
                  Meus módulos
                </h2>
                <p className="text-sm text-muted-foreground">
                  Progresso nos módulos do programa.
                </p>
              </header>

              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  { nome: "CCA2030", progresso: 100, icon: BookOpen },
                  { nome: "SMIS-Escolas", progresso: 65, icon: Map },
                  { nome: "AWA2030", progresso: 40, icon: BookOpen },
                  { nome: "CoP-ABC", progresso: 20, icon: BookOpen },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <li
                      key={m.nome}
                      className="rounded-xl border border-line bg-soft p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="flex-1">
                          <p className="font-bold text-navy">{m.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            {m.progresso}% concluído
                          </p>
                        </div>
                      </div>
                      <div
                        className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
                        role="progressbar"
                        aria-valuenow={m.progresso}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Progresso em ${m.nome}`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal to-orange"
                          style={{ width: `${m.progresso}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Section>

            {/* Segurança */}
            <Section
              id="seguranca"
              tone="card"
              size="compact"
              className="rounded-2xl"
            >
              <header className="mb-6">
                <h2 className="text-xl font-extrabold text-navy">Segurança</h2>
                <p className="text-sm text-muted-foreground">
                  Senha, autenticação em dois fatores e sessões ativas.
                </p>
              </header>

              <ul className="space-y-3">
                <li className="flex items-center justify-between rounded-xl border border-line bg-soft p-4">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-teal" aria-hidden />
                    <div>
                      <p className="font-bold text-navy">Senha</p>
                      <p className="text-xs text-muted-foreground">
                        Última alteração: há 3 meses
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Alterar
                  </Button>
                </li>
                <li className="flex items-center justify-between rounded-xl border border-line bg-soft p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-teal" aria-hidden />
                    <div>
                      <p className="font-bold text-navy">
                        Autenticação em dois fatores
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recomendado para maior segurança
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ativar
                  </Button>
                </li>
              </ul>
            </Section>

            {/* Notificações */}
            <Section
              id="notificacoes"
              tone="card"
              size="compact"
              className="rounded-2xl"
            >
              <header className="mb-6">
                <h2 className="text-xl font-extrabold text-navy">
                  Notificações
                </h2>
                <p className="text-sm text-muted-foreground">
                  Escolha como deseja receber avisos do programa.
                </p>
              </header>

              <ul className="space-y-3">
                {[
                  {
                    titulo: "Novos conteúdos na comunidade",
                    desc: "Atualizações das comunidades temáticas que você segue.",
                  },
                  {
                    titulo: "Encontros e eventos",
                    desc: "Convites para atividades presenciais e remotas.",
                  },
                  {
                    titulo: "Comentários e menções",
                    desc: "Quando alguém interage com suas iniciativas.",
                  },
                ].map((n) => (
                  <li
                    key={n.titulo}
                    className="flex items-start gap-3 rounded-xl border border-line bg-soft p-4"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 h-4 w-4 accent-orange"
                      aria-label={n.titulo}
                    />
                    <div>
                      <p className="font-bold text-navy">{n.titulo}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Button
              variant="outline"
              className="w-full lg:hidden"
              onClick={() => authStore.signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden />
              Sair da conta
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}