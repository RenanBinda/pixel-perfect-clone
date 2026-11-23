import { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { IniciativaTema } from "@/lib/smis";
import { TEMA_LABEL, TEMA_ICON } from "@/lib/smis";

const TEMAS: IniciativaTema[] = [
  "agua",
  "residuos",
  "energia",
  "alimentacao",
  "mobilidade",
  "biodiversidade",
];

export type W2HFormValues = {
  titulo: string;
  resumo: string;
  tema: IniciativaTema;
  escola: string;
  what: string;
  why: string;
  who: string;
  where: string;
  when: string;
  how: string;
  howMuch: string;
};

export const EMPTY_FORM: W2HFormValues = {
  titulo: "",
  resumo: "",
  tema: "alimentacao",
  escola: "",
  what: "",
  why: "",
  who: "",
  where: "",
  when: "",
  how: "",
  howMuch: "",
};

type SectionId = keyof Pick<
  W2HFormValues,
  "what" | "why" | "who" | "where" | "when" | "how" | "howMuch"
>;

const SECTIONS: {
  id: SectionId;
  label: string;
  hint: string;
  placeholder: string;
  required: boolean;
}[] = [
  {
    id: "what",
    label: "O quê (What)",
    hint: "Descreva a prática em uma frase clara.",
    placeholder:
      "Ex.: Manutenção de uma horta comunitária com 12 canteiros.",
    required: true,
  },
  {
    id: "why",
    label: "Por quê (Why)",
    hint: "Qual necessidade local ela atende?",
    placeholder:
      "Ex.: Promover educação alimentar e reduzir resíduos orgânicos.",
    required: true,
  },
  {
    id: "who",
    label: "Quem (Who)",
    hint: "Quem participa e quem se beneficia?",
    placeholder:
      "Ex.: Estudantes do 4º ao 9º ano, famílias e coordenação.",
    required: true,
  },
  {
    id: "where",
    label: "Onde (Where)",
    hint: "Em qual escola e em qual entorno?",
    placeholder: "Ex.: Pátio traseiro da Escola Municipal Vila Verde.",
    required: false,
  },
  {
    id: "when",
    label: "Quando (When)",
    hint: "Desde quando e com que frequência?",
    placeholder: "Ex.: Desde março de 2026, com atividades semanais.",
    required: false,
  },
  {
    id: "how",
    label: "Como (How)",
    hint: "Como a prática funciona no dia a dia?",
    placeholder:
      "Ex.: Rotação de equipes por turma; compostagem com restos da merenda.",
    required: true,
  },
  {
    id: "howMuch",
    label: "Quanto (How much)",
    hint: "Que recursos utiliza ou necessita?",
    placeholder: "Ex.: Cerca de R$ 800 iniciais em ferramentas e sementes.",
    required: false,
  },
];

export function W2HForm({
  values,
  onChange,
  errors,
}: {
  values: W2HFormValues;
  onChange: (values: W2HFormValues) => void;
  errors?: Partial<Record<keyof W2HFormValues, string>>;
}) {
  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    new Set(["what", "why", "who", "how"]),
  );

  function update<K extends keyof W2HFormValues>(
    key: K,
    value: W2HFormValues[K],
  ) {
    onChange({ ...values, [key]: value });
  }

  function toggleSection(id: SectionId) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-8">
      {/* Bloco de identificação */}
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
        <h2 className="text-lg font-extrabold text-navy">Identificação</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Dê um título curto e escolha o tema principal da iniciativa.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="titulo">
              Título <span className="text-orange">*</span>
            </Label>
            <Input
              id="titulo"
              placeholder="Ex.: Horta comunitária na Escola Vila Verde"
              value={values.titulo}
              onChange={(e) => update("titulo", e.target.value)}
              aria-invalid={Boolean(errors?.titulo)}
            />
            {errors?.titulo && (
              <p role="alert" className="text-xs font-semibold text-red-600">
                {errors.titulo}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tema">
              Tema <span className="text-orange">*</span>
            </Label>
            <Select
              value={values.tema}
              onValueChange={(v) => update("tema", v as IniciativaTema)}
            >
              <SelectTrigger id="tema">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMAS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {TEMA_ICON[t]} {TEMA_LABEL[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="escola">Escola</Label>
            <Input
              id="escola"
              placeholder="Nome da escola"
              value={values.escola}
              onChange={(e) => update("escola", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="resumo">Resumo curto</Label>
            <Textarea
              id="resumo"
              placeholder="Uma frase que resume a iniciativa."
              rows={2}
              value={values.resumo}
              onChange={(e) => update("resumo", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blocos 5W2H */}
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Lightbulb className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-navy">
              Estrutura 5W2H
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha os campos para descrever a iniciativa de forma
              comparável. Você pode salvar como rascunho e completar depois.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {SECTIONS.map((s) => {
            const isOpen = openSections.has(s.id);
            const hasError = Boolean(errors?.[s.id]);
            const value = values[s.id];

            return (
              <div
                key={s.id}
                className={cn(
                  "overflow-hidden rounded-xl border transition-colors",
                  hasError
                    ? "border-red-300 bg-red-50/30"
                    : "border-line bg-soft",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(s.id)}
                  aria-expanded={isOpen}
                  aria-controls={`section-${s.id}`}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-sm font-bold text-navy">
                      {s.label}
                      {s.required && (
                        <span className="ml-1 text-orange">*</span>
                      )}
                    </p>
                    {!isOpen && value && (
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {value}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>

                {isOpen && (
                  <div id={`section-${s.id}`} className="px-5 pb-5">
                    <p className="mb-3 text-xs text-muted-foreground">
                      {s.hint}
                    </p>
                    <Textarea
                      rows={3}
                      placeholder={s.placeholder}
                      value={value}
                      onChange={(e) =>
                        update(s.id, e.target.value)
                      }
                      aria-invalid={hasError}
                    />
                    {hasError && (
                      <p
                        role="alert"
                        className="mt-2 text-xs font-semibold text-red-600"
                      >
                        {errors?.[s.id]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}