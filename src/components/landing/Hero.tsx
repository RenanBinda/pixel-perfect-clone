import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Eye, Leaf, Link2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/colabora_banner.png";
import { useSuspenseQuery } from "@tanstack/react-query";
import { homeContentQuery } from "@/lib/home-content-query";
import { useSessaoCta } from "@/hooks/use-sessao-cta";

export function Hero() {
  const { usuario, config } = useSessaoCta();
  const { data: records } = useSuspenseQuery(homeContentQuery);
  const content = records[config?.perfil ?? "visitante"].content.hero;

  return (
    <section
      id="sobre"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* Imagem de fundo + overlay */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={content.image || heroImage}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/70" />
      </div>

      <div className="container-page grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:py-32">
        {/* Coluna esquerda — promessa + CTAs */}
        <div className="text-secondary-foreground">
          <p className="eyebrow flex items-center gap-2 text-teal">
            <span aria-hidden className="h-2 w-2 rounded-full bg-orange" />
            {content.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-5 break-words text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl"
          >
            {content.heading}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky">
            {content.description}
          </p>

          {usuario && config && (
            <div className="mt-6">
              <span className="inline-block rounded-full bg-orange/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber">
                {content.badge}
              </span>
              <p className="mt-3 text-base font-semibold text-secondary-foreground">
                Olá, {usuario.nome.split(" ")[0]}! {content.welcome}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {usuario && config ? (
              <>
                <Button asChild size="lg">
                  <Link
                    to={content.primary.to}
                    className="inline-flex items-center gap-2"
                  >
                    {content.primary.rotulo}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
                >
                  <Link to={content.secondary.to}>{content.secondary.rotulo}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link
                    to={content.primary.to}
                    className="inline-flex items-center gap-2"
                  >
                    {content.primary.rotulo}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
                >
                  <Link to={content.secondary.to}>{content.secondary.rotulo}</Link>
                </Button>
              </>
            )}
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-sky/80">
            <Leaf className="h-3.5 w-3.5 text-teal" aria-hidden />
            Programa gratuito · Certificado UFSC · Dados protegidos pela LGPD
          </p>
        </div>

        {/* Coluna direita — narrativa do "como funciona" */}
        <div className="relative">
          <div className="rounded-2xl border border-secondary-foreground/15 bg-navy/70 p-8 shadow-hero backdrop-blur-md">
            <p className="eyebrow text-amber">Como o programa funciona</p>
            <ul className="mt-6 space-y-5">
              <HeroPoint
                icon={Eye}
                title="Reconhecer o território"
                desc="Ler o contexto da escola e identificar potenciais."
                color="text-teal"
              />
              <HeroPoint
                icon={Link2}
                title="Mapear práticas"
                desc="Registrar iniciativas com estrutura 5W2H."
                color="text-orange"
              />
              <HeroPoint
                icon={Users}
                title="Mobilizar a comunidade"
                desc="Conectar atores e coproduzir soluções."
                color="text-amber"
              />
              <HeroPoint
                icon={Award}
                title="Ganhar certificado"
                desc="10h de formação com certificado da UFSC."
                color="text-teal"
              />
            </ul>
          </div>


        </div>
      </div>
    </section>
  );
}

function HeroPoint({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: typeof Eye;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-foreground/10">
        <Icon className={`h-5 w-5 ${color}`} aria-hidden />
      </span>
      <div>
        <p className="font-bold text-secondary-foreground">{title}</p>
        <p className="text-sm text-sky">{desc}</p>
      </div>
    </li>
  );

}
