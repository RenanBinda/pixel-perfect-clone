import { createFileRoute } from "@tanstack/react-router";
import { Copy, Mail, Trash2, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { SmisShell } from "@/components/smis/SmisShell";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/admin-access.functions";
import { useUsuario } from "@/lib/auth-store";

export const Route = createFileRoute("/smis/credenciamento")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAuth("/smis/credenciamento");
  },
  head: () => ({
    meta: [
      { title: "Credenciar líderes · SMIS-Escolas" },
      { name: "description", content: "O diretor indica os líderes das iniciativas da escola com convite oficial." },
      { property: "og:title", content: "Credenciar líderes · SMIS-Escolas" },
      { property: "og:description", content: "Indique os líderes das iniciativas da sua escola." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CredenciamentoPage,
});

type Indicacao = { id: string; nome: string; email: string; iniciativa: string; data: string };
const KEY = "ceurs.credenciamentos";

function textoConvite(diretor: string, i: Indicacao) {
  return `Olá, ${i.nome}!\n\nO(a) diretor(a) ${diretor} indicou você como Líder da iniciativa "${i.iniciativa}" no CEURS–Escolas.\n\nComo líder, você poderá registrar e atualizar a iniciativa no SMIS-Escolas, anexar evidências e dar visibilidade à prática da escola.\n\nPara aceitar, acesse: ${typeof window !== "undefined" ? window.location.origin : ""}/solicitar-acesso\n\nEquipe CEURS–Escolas`;
}

function CredenciamentoPage() {
  const usuario = useUsuario();
  const diretor = usuario?.nome ?? "da sua escola";
  const [lista, setLista] = useState<Indicacao[]>([]);
  const [form, setForm] = useState({ nome: "", email: "", iniciativa: "" });
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState("");

  useEffect(() => {
    try { setLista(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch { /* vazio */ }
  }, []);
  const salvar = (l: Indicacao[]) => { setLista(l); localStorage.setItem(KEY, JSON.stringify(l)); };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.iniciativa.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setErro("Preencha nome, um e-mail válido e o título da iniciativa.");
      return;
    }
    setErro("");
    salvar([{ id: crypto.randomUUID(), ...form, data: new Date().toLocaleDateString("pt-BR") }, ...lista]);
    setForm({ nome: "", email: "", iniciativa: "" });
  };

  const campo = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

  return (
    <SmisShell title="Credenciar líderes" description="Indique quem lidera cada iniciativa da sua escola. O líder recebe um convite oficial em seu nome.">
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <form onSubmit={enviar} className="space-y-4 rounded-xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 font-semibold"><UserCheck className="h-5 w-5 text-primary" /> Nova indicação</h2>
          <label className="block text-sm">Nome do líder
            <input className={campo} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Profª Mônica Silva" />
          </label>
          <label className="block text-sm">E-mail
            <input type="email" className={campo} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="monica@escola.edu.br" />
          </label>
          <label className="block text-sm">Título da iniciativa
            <input className={campo} value={form.iniciativa} onChange={(e) => setForm({ ...form, iniciativa: e.target.value })} placeholder="Horta escolar" />
          </label>
          {erro && <p className="text-sm text-destructive">{erro}</p>}
          <Button type="submit" className="w-full">Credenciar líder</Button>
        </form>

        <section className="space-y-3">
          <h2 className="font-semibold">Líderes indicados ({lista.length})</h2>
          {lista.length === 0 && <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">Nenhum líder indicado ainda.</p>}
          {lista.map((i) => {
            const texto = textoConvite(diretor, i);
            return (
              <article key={i.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{i.nome} · <span className="text-primary">{i.iniciativa}</span></p>
                    <p className="text-xs text-muted-foreground">{i.email} · indicado em {i.data} · convite pendente</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${i.email}?subject=${encodeURIComponent(`Você foi indicado(a) como Líder da iniciativa ${i.iniciativa}`)}&body=${encodeURIComponent(texto)}`}><Mail className="h-4 w-4" /> Enviar convite</a>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(texto); setCopiado(i.id); }}>
                      <Copy className="h-4 w-4" /> {copiado === i.id ? "Copiado" : "Copiar"}
                    </Button>
                    <Button size="sm" variant="ghost" aria-label="Remover" onClick={() => salvar(lista.filter((x) => x.id !== i.id))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </SmisShell>
  );
}
