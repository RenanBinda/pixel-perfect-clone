import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brush,
  Compass,
  Crown,
  Eye,
  Image as ImageIcon,
  Layers,
  Palette,
  Ruler,
  Sparkles,
  Type,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin-access.functions";
import { BrandMark, Wordmark } from "@/components/marca/BrandMark";
import {
  ColorApplications,
  MiniColorManual,
} from "@/components/marca/PaletteApplications";

export const Route = createFileRoute("/admin/marca")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireAdmin();
  },
  head: () => ({
    meta: [
      { title: "Marca e aplicações · Admin CEURS–Escolas" },
      {
        name: "description",
        content:
          "Manual completo da submarca CEURS–Escolas: ponto de partida, morfologia, semântica, desconstrução, família de vozes, construção, grafismos e aplicações.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MarcaPage,
});

/* ============================================================
   ÍNDICE (para navegação lateral sticky)
   ============================================================ */

const indice = [
  { id: "ponto-de-partida", num: "01", label: "Ponto de partida" },
  { id: "morfologia", num: "02", label: "Morfologia" },
  { id: "semantica", num: "03", label: "Análise semântica" },
  { id: "desconstrucao", num: "04", label: "Desconstrução" },
  { id: "familia", num: "05", label: "Família de vozes" },
  { id: "construcao", num: "06", label: "Construção e uso" },
  { id: "grafismos", num: "07", label: "Grafismos" },
  { id: "aplicacoes", num: "08", label: "Aplicações" },
  { id: "manual-cromatico", num: "09", label: "Mini manual cromático" },
  { id: "referencias", num: "10", label: "Referências" },
];

/* ============================================================
   PÁGINA
   ============================================================ */

function MarcaPage() {
  return (
    <div className="min-h-screen bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-14">
        {/* Breadcrumb */}
        <Link
          to="/admin"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao painel
        </Link>

        {/* Hero editorial */}
        <header className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-secondary-foreground md:px-14 md:py-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(24,185,176,0.18),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,139,18,0.15),transparent_50%)]"
          />
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="eyebrow flex items-center gap-2 text-teal">
                <span aria-hidden className="h-2 w-2 rounded-full bg-orange" />
                Manual da submarca · 2026
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Marca e aplicações
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-sky">
                Uma rubrica. Muitos caminhos para aprender. A identidade CEURS
                ganha expressão própria no contexto escolar — sem perder o
                movimento que a originou.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-secondary-foreground/20 bg-secondary-foreground/5 px-4 py-2 backdrop-blur-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber">
                    Documentação
                  </p>
                  <p className="mt-0.5 text-sm font-bold">10 seções</p>
                </div>
                <div className="rounded-full border border-secondary-foreground/20 bg-secondary-foreground/5 px-4 py-2 backdrop-blur-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber">
                    Marca-mãe
                  </p>
                  <p className="mt-0.5 text-sm font-bold">CEURS → CEURS-Escolas</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="rounded-2xl bg-secondary-foreground/5 p-8 backdrop-blur-md">
                <Wordmark size={96} inverse />
              </div>
            </div>
          </div>
        </header>

        {/* ============================================================
            GRID PRINCIPAL: índice + conteúdo
            ============================================================ */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Índice horizontal (mobile/tablet) */}
          <nav aria-label="Índice do manual" className="-mx-1 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {indice.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="shrink-0 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-navy hover:border-teal">
                {item.num} · {item.label}
              </a>
            ))}
          </nav>
          {/* Índice lateral sticky */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Índice do manual"
              className="sticky top-8 rounded-2xl border border-line bg-card p-5 shadow-soft"
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-teal">
                Índice
              </p>
              <ul className="mt-4 space-y-1">
                {indice.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft hover:text-navy"
                    >
                      <span className="text-[11px] font-bold text-muted-foreground group-hover:text-teal">
                        {item.num}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Conteúdo */}
          <div className="min-w-0 space-y-20">
            {/* ============================================================
                01 · PONTO DE PARTIDA
                ============================================================ */}
            <section
              id="ponto-de-partida"
              aria-labelledby="ponto-de-partida-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="01"
                eyebrow="Ponto de partida"
                title="A submarca começa na escuta"
                lead="Antes de criar, observamos o que a CEURS já comunica. O material de referência reúne um mini-manual cromático e tipográfico e uma prancha de evolução do símbolo com assinaturas de escolas."
                id="ponto-de-partida-title"
              />

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <article className="rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <Compass className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-teal">
                    A · Identidade
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-navy">
                    Uma identidade que se move
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    O símbolo parte de um "C" fluido, com faixas curvas e
                    pontos orbitais.
                  </p>
                  <blockquote className="mt-4 border-l-4 border-teal pl-4 text-[15px] italic leading-relaxed text-ink">
                    "O gesto que distingue a CEURS não é uma letra fechada. É
                    uma curva em movimento, aberta para receber novos
                    percursos."
                  </blockquote>
                </article>

                <article className="rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
                    <Palette className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-orange">
                    B · Gramática de cor
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-navy">
                    Cada cor tem um papel
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    Azul estrutura; turquesa marca progresso; laranja destaca
                    ação. Âmbar e branco suave completam o sistema.
                  </p>
                  <ul className="mt-4 space-y-2 text-[14px] text-ink">
                    <li className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-navy" aria-hidden />
                      <b>Deep Navy</b> · estrutura
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-teal" aria-hidden />
                      <b>Active Teal</b> · progresso
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-orange" aria-hidden />
                      <b>Vibrant Orange</b> · ação
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-amber" aria-hidden />
                      <b>Warm Amber</b> · apoio
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full bg-soft ring-1 ring-line"
                        aria-hidden
                      />
                      <b>Soft White</b> · respiro
                    </li>
                  </ul>
                </article>

                <article className="rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/10 text-navy">
                    <Type className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-navy">
                    C · Clareza primeiro
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-navy">
                    Tipografia e respiro
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    Manrope e respiro generoso organizam a leitura sem competir
                    com o conteúdo de aprendizagem.
                  </p>
                </article>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber/40 bg-amber/10 p-5">
                <Crown className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden />
                <div>
                  <p className="text-[13px] font-bold text-navy">Nota de escopo</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink">
                    Este arquivo não especifica valores institucionais formais,
                    grid construtivo ou proporções oficiais. As interpretações
                    e medidas adiante são diretrizes de projeto para a submarca,
                    não normas históricas da CEURS.
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================================
                02 · MORFOLOGIA
                ============================================================ */}
            <section
              id="morfologia"
              aria-labelledby="morfologia-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="02"
                eyebrow="Morfologia"
                title="Peças que fazem o símbolo"
                lead="A morfologia descreve a forma antes de atribuir sentido: contorno, massas, detalhes, tipografia e cor observáveis no material."
                id="morfologia-title"
              />

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div className="flex min-h-[320px] items-center justify-center rounded-2xl border-2 border-dashed border-line bg-soft p-8">
                  <div className="text-center">
                    <ImageIcon
                      className="mx-auto h-10 w-10 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="mt-3 text-[14px] font-bold text-navy">
                      Diagrama morfológico
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      C circular/aberto + faixas + pontos orbitais
                    </p>
                  </div>
                </div>

                <ol className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Campo curvo",
                      desc: "Um campo curvo com abertura lateral. O 'C' é sugerido por continuidade, não por um círculo geométrico perfeito.",
                      cor: "bg-orange/20 text-orange",
                    },
                    {
                      num: "02",
                      title: "Faixas orgânicas",
                      desc: "Curvas internas sobrepostas criam profundidade e uma impressão de fluxo ou onda.",
                      cor: "bg-teal/20 text-teal",
                    },
                    {
                      num: "03",
                      title: "Pontos orbitais",
                      desc: "Pequenos círculos destacados prolongam a forma e acrescentam ritmo à abertura.",
                      cor: "bg-navy/20 text-navy",
                    },
                    {
                      num: "04",
                      title: "Assinatura verbal",
                      desc: "'CEURS' tem maior peso; 'ESCOLAS' aparece como descritor secundário. A recomendação tipográfica é Manrope.",
                      cor: "bg-amber/30 text-amber-700",
                    },
                  ].map((item) => (
                    <li
                      key={item.num}
                      className="rounded-xl border border-line bg-card p-5 shadow-soft"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold ${item.cor}`}
                        >
                          {item.num}
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-navy">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Variantes */}
              <h3 className="mt-12 text-lg font-extrabold text-navy">
                Variantes do símbolo
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <VarianteCard titulo="Cor (padrão)" fundo="bg-soft">
                  <BrandMark size={72} />
                </VarianteCard>
                <VarianteCard titulo="Mono" fundo="bg-soft">
                  <BrandMark size={72} mono />
                </VarianteCard>
                <VarianteCard titulo="Inverso" fundo="bg-navy">
                  <BrandMark size={72} inverse />
                </VarianteCard>
                <VarianteCard titulo="Wordmark completo" fundo="bg-soft">
                  <Wordmark size={56} />
                </VarianteCard>
              </div>
            </section>

            {/* ============================================================
                03 · ANÁLISE SEMÂNTICA
                ============================================================ */}
            <section
              id="semantica"
              aria-labelledby="semantica-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="03"
                eyebrow="Análise semântica"
                title="Uma forma aberta. Um sentido em construção."
                lead="São leituras de design propostas a partir da forma observada, não declarações oficiais da instituição."
                id="semantica-title"
              />

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <SemanticaCard
                  numero="01"
                  titulo="Continuidade"
                  descricao="A curva que não se fecha sugere aprendizagem como processo: sem um ponto final rígido, aberta a novos capítulos."
                  cor="teal"
                />
                <SemanticaCard
                  numero="02"
                  titulo="Troca"
                  descricao="A onda encosta em outras formas e as conecta — uma metáfora para comunidades escolares que aprendem em relação."
                  cor="orange"
                />
                <SemanticaCard
                  numero="03"
                  titulo="Pluralidade"
                  descricao="Pontos distintos, em uma órbita comum, evocam estudantes e educadores que participam com diferentes vozes."
                  cor="navy"
                />
                <SemanticaCard
                  numero="04"
                  titulo="Passagem"
                  descricao="O 'C' pode ser lido como portal ou abrigo: uma entrada para explorar, experimentar e compartilhar conhecimento."
                  cor="amber"
                />
              </div>
            </section>

            {/* ============================================================
                04 · DESCONSTRUÇÃO
                ============================================================ */}
            <section
              id="desconstrucao"
              aria-labelledby="desconstrucao-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="04"
                eyebrow="Desconstrução"
                title="Da marca à menor unidade"
                lead="A decomposição revela o gesto que pode sobreviver em escalas, superfícies e aplicações diferentes: C aberto, onda de conexão, pontos em órbita."
                id="desconstrucao-title"
              />

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div className="flex min-h-[360px] items-center justify-center rounded-2xl border-2 border-dashed border-line bg-soft p-8">
                  <div className="text-center">
                    <ImageIcon
                      className="mx-auto h-10 w-10 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="mt-3 text-[14px] font-bold text-navy">
                      Desconstrução da rubrica
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      C aberto + onda + pontos em órbita
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-teal">
                    Rubrica visual
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-navy">
                    Um C aberto
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink">
                    A curva aberta preserva o gesto reconhecível da marca-mãe.
                    O espaço à direita não é ausência: é convite, continuidade
                    e passagem para novos aprendizados.
                  </p>

                  <div className="mt-6 rounded-2xl border border-line bg-card p-5 shadow-soft">
                    <p className="text-[12px] font-bold uppercase tracking-widest text-teal">
                      Rubrica proposta
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                      C aberto + fluxo + pontos
                    </p>
                    <p className="mt-2 text-[14px] text-muted-foreground">
                      O elemento-base é reconhecível mesmo sem a assinatura
                      tipográfica.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <BadgeSimples cor="bg-orange" label="Campo" />
                    <BadgeSimples cor="bg-teal" label="Fluxo" />
                    <BadgeSimples cor="bg-navy" label="Pontos" />
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================
                05 · FAMÍLIA DE VOZES
                ============================================================ */}
            <section
              id="familia"
              aria-labelledby="familia-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="05"
                eyebrow="Família"
                title="Uma família, três vozes"
                lead="Três direções conceituais preservam o vocabulário CEURS. Recomendação: adotar a Onda como assinatura principal e reservar as outras como explorações de campanha."
                id="familia-title"
              />

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {/* Onda (recomendada) */}
                <article className="relative overflow-hidden rounded-2xl border-2 border-teal bg-card p-6 shadow-card">
                  <span className="absolute right-3 top-3 rounded-full bg-teal px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy">
                    Recomendada
                  </span>
                  <div className="flex h-32 items-center justify-center rounded-xl bg-soft">
                    <Wordmark size={56} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">
                    Onda de aprendizagem
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Conserva o "C" fluido, o movimento interno e os pontos.
                    Assinatura horizontal versátil para documentos, ambientes
                    digitais e sinalização.
                  </p>
                  <p className="mt-4 border-t border-line pt-3 text-[12px] font-bold uppercase tracking-widest text-teal">
                    Assinatura institucional
                  </p>
                </article>

                {/* Órbita */}
                <article className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <span className="absolute right-3 top-3 rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Expansão
                  </span>
                  <div className="flex h-32 items-center justify-center rounded-xl bg-soft">
                    <BrandMark size={56} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">
                    Órbita compartilhada
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Amplia o repertório de pontos para destacar diálogo,
                    encontros e participação em projetos escolares.
                  </p>
                  <p className="mt-4 border-t border-line pt-3 text-[12px] font-bold uppercase tracking-widest text-muted-foreground">
                    Uso editorial ou campanha
                  </p>
                </article>

                {/* Germinação */}
                <article className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <span className="absolute right-3 top-3 rounded-full bg-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Expansão
                  </span>
                  <div className="flex h-32 items-center justify-center rounded-xl bg-soft">
                    <BrandMark size={56} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-navy">
                    Ideias em germinação
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    Reinterpreta a curva como broto em crescimento. Uma direção
                    mais temática, para ciclos de criação e desenvolvimento.
                  </p>
                  <p className="mt-4 border-t border-line pt-3 text-[12px] font-bold uppercase tracking-widest text-muted-foreground">
                    Uso temático complementar
                  </p>
                </article>
              </div>

              <div className="mt-8 rounded-2xl border border-teal/40 bg-teal/5 p-5">
                <p className="text-[14px] leading-relaxed text-ink">
                  <b className="text-navy">Recomendação de sistema:</b>{" "}
                  mantenha a Onda como assinatura permanente. Use Rede e
                  Germinação como grafismos de apoio, sem substituir a marca
                  principal.
                </p>
              </div>
            </section>

            {/* ============================================================
                06 · CONSTRUÇÃO E USO
                ============================================================ */}
            <section
              id="construcao"
              aria-labelledby="construcao-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="06"
                eyebrow="Construção e uso"
                title="Regras simples. Leitura segura."
                lead="As medidas abaixo estabelecem uma base consistente para a aplicação proposta. São parâmetros novos para CEURS-Escolas, a validar com a instituição antes de produção final."
                id="construcao-title"
              />

              <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                <div className="flex min-h-[320px] items-center justify-center rounded-2xl border-2 border-dashed border-line bg-soft p-8">
                  <div className="text-center">
                    <ImageIcon
                      className="mx-auto h-10 w-10 text-muted-foreground"
                      aria-hidden
                    />
                    <p className="mt-3 text-[14px] font-bold text-navy">
                      Área de proteção e proporção
                    </p>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Largura ≈ 3,8× a altura · x = 1/8 da altura
                    </p>
                  </div>
                </div>

                <ol className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Proporção-base",
                      desc: "Ícone em proporção 1:1. Na assinatura horizontal, o conjunto tem largura aproximada de 3,8 vezes a altura do símbolo.",
                    },
                    {
                      num: "02",
                      title: "Área de proteção",
                      desc: "Reserve ao redor pelo menos 1x, sendo x igual a 1/8 da altura do ícone. Nenhum texto, borda ou fotografia invade esse campo.",
                    },
                    {
                      num: "03",
                      title: "Redução recomendada",
                      desc: "Não use o conjunto abaixo de 120 px de largura em tela ou 28 mm em impressão. Para tamanhos menores, prefira o símbolo isolado (mínimo 24 px).",
                    },
                    {
                      num: "04",
                      title: "Versões de cor",
                      desc: "Preferir cor sobre fundo Soft White. Para alto contraste, usar símbolo e wordmark em Deep Navy sobre fundo claro.",
                    },
                  ].map((item) => (
                    <li
                      key={item.num}
                      className="rounded-xl border border-line bg-card p-5 shadow-soft"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-[12px] font-extrabold text-teal">
                          {item.num}
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-navy">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <h3 className="mt-12 text-lg font-extrabold text-navy">
                Variações controladas
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-3">
                <VarianteCard titulo="Preferencial: cor" fundo="bg-soft">
                  <Wordmark size={56} />
                </VarianteCard>
                <VarianteCard titulo="Monocromática: marinho" fundo="bg-soft">
                  <Wordmark size={56} mono />
                </VarianteCard>
                <VarianteCard titulo="Negativa: fundo escuro" fundo="bg-navy">
                  <Wordmark size={56} inverse />
                </VarianteCard>
              </div>
            </section>

            {/* ============================================================
                07 · GRAFISMOS
                ============================================================ */}
            <section
              id="grafismos"
              aria-labelledby="grafismos-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="07"
                eyebrow="Grafismos"
                title="A onda sai do símbolo"
                lead="A rubrica torna-se um vocabulário de peças: arcos, órbitas e sequências de pontos. Use um gesto por vez e deixe o conteúdo respirar."
                id="grafismos-title"
              />

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <GrafismoCard
                  titulo="A · Textura contínua"
                  descricao="Repetição leve em 10-15% de contraste. Indicada para fundos, capas internas e divisórias."
                  bg="bg-soft"
                  elemento={<TexturePattern />}
                />
                <GrafismoCard
                  titulo="B · Grafismo de percurso"
                  descricao="Arcos incompletos prolongam o fluxo. Pontos em escalas diferentes podem marcar etapas ou relações."
                  bg="bg-soft"
                  elemento={<PercursoPattern />}
                />
                <GrafismoCard
                  titulo="C · Ritmo de progresso"
                  descricao="Uma sequência que cresce e abre espaço. Use como marcador de seção, barra de percurso ou detalhe editorial."
                  bg="bg-navy"
                  elemento={<RitmoPattern />}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-line bg-card p-6 shadow-soft">
                <p className="text-[12px] font-bold uppercase tracking-widest text-teal">
                  60 / 30 / 10
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">
                  Regra de aplicação. Soft White e neutros como campo
                  predominante; Deep Navy para estrutura; Active Teal para
                  orientação; laranja ou âmbar como foco pontual, nunca ambos
                  em competição.
                </p>
              </div>
            </section>

            {/* ============================================================
                08 · APLICAÇÕES
                ============================================================ */}
            <section
              id="aplicacoes"
              aria-labelledby="aplicacoes-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="08"
                eyebrow="Aplicações cromáticas"
                title="A paleta em uso"
                lead="Ensaios estáticos para avaliar contraste e hierarquia em tela e papel. A paleta fica mais suave nas superfícies; azul e âmbar entram como acentos distintos, não como concorrentes."
                id="aplicacoes-title"
              />

              <div className="mt-10">
                <ColorApplications />
              </div>
            </section>

            {/* ============================================================
                09 · MINI MANUAL CROMÁTICO
                ============================================================ */}
            <section
              id="manual-cromatico"
              aria-labelledby="manual-cromatico-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="09"
                eyebrow="Mini manual cromático"
                title="Cada cor tem um papel"
                lead="Paleta base, proporção 60/30/10, contraste e regras de aplicação."
                id="manual-cromatico-title"
              />

              <div className="mt-10">
                <MiniColorManual onEnter={() => {}} />
              </div>
            </section>

            {/* ============================================================
                10 · REFERÊNCIAS
                ============================================================ */}
            <section
              id="referencias"
              aria-labelledby="referencias-title"
              className="scroll-mt-8"
            >
              <SectionHeader
                num="10"
                eyebrow="Recursos"
                title="Referências complementares"
                id="referencias-title"
              />

              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                <li>
                  <Link
                    to="/identidade"
                    className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                      <BookOpen className="h-5 w-5" aria-hidden />
                    </div>
                    <p className="mt-4 text-lg font-bold text-navy">
                      Manual público de identidade
                    </p>
                    <p className="mt-2 flex-1 text-[14px] text-muted-foreground">
                      Paleta base, tipografia, símbolo, grafismos e aplicações
                      da marca.
                    </p>
                    <span className="mt-4 text-[13px] font-bold text-teal group-hover:underline">
                      Abrir manual →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/design-system"
                    className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-teal hover:shadow-card"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
                      <Layers className="h-5 w-5" aria-hidden />
                    </div>
                    <p className="mt-4 text-lg font-bold text-navy">
                      Design System (componentes)
                    </p>
                    <p className="mt-2 flex-1 text-[14px] text-muted-foreground">
                      Componentes, estados e padrões de UI.
                    </p>
                    <span className="mt-4 text-[13px] font-bold text-teal group-hover:underline">
                      Abrir design system →
                    </span>
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTES INTERNOS
   ============================================================ */

function SectionHeader({
  num,
  eyebrow,
  title,
  lead,
  id,
}: {
  num: string;
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <header className="border-t border-line pt-10">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold tracking-tight text-teal">
          {num}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-teal">
          {eyebrow}
        </p>
      </div>
      <h2
        id={id}
        className="mt-3 text-2xl font-extrabold tracking-tight text-navy md:text-3xl"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}
    </header>
  );
}

function VarianteCard({
  titulo,
  fundo,
  children,
}: {
  titulo: string;
  fundo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      <div
        className={`flex h-32 items-center justify-center ${fundo}`}
        aria-hidden
      >
        {children}
      </div>
      <div className="border-t border-line p-4">
        <p className="text-[15px] font-bold text-navy">{titulo}</p>
      </div>
    </div>
  );
}

function SemanticaCard({
  numero,
  titulo,
  descricao,
  cor,
}: {
  numero: string;
  titulo: string;
  descricao: string;
  cor: "teal" | "orange" | "navy" | "amber";
}) {
  const corMap = {
    teal: "bg-teal/20 text-teal",
    orange: "bg-orange/20 text-orange",
    navy: "bg-navy/20 text-navy",
    amber: "bg-amber/30 text-amber-700",
  };
  return (
    <article className="rounded-2xl border border-line bg-card p-6 shadow-soft">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-extrabold ${corMap[cor]}`}
      >
        {numero}
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-navy">{titulo}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {descricao}
      </p>
    </article>
  );
}

function GrafismoCard({
  titulo,
  descricao,
  bg,
  elemento,
}: {
  titulo: string;
  descricao: string;
  bg: string;
  elemento: React.ReactNode;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      <div className={`flex h-40 items-center justify-center ${bg}`}>
        {elemento}
      </div>
      <div className="p-5">
        <p className="text-[12px] font-bold uppercase tracking-widest text-teal">
          {titulo}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          {descricao}
        </p>
      </div>
    </article>
  );
}

function BadgeSimples({ cor, label }: { cor: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-soft">
      <span className={`h-2 w-2 rounded-full ${cor}`} aria-hidden />
      <span className="text-[13px] font-bold text-navy">{label}</span>
    </div>
  );
}

/* ============================================================
   GRAFISMOS EM SVG
   ============================================================ */

function TexturePattern() {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <g
            key={`${row}-${col}`}
            transform={`translate(${col * 60 + 10} ${row * 40 + 5})`}
          >
            <path
              d="M 20 5 A 15 15 0 1 0 20 35"
              fill="none"
              stroke="#0A3153"
              strokeWidth="2"
              opacity="0.35"
            />
            <path
              d="M 20 10 A 10 10 0 1 0 20 30"
              fill="none"
              stroke="#18B9B0"
              strokeWidth="2"
              opacity="0.5"
            />
            <circle cx="30" cy="20" r="2.5" fill="#FF8B12" opacity="0.7" />
          </g>
        )),
      )}
    </svg>
  );
}

function PercursoPattern() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <path
        d="M 60 120 Q 60 40 140 40 Q 180 40 180 80"
        fill="none"
        stroke="#0A3153"
        strokeWidth="3"
      />
      <path
        d="M 80 120 Q 80 60 130 60 Q 160 60 160 85"
        fill="none"
        stroke="#18B9B0"
        strokeWidth="3"
      />
      <circle cx="180" cy="80" r="6" fill="#FF8B12" />
      <circle cx="160" cy="85" r="4" fill="#18B9B0" />
      <circle cx="200" cy="120" r="3" fill="#FFC338" />
      <text
        x="120"
        y="148"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#0A3153"
        fontStyle="italic"
      >
        ideia
      </text>
    </svg>
  );
}

function RitmoPattern() {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
      <rect
        x="50"
        y="55"
        width="14"
        height="30"
        rx="3"
        fill="#18B9B0"
        transform="rotate(-20 57 70)"
      />
      <rect
        x="75"
        y="45"
        width="14"
        height="40"
        rx="3"
        fill="#18B9B0"
        transform="rotate(-20 82 65)"
      />
      <rect
        x="100"
        y="35"
        width="14"
        height="50"
        rx="3"
        fill="#CBDDE2"
        transform="rotate(-20 107 60)"
      />
      <rect
        x="125"
        y="30"
        width="14"
        height="55"
        rx="3"
        fill="#FFC338"
        transform="rotate(-20 132 57)"
      />
      <rect
        x="150"
        y="35"
        width="14"
        height="50"
        rx="3"
        fill="#FF8B12"
        transform="rotate(-20 157 60)"
      />
      <rect
        x="175"
        y="45"
        width="14"
        height="40"
        rx="3"
        fill="#18B9B0"
        transform="rotate(-20 182 65)"
      />
      <text
        x="120"
        y="112"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#F5F8F7"
        letterSpacing="1.5"
      >
        APRENDER → PARTILHAR
      </text>
    </svg>
  );
}