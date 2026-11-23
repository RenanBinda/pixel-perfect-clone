import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { homeContentQuery } from "@/lib/home-content-query";
import { PathCard } from "./PathCard";
import type { HomeProfile } from "@/lib/home-content";
import { useSessaoCta } from "@/hooks/use-sessao-cta";

export function PersonasSection() {
  const { logado, config } = useSessaoCta();

  const { data: records } = useSuspenseQuery(homeContentQuery);
  const visiveis: HomeProfile[] = ["diretor", "lider", "comunidade", "visitante"];

  return (
    <section
      id="caminhos"
      aria-labelledby="caminhos-title"
      className="bg-soft py-20 md:py-28"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-teal">Escolha seu caminho</p>
          <h2
            id="caminhos-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl"
          >
            Por onde você quer começar?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada pessoa chega à plataforma com um objetivo diferente. Encontre
            o seu — em até 2 cliques.
          </p>
        </div>

        <ul
          className={`mt-14 grid gap-5 sm:grid-cols-2 ${
            visiveis.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {visiveis.map((profile) => (
            <li key={profile}>
              <PathCard card={records[profile].content.card} active={config?.perfil === profile} />
            </li>
          ))}
        </ul>

        {!logado && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="font-semibold text-navy underline-offset-4 hover:text-teal hover:underline"
            >
              Entrar na plataforma
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}