import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin/conteudo")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["curador", "admin", "master"]);
  },
  head: () => ({
    meta: [
      { title: "Conteúdo · Admin · CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ConteudoPage,
});

function ConteudoPage() {
  return (
    <section className="container-page py-12 md:py-20">
      <Link
        to="/admin"
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao painel
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-teal">Admin · Conteúdo</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Conteúdo e mídia
          </h1>
          <p className="mt-3 text-muted-foreground">
            Publique notícias, materiais e comunicados na página /midia.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Nova publicação
        </Button>
      </header>

      <div className="mt-10 rounded-2xl border border-dashed border-line bg-card p-12 text-center">
        <FileText
          className="mx-auto h-10 w-10 text-muted-foreground"
          aria-hidden
        />
        <p className="mt-4 text-lg font-bold text-navy">
          Nenhum conteúdo publicado
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Comece criando a primeira notícia ou material do programa.
        </p>
        <Button className="mt-6">
          <Plus className="mr-2 h-4 w-4" aria-hidden />
          Nova publicação
        </Button>
      </div>
    </section>
  );
}
