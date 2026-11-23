import { useSessaoCta } from "@/hooks/use-sessao-cta";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const beneficios = [
  "Curso de 10h com certificado da UFSC",
  "Comunidade de prática entre escolas",
  "Instrumento de mapeamento (SMIS)",
  "Acesso gratuito pelo programa",
];

export function FinalCTA() {
  const cta = useSessaoCta();

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden bg-navy py-20 text-secondary-foreground md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(24,185,176,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,139,18,0.12),transparent_50%)]"
      />

      <div className="container-page mx-auto max-w-4xl text-center">
        <p className="eyebrow flex items-center justify-center gap-2 text-amber">
          <Sparkles className="h-4 w-4" aria-hidden />
          Faça parte
        </p>
        <h2
          id="final-cta-title"
          className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl"
        >
          Transforme sua escola em um{" "}
          <span className="text-orange">agente local de sustentabilidade</span>
        </h2>
        <p className="mt-5 text-lg text-sky">
          Solicite seu acesso, conecte-se a educadores de todo o país e comece
          a mapear as práticas que já transformam o seu território.
        </p>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {beneficios.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm text-secondary-foreground"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                aria-hidden
              />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link
              to={cta.logado ? cta.destino : "/solicitar-acesso"}
              className="inline-flex items-center gap-2"
            >
              {cta.logado ? cta.rotulo : "Participar do programa"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground hover:text-navy"
          >
            <Link to="/iniciativas">Explorar iniciativas</Link>
          </Button>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-sky/80">
          <Users className="h-3.5 w-3.5" aria-hidden />
          Junte-se a 200+ escolas em 5 regiões do Brasil
        </p>
      </div>
    </section>
  );
}