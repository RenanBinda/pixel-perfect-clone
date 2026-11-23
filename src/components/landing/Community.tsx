import { Building2, MapPin, Sprout, Users } from "lucide-react";
import schoolCommunity from "@/assets/escola_agente.png";

const stats = [
  { icon: Building2, value: "200+", label: "Escolas participantes" },
  { icon: Users, value: "1.240", label: "Educadores formados" },
  { icon: Sprout, value: "860", label: "Iniciativas mapeadas" },
  { icon: MapPin, value: "72", label: "Municípios alcançados" },
] as const;

export function Community() {
  return (
    <section
      id="comunidade"
      aria-labelledby="community-title"
      className="bg-navy py-20 text-secondary-foreground md:py-28"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-amber">Impacto em rede</p>
          <h2
            id="community-title"
            className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl"
          >
            Uma comunidade que transforma territórios
          </h2>
          <p className="mt-4 text-lg text-sky">
            Escolas, educadores e parceiros construindo juntos um futuro mais
            sustentável.
          </p>
        </div>

        {/* Números */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.label}
                className="rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/5 p-6 backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-teal" aria-hidden />
                <p className="mt-5 text-4xl font-extrabold tracking-tight">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-sky">{s.label}</p>
              </li>
            );
          })}
        </ul>

        {/* Depoimento + imagem */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-2xl shadow-hero">
            <img
              src={schoolCommunity}
              alt="Comunidade escolar reunida em atividade coletiva"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>

          <figure className="rounded-2xl border border-secondary-foreground/15 bg-secondary-foreground/5 p-8 backdrop-blur-sm">
            <blockquote className="text-lg leading-relaxed">
              "O CEURS–Escolas nos mostrou que a escola não está sozinha. Ao
              mapear nossas práticas, percebemos que já fazíamos parte de uma
              rede muito maior de transformação."
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-secondary-foreground/15 pt-6">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-teal font-bold text-navy"
              >
                MC
              </span>
              <div>
                <p className="font-bold">Maria Clara Andrade</p>
                <p className="text-sm text-sky">
                  Coordenadora pedagógica · Escola Municipal Vila Verde
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}