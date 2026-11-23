import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteShell } from "./SiteShell";

export function Placeholder({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: ReactNode }) {
  return (
    <SiteShell>
      <section className="container-page max-w-2xl py-20">
        <p className="eyebrow text-teal">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-extrabold text-navy">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{text}</p>
        {children ?? <Link to="/" className="mt-8 inline-block font-bold text-navy hover:text-teal">← Voltar para o início</Link>}
      </section>
    </SiteShell>
  );
}
