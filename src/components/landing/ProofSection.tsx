import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IniciativaCard } from "@/components/smis/IniciativaCard";
import { MOCK_INICIATIVAS } from "@/lib/smis";

/** Bloco "Prova": números e iniciativas reais em destaque. */
export function ProofSection() {
  const publicadas = MOCK_INICIATIVAS.filter((i) => i.status === "publicada");
  const destaques = (publicadas.length ? publicadas : MOCK_INICIATIVAS).slice(0, 3);
  const escolas = new Set(MOCK_INICIATIVAS.map((i) => i.escola)).size;

  return (
    <section aria-labelledby="prova-title" className="bg-soft py-20 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal">Escolas em ação</p>
            <h2 id="prova-title" className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
              O que as escolas já estão fazendo
            </h2>
            <p className="mt-3 text-muted-foreground">
              {MOCK_INICIATIVAS.length} iniciativas de {escolas} escolas — veja, inspire-se e conecte-se.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/iniciativas" className="inline-flex items-center gap-2">
              Ver mapa de iniciativas <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {destaques.map((i) => (
            <li key={i.id}>
              <IniciativaCard iniciativa={i} variant="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
