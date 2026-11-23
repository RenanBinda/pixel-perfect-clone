import { nivelCompletude } from "@/lib/completude";

export function ReguaCompletude({ percentual }: { percentual: number }) {
  const nivel = nivelCompletude(percentual);
  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">Completude da iniciativa</span>
        <span className="font-bold text-primary">{percentual}% · {nivel}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={percentual} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percentual}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {nivel === "completa" ? "Todos os 12 itens preenchidos." : "Preencha os 12 itens para dar mais visibilidade à sua escola."}
      </p>
    </div>
  );
}
