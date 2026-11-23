import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Como o CEURS–Escolas coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade · CEURS–Escolas" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <SiteShell>
      <article className="container-page max-w-3xl py-12 md:py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-teal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar à página inicial
        </Link>

        <header>
          <p className="eyebrow text-teal">Documento legal</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: 12 de outubro de 2026
          </p>
        </header>

        <div className="prose-ceurs mt-10 space-y-8 text-ink">
          <section>
            <h2 className="text-xl font-extrabold text-navy">1. Quem somos</h2>
            <p className="mt-3 text-muted-foreground">
              O CEURS–Escolas é um programa de capacitação e estudos urbanos e regionais
              para sustentabilidade, realizado em parceria entre UFSC, MCTI, Parlamento e
              USP. Esta política descreve como tratamos seus dados pessoais na plataforma
              digital do programa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">2. Quais dados coletamos</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong className="text-navy">Dados de cadastro:</strong> nome, e-mail,
                instituição, cargo, vínculo com escola/equipe.
              </li>
              <li>
                <strong className="text-navy">Dados de navegação:</strong> endereço IP,
                tipo de dispositivo, páginas acessadas, data e hora.
              </li>
              <li>
                <strong className="text-navy">Dados de aprendizagem:</strong> matrículas,
                progresso nos cursos, atividades entregues, certificados.
              </li>
              <li>
                <strong className="text-navy">Dados de iniciativas:</strong> registros no
                SMIS-Escolas, evidências anexadas, classificações.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">3. Para que usamos</h2>
            <p className="mt-3 text-muted-foreground">
              Utilizamos seus dados para viabilizar o acesso à plataforma, personalizar a
              jornada de aprendizagem, emitir certificados, produzir estatísticas agregadas
              do programa e cumprir obrigações legais. Não vendemos nem compartilhamos seus
              dados com terceiros para fins comerciais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">4. Base legal (LGPD)</h2>
            <p className="mt-3 text-muted-foreground">
              O tratamento de dados no CEURS–Escolas fundamenta-se nas seguintes bases
              legais previstas na Lei nº 13.709/2018 (LGPD):
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong className="text-navy">Execução de contrato</strong> (art. 7º, V)
                — para viabilizar o acesso e a participação no programa.
              </li>
              <li>
                <strong className="text-navy">Consentimento</strong> (art. 7º, I) — para
                comunicações institucionais e uso de imagem.
              </li>
              <li>
                <strong className="text-navy">Cumprimento de obrigação legal</strong>{" "}
                (art. 7º, II) — para prestação de contas a órgãos financiadores.
              </li>
              <li>
                <strong className="text-navy">Legítimo interesse</strong> (art. 7º, IX) —
                para segurança da informação e prevenção a fraudes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">5. Transferência internacional</h2>
            <p className="mt-3 text-muted-foreground">
              Parte da infraestrutura do programa (autenticação, backup) pode utilizar
              serviços em nuvem com servidores fora do Brasil. Nesses casos, adotamos
              salvaguardas contratuais e técnicas para garantir nível adequado de proteção,
              conforme Resoluções CD/ANPD nº 15/2024 e nº 19/2024.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">6. Seus direitos</h2>
            <p className="mt-3 text-muted-foreground">
              Você pode, a qualquer momento, solicitar:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Confirmação da existência de tratamento</li>
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Portabilidade a outro fornecedor</li>
              <li>Eliminação dos dados tratados com consentimento</li>
              <li>Informação sobre compartilhamentos</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Solicitações podem ser feitas pelo e-mail{" "}
              <a
                href="mailto:dpo@ceurs.org.br"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                dpo@ceurs.org.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">7. Segurança</h2>
            <p className="mt-3 text-muted-foreground">
              Adotamos medidas técnicas e administrativas para proteger seus dados, incluindo
              criptografia em trânsito (TLS 1.2+), autenticação multifator para
              administradores, backups regulares, controle de acesso baseado em papéis e
              monitoramento contínuo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">8. Retenção</h2>
            <p className="mt-3 text-muted-foreground">
              Mantemos seus dados pelo tempo necessário ao cumprimento das finalidades
              descritas nesta política e das obrigações legais aplicáveis. Após esse
              período, os dados são anonimizados ou eliminados de forma segura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">9. Contato</h2>
            <p className="mt-3 text-muted-foreground">
              Encarregado de Proteção de Dados (DPO):
              <br />
              <a
                href="mailto:dpo@ceurs.org.br"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                dpo@ceurs.org.br
              </a>
            </p>
          </section>

          <div className="rounded-2xl border border-line bg-soft p-6 text-sm">
            <p className="text-muted-foreground">
              Esta política pode ser atualizada periodicamente. Recomendamos revisá-la
              sempre que acessar a plataforma. Em caso de dúvidas sobre seus direitos,{" "}
              <Link
                to="/lgpd"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                consulte nossa página de LGPD
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}