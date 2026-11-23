import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso · CEURS–Escolas" },
      {
        name: "description",
        content:
          "Termos e condições de uso da plataforma CEURS–Escolas.",
      },
      { property: "og:title", content: "Termos de Uso · CEURS–Escolas" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
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
            Termos de Uso
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: 12 de outubro de 2026
          </p>
        </header>

        <div className="mt-10 space-y-8 text-ink">
          <section>
            <h2 className="text-xl font-extrabold text-navy">1. Aceitação</h2>
            <p className="mt-3 text-muted-foreground">
              Ao acessar ou utilizar a plataforma CEURS–Escolas, você concorda integralmente
              com estes Termos de Uso e com a nossa Política de Privacidade. Caso não
              concorde, não utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">2. Descrição do serviço</h2>
            <p className="mt-3 text-muted-foreground">
              A plataforma CEURS–Escolas é um ambiente digital de aprendizagem e
              coprodução que integra quatro módulos: AWA2030, CCA2030, SMIS-Escolas e
              AWA2030 (Comunidade de Prática). O acesso é concedido por convite, após análise de elegibilidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">3. Conta do usuário</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Você é responsável por manter a confidencialidade da sua senha.</li>
              <li>Não compartilhe sua conta com terceiros.</li>
              <li>Notifique imediatamente qualquer uso não autorizado.</li>
              <li>
                Administradores devem habilitar autenticação multifator (MFA)
                obrigatoriamente.
              </li>
              <li>
                Contas inativas por mais de 12 meses podem ser suspensas, mediante aviso
                prévio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">4. Uso aceitável</h2>
            <p className="mt-3 text-muted-foreground">Você concorda em não:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Violar leis, regulamentos ou direitos de terceiros.</li>
              <li>Publicar conteúdo ilegal, ofensivo, difamatório ou discriminatório.</li>
              <li>Tentar acessar áreas restritas sem autorização.</li>
              <li>Realizar engenharia reversa, scraping ou ataques à plataforma.</li>
              <li>Usar a plataforma para fins comerciais não autorizados.</li>
              <li>Compartilhar materiais didáticos fora dos canais oficiais do programa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">5. Propriedade intelectual</h2>
            <p className="mt-3 text-muted-foreground">
              Todo o conteúdo da plataforma (textos, vídeos, materiais didáticos, marca,
              layout) é de propriedade das instituições realizadoras ou de seus licenciantes
              e está protegido por direitos autorais. O uso é permitido apenas para fins
              educacionais, no âmbito do programa, sendo vedada a reprodução comercial sem
              autorização expressa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">6. Conteúdo do usuário</h2>
            <p className="mt-3 text-muted-foreground">
              Iniciativas, evidências e materiais que você registrar no SMIS-Escolas
              permanecem de sua autoria. Ao publicá-los, você concede às instituições
              realizadoras licença não exclusiva para uso em atividades do programa,
              sempre com atribuição de autoria.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">7. Suspensão e encerramento</h2>
            <p className="mt-3 text-muted-foreground">
              Podemos suspender ou encerrar sua conta, a qualquer momento e sem aviso
              prévio, em caso de violação destes Termos, uso indevido da plataforma ou
              determinação legal. Você pode solicitar o encerramento da sua conta pelo
              e-mail{" "}
              <a
                href="mailto:suporte@ceurs.org.br"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                suporte@ceurs.org.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">8. Limitação de responsabilidade</h2>
            <p className="mt-3 text-muted-foreground">
              A plataforma é fornecida "como está". As instituições realizadoras não se
              responsabilizam por indisponibilidades temporárias, falhas de conexão do
              usuário ou uso indevido das credenciais de acesso. O serviço pode passar por
              manutenções programadas, comunicadas com antecedência.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">9. Alterações</h2>
            <p className="mt-3 text-muted-foreground">
              Estes Termos podem ser atualizados periodicamente. A versão vigente estará
              sempre disponível nesta página, com a data da última atualização. O uso
              contínuo da plataforma após alterações implica concordância com os novos
              termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-navy">10. Foro</h2>
            <p className="mt-3 text-muted-foreground">
              Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca
              de Florianópolis/SC para dirimir eventuais controvérsias, com renúncia a
              qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <div className="rounded-2xl border border-line bg-soft p-6 text-sm">
            <p className="text-muted-foreground">
              Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail{" "}
              <a
                href="mailto:suporte@ceurs.org.br"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                suporte@ceurs.org.br
              </a>
              . Para questões sobre dados pessoais, consulte nossa{" "}
              <Link
                to="/privacidade"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                Política de Privacidade
              </Link>{" "}
              e a página de{" "}
              <Link
                to="/lgpd"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                LGPD
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}