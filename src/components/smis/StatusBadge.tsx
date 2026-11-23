import { CheckCircle2, FileEdit, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IniciativaStatus } from "@/lib/smis";
import { STATUS_LABEL } from "@/lib/smis";

const config: Record<
  IniciativaStatus,
  { icon: typeof CheckCircle2; className: string }
> = {
  rascunho: {
    icon: FileEdit,
    className: "bg-amber/15 text-amber-800 border-amber/30",
  },
  publicada: {
    icon: CheckCircle2,
    className: "bg-teal/15 text-teal-800 border-teal/30",
  },
  arquivada: {
    icon: Archive,
    className: "bg-muted text-muted-foreground border-line",
  },
};

export function StatusBadge({ status }: { status: IniciativaStatus }) {
  const { icon: Icon, className } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}