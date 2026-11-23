import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ListChecks } from "lucide-react";
import { requireRole } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin/curadoria")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["curador", "admin", "master"]);
  },
  head: () => ({
    meta: [
      { title: "Curadoria · Admin · CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CuradoriaPage,
});

function CuradoriaPage() {
  return (
    <section className="container-page py-12 md:py-20">
      <Link
        to="/admin"
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao painel
      </Link>

      <header>
        <p className="eyebrow text-teal">Admin · Curadoria</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Curadoria de iniciativas
        </h1>
        <p className="mt-3 text-muted-foreground">
          Revise, aprove e publique iniciativas registradas no SMIS.
        </p>
      </header>

      <div className="mt-10 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
        <ListChecks
          className="mx-auto h-10 w-10 text-muted-foreground"
          aria-hidden
        />
        <p className="mt-4 text-lg font-bold text-navy">
          Nenhuma iniciativa em curadoria
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          As iniciativas com status "em_curadoria" aparecerão aqui.
        </p>
      </div>
    </section>
  );
}