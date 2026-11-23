import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { ModuleLanding } from "@/components/modules/ModuleLanding";

export const Route = createFileRoute("/smis/")({
  head: () => ({
    meta: [
      { title: "SMIS-Escolas · CEURS–Escolas" },
      {
        name: "description",
        content:
          "SMIS-Escolas: registre, classifique e compartilhe iniciativas de sustentabilidade da sua escola com estrutura 5W2H, taxonomia e evidências.",
      },
      { property: "og:title", content: "SMIS-Escolas · CEURS–Escolas" },
      {
        property: "og:description",
        content:
          "Sistema de Mapeamento de Iniciativas de Sustentabilidade para escolas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SmisPage,
});

function SmisPage() {
  return (
    <ModuleLanding
      nome="SMIS-Escolas"
      codigo="SMIS · Sistema de Mapeamento"
      toInterno="/smis/painel"
      resumo="Registre as práticas de sustentabilidade da sua escola com estrutura padronizada, classificação por taxonomia e anexo de evidências. Cada iniciativa fica vinculada a um autor e a uma versão."
      descricao="O SMIS-Escolas é o instrumento pedagógico e de coprodução do CEURS–Escolas. Ele permite que educadores e equipes escolares transformem relatos em registros estruturados, com apoio de agentes IA-ABC e validação humana."
      icone={Map}
      corDestaque="text-teal"
      hrefExterno={undefined}
      ctaExterno={undefined}
      publico="Educadores, gestores escolares e equipes de coprodução"
      funcionalidades={[
        {
          titulo: "Estrutura 5W2H",
          descricao:
            "Cada iniciativa é organizada em What, Why, Who, Where, When, How e How much, garantindo descrição completa e comparável.",
        },
        {
          titulo: "Classificação por taxonomia e ODS",
          descricao:
            "As iniciativas são classificadas com a taxonomia de Kotzias e relacionadas aos Objetivos de Desenvolvimento Sustentável.",
        },
        {
          titulo: "Agentes IA-ABC",
          descricao:
            "Assistentes sugerem estruturações, classificações e conexões a partir do relato inicial, sempre com confirmação humana.",
        },
        {
          titulo: "Rascunho e versionamento",
          descricao:
            "Salve e retome rascunhos, mantenha histórico de alterações e preserve autoria e data de cada contribuição.",
        },
        {
          titulo: "Autoria individual ou de equipe",
          descricao:
            "Registre como pessoa física ou como equipe escolar, com papéis e permissões definidos por administradores.",
        },
        {
          titulo: "Busca e apresentação",
          descricao:
            "Encontre casos por tema, território ou escola. Compartilhe iniciativas na comunidade de prática.",
        },
      ]}
      passos={[
        {
          numero: "01",
          titulo: "Entrada",
          descricao:
            "Comece com um relato livre ou use o formulário guiado pelo agente IA-ABC.",
        },
        {
          numero: "02",
          titulo: "Estruturação",
          descricao:
            "A iniciativa é organizada em 5W2H, com evidências e contexto do território.",
        },
        {
          numero: "03",
          titulo: "Classificação",
          descricao:
            "Aplique taxonomia, vincule ODS e prepare a publicação na comunidade.",
        },
      ]}
    />
  );
}