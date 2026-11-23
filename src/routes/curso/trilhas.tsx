import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award } from "lucide-react";
import { CursoShell } from "@/components/curso/CursoShell";
import { TrilhaCard } from "@/components/curso/TrilhaCard";
import { TRILHAS } from "@/lib/curso";

export const Route = createFileRoute("/curso/trilhas")({
  head: () => ({
    meta: [
      { title: "Trilhas · Curso · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Catálogo de trilhas de formação do CEURS–Escolas: CCA2030 individual e Curso Equipes-ABC.",
      },
      { property: "og:title", content: "Trilhas · Curso · CEURS–Escolas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrilhasPage,
});

function TrilhasPage() {
  return (
    <CursoShell>
      <section className="container-page py-12 md:py-20">
        <Link
          to="/curso"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao curso
        </Link>

        <header className="max-w-3xl">
          <p className="eyebrow text-teal">Formação</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Trilhas de aprendizagem
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha uma trilha e avance no seu ritmo. O progresso fica salvo no
            seu navegador — você pode continuar de onde parou.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {TRILHAS.map((trilha) => (
            <li key={trilha.id}>
              <TrilhaCard trilha={trilha} />
            </li>
          ))}
        </ul>

        <div className="mt-16 flex items-start gap-3 rounded-2xl border border-line bg-card p-6">
          <Award className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <div>
            <p className="font-bold text-navy">Certificado de conclusão</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ao completar todos os módulos de uma trilha, você poderá emitir o
              certificado de participação.
            </p>
          </div>
        </div>
      </section>
    </CursoShell>
  );
}