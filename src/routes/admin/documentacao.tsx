import { ETAPAS_EXECUCAO } from "@/lib/platform-reference";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { requireRole } from "@/lib/admin-access.functions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  BookOpen,
  Crown,
  Database,
  FileText,
  Globe,
  Lock,
  Shield,
  User,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/admin/documentacao")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    await requireRole(["admin", "master"], "/admin/documentacao");
  },
  head: () => ({
    meta: [
      { title: "Documentação · Admin CEURS–Escolas" },
      {
        name: "description",
        content:
          "Documentação técnica e conceitual da plataforma CEURS–Escolas.",
      },
      { property: "og:title", content: "Plano e documentação · CEURS–Escolas" },
      { property: "og:description", content: "Fundamentos, contratos e execução integrada do livro, protótipo e reuniões." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DocumentacaoPage,
});

/* ============================================================
   TIPOS
   ============================================================ */

type Bloco =
  | { tipo: "texto"; titulo?: string; paragrafo: string }
  | { tipo: "lista"; titulo?: string; itens: string[] }
  | { tipo: "code"; titulo?: string; codigo: string }
  | { tipo: "flow"; titulo?: string; fluxo: FluxoNode[] }
  | { tipo: "db"; titulo?: string; tabelas: TabelaDB[] }
  | { tipo: "perfis"; titulo?: string; perfis: PerfilAcesso[] };

type FluxoNode = {
  icone: "globe" | "lock" | "user" | "users" | "shield" | "crown" | "database" | "file";
  label: string;
  descricao?: string;
  cor: "navy" | "teal" | "orange" | "amber" | "soft";
  filhos?: FluxoNode[];
};

type TabelaDB = {
  nome: string;
  tipo: "auth" | "principal" | "planejada";
  campos: { nome: string; tipo: string; descricao?: string }[];
  relacoes?: string[];
};

type PerfilAcesso = {
  papel: "participante" | "curador" | "admin" | "master";
  icone: "user" | "file" | "shield" | "crown";
  cor: "soft" | "teal" | "navy" | "orange";
  pode: string[];
  naoPode: string[];
};

type Secao = {
  id: string;
  titulo: string;
  publico: string;
  blocos: Bloco[];
};

/* ============================================================
   DADOS
   ============================================================ */

const FLUXO_VISITANTE: FluxoNode[] = [{
  icone: "globe", label: "Portal público", cor: "soft", descricao: "Apresenta e encaminha; não substitui os módulos",
  filhos: [
    { icone: "file", label: "Institucional", descricao: "/ · /sobre · /identidade · /ajuda", cor: "teal" },
    { icone: "file", label: "Conteúdo", descricao: "/midia → /midia/$slug · /estatisticas → /estatisticas/$indicador", cor: "teal" },
    { icone: "database", label: "Vitrine", descricao: "/iniciativas → /smis/iniciativas/$id", cor: "amber" },
    { icone: "users", label: "Apresentações", descricao: "/curso · /smis · /awa · /comunidade · /cop redireciona a /awa", cor: "teal" },
    { icone: "lock", label: "Acesso", descricao: "/login · /signup · /solicitar-acesso", cor: "orange" },
    { icone: "file", label: "Proteção de dados", descricao: "/privacidade · /lgpd · /termos", cor: "soft" },
  ],
}];
const FLUXO_PARTICIPANTE: FluxoNode[] = [{
  icone: "user", label: "Áreas existentes de trabalho", cor: "teal", descricao: "Há interfaces demonstrativas; integração real ainda deve ser acordada",
  filhos: [
    { icone: "user", label: "Conta", descricao: "/conta", cor: "teal" },
    { icone: "database", label: "SMIS atual", descricao: "/smis/painel · /smis/credenciamento · /smis/iniciativas · /smis/iniciativas/nova", cor: "teal" },
    { icone: "file", label: "Curso atual", descricao: "/curso/trilhas → /curso/trilhas/$trilha → /curso/trilhas/$trilha/$modulo", cor: "teal" },
    { icone: "users", label: "AWA atual", descricao: "/awa/temas → /awa/temas/$tema · /awa/biblioteca", cor: "teal" },
  ],
}];
const FLUXO_ADMIN: FluxoNode[] = [{
  icone: "shield", label: "Administração existente", cor: "navy", descricao: "/admin · visibilidade conforme papel; proteção depende do serviço",
  filhos: [
    { icone: "file", label: "Operação", descricao: "/admin/usuarios · /admin/solicitacoes · /admin/conteudo · /admin/curadoria", cor: "navy" },
    { icone: "file", label: "Memória e experiência", descricao: "/admin/reunioes · /admin/documentacao · /admin/jornadas (Caminhos do usuário)", cor: "navy" },
    { icone: "file", label: "Identidade", descricao: "/admin/marca · /admin/design-system", cor: "navy" },
    { icone: "crown", label: "Master", descricao: "/admin/configuracoes", cor: "orange" },
  ],
}];
const TABELAS_DB: TabelaDB[] = [
  { nome: "landing_path_content", tipo: "principal", campos: [
    { nome: "profile", tipo: "text", descricao: "Perfil da página inicial" },
    { nome: "content", tipo: "jsonb", descricao: "Conteúdo validado compartilhado" },
    { nome: "revision", tipo: "integer", descricao: "Controle otimista de concorrência" },
    { nome: "updated_at", tipo: "timestamptz" },
  ] },
  { nome: "profiles / user_roles", tipo: "planejada", campos: [
    { nome: "user_id", tipo: "uuid", descricao: "Identidade acordada entre serviços; não migrar contas atuais implicitamente" },
    { nome: "role", tipo: "enum", descricao: "Papel de sistema verificado; SQL existente não prova implantação" },
  ] },
  { nome: "escolas / vinculos_escolares / convites", tipo: "planejada", campos: [
    { nome: "escola_id / codigo_inep", tipo: "uuid / text", descricao: "Identificação única, município, UF, fonte e ano" },
    { nome: "user_id / papel_local / status", tipo: "uuid / enum / enum", descricao: "Solicitado, em revisão, confirmado, revogado" },
    { nome: "confirmado_por / evidencia / revisao", tipo: "uuid / referência / integer", descricao: "Histórico verificável; convite armazena hash, expiração e aceite" },
  ] },
  { nome: "acoes / iniciativas / evidencias", tipo: "planejada", campos: [
    { nome: "escola_id / responsavel_id / acao_origem_id", tipo: "uuid" },
    { nome: "what / why / who / where / when / how / howMuch", tipo: "text", descricao: "Os sete campos 5W2H" },
    { nome: "estagio / status_publicacao / revisao", tipo: "enum / enum / integer", descricao: "Estágio da ação separado de curadoria e completude" },
    { nome: "fonte / autorizacao / localizacao", tipo: "referências", descricao: "URL, origem, consentimento; coordenadas opcionais com precisão declarada" },
  ] },
  { nome: "taxonomia / sugestoes_termos / iniciativa_classificacoes", tipo: "planejada", campos: [
    { nome: "termo_id / parent_id / versao", tipo: "uuid / uuid / integer" },
    { nome: "dimensoes / categorias / ods_metas", tipo: "relações N:N", descricao: "Categoria principal e secundárias; revisão de sugestões" },
  ] },
  { nome: "projetos / canvas / programas / programa_projetos", tipo: "planejada", campos: [
    { nome: "iniciativa_origem_id / projeto_id / programa_id", tipo: "uuid" },
    { nome: "tipo_canvas / campos / revisao", tipo: "enum / jsonb validado / integer", descricao: "Mínimo, Complementar, Programa; histórico de versões" },
    { nome: "indicadores / beneficios / governanca", tipo: "relações", descricao: "Resultados e benefícios com método e evidências" },
  ] },
  { nome: "casos / midias / auditoria / referencias_modulos", tipo: "planejada", campos: [
    { nome: "origem_id / fonte / direitos / status", tipo: "referências", descricao: "Caso real, candidato e exemplo didático separados" },
    { nome: "modulo / external_id / evento / ocorrido_em", tipo: "text / text / enum / timestamptz", descricao: "Referências a Moodle/AWA, não cópia de fóruns ou matrículas" },
  ] },
];
const SECOES: Secao[] = [
  { id: "fontes", titulo: "Fontes e decisões de convergência", publico: "Coordenação · Equipe", blocos: [
    { tipo: "texto", titulo: "Referência integrada · 24/11/2026", paragrafo: "Esta documentação consolida o livro Versão 4 (163 páginas), o protótipo index_8.html e a síntese da Reunião 3. É um plano de execução, não declaração de que as funcionalidades já operam. A coordenação deve homologar decisões conceituais e contratos antes da implementação dos serviços." },
    { tipo: "lista", titulo: "Rastreabilidade", itens: [
      "Livro: Escola como Agente Local de Sustentabilidade, Versão 4. Capítulo 4: coprodução (pp. 73–89); capítulo 5: IPP, categorias e instrumentos (pp. 95 em diante).",
      "Reunião 3: Reunião_3_ceurs.m4a, 2h 17min, compartilhada em 24/11/2026. A página Reuniões contém a síntese, não a transcrição integral nem ata homologada.",
      "Protótipo: index_8.html. Demonstra catálogo, taxonomia, SMIS/Canvas, curso, AWA, indicadores e agentes; sua amostra e simulações não são serviços ativos.",
    ] },
    { tipo: "lista", titulo: "Correções e pontos a homologar", itens: [
      "O livro adota cinco dimensões: Social, Ambiental, Econômica, Cultural e Institucional. O HTML mostra quatro: a execução deve incluir Cultural.",
      "CESM significa Composição, Ambiente, Estrutura e Mecanismos (livro, capítulo 4), não Comunidade–Escola–Sociedade–Município. A interpretação anterior foi corrigida.",
      "O Canvas Mínimo contém dez fatores (pp. 99–100), não apenas justificativa, objetivos, recursos e equipe. Os demais Canvas devem seguir suas fichas integrais.",
      "O livro recomenda completude 0–7 (p. 98), não 12 itens. A alteração do formulário atual fica na etapa 5.",
      "178.766 escolas, 119.244 com Ensino Fundamental e 30.257 com Ensino Médio são referências do HTML atribuídas ao Censo 2025, ainda a conferir no INEP. Etapas de ensino podem se sobrepor; não somar esses subconjuntos.",
      "Curso de 10h, certificação, governança federal e validade institucional dependem de aprovação e evidências oficiais; não divulgar como garantias automáticas.",
      "Comunidade por afinidade não exige direção escolar nem conclusão automática de curso; confirmar critérios de ingresso com AWA2030. Perfis sensíveis de escola exigem validação própria.",
    ] },
  ] },
  { id: "apresentacao", titulo: "Fundamentos e definições", publico: "Todos", blocos: [
    { tipo: "texto", titulo: "Escola como agente local de sustentabilidade", paragrafo: "O ponto de partida é a necessidade ou oportunidade do território. A plataforma torna visíveis ações, organiza seu registro, conecta aprendizagem e apoia relações entre escolas e parceiros. ODS complementam o diagnóstico; não o substituem." },
    { tipo: "lista", titulo: "Objetos que não devem ser confundidos", itens: [
      "Ação: prática existente, proposta ou identificada em fonte pública; descoberta não comprova autoria nem validação.",
      "Iniciativa: ação descrita no SMIS; pode começar incompleta. Publicação institucional exige responsabilidade e evidências confirmadas.",
      "Projeto: esforço temporário com problema, beneficiários, entregas, recursos, equipe, prazos e avaliação.",
      "Programa: coordena projetos relacionados para benefícios comuns e continuidade. Portfólio é o conjunto acompanhado pela escola, mesmo sem interdependência.",
      "Caso: documentação aprofundada e comparável de uma ação ou iniciativa; pode conter evidências e aprendizados.",
      "Comunidade de prática: pessoas por afinidade que trocam e coproduzem no AWA2030. Coprodução não é requisito para toda iniciativa.",
      "Jornada IPP é percurso metodológico opcional. Caminhos do usuário designa orientação por objetivo, não hierarquia de cargos escolares.",
    ] },
    { tipo: "lista", titulo: "Classificação do livro · p. 96", itens: [
      "Dimensões DLS: Social; Ambiental; Econômica; Cultural; Institucional.",
      "Categorias: Educação, ciência e conhecimento; Ambiente, clima e biodiversidade; Recursos e economia circular; Saúde, alimentação e bem-estar; Inclusão, direitos e solidariedade; Economia local, trabalho e inovação; Cultura, identidade e convivência; Cidadania, governança e participação.",
      "Uma categoria principal, categorias secundárias e múltiplas dimensões. ODS e metas são referências justificadas, não selo de impacto.",
    ] },
  ] },
  { id: "servicos", titulo: "Responsabilidades dos serviços", publico: "Coordenação · Desenvolvedores", blocos: [
    { tipo: "lista", titulo: "Regra de não-sombra · Reunião 3", itens: [
      "Landing Place: identidade visual, acolhimento por perfil, apresentação dos módulos, catálogo/vitrine, mídia e leituras agregadas autorizadas.",
      "SMIS / Python: registro e curadoria de iniciativas, validação institucional, 5W2H, Canvas, evidências e evolução IPP.",
      "CCA2030 / Moodle: inscrição, matrícula, conteúdo didático, progresso e certificação conforme regras pedagógicas aprovadas.",
      "AWA2030: comunidades, equipes, discussões, moderação e instrumentos de coprodução; recebe debate de termos propostos.",
      "Agentes: apoio e rascunhos supervisionados; nunca fonte de autoridade sobre identidade, vínculo ou publicação.",
      "As interfaces locais existentes permanecem até um plano de transição homologado. Não apagar telas nem replicar serviços externos nesta etapa documental.",
    ] },
    { tipo: "code", titulo: "Fluxo integrado proposto", codigo: `Pessoa → Landing Place → identifica objetivo
  ├─ conhecer / apoiar → catálogo, mídia e vitrine pública
  ├─ aprender → CCA2030 / Moodle → atividade de mapeamento no SMIS
  ├─ registrar → escola identificada → vínculo em revisão → responsável confirmado
  │    → SMIS: rascunho 5W2H → revisão institucional → publicação autorizada
  │    → seleção coletiva opcional → Project Canvas → Program Canvas
  └─ trocar / coproduzir → AWA2030 → comunidades, equipes e parceiros
Serviços retornam referências e estados autorizados → portal apresenta sem duplicar.` },
  ] },
  { id: "perfis", titulo: "Identidade, vínculos e autorização", publico: "Gestores · Desenvolvedores", blocos: [
    { tipo: "lista", titulo: "Três conceitos separados", itens: [
      "Persona de serviço: Diretor de escola; Líder/Responsável pela iniciativa; Comunidade Escolar; Visitante/Interessado. Personaliza linguagem e destinos, mas não concede acesso.",
      "Papel de sistema: participante, curador, admin ou Master único. Deve ser verificado pelo serviço; apenas Master pode nomear administradores, conforme regra do projeto.",
      "Papel local: direção ou responsável confirmado no SMIS, estudante no curso, membro/moderador no AWA. Cada módulo verifica seu escopo.",
      "Fluxo proposto: selecionar escola → solicitar vínculo → evidência/revisão → confirmação ou rejeição → convite de responsável → aceite → permissão local auditada.",
      "Escolher uma persona, informar um e-mail ou localizar notícia sobre alguém não comprova identidade. Convites não substituem revisão e devem expirar e ter uso único.",
      "O acesso atual de visitantes usa cliente de contas separado da base de conteúdo. Não migrar contas nem substituir sua sessão nesta etapa.",
      "Publicação dos Caminhos tem autorização independente: código administrativo verificado no servidor e cookie httpOnly curto, com revisão otimista. Guardas visuais não autorizam escrita.",
    ] },
  ] },
  { id: "rotas", titulo: "Rotas atuais e destinos planejados", publico: "Todos", blocos: [
    { tipo: "flow", titulo: "Portal público existente", fluxo: FLUXO_VISITANTE },
    { tipo: "flow", titulo: "Interfaces existentes dos módulos", fluxo: FLUXO_PARTICIPANTE },
    { tipo: "flow", titulo: "Administração", fluxo: FLUXO_ADMIN },
    { tipo: "texto", titulo: "Ainda não são rotas disponíveis", paragrafo: "/escolas, navegador de taxonomia e laboratório de agentes são entregas futuras. Só criar links de acesso quando suas páginas existirem. O detalhe público da iniciativa atualmente está em /smis/iniciativas/$id; não confundir com uma rota inexistente /iniciativas/$id." },
  ] },
  { id: "banco", titulo: "Dados atuais e modelo proposto", publico: "Desenvolvedores", blocos: [
    { tipo: "texto", titulo: "O que está confirmado", paragrafo: "Lovable Cloud mantém landing_path_content: leitura pública do conteúdo publicado; escrita direta pelo navegador negada. A publicação usa verificação administrativa no servidor. O catálogo nacional, vínculos, Canvas, programas e agentes não foram implantados por esta etapa. O cliente de contas é separado e a existência de SQL ou chamadas user_roles não comprova tabelas ativas naquele serviço." },
    { tipo: "db", titulo: "Entidades · agrupamentos conceituais, não migração aplicada", tabelas: TABELAS_DB },
    { tipo: "code", titulo: "Relações propostas", codigo: `Pessoa 1 ── N Vínculo N ── 1 Escola (INEP)
Escola 1 ── N Ação → Iniciativa 1 ── N Evidência
Iniciativa N ── N Termo / Dimensão / Categoria / ODS-meta
Iniciativa 1 ── N Projeto 1 ── N Versão de Canvas
Programa N ── N Projeto
Caso → Ação ou Iniciativa · Mídia → Caso/Escola/Evidência
Sugestão de termo → Debate AWA → Revisão → Termo versionado
Identidade → Referências locais Moodle / SMIS / AWA
Mudança sensível → Evento de auditoria (ator, escopo, revisão, data)` },
    { tipo: "lista", titulo: "Regras de dados antes das migrações", itens: [
      "Chave INEP com fonte/ano; status de adesão separado de existência no catálogo.",
      "Revisões otimistas para não sobrescrever trabalho simultâneo; histórico de autoria e aprovação.",
      "Coordenadas opcionais, agrupamento de pontos idênticos e precisão declarada; registros sem coordenadas não recebem pins inventados.",
      "Dados públicos são projeções autorizadas, não cópia de e-mails, documentos de vínculo ou dados de menores.",
      "Toda tabela nova exige política de acesso e concessões explícitas; validar leitura/escrita por papel antes de disponibilizar o serviço.",
    ] },
  ] },
  { id: "ipp", titulo: "Funcionamento do 5W2H e dos Canvas", publico: "Produto · Equipe SMIS", blocos: [
    { tipo: "lista", titulo: "5W2H · livro pp. 97–98", itens: [
      "O quê; Por quê; Quem; Onde; Quando; Como; Quanto. Recursos/custos podem ser conhecidos ou estimados, sem inventar valores.",
      "Contagem simples de campos preenchidos: 0–2 precisa de descrição; 3–5 em desenvolvimento; 6–7 suficientemente completo para análise. Não é nota de impacto, viabilidade ou aprovação.",
      "Identificação, escola, categorias, dimensões, ODS, vínculo e evidências são metadados separados e não entram na contagem dos sete campos.",
      "Rascunhos podem ser incompletos; revisão documental e confirmação institucional são processos distintos.",
    ] },
    { tipo: "lista", titulo: "Project Canvas Mínimo · pp. 99–100", itens: [
      "Foco: problema, proposta de valor, beneficiários.",
      "Engajamento: propósito/ODS e benefícios.",
      "Conquistas: entregas.",
      "Recursos: equipe e recursos-chave.",
      "Planejamento: marcos e linha do tempo. Total: dez fatores, além da denominação e iniciativa de origem.",
      "Canvas Complementar detalha o projeto; transcrever e homologar sua ficha integral antes de codificar, sem substituir por campos genéricos do protótipo.",
      "Program Canvas organiza projetos relacionados, governança e benefícios conjuntos. Programa não é apenas uma terceira aba nem evolução obrigatória.",
    ] },
  ] },
  { id: "backend-python", titulo: "Contratos Python, Moodle e AWA", publico: "Desenvolvedores", blocos: [
    { tipo: "texto", titulo: "Contrato proposto, não integração pronta", paragrafo: "Acordar API versionada /api/v1 com a equipe Python, JSON validado, datas ISO-8601, paginação e erros estruturados. O portal usa funções internas do TanStack para chamadas protegidas e mantém segredos no servidor. Moodle/AWA preservam matrículas, progresso e comunidades em seus próprios serviços. Identidade compartilhada exige acordo explícito de emissor, audiência e papéis locais; não repassar a sessão atual sem esse acordo." },
    { tipo: "code", titulo: "Operações propostas · definir dono antes de implementar", codigo: `GET /escolas?q=&codigoInep=&uf=&municipio=&page=&pageSize=
GET /iniciativas?dimensao=&categoria=&ods=&status=publicada
GET /iniciativas/{id}             # projeção pública autorizada
POST /vinculos                   # solicitante autenticado
POST /vinculos/{id}/decisao       # autoridade do escopo escolar
POST /convites                   # autoridade confirmada; expira e uso único
POST /convites/{token}/aceitar    # identidade verificada + token válido
POST /iniciativas                # rascunho no SMIS
PATCH /iniciativas/{id}           # responsável autorizado + revisão esperada
POST /iniciativas/{id}/publicacao # autoridade institucional/curadoria definida
POST /projetos · PATCH /projetos/{id}/canvas
POST /programas · POST /programas/{id}/projetos
POST /taxonomia/sugestoes · POST /taxonomia/sugestoes/{id}/decisao
GET /casos · GET /indicadores     # fonte, período, denominador e atualização
Moodle: entrada segura + retorno autorizado de matrícula/progresso
AWA2030: entrada segura + referências de comunidades/convites` },
    { tipo: "code", titulo: "Exemplo de contrato 5W2H proposto", codigo: `{
  "id": "identificador", "escolaId": "identificador",
  "what": "", "why": "", "who": "", "where": "",
  "when": "", "how": "", "howMuch": "",
  "categoriaPrincipalId": "identificador", "categoriasSecundarias": [],
  "dimensoes": [], "odsMetas": [], "evidencias": [],
  "estagioAcao": "ideia", "statusPublicacao": "rascunho",
  "revisao": 1, "coordenadas": null
}
# Conflito de revisão: HTTP 409; não sobrescrever silenciosamente.
# Não autorizado: 401; escopo insuficiente: 403.
# Validação: 422 com campos; falhas inesperadas sem segredos na resposta.` },
    { tipo: "lista", titulo: "Segurança e interoperabilidade", itens: [
      "API valida assinatura com chaves públicas do emissor (JWKS), algoritmos permitidos, issuer, audience e validade; depois verifica vínculo/papel no serviço. Não adotar segredo JWT compartilhado nem assumir HS256.",
      "OAuth/OIDC, se adotado, usa retorno público na mesma origem, estado e PKCE conforme provedor; verificar sessão antes de navegar a área protegida.",
      "CORS lista origens exatas aprovadas; não liberar todos os subdomínios de uma plataforma hospedada.",
      "Webhooks externos verificam assinatura, prazo e idempotência; API pública não significa dados privados acessíveis.",
      "FastAPI/Pydantic podem ser usados pela equipe Python; armazenamento e autenticação devem seguir o contrato acordado, sem depender de credenciais internas indisponíveis do Lovable Cloud.",
    ] },
  ] },
  { id: "variaveis", titulo: "Variáveis e configuração de integração", publico: "Desenvolvedores", blocos: [
    { tipo: "code", titulo: "Configuração proposta · nomes, não credenciais", codigo: `# Navegador: somente informações públicas; criar quando o contrato existir
VITE_API_BASE_URL           # URL pública acordada, se a API for chamada diretamente
VITE_CCA_URL                # entrada pública do Moodle/CCA
VITE_AWA_URL                # entrada pública da comunidade
VITE_SMIS_URL               # entrada pública do SMIS

# Servidor do portal: guardar credenciais como segredos
ADMIN_ACCESS_CODE          # já usado na publicação dos Caminhos
CEURS_API_BASE_URL          # API Python acordada
CEURS_API_TOKEN             # somente se o contrato exigir autenticação de serviço
OIDC_ISSUER / OIDC_CLIENT_ID / OIDC_CLIENT_SECRET
OIDC_REDIRECT_URI           # retorno público da origem aprovada
WEBHOOK_SIGNING_SECRET     # somente para integrações que o usem

# Serviço Python: configurar no ambiente do serviço responsável
ENVIRONMENT / API_PREFIX / LOG_LEVEL / CORS_ORIGINS
AUTH_ISSUER / AUTH_AUDIENCE / AUTH_JWKS_URL
STORAGE_PROVIDER / STORAGE_BUCKET / MAX_UPLOAD_SIZE_MB
SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD / EMAIL_FROM
FRONTEND_URL / INVITE_EXPIRE_DAYS
MOODLE_BASE_URL / MOODLE_API_TOKEN / AWA_BASE_URL / AWA_API_TOKEN
INEP_SOURCE_URL / INEP_SOURCE_YEAR / INGESTION_SCHEDULE
AI_PROVIDER / AI_MODEL / AI_BUDGET_LIMIT
DATA_RETENTION_DAYS / DPO_EMAIL` },
    { tipo: "texto", titulo: "Limites importantes", paragrafo: "Esses nomes são proposta de contrato, não variáveis já configuradas. A base de conteúdo Cloud tem configuração pública gerada pela plataforma; não editar arquivos gerados nem unificar o cliente de visitantes. Senha do banco e chave de serviço internas não ficam disponíveis no Lovable Cloud. Se Python usar banco próprio, DATABASE_URL e tamanho do pool pertencem ao ambiente desse serviço, não ao navegador nem a um acesso presumido ao banco Cloud." },
    { tipo: "lista", titulo: "Checklist de configuração", itens: ["Documentar responsável, ambiente, finalidade e rotação de cada segredo.", "Homologar identidade e domínios antes de habilitar acesso entre serviços.", "Nunca expor token de Moodle/AWA/IA em variável VITE_ ou código de interface.", "Prazos de convite, retenção e limites de arquivos/IA são decisões pendentes, não valores definidos por esta documentação."] },
  ] },
  { id: "plano-execucao", titulo: "Plano de execução · sete etapas", publico: "Coordenação · Equipe", blocos: [
    { tipo: "texto", titulo: "Entregas pequenas e verificáveis", paragrafo: "Executar uma etapa por vez, subdividindo cada uma em lotes: definição/contrato, interface, integração e verificação. A meta solicitada é de até 5 créditos por lote; consumo depende das ferramentas e não pode ser garantido antecipadamente. Não iniciar um lote amplo ou pago sem rever a estimativa. Demonstração de interface não equivale a serviço em produção." },
    ...ETAPAS_EXECUCAO.map((etapa): Bloco => ({ tipo: "lista", titulo: `Etapa ${etapa.numero} · ${etapa.titulo} — ${etapa.status}`, itens: [
      `Objetivo: ${etapa.objetivo}`, ...etapa.entregas.map((item) => `Entrega: ${item}`),
      `Critério de aceite: ${etapa.aceite}`, `Dependência: ${etapa.dependencia}`,
    ] })),
    { tipo: "lista", titulo: "Sequência e dependências", itens: [
      "1 → 2 para clareza da experiência; 3 → 4 → 5 para base escolar, classificação e registro.",
      "6 pode começar pela curadoria documental em paralelo, mas publicação requer direitos/evidências e contratos.",
      "7 começa com demonstrações identificadas; agentes reais dependem dos serviços e da base autorizada.",
      "Nenhuma etapa é concluída por aparência: integração exige salvar, ler de volta, conferir autorização e distinguir dados de exemplo.",
    ] },
  ] },
  { id: "desenvolvimento", titulo: "Desenvolvimento e critérios de qualidade", publico: "Desenvolvedores", blocos: [
    { tipo: "lista", titulo: "Convenções atuais", itens: [
      "React 19, TypeScript, TanStack Start/Router e Vite; rotas por arquivo em src/routes. Não substituir o roteador.",
      "Tailwind v4, tokens semânticos e controles do design system; preservar identidade visual e acessibilidade.",
      "Dados publicados dos Caminhos usam schema validado e cache Query carregado por rota; novos conteúdos não devem introduzir fetch em efeito como padrão.",
      "Funções internas do portal usam createServerFn; chamadas externas/webhooks usam rotas públicas com verificação do chamador. SSR roda em runtime Worker, não Node.",
      "Leaflet é importado após hidratação; tiles OpenStreetMap e coordenadas honestas, sem geolocalização inventada.",
      "Navegação preserva redirects/not-found; erro inesperado não deve esconder sinais do framework.",
    ] },
    { tipo: "lista", titulo: "Aceite transversal por lote", itens: [
      "Verificar fluxo principal com usuário e escopo reais; incluir rejeição de acesso indevido e conflito de edição.",
      "Testar regras concretas (completude, convites, revisão e permissões) quando forem implementadas; documentação não ativa essas regras.",
      "Conferir teclado, rótulos, contraste WCAG AA, foco e telas pequenas; conteúdo não pode se sobrepor.",
      "Verificar falhas de rede, estados vazios, fonte/data das métricas, log sem dados sensíveis e recuperação de erro.",
      "Publicação é etapa separada: conferir domínio conectado, HTTPS e retorno de autenticação na origem final.",
    ] },
  ] },
];


/* ============================================================
   COMPONENTES VISUAIS
   ============================================================ */

const COR_MAP = {
  soft: { bg: "bg-soft", border: "border-line", text: "text-ink" },
  teal: { bg: "bg-teal/10", border: "border-teal/40", text: "text-teal-900" },
  navy: { bg: "bg-navy/10", border: "border-navy/40", text: "text-navy" },
  orange: { bg: "bg-orange/10", border: "border-orange/40", text: "text-orange-900" },
  amber: { bg: "bg-amber/20", border: "border-amber/50", text: "text-amber-900" },
} as const;

const ICONE_MAP = {
  globe: Globe, lock: Lock, user: User, users: Users,
  shield: Shield, crown: Crown, database: Database, file: FileText,
};

function FluxoNodeView({ node }: { node: FluxoNode }) {
  const Icone = ICONE_MAP[node.icone];
  const cores = COR_MAP[node.cor];
  return (
    <div className="flex flex-col items-center">
      <div className={`flex min-w-[200px] flex-col items-center gap-1 rounded-lg border-2 ${cores.border} ${cores.bg} px-4 py-3 text-center shadow-sm`}>
        <Icone className={`h-5 w-5 ${cores.text}`} aria-hidden />
        <span className={`text-sm font-bold ${cores.text}`}>{node.label}</span>
        {node.descricao && <span className={`text-[11px] ${cores.text} opacity-75`}>{node.descricao}</span>}
      </div>
      {node.filhos && node.filhos.length > 0 && (
        <>
          <ArrowDown className="my-1 h-4 w-4 text-muted-foreground" aria-hidden />
          <div className="flex flex-wrap items-start justify-center gap-3">
            {node.filhos.map((filho, i) => <FluxoNodeView key={`${filho.label}-${i}`} node={filho} />)}
          </div>
        </>
      )}
    </div>
  );
}

function PerfilCard({ perfil }: { perfil: PerfilAcesso }) {
  const cores = COR_MAP[perfil.cor];
  const Icone = ICONE_MAP[perfil.icone];
  return (
    <div className={`rounded-lg border-2 ${cores.border} ${cores.bg} p-4`}>
      <div className="flex items-center gap-2">
        <Icone className={`h-5 w-5 ${cores.text}`} aria-hidden />
        <h4 className={`text-base font-extrabold uppercase tracking-wide ${cores.text}`}>{perfil.papel}</h4>
      </div>
      <div className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">✅ Pode</p>
        <ul className="mt-1 space-y-1 text-xs">
          {perfil.pode.map((item) => <li key={item} className={`${cores.text} opacity-90`}>• {item}</li>)}
        </ul>
      </div>
      {perfil.naoPode.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-destructive">❌ Não pode</p>
          <ul className="mt-1 space-y-1 text-xs">
            {perfil.naoPode.map((item) => <li key={item} className={`${cores.text} opacity-90`}>• {item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function TabelaCard({ tabela }: { tabela: TabelaDB }) {
  const tipoCor =
    tabela.tipo === "auth" ? "bg-amber/20 border-amber/50 text-amber-900"
    : tabela.tipo === "principal" ? "bg-teal/10 border-teal/40 text-teal-900"
    : "bg-soft border-line text-muted-foreground";
  const tipoLabel = tabela.tipo === "auth" ? "Identidade" : tabela.tipo === "principal" ? "Em uso" : "Planejada";
  return (
    <div className={`rounded-lg border-2 ${tipoCor} p-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4" aria-hidden />
          <h4 className="break-all font-mono text-sm font-extrabold">{tabela.nome}</h4>
        </div>
        <span className="rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{tipoLabel}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {tabela.campos.map((campo) => (
          <li key={campo.nome} className="flex flex-wrap items-baseline gap-2 text-xs">
            <code className="font-mono font-bold">{campo.nome}</code>
            <span className="text-[10px] opacity-70">{campo.tipo}</span>
            {campo.descricao && <span className="w-full text-[11px] opacity-70">↳ {campo.descricao}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderBloco(bloco: Bloco, i: number): ReactNode {
  switch (bloco.tipo) {
    case "texto":
      return (
        <div key={i}>
          {bloco.titulo && <h3 className="mb-1 font-bold text-ink">{bloco.titulo}</h3>}
          <p className="leading-relaxed text-ink/85">{bloco.paragrafo}</p>
        </div>
      );
    case "lista":
      return (
        <div key={i}>
          {bloco.titulo && <h3 className="mb-1 font-bold text-ink">{bloco.titulo}</h3>}
          <ul className="list-disc space-y-1 pl-5 text-ink/85">
            {bloco.itens.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      );
    case "code":
      return (
        <div key={i}>
          {bloco.titulo && <h3 className="mb-2 font-bold text-ink">{bloco.titulo}</h3>}
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-navy p-4 text-xs leading-relaxed text-secondary-foreground"><code>{bloco.codigo}</code></pre>
            <Button size="sm" variant="secondary" className="absolute right-2 top-2" onClick={() => navigator.clipboard.writeText(bloco.codigo)}>Copiar</Button>
          </div>
        </div>
      );
    case "flow":
      return (
        <div key={i} className="rounded-lg border border-line bg-card p-5">
          {bloco.titulo && <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-teal">{bloco.titulo}</h4>}
          <div className="flex flex-wrap items-start justify-center gap-4">
            {bloco.fluxo.map((node, j) => <FluxoNodeView key={j} node={node} />)}
          </div>
        </div>
      );
    case "perfis":
      return (
        <div key={i}>
          {bloco.titulo && <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-teal">{bloco.titulo}</h4>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bloco.perfis.map((p) => <PerfilCard key={p.papel} perfil={p} />)}
          </div>
        </div>
      );
    case "db":
      return (
        <div key={i}>
          {bloco.titulo && <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-teal">{bloco.titulo}</h4>}
          <div className="grid gap-4 md:grid-cols-2">
            {bloco.tabelas.map((t) => <TabelaCard key={t.nome} tabela={t} />)}
          </div>
        </div>
      );
  }
}

/* ============================================================
   PÁGINA
   ============================================================ */

function DocumentacaoPage() {
  const [busca, setBusca] = useState("");
  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return SECOES;
    return SECOES.filter((s) => JSON.stringify(s).toLowerCase().includes(q));
  }, [busca]);

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl p-4 sm:p-6 lg:p-10">
      <p className="text-xs font-bold uppercase tracking-wider text-teal">
        Admin · Referência
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-navy">
        Documentação da plataforma
      </h1>
      <p className="mt-2 max-w-2xl text-ink/80">
        Visão conceitual, operacional, de design e técnica do CEURS–Escolas —
        inclusive para a integração do backend em Python.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild variant="outline"><Link to="/admin/reunioes">Histórico de reuniões</Link></Button>
        <Button asChild variant="outline"><a href="#plano-execucao">Sete etapas de execução</a></Button>
        <Input
          placeholder="Buscar na documentação…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="max-w-sm"
          aria-label="Buscar na documentação"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
        <nav aria-label="Seções da documentação">
          <ul className="flex flex-wrap gap-1 text-sm lg:sticky lg:top-6 lg:block lg:space-y-1">
            {SECOES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded px-2 py-1 font-semibold text-ink hover:bg-navy/5">{s.titulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8">
          {filtradas.length === 0 && (
            <p className="text-ink/70">Nada encontrado para “{busca}”.</p>
          )}
          {filtradas.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-6 border-t border-line py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-navy">{s.titulo}</h2>
                <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-ink">{s.publico}</span>
              </div>
              <div className="mt-4 space-y-6">{s.blocos.map(renderBloco)}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
