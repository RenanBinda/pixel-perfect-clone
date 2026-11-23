import { useState, type ReactNode } from "react";
import { Check, Copy, Info, AlertTriangle, Sparkles, X, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SECTIONS = [
  ["principios", "Princípios"],
  ["cores", "Cores"],
  ["regra", "Regra 60/30/10"],
  ["tipografia", "Tipografia"],
  ["botoes", "Botões"],
  ["cabecalhos", "Cabeçalhos"],
  ["chamadas", "Chamadas"],
  ["cards", "Cards"],
  ["badges", "Etiquetas"],
  ["formularios", "Formulários"],
  ["usabilidade", "Usabilidade"],
] as const;

const COLORS = [
  { name: "Deep Navy", role: "Estrutura", hex: "#0A3153", rgb: "10, 49, 83", token: "navy", swatch: "bg-navy", fg: "text-secondary-foreground", use: "Títulos, cabeçalhos, rodapés, superfícies de ancoragem." },
  { name: "Active Teal", role: "Progresso", hex: "#18B9B0", rgb: "24, 185, 176", token: "teal", swatch: "bg-teal", fg: "text-navy", use: "Status em andamento, barras de progresso, confirmações." },
  { name: "Vibrant Orange", role: "Ação", hex: "#FF8B12", rgb: "255, 139, 18", token: "orange", swatch: "bg-orange", fg: "text-navy", use: "Botão primário e pontos focais. Máximo 10% da tela." },
  { name: "Warm Amber", role: "Apoio", hex: "#FFC338", rgb: "255, 195, 56", token: "amber", swatch: "bg-amber", fg: "text-navy", use: "Avisos, destaques secundários, etiquetas de apoio." },
  { name: "Soft White", role: "Respiro", hex: "#F5F8F7", rgb: "245, 248, 247", token: "soft", swatch: "bg-soft border border-line", fg: "text-navy", use: "Fundo dominante, espaço de leitura e pausa." },
];

function copy(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Copiado para a área de transferência");
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[11px] font-bold uppercase tracking-[0.18em] text-teal", className)}>{children}</p>;
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-line py-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-3xl font-bold text-navy">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Example({ title, code, children, dark }: { title: string; code: string; children: ReactNode; dark?: boolean }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-sm font-bold text-navy">{title}</span>
        <div className="flex gap-1 text-xs font-semibold">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn("rounded-md px-3 py-1", tab === t ? "bg-navy text-secondary-foreground" : "text-muted-foreground hover:bg-accent")}
            >
              {t === "preview" ? "Visualizar" : "Código"}
            </button>
          ))}
        </div>
      </div>
      {tab === "preview" ? (
        <div className={cn("flex flex-wrap items-center gap-4 p-6", dark ? "bg-navy" : "bg-soft")}>{children}</div>
      ) : (
        <div className="relative bg-navy">
          <button onClick={() => copy(code)} className="absolute right-3 top-3 rounded-md bg-secondary-foreground/10 p-2 text-secondary-foreground hover:bg-secondary-foreground/20" aria-label="Copiar código">
            <Copy className="h-4 w-4" />
          </button>
          <pre className="overflow-x-auto p-6 text-xs leading-relaxed text-sky"><code>{code}</code></pre>
        </div>
      )}
    </div>
  );
}

function Rule({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed text-ink">
      {ok ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
      <span>{children}</span>
    </li>
  );
}

export function DesignSystem() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[200px_1fr]">
      <nav aria-label="Seções" className="hidden lg:block">
        <ul className="sticky top-24 space-y-1 py-14">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-navy">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="conteudo">
        <div className="py-14">
          <Eyebrow>Sistema vivo · v1.0</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-navy md:text-5xl">Design System CEURS–Escolas</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Conjunto centralizado de cores, tipografia, componentes e regras de uso. Do Moodle ao site, a lógica é sempre a mesma.
          </p>
        </div>

        <Section id="principios" eyebrow="00 · Fundamentos" title="Princípios">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Cor orienta", "Cada cor tem uma função: estrutura, progresso, ação, apoio ou respiro.", "bg-navy"],
              ["Tipografia explica", "Peso e tamanho criam hierarquia; o espaçamento preserva a clareza.", "bg-teal"],
              ["Espaço permite pensar", "O vazio dá ao estudante tempo para respirar e assimilar.", "bg-orange"],
            ].map(([t, d, c]) => (
              <div key={t} className="rounded-2xl border border-line bg-card p-6">
                <span className={cn("block h-2 w-10 rounded-full", c)} />
                <h3 className="mt-4 text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl bg-card p-5 text-sm leading-relaxed text-ink">
            <strong className="text-navy">Sequência de leitura:</strong> assunto → contexto → ação → confirmação. Design não deve competir com o conteúdo.
          </p>
        </Section>

        <Section id="cores" eyebrow="01 · Cores" title="Paleta e papéis" intro="A paleta orienta estados, prioridades e ritmo. Evite usar todas as cores com a mesma intensidade numa mesma tela. Clique em um valor para copiar.">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {COLORS.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-2xl border border-line bg-card">
                <div className={cn("flex h-28 items-end p-4", c.swatch)}>
                  <span className={cn("text-[11px] font-bold uppercase tracking-[0.18em]", c.fg)}>{c.role}</span>
                </div>
                <div className="space-y-2 p-4">
                  <p className="font-bold text-navy">{c.name}</p>
                  {[c.hex, `RGB ${c.rgb}`, `bg-${c.token}`].map((v) => (
                    <button key={v} onClick={() => copy(v)} className="flex w-full items-center justify-between rounded-md px-2 py-1 font-mono text-xs text-ink hover:bg-accent">
                      {v} <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  ))}
                  <p className="pt-1 text-xs leading-relaxed text-muted-foreground">{c.use}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-line bg-card p-5 text-sm leading-relaxed">
            <strong className="text-navy">Contraste:</strong> sobre laranja, teal e âmbar use sempre texto <strong>Deep Navy</strong>. Texto branco só sobre Deep Navy. Para texto laranja em fundo claro, use apenas em tamanhos grandes (≥ 24px, bold).
          </div>
        </Section>

        <Section id="regra" eyebrow="01.1 · Proporção" title="Regra 60/30/10" intro="60% de cor dominante para o fundo, 30% de cor secundária para suporte e contraste, e 10% de cor vibrante apenas para pontos focais.">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex h-10 overflow-hidden rounded-lg">
                <div className="w-[60%] bg-soft border border-line" />
                <div className="w-[30%] bg-navy" />
                <div className="w-[10%] bg-orange" />
              </div>
              <div className="mt-2 flex text-xs font-bold text-navy">
                <span className="w-[60%]">60% Soft White</span>
                <span className="w-[30%]">30% Navy</span>
                <span className="w-[10%]">10%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="rounded-xl border border-line bg-soft p-4">
                  <div className="h-3 w-2/3 rounded bg-navy" />
                  <div className="mt-2 h-2 w-full rounded bg-line" />
                  <div className="mt-1 h-2 w-4/5 rounded bg-line" />
                  <div className="mt-4 h-6 w-20 rounded-md bg-orange" />
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs font-bold text-teal"><Check className="h-3 w-3" /> Equilibrado</p>
              </div>
              <div>
                <div className="rounded-xl bg-orange p-4">
                  <div className="h-3 w-2/3 rounded bg-teal" />
                  <div className="mt-2 h-2 w-full rounded bg-amber" />
                  <div className="mt-1 h-2 w-4/5 rounded bg-navy" />
                  <div className="mt-4 h-6 w-20 rounded-md bg-amber" />
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs font-bold text-destructive"><X className="h-3 w-3" /> Sobrecarregado</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="tipografia" eyebrow="02 · Tipografia" title="Manrope" intro="Família única. Bold para títulos, módulos, botões e palavras-chave. Regular para textos, instruções, descrições e fóruns. Entrelinha 1.45–1.6.">
          <div className="divide-y divide-line rounded-2xl border border-line bg-card">
            {[
              ["Display · 48/1.1 · Bold", "text-5xl font-bold leading-tight text-navy", "Aprender o território"],
              ["H1 · 36/1.2 · Bold", "text-4xl font-bold text-navy", "Como observar sistemas"],
              ["H2 · 30/1.25 · Bold", "text-3xl font-bold text-navy", "Módulo 02 · Exploração"],
              ["H3 · 20/1.3 · Bold", "text-xl font-bold text-navy", "Mapa de relações"],
              ["Corpo · 16/1.6 · Regular", "text-base leading-relaxed text-ink", "Nesta etapa, você vai explorar os conceitos principais e relacioná-los a um exemplo aplicado."],
              ["Pequeno · 14/1.5 · Regular", "text-sm leading-normal text-muted-foreground", "Organize os conceitos e envie sua síntese para receber feedback."],
              ["Etiqueta · 11 · Bold · tracking 0.18em", "text-[11px] font-bold uppercase tracking-[0.18em] text-teal", "Conteúdo · 25 min · Em andamento"],
            ].map(([label, cls, sample]) => (
              <div key={label} className="grid gap-2 p-5 md:grid-cols-[220px_1fr] md:items-center">
                <button onClick={() => copy(cls ?? "")} className="text-left font-mono text-xs text-muted-foreground hover:text-navy">{label}</button>
                <p className={cls}>{sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="botoes" eyebrow="03 · Componentes" title="Botões" intro="Um único botão primário (laranja) por área. Use rótulos com verbo: “Continuar módulo”, “Abrir atividade”.">
          <div className="grid gap-6">
            <Example title="Variantes" code={`import { Button } from "@/components/ui/button";

<Button>Continuar módulo</Button>          {/* Ação · laranja */}
<Button variant="secondary">Ver trilha</Button> {/* Estrutura · navy */}
<Button variant="outline">Ver critérios</Button>
<Button variant="ghost">Cancelar</Button>
<Button variant="link">Saiba mais</Button>`}>
              <Button>Continuar módulo <ArrowRight /></Button>
              <Button variant="secondary">Ver trilha</Button>
              <Button variant="outline">Ver critérios</Button>
              <Button variant="ghost">Cancelar</Button>
              <Button variant="link">Saiba mais</Button>
            </Example>
            <Example title="Tamanhos e estados" code={`<Button size="sm">Pequeno</Button>
<Button>Padrão</Button>
<Button size="lg">Grande</Button>
<Button disabled>Desabilitado</Button>
<Button disabled><Loader2 className="animate-spin" /> Enviando…</Button>`}>
              <Button size="sm">Pequeno</Button>
              <Button>Padrão</Button>
              <Button size="lg">Grande</Button>
              <Button disabled>Desabilitado</Button>
              <Button disabled><Loader2 className="animate-spin" /> Enviando…</Button>
            </Example>
          </div>
        </Section>

        <Section id="cabecalhos" eyebrow="03.1 · Componentes" title="Cabeçalhos de seção" intro="Etiqueta (contexto) → título (assunto) → descrição curta. Nunca pule níveis de título.">
          <Example title="Cabeçalho padrão" code={`<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal">Módulo 02 · Exploração</p>
<h2 className="mt-2 text-3xl font-bold text-navy">Como observar sistemas conectados</h2>
<p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">Descrição curta…</p>`}>
            <div>
              <Eyebrow>Módulo 02 · Exploração</Eyebrow>
              <h2 className="mt-2 text-3xl font-bold text-navy">Como observar sistemas conectados</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">Nesta etapa, você vai explorar os conceitos principais e relacioná-los a um exemplo aplicado.</p>
            </div>
          </Example>
          <div className="mt-6">
            <Example dark title="Cabeçalho em superfície navy" code={`<div className="bg-navy p-8 rounded-2xl">
  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber">Trilha formativa</p>
  <h2 className="mt-2 text-3xl font-bold text-secondary-foreground">Aprender o território</h2>
</div>`}>
              <div>
                <Eyebrow className="text-amber">Trilha formativa</Eyebrow>
                <h2 className="mt-2 text-3xl font-bold text-secondary-foreground">Aprender o território. <span className="text-orange">Transformar o futuro.</span></h2>
              </div>
            </Example>
          </div>
        </Section>

        <Section id="chamadas" eyebrow="03.2 · Componentes" title="Chamadas e avisos" intro="Teal informa progresso, âmbar dá apoio/alerta, laranja destaca uma ação. Sempre com ícone + texto, nunca só cor.">
          <Example title="Callouts" code={`<div className="flex gap-3 rounded-xl border-l-4 border-teal bg-accent p-4">
  <Info className="text-teal" />
  <p className="text-sm text-ink"><strong className="text-navy">Em andamento.</strong> …</p>
</div>`}>
            <div className="grid w-full gap-3">
              <div className="flex gap-3 rounded-xl border-l-4 border-teal bg-accent p-4">
                <Info className="h-5 w-5 shrink-0 text-teal" />
                <p className="text-sm leading-relaxed text-ink"><strong className="text-navy">Em andamento.</strong> Você concluiu 3 de 5 atividades deste módulo.</p>
              </div>
              <div className="flex gap-3 rounded-xl border-l-4 border-amber bg-amber/15 p-4">
                <AlertTriangle className="h-5 w-5 shrink-0 text-navy" />
                <p className="text-sm leading-relaxed text-ink"><strong className="text-navy">Atenção.</strong> O prazo de envio termina em 2 dias.</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-navy p-5">
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 shrink-0 text-amber" />
                  <p className="text-sm leading-relaxed text-secondary-foreground"><strong>Nova atividade disponível.</strong> Mapa de relações já está aberto.</p>
                </div>
                <Button size="sm">Abrir atividade</Button>
              </div>
            </div>
          </Example>
        </Section>

        <Section id="cards" eyebrow="03.3 · Componentes" title="Cards" intro="Composições do mini-manual: assunto → contexto → metadados → ação.">
          <Example title="Card de módulo e card de atividade" code={`<article className="rounded-2xl border border-line bg-card p-6 shadow-card">
  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal">Módulo 02 · Exploração</p>
  <h3 className="mt-2 text-xl font-bold text-navy">Como observar sistemas conectados</h3>
  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">…</p>
  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Conteúdo · 25 min · Em andamento</p>
  <Button className="mt-5">Continuar módulo</Button>
</article>`}>
            <div className="grid w-full gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-line bg-card p-6 shadow-card">
                <Eyebrow>Módulo 02 · Exploração</Eyebrow>
                <h3 className="mt-2 text-xl font-bold text-navy">Como observar sistemas conectados</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Nesta etapa, você vai explorar os conceitos principais e relacioná-los a um exemplo aplicado.</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/5 bg-teal" /></div>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Conteúdo · 25 min · Em andamento</p>
                <Button className="mt-5">Continuar módulo <ArrowRight /></Button>
              </article>
              <article className="rounded-2xl bg-navy p-6 shadow-card">
                <Eyebrow className="text-amber">Atividade 02 · Aplicação</Eyebrow>
                <h3 className="mt-2 inline-block rounded bg-amber px-2 text-xl font-bold text-navy">Mapa de relações</h3>
                <p className="mt-3 text-sm leading-relaxed text-sky">Organize os conceitos e envie sua síntese para receber feedback.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button>Abrir atividade</Button>
                  <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary-foreground/10">Ver critérios</Button>
                </div>
              </article>
            </div>
          </Example>
        </Section>

        <Section id="badges" eyebrow="03.4 · Componentes" title="Etiquetas e status" intro="Tracking amplo, caixa alta, textos curtos. A cor reforça — o texto informa.">
          <Example title="Badges" code={`<span className="rounded-full bg-teal/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy">Em andamento</span>`}>
            {[
              ["Em andamento", "bg-teal/15 text-navy"],
              ["Concluído", "bg-teal text-navy"],
              ["Obrigatório", "bg-orange text-navy"],
              ["Prazo próximo", "bg-amber text-navy"],
              ["Rascunho", "bg-muted text-muted-foreground"],
              ["Trilha", "bg-navy text-secondary-foreground"],
            ].map(([t, c]) => (
              <span key={t} className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]", c)}>{t}</span>
            ))}
          </Example>
        </Section>

        <Section id="formularios" eyebrow="03.5 · Componentes" title="Formulários" intro="Rótulo sempre visível acima do campo, foco em laranja, erro com texto explicativo.">
          <Example title="Campos" code={`<Label htmlFor="email">E-mail institucional</Label>
<Input id="email" type="email" placeholder="nome@escola.br" />
<Input aria-invalid className="border-destructive" />
<p className="text-sm font-semibold text-destructive">Informe um e-mail válido.</p>`}>
            <div className="grid w-full gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="ds-a">E-mail institucional</Label>
                <Input id="ds-a" type="email" placeholder="nome@escola.br" />
                <p className="text-xs text-muted-foreground">Use o e-mail cadastrado pela escola.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-b">Com erro</Label>
                <Input id="ds-b" defaultValue="nome@" aria-invalid className="border-destructive" />
                <p className="text-sm font-semibold text-destructive">Informe um e-mail válido.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-c">Desabilitado</Label>
                <Input id="ds-c" disabled defaultValue="Não editável" />
              </div>
            </div>
          </Example>
        </Section>

        <Section id="usabilidade" eyebrow="04 · Regras" title="Usabilidade e acessibilidade">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="font-bold text-teal">Faça</p>
              <ul className="mt-3 space-y-2">
                <Rule ok>Um botão primário laranja por tela ou bloco.</Rule>
                <Rule ok>Texto Deep Navy sobre laranja, teal e âmbar.</Rule>
                <Rule ok>Contraste mínimo 4.5:1 para texto corrido (WCAG AA).</Rule>
                <Rule ok>Áreas de toque com no mínimo 44×44px.</Rule>
                <Rule ok>Foco visível em todos os elementos interativos.</Rule>
                <Rule ok>Linhas de texto com até ~70 caracteres e entrelinha 1.45–1.6.</Rule>
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="font-bold text-destructive">Evite</p>
              <ul className="mt-3 space-y-2">
                <Rule ok={false}>Usar todas as cores vibrantes com a mesma intensidade.</Rule>
                <Rule ok={false}>Texto branco sobre laranja ou âmbar.</Rule>
                <Rule ok={false}>Comunicar status apenas pela cor.</Rule>
                <Rule ok={false}>Outras famílias tipográficas além da Manrope.</Rule>
                <Rule ok={false}>Caixa alta em parágrafos ou títulos longos.</Rule>
                <Rule ok={false}>Cores fora dos tokens (ex.: valores hex soltos no código).</Rule>
              </ul>
            </div>
          </div>
        </Section>

        <footer className="py-10 text-sm text-muted-foreground">
          Fonte: Mini-manual de Cor e Tipografia CEURS. Tokens definidos em <code className="font-mono">src/styles.css</code>.
        </footer>
      </main>
    </div>
  );
}
