import { createFileRoute } from "@tanstack/react-router";
import ManualCeurs from "@/components/manual/manual-ceurs";

export const Route = createFileRoute("/identidade")({
  head: () => ({
    meta: [
      { title: "Manual de identidade visual · CEURS" },
      {
        name: "description",
        content:
          "Manual de identidade visual do CEURS: essência, símbolo, cores, tipografia, grafismos e aplicações.",
      },
      { property: "og:title", content: "Manual de identidade visual · CEURS" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IdentidadePage,
});

function IdentidadePage() {
  return <ManualCeurs />;
}