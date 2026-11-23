import { cn } from "@/lib/utils";
import symbolSrc from "@/assets/ceurs-simbolo.png";

type LogoProps = {
  className?: string;
  /** color (padrão) ou white (sobre fundos escuros). */
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  markOnly?: boolean;
};

const sizeMap = { sm: "h-8", md: "h-10", lg: "h-12" } as const;
const textMap = { sm: "text-base", md: "text-lg", lg: "text-xl" } as const;

export function Logo({ className, variant = "color", size = "md", markOnly }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} aria-label="CEURS–Escolas">
      <img src={symbolSrc} alt="" className={cn(sizeMap[size], "w-auto")} loading="eager" />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className={cn(textMap[size], "font-extrabold tracking-wide", variant === "white" ? "text-primary-foreground" : "text-navy")}>CEURS</span>
          <span className="text-[0.6rem] font-bold tracking-[0.3em] text-orange">ESCOLAS</span>
        </span>
      )}
    </span>
  );
}
