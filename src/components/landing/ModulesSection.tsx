import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  Map,

  type LucideIcon,
} from "lucide-react";

type Module = {
  icon: LucideIcon;
  name: string;
  tag: string;
  desc: string;
  to: string;
  color: "teal" | "orange" | "navy" | "amber";
};

const colorMap = {
  teal: {
    iconBg: "bg-teal/10",
    iconText: "text-teal",
    border: "hover:border-teal",
  },
  orange: {
    iconBg: "bg-orange/10",
    iconText: "text-orange",
    border: "hover:border-orange",
  },
  navy: {
    iconBg: "bg-navy/10",
    iconText: "text-navy",
    border: "hover:border-navy",
  },
  amber: {
    iconBg: "bg-amber/15",
    iconText: "text-amber-600",
    border: "hover:border-amber",
  },
} as const;

const modules: Module[] = [
  {
    icon: BookOpen,
    name: "Curso de formação",
    tag: "CCA2030 · 10h com certificado UFSC",
    desc: "Formação individual de 10h no domínio ABC, com e-Book, vídeos, atividades e certificado.",
    to: "/curso",
    color: "teal",
  },
  {
    icon: Globe2,
    name: "Comunidade de prática",
    tag: "AWA2030 · Troca entre escolas",
    desc: "Rede de escolas, equipes e parceiros organizada por temas, com coordenadores, editores e membros.",
    to: "/awa",
    color: "orange",
  },
  {
    icon: Map,
    name: "Mapeador de práticas",
    tag: "SMIS-Escolas · Registro de iniciativas",
    desc: "Ferramenta usada dentro do curso e da comunidade para registrar iniciativas, evidências e maturidade.",
    to: "/smis",
    color: "navy",
  },
];

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-teal">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl"
      >
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted-foreground">{lead}</p>}
    </div>
  );
}

export function ModulesSection() {
  return (
    <section
      id="modulos"
      aria-labelledby="modulos-title"
      className="bg-card py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          id="modulos-title"
          eyebrow="Ecossistema digital"
          title="Como o Programa Acontece"
          lead="Duas portas de entrada — o curso e a comunidade — e um instrumento que acompanha o educador da sensibilização à ação no território."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            const colors = colorMap[m.color];
            return (
              <li key={m.name}>
                <Link
                  to={m.to}
                  className={`group flex h-full flex-col rounded-2xl border border-line bg-soft p-7 transition-all hover:-translate-y-1 hover:shadow-card focus-visible:-translate-y-1 focus-visible:shadow-card ${colors.border}`}
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBg}`}
                  >
                    <Icon className={`h-7 w-7 ${colors.iconText}`} aria-hidden />
                  </span>

                  <h3 className="mt-6 text-xl font-bold text-navy">{m.name}</h3>
                  <p className="eyebrow mt-1 text-[11px] text-teal">{m.tag}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {m.desc}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-navy transition-colors group-hover:text-teal">
                    Conhecer
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}