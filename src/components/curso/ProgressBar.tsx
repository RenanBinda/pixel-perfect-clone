import { cn } from "@/lib/utils";

type Props = {
  percentual: number;
  concluido?: boolean;
  className?: string;
  label?: string;
};

export function ProgressBar({
  percentual,
  concluido = false,
  className,
  label,
}: Props) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-navy">{label}</span>
          <span className="font-bold text-navy">
            {concluido ? "Concluído" : `${percentual}%`}
          </span>
        </div>
      )}
      <div
        className="h-2 overflow-hidden rounded-full bg-soft"
        role="progressbar"
        aria-valuenow={percentual}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progresso"}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all",
            concluido
              ? "bg-gradient-to-r from-teal to-teal/80"
              : "bg-gradient-to-r from-teal to-orange",
          )}
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  );
}