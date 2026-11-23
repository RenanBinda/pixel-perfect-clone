import { useState } from 'react';
import { Wordmark } from './BrandMark';
import './palette-tests.css';

type ColorToken = { role: string; hex: string; rgb: string; use: string };

const proposal: ColorToken[] = [
  { role: 'Estruturante', hex: '#3B2854', rgb: '59 · 40 · 84', use: 'Navegação, cabeçalhos, rodapés e menus laterais.' },
  { role: 'Apoio', hex: '#4A6B82', rgb: '74 · 107 · 130', use: 'Ícones secundários, abas inativas, bordas e gráficos.' },
  { role: 'Destaque', hex: '#D85838', rgb: '216 · 88 · 56', use: 'Somente ação principal e progresso; texto branco.' },
  { role: 'Fundo', hex: '#F8F7FA', rgb: '248 · 247 · 250', use: 'Fundo de conteúdo no lugar do branco puro.' },
  { role: 'Texto', hex: '#221D29', rgb: '34 · 29 · 41', use: 'Textos longos com legibilidade máxima.' },
];

function ColorTokenCard({ color }: { color: ColorToken }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1300);
    } catch {
      setCopied(false);
    }
  };

  return <button className="color-token" type="button" onClick={copy} aria-label={`Copiar HEX ${color.hex}`}>
    <span className="color-token-swatch" style={{ backgroundColor: color.hex }} />
    <span className="color-token-title">{color.role}</span>
    <span className="color-token-use">{color.use}</span>
    <span className="color-token-hex">{copied ? 'Copiado' : color.hex}</span>
    <span className="color-token-rgb">RGB {color.rgb}</span>
  </button>;
}

export function ColorApplications() {
  return <div className="palette-applications">
    <div className="palette-applications-heading">
      <span className="eyebrow">APLICAÇÕES DE TESTE · PALETA REFINADA</span>
      <h3>Uma paleta, peças que conversam.</h3>
      <p>Ensaios estáticos para avaliar contraste e hierarquia em tela e papel. A paleta fica mais suave nas superfícies; azul e âmbar entram como acentos distintos, não como concorrentes.</p>
    </div>

    <div className="palette-application-grid">
      <article className="palette-application-card palette-application-ava">
        <div className="application-card-heading"><span>01 / AMBIENTE VIRTUAL DE APRENDIZAGEM</span><span>DESKTOP · ESTUDO</span></div>
        <div className="ava-window">
          <header className="ava-header"><Wordmark size={27} mono /><span className="ava-header-separator" /><span className="ava-header-label">AMBIENTE DE APRENDIZAGEM</span><span className="ava-avatar">MA</span></header>
          <div className="ava-body">
            <nav className="ava-nav" aria-label="Navegação de exemplo do ambiente de aprendizagem"><span className="ava-nav-label">ESPAÇO DO ESTUDANTE</span><span className="ava-nav-item ava-nav-active">Visão geral</span><span className="ava-nav-item">Minhas trilhas</span><span className="ava-nav-item">Atividades</span><span className="ava-nav-item">Biblioteca</span></nav>
            <div className="ava-content">
              <span className="ava-kicker">SUA APRENDIZAGEM EM PERCURSO</span>
              <h4>Olá, Marina.</h4>
              <div className="ava-course-card">
                <span className="ava-course-tag">TRILHA RECOMENDADA</span>
                <h5>Práticas que conectam<br />saberes e escola</h5>
                <div className="ava-progress-label"><span>Progresso da trilha</span><b>65%</b></div>
                <div className="ava-progress-track"><span /></div>
                <div className="ava-progress-caption"><span>4 de 6 módulos concluídos</span><span>EM ANDAMENTO</span></div>
                <span className="ava-action">Continuar trilha <span aria-hidden="true">→</span></span>
              </div>
              <div className="ava-next-step"><span className="ava-next-dot" /><span>Próxima atividade</span><b>Mapa de relações</b></div>
            </div>
          </div>
        </div>
        <p className="palette-application-note">Estrutura organiza a navegação; Apoio agrupa o curso; Ação e Progresso aparecem pontualmente e também são nomeados.</p>
      </article>

      <article className="palette-application-card palette-application-banner-card">
        <div className="application-card-heading"><span>02 / BANNER DE FORMAÇÃO</span><span>HORIZONTAL · 16:9</span></div>
        <div className="palette-banner">
          <div className="palette-banner-copy">
            <span className="palette-banner-eyebrow">CEURS-ESCOLAS · FORMAÇÃO</span>
            <h4>Aprender abre<br />novos caminhos.</h4>
            <p>Um convite para explorar novas práticas e compartilhar saberes.</p>
            <span className="palette-banner-cta">Explorar trilhas <span aria-hidden="true">↗</span></span>
          </div>
          <div className="palette-banner-art" aria-hidden="true"><span className="banner-orbit banner-orbit-a" /><span className="banner-orbit banner-orbit-b" /><span className="banner-signal banner-signal-a" /><span className="banner-signal banner-signal-b" /><span className="banner-number">01</span></div>
        </div>
        <p className="palette-application-note">Estrutura sustenta o campo escuro; texto claro mantém leitura, e o CTA azul recebe o único destaque de ação.</p>
      </article>

      <article className="palette-application-card palette-application-stationery-card">
        <div className="application-card-heading"><span>03 / PAPELARIA BÁSICA</span><span>TIMBRADO A4 · CARTÃO · ENVELOPE</span></div>
        <div className="stationery-mockups">
          <article className="stationery-piece stationery-letterhead-piece">
            <div className="stationery-piece-heading"><span>01 · PAPEL TIMBRADO</span><small>A4 · ESTUDO</small></div>
            <div className="stationery-sheet">
              <div className="stationery-sheet-top"><Wordmark size={34} mono markColor="#312E56" /><span className="stationery-edition">CEURS-ESCOLAS<br />FORMAÇÃO EM REDE</span></div>
              <div className="stationery-rule"><span /></div>
              <span className="stationery-kicker">COMUNICADO · 02 / 2026</span>
              <h4>À comunidade escolar</h4>
              <p>O CEURS-Escolas convida educadores e equipes a compartilhar experiências e construir novas práticas de aprendizagem.</p>
              <p>Use este espaço para comunicados, orientações e correspondência institucional. A leitura permanece confortável sobre o papel claro, com acentos apenas nos títulos e divisórias.</p>
              <div className="stationery-signature"><span>Atenciosamente,</span><b>Equipe CEURS-Escolas</b></div>
              <div className="stationery-footer"><span>FORMAÇÃO · EDUCAÇÃO · TROCA</span><span>ceurs-escolas · estudo</span></div>
            </div>
          </article>

          <div className="stationery-secondary">
            <article className="stationery-piece">
              <div className="stationery-piece-heading"><span>02 · CARTÃO DE VISITA</span><small>FRENTE + VERSO · ESTUDO</small></div>
              <div className="stationery-card-pair">
                <div className="stationery-business-card stationery-business-card-front"><span className="business-card-chip" /><Wordmark size={38} mono inverse markColor="#FBF8F2" /><span className="business-card-rule" /><span className="business-card-caption">EDUCAÇÃO · FORMAÇÃO · TROCA</span></div>
                <div className="stationery-business-card stationery-business-card-back"><span className="business-card-back-label">CEURS-ESCOLAS</span><strong>Nome · função</strong><span>email@instituicao.edu.br</span><span>(00) 0000-0000</span><span className="business-card-back-footer">DADOS DE CONTATO · EXEMPLO</span></div>
              </div>
            </article>

            <article className="stationery-piece stationery-envelope-piece">
              <div className="stationery-piece-heading"><span>03 · ENVELOPE</span><small>FORMATO HORIZONTAL · ESTUDO</small></div>
              <div className="stationery-envelope">
                <div className="envelope-top"><Wordmark size={29} mono markColor="#312E56" /><span>CEURS-ESCOLAS</span></div>
                <div className="envelope-address"><span>À</span><b>Instituição destinatária</b><small>Endereço institucional · cidade / UF</small></div>
                <span className="envelope-seal" aria-hidden="true" />
                <span className="envelope-rule" aria-hidden="true" />
              </div>
            </article>
          </div>
          <div className="stationery-palette-strip" aria-label="Faixa com as cinco cores da proposta aplicada"><span /><span /><span /><span /><span /><small>ESTRUTURA · PROGRESSO · AÇÃO · APOIO · RESPIRO</small></div>
        </div>
        <p className="palette-application-note">A4 com área ampla de escrita; cartão com frente institucional e verso de contato; envelope coordenado. As superfícies claras reduzem a massa de tinta. Mockups conceituais — ajustar margens, sangria e dados reais antes de imprimir.</p>
      </article>
    </div>
  </div>;
}

export function MiniColorManual({ onEnter }: { onEnter: () => void }) {
  return <section id="manual-cores" className="section mini-color-manual" onMouseEnter={onEnter}>
    <div className="section-heading">
      <span className="eyebrow">10 / MINI MANUAL CROMÁTICO</span>
      <h2>Cada cor tem um papel.</h2>
      <p>Paleta oficial: Roxo Índigo estrutura, Azul Ardósia apoia, Coral Terracota chama para a ação, Off-White Areia dá respiro e Grafite Violáceo garante a leitura.</p>
    </div>

    <div className="color-token-grid">{proposal.map((color) => <ColorTokenCard key={color.hex} color={color} />)}</div>

    <div className="color-ratio-module">
      <div className="color-ratio-copy"><span className="eyebrow">PROPORÇÃO SUGERIDA</span><h3>60 / 30 / 10</h3><p>Use Off-White como campo dominante, Roxo Índigo e Azul Ardósia para organizar e reserve o Coral Terracota a pequenos focos. A regra é uma partida para manter equilíbrio, não uma fórmula rígida.</p></div>
      <div className="color-ratio-visual">
        <div className="color-ratio-bar" role="img" aria-label="Proporção sugerida: 60 por cento Respiro, 30 por cento Estrutura e Apoio, 10 por cento Ação e Progresso"><span className="ratio-respiro">60%</span><span className="ratio-structure">30%</span><span className="ratio-accent">10%</span></div>
        <div className="color-ratio-legend"><span><i className="legend-respiro" /> Respiro · fundo</span><span><i className="legend-structure" /> Estrutura + Apoio</span><span><i className="legend-accent" /> Ação + Progresso</span></div>
        
      </div>
    </div>

    <div className="color-manual-grid">
      <article className="color-manual-card">
        <span className="eyebrow">CONTRASTE DIGITAL · WCAG</span>
        <h3>Combinações seguras</h3>
        <div className="contrast-row"><span>Grafite sobre Off-White</span><b>15,42:1</b><small>AAA</small></div>
        <div className="contrast-row"><span>Branco sobre Roxo Índigo</span><b>12,98:1</b><small>AAA</small></div>
        <div className="contrast-row"><span>Roxo Índigo sobre Off-White</span><b>12,16:1</b><small>AAA</small></div>
        <div className="contrast-row"><span>Azul Ardósia sobre Off-White</span><b>5,29:1</b><small>AA</small></div>
        <div className="contrast-row"><span>Branco sobre Coral Terracota</span><b>≈4,2:1</b><small>AA texto grande</small></div>
      </article>
      <article className="color-manual-card color-rules-card">
        <span className="eyebrow">REGRAS DE USO</span>
        <h3>Faça / evite</h3>
        <ul className="color-rules-list">
          <li><b>Faça</b><span>Use Roxo Índigo em navegação, cabeçalho e rodapé.</span></li>
          <li><b>Faça</b><span>Reserve o Coral para um único botão principal por tela.</span></li>
          <li><b>Faça</b><span>Use Off-White como fundo; branco puro só em cartões.</span></li>
          <li><b>Evite</b><span>Coral em grandes áreas ou em textos longos.</span></li>
          <li><b>Evite</b><span>Comunicar estado só pela cor.</span></li>
        </ul>
      </article>
    </div>

    <div className="color-production-note"><span className="production-note-mark">!</span><div><b>Para impressão</b><p>HEX/RGB orientam a visualização em tela, não definem CMYK final. Ajuste margens e sangria ao formato; converta com o perfil ICC da gráfica e aprove prova física de cor antes da produção.</p></div></div>
  </section>;
}
