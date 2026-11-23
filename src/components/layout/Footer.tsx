import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

type FooterCol = {
  title: string;
  links: { label: string; to?: string; href?: string; external?: boolean }[];
};

const cols: FooterCol[] = [
  {
    title: "Programa",
    links: [
      { label: "Sobre", to: "/sobre" },
      { label: "Módulos", href: "/#modulos" },
      { label: "Comunidade", to: "/comunidade" },
      { label: "Ajuda", to: "/ajuda" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Mídia", to: "/midia" },
      { label: "Estatísticas", to: "/estatisticas" },
      { label: "Identidade visual", to: "/identidade" },   // ← NOVO
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", to: "/privacidade" },
      { label: "LGPD", to: "/lgpd" },
      { label: "Termos", to: "/termos" },
    ],
  },
];

const partners = ["UFSC", "MCTI", "Parlamento", "USP"] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-secondary-foreground">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.1fr_1.6fr_1fr]">
        <div>
          <span className="inline-block rounded-lg bg-card px-3 py-2">
            <Logo className="text-lg" />
          </span>
          <p className="mt-4 max-w-xs text-sm text-sky">
            Capacitação e Estudos Urbanos e Regionais para Sustentabilidade
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="eyebrow text-amber">{c.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) =>
                  l.to ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sky transition-colors hover:text-secondary-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noopener noreferrer" : undefined}
                        className="text-sky transition-colors hover:text-secondary-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div>
          <h3 className="eyebrow text-amber">Realização</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {partners.map((b) => (
              <li
                key={b}
                className="rounded-full border border-secondary-foreground/25 px-3 py-1 text-xs font-bold"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/15">
        <div className="container-page flex flex-col justify-between gap-2 py-5 text-xs text-sky sm:flex-row">
          <span>© 2026 CEURS–Escolas</span>
          <a
            href="mailto:suporte@ceurs.org.br"
            className="hover:text-secondary-foreground"
          >
            suporte@ceurs.org.br
          </a>
        </div>
      </div>
    </footer>
  );
}