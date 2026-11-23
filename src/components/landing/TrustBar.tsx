import { Award, Building2, GraduationCap, Landmark } from "lucide-react";

const partners = [
  { icon: GraduationCap, name: "UFSC", sub: "Universidade Federal de Santa Catarina" },
  { icon: Building2, name: "MCTI", sub: "Ministério da Ciência, Tecnologia e Inovação" },
  { icon: Landmark, name: "Parlamento", sub: "Frente Parlamentar" },
  { icon: Award, name: "USP", sub: "Universidade de São Paulo" },
] as const;

export function TrustBar() {
  return (
    <section
      aria-labelledby="trust-title"
      className="border-y border-line bg-card py-10"
    >
      <div className="container-page">
        <p
          id="trust-title"
          className="eyebrow text-center text-muted-foreground"
        >
          Realização institucional
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {partners.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.name}
                className="flex items-center gap-3 rounded-xl border border-line bg-soft p-4 transition-colors hover:border-teal"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-navy">{p.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {p.sub}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}