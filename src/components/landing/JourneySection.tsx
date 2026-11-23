import { Lightbulb, FolderKanban, Trophy } from "lucide-react";
import { SectionHeader } from "./ModulesSection";

const steps = [
  {
    icon: Lightbulb,
    n: "01",
    t: "Sua escola já faz",
    d: "Identifique uma prática de sustentabilidade existente na escola e no território.",
    color: "teal",
  },
  {
    icon: FolderKanban,
    n: "02",
    t: "Você estrutura",
    d: "Registre a iniciativa no SMIS com método 5W2H, evidências e contexto.",
    color: "orange",
  },
  {
    icon: Trophy,
    n: "03",
    t: "A comunidade reconhece",
    d: "Compartilhe na comunidade AWA2030, inspire outras escolas e receba feedback.",
    color: "amber",
  },
];

const colorMap = {
  teal: { bg: "bg-teal/10", text: "text-teal", ring: "ring-teal/20" },
  orange: { bg: "bg-orange/10", text: "text-orange", ring: "ring-orange/20" },
  amber: { bg: "bg-amber/15", text: "text-amber-600", ring: "ring-amber/30" },
} as const;

export function JourneySection() {
  return (
    <section
      id="jornada"
      aria-labelledby="jornada-title"
      className="bg-soft py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          id="jornada-title"
          eyebrow="Sua jornada"
          title="Do que a escola já faz ao que o país reconhece"
          lead="Um caminho claro: da prática isolada à referência nacional em sustentabilidade escolar."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-teal/40 via-orange/40 to-amber/40 md:block"
          />

          {steps.map((s) => {
            const Icon = s.icon;
            const c = colorMap[s.color as keyof typeof colorMap];
            return (
              <li
                key={s.n}
                className="relative rounded-2xl border border-line bg-card p-8 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ring-4 ${c.bg} ${c.ring}`}
                  >
                    <Icon className={`h-6 w-6 ${c.text}`} aria-hidden />
                  </span>
                  <span
                    aria-hidden
                    className="text-5xl font-extrabold leading-none tracking-tight text-line"
                  >
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}