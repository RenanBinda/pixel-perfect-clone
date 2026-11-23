import { cn } from "@/lib/utils";
import type { IniciativaTema } from "@/lib/smis";
import { TEMA_LABEL, TEMA_ICON, TEMA_COLOR } from "@/lib/smis";

export function TemaBadge({
  tema,
  size = "sm",
}: {
  tema: IniciativaTema;
  size?: "sm" | "md";
}) {
  const colors = TEMA_COLOR[tema];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold",
        colors.bg,
        colors.text,
        colors.border,
        size === "sm"
          ? "px-2.5 py-0.5 text-[10px] uppercase tracking-wider"
          : "px-3 py-1 text-xs",
      )}
    >
      <span aria-hidden>{TEMA_ICON[tema]}</span>
      {TEMA_LABEL[tema]}
    </span>
  );
}