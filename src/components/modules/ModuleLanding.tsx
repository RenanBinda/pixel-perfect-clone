import { useSessaoCta } from "@/hooks/use-sessao-cta";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";

export type ModuleFeature = {
  titulo: string;
  descricao: string;
};

export type ModuleStep = {
  numero: string;
  titulo: string;
  descricao: string;
};

export type ModuleLandingProps = {
  nome: string;
  codigo: string;
  resumo: string;
  descricao: string;
  icone: LucideIcon;
  corDestaque: string;
  funcionalidades: ModuleFeature[];
  passos?: ModuleStep[] | undefined;
  hrefExterno?: string | undefined;      // ← `| undefined`
  ctaExterno?: string | undefined;       // ← `| undefined`
  toInterno?: string | undefined;
  publico: string;
  duracao?: string | undefined;          // ← `| undefined`
};

export function ModuleLanding({
  nome,
  codigo,
  resumo,
  descricao,
  icone: Icon,
  corDestaque,
  funcionalidades,
  passos,
  hrefExterno,
  ctaExterno,
  toInterno,
  publico,
  duracao,
}: ModuleLandingProps) {
  const cta = useSessaoCta();
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

        {/* HERO */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="eyebrow text-teal">{codigo}</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl">
              {nome}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{descricao}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {hrefExterno ? (
                <Button asChild size="lg">
                  <a
                    href={hrefExterno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    {ctaExterno ?? `Acessar ${nome}`}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link to={toInterno ?? "/login"}>Acessar {nome}</Link>
                </Button>
              )}
              {!cta.logado && (
                <Button asChild size="lg" variant="outline">
                  <Link to="/solicitar-acesso">Solicitar acesso</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Card lateral com metadados */}
          <aside className="rounded-2xl border border-line bg-card p-8 shadow-soft">
            <p className="eyebrow text-teal">Sobre o módulo</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-bold text-navy">Público-alvo</dt>
                <dd className="mt-1 text-muted-foreground">{publico}</dd>
              </div>
              {duracao && (
                <div>
                  <dt className="font-bold text-navy">Duração</dt>
                  <dd className="mt-1 text-muted-foreground">{duracao}</dd>
                </div>
              )}
              <div>
                <dt className="font-bold text-navy">Acesso</dt>
                <dd className="mt-1 text-muted-foreground">
                  Por convite · Dados protegidos pela LGPD
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* FUNCIONALIDADES */}
        <section className="mt-20" aria-labelledby="func-title">
          <header className="max-w-2xl">
            <p className="eyebrow text-teal">O que você pode fazer</p>
            <h2
              id="func-title"
              className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl"
            >
              Funcionalidades principais
            </h2>
            <p className="mt-4 text-muted-foreground">{resumo}</p>
          </header>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {funcionalidades.map((f) => (
              <li
                key={f.titulo}
                className="rounded-2xl border border-line bg-card p-6 shadow-soft"
              >
                <CheckCircle2
                  className={`h-5 w-5 ${corDestaque}`}
                  aria-hidden
                />
                <h3 className="mt-4 text-lg font-bold text-navy">{f.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.descricao}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* PASSOS (opcional) */}
        {passos && passos.length > 0 && (
          <section className="mt-20" aria-labelledby="steps-title">
            <header className="max-w-2xl">
              <p className="eyebrow text-teal">Jornada</p>
              <h2
                id="steps-title"
                className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl"
              >
                Como funciona
              </h2>
            </header>

            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {passos.map((p) => (
                <li
                  key={p.numero}
                  className="relative overflow-hidden rounded-2xl border-t-4 border-orange bg-soft p-8 shadow-soft"
                >
                  <span
                    aria-hidden
                    className="text-6xl font-extrabold leading-none text-line"
                  >
                    {p.numero}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-navy">{p.titulo}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.descricao}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* CTA FINAL */}
        <div className="mt-20 rounded-2xl bg-navy p-8 text-secondary-foreground md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="eyebrow text-amber">Próximo passo</p>
              <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                Pronto para começar no {nome}?
              </h2>
              <p className="mt-3 max-w-lg text-sky">
                O acesso é por convite. Solicite o seu e nossa equipe entrará em contato
                em até 5 dias úteis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg">
                <Link to={cta.logado ? (toInterno ?? cta.destino) : "/solicitar-acesso"}>
                  {cta.logado ? `Acessar ${nome}` : "Solicitar acesso"}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
              >
                <Link to={cta.logado ? cta.destino : "/login"}>
                  {cta.logado ? cta.rotulo : "Já tenho acesso"}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Link externo secundário */}
        {hrefExterno && (
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Ou acesse diretamente:{" "}
            <a
              href={hrefExterno}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-navy underline-offset-4 hover:underline"
            >
              {hrefExterno}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </p>
        )}
      </section>
    </SiteShell>
  );
}