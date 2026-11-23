import { useEffect, useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save, RotateCcw, Eye, LockKeyhole, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PathCard, PATH_ICONS } from "@/components/landing/PathCard";
import heroImage from "@/assets/escola_agente.png";
import { defaultContent, DESTINATIONS, homeContentSchema, ICON_IDS, PROFILE_LABELS, type HomeContent, type HomeProfile } from "@/lib/home-content";
import { homeContentQuery } from "@/lib/home-content-query";
import { editorStatus, unlockEditor, publishHomeContent } from "@/lib/home-content.functions";

export function HomePathEditor({ profile, onDirtyChange }: { profile: HomeProfile; onDirtyChange?: (dirty: boolean) => void }) {
  const { data: records } = useSuspenseQuery(homeContentQuery);
  const queryClient = useQueryClient();
  const published = records[profile];
  const [draft, setDraft] = useState<HomeContent>(() => structuredClone(published.content));
  const [revision, setRevision] = useState(published.revision);
  const [authorized, setAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [restoring, setRestoring] = useState(false);
  const [previewTab, setPreviewTab] = useState<"hero" | "card">("hero");
  const check = useServerFn(editorStatus);
  const unlock = useServerFn(unlockEditor);
  const publish = useServerFn(publishHomeContent);
  useEffect(() => { void check().then((result) => setAuthorized(result.authorized)).catch(() => setAuthorized(false)); }, [check]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(published.content);
  useEffect(() => { onDirtyChange?.(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function hero<K extends keyof HomeContent["hero"]>(key: K, value: HomeContent["hero"][K]) { setDraft((d) => ({ ...d, hero: { ...d.hero, [key]: value } })); setMessage(""); }
  function card<K extends keyof HomeContent["card"]>(key: K, value: HomeContent["card"][K]) { setDraft((d) => ({ ...d, card: { ...d.card, [key]: value } })); setMessage(""); }
  async function save() {
    setError(""); setMessage("");
    const parsed = homeContentSchema.safeParse(draft);
    if (!parsed.success) { setError(parsed.error.issues.map((i) => i.message).join(" ")); return; }
    setBusy(true);
    try {
      const result = await publish({ data: { profile, content: parsed.data, revision } });
      queryClient.setQueryData(homeContentQuery.queryKey, (old) => old ? { ...old, [profile]: result.record } : old);
      setDraft(result.record.content); setRevision(result.record.revision);
      setMessage("Publicado na página inicial.");
    } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível publicar."); }
    finally { setBusy(false); }
  }
  async function reload() {
    if (dirty && !window.confirm("Descartar as alterações deste perfil e carregar a versão publicada?")) return;
    setBusy(true);
    try { const fresh = await queryClient.fetchQuery({ ...homeContentQuery, staleTime: 0 }); setDraft(structuredClone(fresh[profile].content)); setRevision(fresh[profile].revision); setMessage("Versão publicada carregada."); setError(""); }
    catch { setError("Não foi possível recarregar os conteúdos."); }
    finally { setBusy(false); }
  }
  return <section className="border-y border-border py-8" aria-labelledby="editor-title">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><p className="text-xs font-bold uppercase text-teal">Página inicial · {PROFILE_LABELS[profile]}</p><h2 id="editor-title" className="mt-1 text-2xl font-bold text-navy">Conteúdo do caminho</h2><p className="mt-2 text-sm text-muted-foreground">{dirty ? "Alterações ainda não publicadas" : "Versão publicada"}{published.updatedAt ? ` · ${new Date(published.updatedAt).toLocaleString("pt-BR")}` : " · Conteúdo padrão"}</p></div>
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" size="icon" title="Recarregar versão publicada" aria-label="Recarregar versão publicada" disabled={busy} onClick={() => void reload()}><RefreshCw /></Button>
        <Button variant="outline" disabled={busy} onClick={() => setRestoring(true)}><RotateCcw />Restaurar padrões</Button>
        <Button disabled={busy || !dirty || !authorized} onClick={() => void save()}><Save />{busy ? "Salvando…" : "Publicar alterações"}</Button>
      </div>
    </div>
    {!authorized && <form className="mt-5 flex flex-wrap items-end gap-3 border-l-4 border-primary bg-accent p-4" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setError("");
      try { const result = await unlock({ data: { code } }); setAuthorized(result.authorized); setCode(""); } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível confirmar o acesso."); } finally { setBusy(false); }
    }}>
      <LockKeyhole className="mb-2 h-5 w-5 text-navy" /><Field label="Código administrativo" id={`code-${profile}`}><Input id={`code-${profile}`} type="password" autoComplete="off" value={code} onChange={(e) => setCode(e.target.value)} required /></Field><Button variant="secondary" disabled={busy || !code}>Liberar publicação</Button>
    </form>}
    {restoring && <div role="alert" className="mt-5 flex flex-wrap items-center gap-3 border border-border bg-muted p-4 text-sm"><p className="flex-1">Restaurar o conteúdo padrão deste perfil? A página inicial só mudará após publicar.</p><Button variant="outline" onClick={() => setRestoring(false)}>Cancelar</Button><Button onClick={() => { setDraft(defaultContent(profile)); setRestoring(false); setMessage("Padrões restaurados no rascunho."); }}>Restaurar este perfil</Button></div>}
    {error && <p role="alert" className="mt-4 text-sm font-medium text-destructive">{error}</p>}
    {message && <p role="status" className="mt-4 flex items-center gap-2 text-sm font-medium text-teal"><Check className="h-4 w-4" />{message}</p>}
    <div className="mt-7 grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-7">
        <fieldset className="space-y-4" disabled={busy}><legend className="mb-4 text-lg font-bold text-navy">Abertura</legend>
          <TextField id="eyebrow" label="Identificação do programa" value={draft.hero.eyebrow} max={80} onChange={(v) => hero("eyebrow", v)} />
          <TextField id="heading" label="Título da abertura" value={draft.hero.heading} max={140} onChange={(v) => hero("heading", v)} />
          <TextField id="description" label="Texto da abertura" value={draft.hero.description} max={300} multiline onChange={(v) => hero("description", v)} />
          <TextField id="hero-image" label="Imagem de fundo (HTTPS; vazio usa a imagem atual)" value={draft.hero.image} max={2048} onChange={(v) => hero("image", v)} />
          {profile !== "visitante" && <><TextField id="badge" label="Selo do perfil" value={draft.hero.badge} max={64} onChange={(v) => hero("badge", v)} /><TextField id="welcome" label="Mensagem após a saudação" value={draft.hero.welcome} max={180} multiline onChange={(v) => hero("welcome", v)} /></>}
          <ActionFields id="primary" label="Botão principal" action={draft.hero.primary} onChange={(v) => hero("primary", v)} />
          <ActionFields id="secondary" label="Botão secundário" action={draft.hero.secondary} onChange={(v) => hero("secondary", v)} />
        </fieldset>
        {profile !== "gestor" && <fieldset className="space-y-4 border-t border-border pt-6" disabled={busy}><legend className="pt-5 text-lg font-bold text-navy">Cartão do caminho</legend>
          <TextField id="card-title" label="Título do cartão" value={draft.card.title} max={80} onChange={(v) => card("title", v)} />
          <TextField id="card-description" label="Texto do cartão" value={draft.card.description} max={240} multiline onChange={(v) => card("description", v)} />
          <TextField id="benefit" label="Benefício" value={draft.card.benefit} max={48} onChange={(v) => card("benefit", v)} />
          <Field id="card-icon" label="Ícone"><Select value={draft.card.icon} onValueChange={(v) => { const id = ICON_IDS.find((id) => id === v); if (id) card("icon", id); }}><SelectTrigger id="card-icon"><SelectValue /></SelectTrigger><SelectContent>{ICON_IDS.map((id) => { const Icon = PATH_ICONS[id]; return <SelectItem value={id} key={id}><span className="flex items-center gap-2"><Icon className="h-4 w-4" />{({ school: "Escola", clipboard: "Registro", graduation: "Formação", map: "Mapa", users: "Comunidade", leaf: "Sustentabilidade", compass: "Descoberta", award: "Reconhecimento" })[id]}</span></SelectItem>; })}</SelectContent></Select></Field>
          <TextField id="card-image" label="Imagem do cartão (HTTPS; opcional)" value={draft.card.image} max={2048} onChange={(v) => card("image", v)} />
          <TextField id="card-alt" label="Descrição da imagem" value={draft.card.imageAlt} max={120} onChange={(v) => card("imageAlt", v)} />
          <ActionFields id="card-action" label="Botão do cartão" action={draft.card.action} onChange={(v) => card("action", v)} />
        </fieldset>}
      </div>
      <aside className="min-w-0 self-start xl:sticky xl:top-6" aria-label="Prévia do conteúdo">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm font-bold text-muted-foreground"><Eye className="h-4 w-4" />Prévia · {PROFILE_LABELS[profile]}</p><div role="tablist" aria-label="Prévia"><Button role="tab" aria-selected={previewTab === "hero"} variant={previewTab === "hero" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewTab("hero")}>Abertura</Button>{profile !== "gestor" && <Button role="tab" aria-selected={previewTab === "card"} variant={previewTab === "card" ? "secondary" : "ghost"} size="sm" onClick={() => setPreviewTab("card")}>Cartão</Button>}</div></div>
        {previewTab === "hero" ? <div role="tabpanel" className="relative isolate overflow-hidden rounded-lg bg-navy p-7 text-secondary-foreground">
          <img src={draft.hero.image || heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-navy/90" />
          <p className="text-xs font-bold uppercase text-sky">{draft.hero.eyebrow}</p><h3 className="mt-5 break-words text-3xl font-extrabold leading-tight">{draft.hero.heading}</h3><p className="mt-5 break-words leading-relaxed text-sky">{draft.hero.description}</p>
          {profile !== "visitante" && <div className="mt-5"><span className="rounded-md bg-orange/20 px-3 py-1 text-xs font-bold text-amber">{draft.hero.badge}</span><p className="mt-3 break-words font-semibold">Olá, Renan! {draft.hero.welcome}</p></div>}
          <div className="mt-6 flex flex-wrap gap-3"><span className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">{draft.hero.primary.rotulo}</span><span className="rounded-md border border-secondary-foreground/40 px-4 py-3 text-sm font-bold">{draft.hero.secondary.rotulo}</span></div>
        </div> : <div role="tabpanel" className="mx-auto max-w-sm"><PathCard card={draft.card} preview /></div>}
      </aside>
    </div>
  </section>;
}
function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) { return <div className="min-w-0 space-y-2"><label htmlFor={id} className="block text-sm font-semibold text-foreground">{label}</label>{children}</div>; }
function TextField({ id, label, value, max, multiline = false, onChange }: { id: string; label: string; value: string; max: number; multiline?: boolean; onChange: (value: string) => void }) {
  return <Field id={id} label={label}>{multiline ? <Textarea id={id} value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} rows={3} /> : <Input id={id} value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} />}</Field>;
}
function ActionFields({ id, label, action, onChange }: { id: string; label: string; action: HomeContent["hero"]["primary"]; onChange: (value: HomeContent["hero"]["primary"]) => void }) {
  return <div className="grid gap-3 sm:grid-cols-2"><TextField id={`${id}-label`} label={`${label} · Texto`} value={action.rotulo} max={48} onChange={(rotulo) => onChange({ ...action, rotulo })} /><Field id={`${id}-destination`} label={`${label} · Destino`}><Select value={action.to} onValueChange={(value) => { const route = DESTINATIONS.find((d) => d.to === value); if (route) onChange({ ...action, to: route.to }); }}><SelectTrigger id={`${id}-destination`}><SelectValue /></SelectTrigger><SelectContent>{DESTINATIONS.map((d) => <SelectItem key={d.to} value={d.to}>{d.label}</SelectItem>)}</SelectContent></Select></Field></div>;
}
