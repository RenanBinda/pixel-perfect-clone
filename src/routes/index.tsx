import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { PersonasSection } from "@/components/landing/PersonasSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { ModulesSection } from "@/components/landing/ModulesSection";
import { JourneySection } from "@/components/landing/JourneySection";
import { Community } from "@/components/landing/Community";
import { FaqSection } from "@/components/landing/FaqSection";
import { homeContentQuery } from "@/lib/home-content-query";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeContentQuery),
  head: () => ({
    meta: [
      { title: "CEURS–Escolas · Sua escola pode transformar o território" },
      {
        name: "description",
        content:
          "Programa de formação, comunidade e mapeamento de práticas sustentáveis para escolas brasileiras. Curso gratuito com certificado da UFSC.",
      },
      { property: "og:title", content: "CEURS–Escolas · Sua escola pode transformar o território" },
      {
        property: "og:description",
        content: "Formação, comunidade e mapa de iniciativas sustentáveis de escolas brasileiras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/**
 * Página inicial em 7 blocos (ver /admin/jornadas):
 * Abertura · Escolha seu caminho · Prova · Serviços · Como funciona · Comunidade · Chamada final
 */
function LandingPage() {
  return (
    <SiteShell>
      <Hero />
      <TrustBar />
      <PersonasSection />
      <ProofSection />
      <ModulesSection />
      <JourneySection />
      <Community />
      <FaqSection />
      <FinalCTA />
    </SiteShell>
  );
}
