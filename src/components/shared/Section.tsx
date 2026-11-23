import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
  tone?: "soft" | "card" | "navy" | "gradient";
  size?: "default" | "compact" | "spacious";
};

const toneMap = {
  soft: "bg-soft text-ink",
  card: "bg-card text-ink",
  navy: "bg-navy text-secondary-foreground",
  gradient: "bg-gradient-to-br from-soft via-card to-soft text-ink",
} as const;

const sizeMap = {
  compact: "py-14 md:py-20",
  default: "py-20 md:py-28",
  spacious: "py-24 md:py-32",
} as const;

/**
 * Seção padronizada com eyebrow, título, lead, ações e conteúdo.
 *
 * Uso:
 *   <Section id="modulos" eyebrow="Ecossistema" title="Módulos" lead="...">
 *     <ul>...</ul>
 *   </Section>
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  actions,
  children,
  className,
  containerClassName,
  align = "left",
  tone = "soft",
  size = "default",
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead || actions);

  return (
    <section
      id={id}
      aria-labelledby={title && id ? `${id}-title` : undefined}
      className={cn(toneMap[tone], sizeMap[size], className)}
    >
      <div className={cn("container-page", containerClassName)}>
        {hasHeader && (
          <header
            className={cn(
              "mb-12 md:mb-16",
              align === "center" && "mx-auto max-w-2xl text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "eyebrow text-teal",
                  tone === "navy" && "text-amber",
                )}
              >
                {eyebrow}
              </p>
            )}

            {title && (
              <h2
                id={id ? `${id}-title` : undefined}
                className={cn(
                  "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
                  tone === "navy" ? "text-secondary-foreground" : "text-navy",
                )}
              >
                {title}
              </h2>
            )}

            {lead && (
              <p
                className={cn(
                  "mt-4 text-lg",
                  tone === "navy" ? "text-sky" : "text-muted-foreground",
                )}
              >
                {lead}
              </p>
            )}

            {actions && (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            )}
          </header>
        )}

        {children}
      </div>
    </section>
  );
}