import { Logo } from "@/components/layout/Logo";

const points = [
  { icon: "✦", title: "Observar", desc: "ler o contexto e seus potenciais" },
  { icon: "✦", title: "Conectar", desc: "aproximar pessoas, saberes e redes" },
  { icon: "✦", title: "Agir", desc: "transformar aprendizagem em prática" },
] as const;

export function LoginStory() {
  return (
    <section
      aria-labelledby="story-title"
      className="relative hidden overflow-hidden bg-navy px-[7vw] py-10 text-secondary-foreground lg:flex lg:flex-col"
    >
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-block rounded bg-soft px-3 py-2">
          <Logo variant="white" size="md" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal">
          plataforma de aprendizagem
        </span>
      </div>

      <div className="relative z-10 my-auto max-w-md pt-16">
        <p className="eyebrow text-teal">
          <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-orange" />
          CEURS–ESCOLAS
        </p>
        <h1
          id="story-title"
          className="mt-5 text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
        >
          Aprender o território.
          <br />
          <span className="text-orange">Transformar o futuro.</span>
        </h1>
        <p className="mt-6 max-w-sm text-base text-sky">
          Um espaço para conectar conhecimento, escola e desenvolvimento sustentável local.
        </p>

        <ul className="mt-10 max-w-md divide-y divide-secondary-foreground/15 border-y border-secondary-foreground/15">
          {points.map((p) => (
            <li key={p.title} className="flex items-center gap-4 py-3">
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal font-bold text-navy"
              >
                {p.icon}
              </span>
              <p className="text-sm">
                <b className="font-bold">{p.title}</b>{" "}
                <span className="text-sky">{p.desc}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Elemento decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-40 h-[560px] w-[560px] rounded-full border border-teal/20 shadow-[0_0_0_42px_rgba(24,185,176,0.045),0_0_0_102px_rgba(24,185,176,0.035)]"
      />

      <div className="relative z-10 mt-auto flex justify-between border-t border-secondary-foreground/20 pt-4 text-[10px] text-sky">
        <span>CEURS · Estudos urbanos e regionais para a sustentabilidade</span>
        <span>2026</span>
      </div>
    </section>
  );
}