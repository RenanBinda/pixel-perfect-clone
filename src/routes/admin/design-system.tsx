import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Palette } from "lucide-react";
import { DesignSystem } from "@/components/design-system/DesignSystem";
import { requireAdmin } from "@/lib/admin-access.functions";

export const Route = createFileRoute("/admin/design-system")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAdmin();
  },
  head: () => ({
    meta: [
      { title: "Design System · Admin CEURS–Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DesignSystemPage,
});

function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-10">
      <Link
        to="/admin"
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao painel
      </Link>

      <header>
        <p className="eyebrow text-teal">Admin · Design System</p>
        <h1 className="mt-3 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          <Palette className="h-8 w-8 text-teal" aria-hidden />
          Design System
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Referência viva de cores, tipografia, componentes e padrões visuais.
          Uso restrito a administradores da plataforma.
        </p>
      </header>

      <div className="mt-10">
        <DesignSystem />
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-navy p-8 text-secondary-foreground">
        <p className="eyebrow text-amber">Documentação completa</p>
        <h2 className="mt-3 text-xl font-bold">
          Para a referência visual completa, consulte o Manual de Identidade
        </h2>
        <Link
          to="/identidade"
          className="mt-4 inline-flex items-center gap-2 font-bold text-amber underline-offset-4 hover:underline"
        >
          Abrir manual de identidade →
        </Link>
      </div>
    </div>
  );
}