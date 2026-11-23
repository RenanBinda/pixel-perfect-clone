import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SmisShell } from "@/components/smis/SmisShell";
import { Button } from "@/components/ui/button";
import {
  W2HForm,
  EMPTY_FORM,
  type W2HFormValues,
} from "@/components/smis/W2HForm";
import { requireAuth } from "@/lib/admin-access.functions";
import { criarIniciativa } from "@/lib/smis";
import { ReguaCompletude } from "@/components/smis/ReguaCompletude";
import { calcularCompletude, VINCULO_OPCOES, type Vinculo } from "@/lib/completude";

/* ============================================================
   SCHEMA DE BUSCA
   ------------------------------------------------------------
   Aceita ?contexto=curso quando a iniciativa é registrada como
   atividade do CCA2030 (chamada do módulo mod_04).
   ============================================================ */

const searchSchema = z.object({
  contexto: z.enum(["curso", "comunidade", "avulso"]).optional(),
});

export const Route = createFileRoute("/smis/iniciativas/nova")({
  beforeLoad: async () => {
    await requireAuth("/smis/iniciativas/nova");
  },
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Nova iniciativa · SMIS-Escolas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NovaIniciativaPage,
});

type Errors = Partial<Record<keyof W2HFormValues, string>>;

function NovaIniciativaPage() {
  const navigate = useNavigate();
  const { contexto } = Route.useSearch();

  const [values, setValues] = useState<W2HFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [vinculo, setVinculo] = useState<Vinculo | "">("");
  const [saving, setSaving] = useState<null | "rascunho" | "publicada">(null);

  const voltarPara = contexto === "curso" ? "/curso/trilhas" : "/smis/iniciativas";

  function validate(): boolean {
    const next: Errors = {};

    if (!values.titulo.trim()) next.titulo = "Informe um título.";
    if (values.titulo.length > 120)
      next.titulo = "O título deve ter até 120 caracteres.";
    if (!values.what.trim()) next.what = "Descreva o que é a iniciativa.";
    if (!values.why.trim()) next.why = "Explique por que ela existe.";
    if (!values.who.trim()) next.who = "Informe quem participa.";
    if (!values.how.trim()) next.how = "Descreva como ela funciona.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSave(status: "rascunho" | "publicada") {
    if (status === "publicada" && !validate()) {
      toast.error("Revise os campos obrigatórios antes de publicar.");
      return;
    }

    setSaving(status);
    try {
      const criada = await criarIniciativa({
        titulo: values.titulo || "Sem título",
        resumo: values.resumo || values.what.slice(0, 160),
        tema: values.tema,
        escola: values.escola || "Escola não informada",
        status,
        what: values.what,
        why: values.why,
        who: values.who,
        where: values.where,
        when: values.when,
        how: values.how,
        howMuch: values.howMuch,
        tags: [],
      });

      toast.success(
        status === "publicada"
          ? "Iniciativa publicada com sucesso."
          : "Rascunho salvo com sucesso.",
      );

      navigate({
        to: "/smis/iniciativas/$id",
        params: { id: criada.id },
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao salvar a iniciativa.",
      );
    } finally {
      setSaving(null);
    }
  }

  return (
    <SmisShell
      title="Nova iniciativa"
      description={
        contexto === "curso"
          ? "Atividade do CCA2030 · Registre sua primeira iniciativa de sustentabilidade."
          : "Documente uma prática de sustentabilidade da sua escola seguindo a estrutura 5W2H."
      }
      backTo={{
        to: voltarPara,
        label: contexto === "curso" ? "Voltar à trilha" : "Voltar para iniciativas",
      }}
      actions={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={saving !== null}
            onClick={() => handleSave("rascunho")}
            className="inline-flex items-center gap-2"
          >
            {saving === "rascunho" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Save className="h-4 w-4" aria-hidden />
            )}
            Salvar rascunho
          </Button>
          <Button
            type="button"
            disabled={saving !== null}
            onClick={() => handleSave("publicada")}
            className="inline-flex items-center gap-2"
          >
            {saving === "publicada" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : null}
            Publicar
          </Button>
        </>
      }
    >
      {contexto === "curso" && (
        <div className="mb-6 rounded-xl border border-teal/30 bg-teal/5 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-teal">
            Atividade do curso CCA2030
          </p>
          <p className="mt-1 text-sm text-ink">
            Você está registrando uma iniciativa como atividade do módulo 4.
            Pode salvar como rascunho e completar depois. Ao concluir, volte à
            trilha para seguir para o próximo módulo.
          </p>
        </div>
      )}

      <ReguaCompletude percentual={calcularCompletude(values, vinculo)} />

      <fieldset className="mb-6 rounded-xl border border-border bg-card p-4">
        <legend className="px-1 text-sm font-semibold text-foreground">Qual é o seu vínculo com esta iniciativa?</legend>
        <div className="mt-2 space-y-2">
          {VINCULO_OPCOES.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
              <input type="radio" name="vinculo" value={o.value} checked={vinculo === o.value} onChange={() => setVinculo(o.value)} className="mt-1 accent-primary" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <W2HForm values={values} onChange={setValues} errors={errors} />
    </SmisShell>
  );
}