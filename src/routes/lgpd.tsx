import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileCheck2, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";

export const Route = createFileRoute("/lgpd")({
  head: () => ({
    meta: [
      { title: "LGPD · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Conformidade do CEURS–Escolas com a Lei Geral de Proteção de Dados (LGPD).",
      },
      { property: "og:title", content: "LGPD · CEURS–Escolas" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LgpdPage,
});

const pilares = [
  {
    icon: ShieldCheck,
    titulo: "Base legal definida",
    desc: "Cada tratamento de dado tem base legal explícita (execução de contrato, consentimento, obrigação legal ou legítimo interesse).",
  },
  {
    icon: Lock,
    titulo: "Segurança por padrão",
    desc: "TLS 1.2+, MFA para administradores, segregação por projeto, backups testados e monitoramento contínuo.",
  },
  {
    icon: UserCheck,
    titulo: "Direitos do titular",
    desc: "Canais claros para acesso, correção, portabilidade, eliminação e revogação de consentimento.",
  },
  {
    icon: FileCheck2,
    titulo: "Governança e registro",
    desc: "Registro das operações de tratamento (ROPA), DPIA quando aplicável e revisão periódica.",
  },
];

const perguntas = [
  {
    q: "Quais dados o CEURS–Escolas coleta?",
    a: "Dados de cadastro (nome, e-mail, instituição, cargo), de navegação (IP, dispositivo), de aprendizagem (matrículas, progresso) e de iniciativas registradas no SMIS-Escolas.",
  },
  {
    q: "Com quem os dados são compartilhados?",
    a: "Apenas com as instituições realizadoras do programa (UFSC, MCTI, Parlamento, USP) e prestadores de serviço estritamente necessários, sempre sob contrato e com cláusulas de proteção de dados.",
  },
  {
    q: "Os dados saem do Brasil?",
    a: "Parte da infraestrutura (autenticação, backup) pode usar serviços em nuvem no exterior. Nesses casos, adotamos salvaguardas contratuais e técnicas, conforme Resoluções CD/ANPD nº 15/2024 e nº 19/2024.",
  },
  {
    q: "Como exerço meus direitos?",
    a: "Envie um e-mail para dpo@ceurs.org.br com sua solicitação. Responderemos em até 15 dias, conforme prazo recomendado pela ANPD.",
  },
  {
    q: "Por quanto tempo os dados ficam armazenados?",
    a: "Pelo tempo necessário ao cumprimento das finalidades do programa e das obrigações legais. Após esse período, são anonimizados ou eliminados de forma segura.",
  },
  {
    q: "Como reportar um incidente de segurança?",
    a: "Envie um e-mail para dpo@ceurs.org.br com o assunto 'Incidente LGPD'. Nossa equipe responderá em até 48 horas.",
  },
];

function LgpdPage() {
  return (
    <SiteShell>
      <article className="container-page py-12 md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar à página inicial
        </Link>

        <header className="max-w-3xl">
          <p className="eyebrow text-teal">Conformidade legal</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            LGPD no CEURS–Escolas
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Como aplicamos a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) em toda a
            plataforma, da coleta ao descarte.
          </p>
        </header>

        {/* Pilares */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {pilares.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.titulo}
                className="rounded-2xl border border-line bg-card p-6 shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-5 text-lg font-extrabold text-navy">{p.titulo}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            );
          })}
        </ul>

        {/* Perguntas frequentes */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-navy">Perguntas frequentes</h2>
          <p className="mt-2 text-muted-foreground">
            Respostas rápidas sobre proteção de dados no programa.
          </p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {perguntas.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                  {item.q}
                  <span
                    aria-hidden
                    className="text-teal transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </dl>
        </section>

        {/* Contato DPO */}
        <aside className="mt-16 rounded-2xl bg-navy p-8 text-secondary-foreground md:p-12">
          <p className="eyebrow text-amber">Encarregado de Proteção de Dados</p>
          <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
            Fale com nosso DPO
          </h2>
          <p className="mt-3 max-w-lg text-sky">
            Para exercer seus direitos, reportar incidentes ou tirar dúvidas sobre o
            tratamento dos seus dados pessoais, entre em contato.
          </p>
          <a
            href="mailto:dpo@ceurs.org.br"
            className="mt-6 inline-flex items-center gap-2 font-bold text-amber underline-offset-4 hover:underline"
          >
            dpo@ceurs.org.br →
          </a>
        </aside>

        <div className="mt-10 rounded-2xl border border-line bg-soft p-6 text-sm">
          <p className="text-muted-foreground">
            Para detalhes completos sobre coleta, uso, compartilhamento e retenção de dados,
            consulte nossa{" "}
            <Link
              to="/privacidade"
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </article>
    </SiteShell>
  );
}