import { ImageOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = {
  /** URL ou import da imagem. Se vazio/undefined, renderiza o fallback. */
  src?: string;
  /** Texto alternativo (obrigatório para acessibilidade). */
  alt: string;
  /** Classes aplicadas ao `<img>` ou ao bloco de fallback. */
  className?: string;
  /** Classes adicionais ao bloco de fallback. */
  fallbackClassName?: string;
  /** Rótulo opcional exibido no fallback. */
  fallbackLabel?: string;
  /** Estratégia de carregamento. Padrão: "lazy". */
  loading?: "eager" | "lazy";
  /** Prioridade de fetch. Padrão: "auto". */
  fetchPriority?: "high" | "low" | "auto";
  /** Proporção (classes Tailwind). Padrão: "aspect-[4/3]". */
  aspect?: string;
};

/**
 * Imagem com fallback visual elegante.
 *
 * Se `src` for vazio, undefined, ou se a imagem falhar ao carregar,
 * renderiza um bloco decorativo com gradiente CEURS + ícone, evitando
 * quebras de layout e mantendo a identidade visual.
 *
 * Uso:
 *   <ImageWithFallback
 *     src="/assets/school-garden.jpg"
 *     alt="Horta escolar comunitária"
 *     aspect="aspect-[4/3]"
 *     fallbackLabel="Horta escolar"
 *   />
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackLabel,
  loading = "lazy",
  fetchPriority = "auto",
  aspect = "aspect-[4/3]",
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          aspect,
          "bg-gradient-to-br from-navy via-navy to-teal/40",
          fallbackClassName,
          className,
        )}
      >
        {/* Padrão decorativo */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,139,18,0.35) 0, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(24,185,176,0.35) 0, transparent 45%),
              linear-gradient(120deg, transparent 40%, rgba(255,195,56,0.15) 60%, transparent 80%)
            `,
          }}
        />

        {/* Conteúdo do fallback */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground/70">
            <ImageOff className="h-6 w-6" aria-hidden />
          </span>
          {fallbackLabel && (
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground/80">
              {fallbackLabel}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
      className={cn(aspect, "w-full object-cover", className)}
    />
  );
}