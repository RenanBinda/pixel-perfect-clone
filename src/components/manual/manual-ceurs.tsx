import { useEffect, useState } from 'react';
import './manual-ceurs.css';

import texturaRede from "@/assets/ceurs-textura-rede.png";
import texturaAprendizagem from "@/assets/ceurs-textura-aprendizagem.png";

type PaletteItem = {
  name: string;
  hex: string;
  role: string;
  usage: string;
  className: string;
};

type Section = { id: string; label: string; number: string };

const sections: Section[] = [
  { id: 'essencia', label: 'Essência', number: '01' },
  { id: 'simbolo', label: 'Símbolo', number: '02' },
  { id: 'cores', label: 'Cores', number: '03' },
  { id: 'tipografia', label: 'Tipografia', number: '04' },
  { id: 'grafismos', label: 'Grafismos', number: '05' },
  { id: 'aplicacoes', label: 'Aplicações', number: '06' },
  { id: 'acessibilidade', label: 'Acessibilidade', number: '07' },
];

const palette: PaletteItem[] = [
  { name: 'Deep Navy', hex: '#0A3153', role: 'Estrutura', usage: 'Base institucional, fundos densos e títulos.', className: 'navy' },
  { name: 'Active Teal', hex: '#18B9B0', role: 'Conexão', usage: 'Progresso, rede, vínculo e continuidade.', className: 'teal' },
  { name: 'Vibrant Orange', hex: '#FF8B12', role: 'Ação', usage: 'CTAs, decisões e pontos de energia.', className: 'orange' },
  { name: 'Warm Amber', hex: '#FFC338', role: 'Descoberta', usage: 'Ênfase, curiosidade e apoio visual.', className: 'amber' },
  { name: 'Soft White', hex: '#F5F8F7', role: 'Respiro', usage: 'Superfícies, leitura e contraste suave.', className: 'soft' },
];

const principles = [
  ['01', 'Ler', 'Observar o território antes de propor caminhos.'],
  ['02', 'Conectar', 'Aproximar pessoas, dados, repertórios e redes.'],
  ['03', 'Agir', 'Transformar conhecimento em decisão aplicada.'],
  ['04', 'Cuidar', 'Sustentar futuros possíveis com responsabilidade.'],
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-mark ${light ? 'brand-mark-light' : ''}`} aria-hidden="true">
      <i /><b /><em />
    </span>
  );
}

function SectionLabel({ number, children, light = false }: { number: string; children: string; light?: boolean }) {
  return (
    <p className={`section-label ${light ? 'section-label-light' : ''}`}>
      <span>{number}</span>{children}
    </p>
  );
}

function Swatch({ item, onCopy }: { item: PaletteItem; onCopy: (hex: string) => void }) {
  return (
    <article className={`swatch-card swatch-${item.className}`}>
      <div className="swatch-surface" />
      <div className="swatch-copy">
        <span className="swatch-role">{item.role}</span>
        <h3>{item.name}</h3>
        <p>{item.usage}</p>
        <button type="button" onClick={() => onCopy(item.hex)} aria-label={`Copiar ${item.name} ${item.hex}`}>
          <code>{item.hex}</code><span>Copiar</span>
        </button>
      </div>
    </article>
  );
}

function ManualCeurs() {
  const [activeSection, setActiveSection] = useState('essencia');
  const [contrastMode, setContrastMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const copyHex = (hex: string) => {
    if (!navigator.clipboard?.writeText) {
      setToast(`Valor da cor: ${hex}`);
      return;
    }
    navigator.clipboard.writeText(hex).then(
      () => setToast(`${hex} copiado para a área de transferência`),
      () => setToast(`Valor da cor: ${hex}`),
    );
  };

  return (
    <div className={`manual-app ${contrastMode ? 'high-contrast' : ''}`}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <aside className={`manual-sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação do manual">
        <a className="back-to-site" href="/">
          <span aria-hidden>←</span> Voltar ao site
        </a>
        <div className="sidebar-top">
          <a className="manual-brand" href="#topo" onClick={(event) => { event.preventDefault(); navigate('topo'); }}>
            <BrandMark />
            <span><strong>CEURS - Escolas</strong><small>Manual visual</small></span>
          </a>
          <button className="sidebar-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button>
        </div>
        <div className="sidebar-rule" />
        <p className="sidebar-kicker">Sistema de identidade</p>
        <nav className="section-nav">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
              aria-current={activeSection === section.id ? 'page' : undefined}
              onClick={(event) => { event.preventDefault(); navigate(section.id); }}
            >
              <span>{section.number}</span>{section.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <p>Versão 1.0<br />Outubro · 2026</p>
          <button type="button" className="print-button" onClick={() => window.print()}><span>↗</span> Imprimir manual</button>
        </div>
      </aside>

      <main id="conteudo" className="manual-main">
        <header className="manual-header" id="topo">
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir navegação">☰</button>
          <div className="header-meta"><span className="status-dot" /> Identidade visual · CEURS - Escolas</div>
          <div className="header-actions">
            <button type="button" className="contrast-button" onClick={() => setContrastMode((value) => !value)} aria-pressed={contrastMode}>
              <span>{contrastMode ? 'Modo padrão' : 'Alto contraste'}</span><b>◐</b>
            </button>
            <button type="button" className="header-print" onClick={() => window.print()}>Imprimir <span>↗</span></button>
          </div>
        </header>

        <section className="manual-hero">
          <div className="hero-copy-block">
            <SectionLabel number="00 · DIREÇÃO" light>Manual de identidade visual</SectionLabel>
            <h1>Estudar o território.<br /><em>Ativar futuros.</em></h1>
            <p className="hero-summary">Um sistema visual para tornar conhecimento urbano e regional mais claro, conectado e acionável — da pesquisa à experiência de aprendizagem.</p>
            <div className="hero-meta-row"><span>CEURS · Estudos urbanos e regionais para a sustentabilidade</span><span>v1.0 / 2026</span></div>
          </div>
          <div className="hero-art" aria-label="Grafismo de fluxo circular da CEURS">
            <img src={texturaAprendizagem} alt="Fluxo circular aberto com nós de conexão" />
            <span className="hero-art-label">fluxo / território / rede</span>
          </div>
        </section>

        <section className="intro-panel" id="essencia">
          <div className="section-grid">
            <div>
              <SectionLabel number="01">Essência</SectionLabel>
              <h2>Uma marca que começa pela <em>pergunta certa.</em></h2>
            </div>
            <div className="section-lead">
              <p>CEURS - Escolas é uma plataforma de estudos, educação e articulação. Sua identidade representa mais que um lugar: representa o movimento entre observar, compreender e transformar.</p>
              <p>O sistema visual combina rigor institucional com uma energia acolhedora. A forma aberta sugere processo; os nós tornam visíveis as relações; a cor conduz o olhar sem simplificar a complexidade.</p>
            </div>
          </div>
          <div className="essence-quote"><span className="quote-mark">“</span><p>Ler o território é o primeiro gesto de transformação.</p><span className="quote-line" /></div>
          <div className="principle-grid">
            {principles.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="symbol-section" id="simbolo">
          <div className="section-grid section-grid-light">
            <div>
              <SectionLabel number="02" light>Símbolo</SectionLabel>
              <h2>Os pontos conectados são <em>campos de possibilidades.</em></h2>
            </div>
            <div className="section-lead light-copy"><p>O símbolo parte de uma circunferência fluida e incompleta. Ele evita a ideia de sistema fechado e abre espaço para diferentes contextos, disciplinas e comunidades.</p><p>Os nós não são ornamentos soltos: são pontos de evidência, pessoas, escolas, dados e decisões que se conectam ao fluxo principal.</p></div>
          </div>
          <div className="symbol-board">
            <div className="symbol-note note-a"><b>01</b><span>abertura<br />para o diálogo</span></div>
            <div className="symbol-note note-b"><b>02</b><span>movimento<br />e continuidade</span></div>
            <div className="symbol-note note-c"><b>03</b><span>nós de<br />conexão</span></div>
            <img src={texturaRede} alt="Grafismo do C aberto com fluxos e nós" />
          </div>
          <div className="symbol-rules"><div><span>Construção</span><p>Arco aberto + nós destacados + transição cromática.</p></div><div><span>Personalidade</span><p>Sistêmica, acessível e mobilizadora.</p></div><div><span>Uso</span><p>O grafismo apoia; o logotipo sempre preserva protagonismo.</p></div></div>
        </section>

        <section className="color-section" id="cores">
          <div className="section-grid">
            <div><SectionLabel number="03">Cores</SectionLabel><h2>Cor que organiza a <em>experiência.</em></h2></div>
            <div className="section-lead"><p>A paleta foi construída para dar clareza a uma jornada: Deep Navy cria confiança, Teal conecta, Orange pede ação, Amber desperta descoberta e Soft White dá espaço para respirar.</p><p>Clique em qualquer valor HEX para copiá-lo. Em interface, cor é comportamento: cada matiz tem uma tarefa antes de ter uma aparência.</p></div>
          </div>
          <div className="palette-board">{palette.map((item) => <Swatch key={item.hex} item={item} onCopy={copyHex} />)}</div>
          <div className="color-journey"><div><span>Assunto</span><b>Deep Navy</b><small>credibilidade</small></div><i>→</i><div><span>Contexto</span><b>Active Teal</b><small>conexão</small></div><i>→</i><div><span>Ação</span><b>Vibrant Orange</b><small>energia</small></div><i>→</i><div><span>Confirmação</span><b>Warm Amber</b><small>descoberta</small></div></div>
        </section>

        <section className="typography-section" id="tipografia">
          <div className="section-grid section-grid-light">
            <div><SectionLabel number="04" light>Tipografia</SectionLabel>
              <h2>Uma voz visual <em>direta e humana.</em></h2>
            </div>
            <div className="section-lead light-copy">
              <p>Manrope é a família principal: tem geometria contemporânea, boa leitura em telas e um desenho que equilibra a precisão técnica do estudo com a proximidade da educação.</p>
              <p>Use peso e escala para construir hierarquia. Não dependa apenas da cor para diferenciar níveis de informação.</p>
            </div>
          </div>
          <div className="type-specimen">
            <div className="type-meta">
              <span>MANROPE · DISPLAY 800</span>
              <span>MANROPE · BODY 400 / 500</span>
            </div>
            <div className="type-display">Território em<br /><em>movimento.</em>
            </div>
            <div className="type-body">Estudar o território é conectar repertórios, pessoas e possibilidades. A linguagem CEURS transforma complexidade em caminhos que podem ser compartilhados.</div><div className="type-scale"><div><b>H1 · 72 / 0.94</b><strong>Ativar futuros.</strong></div><div><b>H2 · 42 / 1.02</b><strong>Uma pergunta certa.</strong></div><div><b>BODY · 16 / 1.55</b><p>Clareza para ler, decidir e agir.</p></div></div></div>
        </section>

        <section className="graphic-section" id="grafismos">
          <div className="section-grid"><div><SectionLabel number="05">Grafismos</SectionLabel><h2>O sistema cresce em <em>camadas.</em></h2></div><div className="section-lead"><p>Texturas e grafismos levam a identidade para além do logotipo. Eles podem ocupar uma tela inteira, uma faixa, um canto ou apenas sugerir uma atmosfera — sempre com respiro suficiente para a mensagem continuar legível.</p></div></div>
          <div className="graphic-grid">
            <article className="graphic-card graphic-ceurs">
              <div className="graphic-image">
                <img src={texturaRede} alt="Textura CEURS com fluxos e nós" />
              </div>
              <div className="graphic-caption"><span>CEURS · textura de rede</span>
                <p>Para relatórios, capas, sinalização e fundos institucionais. Use entre 8% e 18% de opacidade em interfaces.</p>
              </div>
            </article>
            <article className="graphic-card graphic-school">
              <div className="graphic-image">
                <img src={texturaAprendizagem} alt="Grafismo CEURS–Escolas com rede de aprendizagem" />
              </div>
              <div className="graphic-caption">
                <span>CEURS–Escolas · grafismo de aprendizagem</span>
                <p>Para Moodle, cursos, certificados e materiais de formação. A rede educacional é uma extensão, não um novo logotipo.</p>
              </div>
            </article>
          </div>
          <div className="texture-strip" aria-label="Exemplo de textura em aplicação">
            <div className="texture-strip-copy">
              <span>Regra de composição</span>
              <strong>Textura dá contexto.<br /><em>Não compete com a leitura.</em></strong>
              <small>Prefira fundos Soft White ou Deep Navy. Evite colocar a trama atrás de textos longos sem reduzir a opacidade.</small>
            </div>
          </div>
        </section>

        <section className="applications-section" id="aplicacoes">
          <div className="section-grid section-grid-light">
            <div><SectionLabel number="06" light>Aplicações</SectionLabel>
              <h2>Do sistema para o <em>dia a dia.</em></h2>
            </div>
            <div className="section-lead light-copy">
              <p>Uma identidade consistente não significa repetir a mesma composição. Significa reconhecer as mesmas regras em contextos diferentes.</p>
            </div>
          </div>
          <div className="application-grid">
            <article className="application-card moodle-card"><span className="application-kicker">Moodle · cabeçalho de curso</span>
              <div className="moodle-pattern" />
              <div className="moodle-content">
                <span className="mini-chip">TRILHA 01</span>
                <h3>Território e transição</h3><p>Observar · conectar · agir</p>
                <button type="button">Continuar módulo <b>→</b></button>
              </div>
            </article>

              <article className="application-card report-card"><span className="application-kicker">Relatório · capa editorial</span>
              <div className="report-grid">
                  <div className="report-title"><BrandMark light />
                    <h3>Atlas de<br /><em>possibilidades.</em></h3>
                    <small>CEURS · 2026</small>
                  </div>
                  <img src={texturaAprendizagem} alt="Grafismo de fluxo aplicado em capa" />
                </div></article>
                <article className="application-card social-card"><span className="application-kicker">Social · chamada de ação</span>
                <div className="social-block">
                  <span>REDE / TERRITÓRIO</span><strong>Conhecimento<br /><em>vira movimento.</em></strong><small>ceurs.org.br</small>
                </div></article></div>
          <div className="do-dont">
              <div><span className="do-icon">✓</span>
                <h3>Faça</h3><p>Combine um fundo estruturante, um ponto de ação e uma textura com baixa opacidade. Preserve o respiro.</p>
              </div>
              <div><span className="dont-icon">×</span>
                <h3>Evite</h3><p>Usar todas as cores com a mesma intensidade, distorcer o símbolo ou aplicar textura por cima de blocos de texto.</p>
              </div>
            </div>
        </section>

        <section className="accessibility-section" id="acessibilidade">
          <div className="section-grid"><div><SectionLabel number="07">Acessibilidade</SectionLabel><h2>Clareza também é <em>cuidado.</em></h2></div><div className="section-lead"><p>A identidade deve criar reconhecimento sem criar barreiras. Contraste, foco, escala e movimento são parte do sistema — não ajustes posteriores.</p></div></div>
          <div className="access-grid"><article><span>01</span><h3>Contraste</h3><p>Use Deep Navy ou Soft White como base para textos longos. Orange e Amber funcionam melhor como ação e destaque.</p><div className="contrast-sample"><b>Texto legível</b><small>AA · 7.8:1</small></div></article><article><span>02</span><h3>Hierarquia</h3><p>Faça títulos, labels e corpo distinguíveis por escala e peso. Nunca use apenas cor para comunicar estado.</p><div className="hierarchy-sample"><strong>Título</strong><b>Label de contexto</b><small>Texto de apoio com ritmo confortável.</small></div></article><article><span>03</span><h3>Interação</h3><p>Todo controle tem foco visível, alvo confortável e feedback textual. A navegação deve funcionar sem mouse.</p><div className="interaction-sample"><button type="button">Foco visível <span>→</span></button></div></article></div>
          <div className="closing-panel"><BrandMark light /><p>CEURS · sistema visual</p><h3>Conectar conhecimento para ativar futuros possíveis.</h3><button type="button" onClick={() => window.print()}>Imprimir manual <span>↗</span></button></div>
        </section>

        <footer className="manual-footer"><span>CEURS - Escolas · Manual de identidade visual · 2026</span><span>Estudos urbanos e regionais para a sustentabilidade</span></footer>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

export default ManualCeurs;