const COPY_OVERRIDE_VERSION = "2026-08-11-v2";

const GLOBAL_REPLACEMENTS = [
  [
    "Estime onde sua empresa perde leads e quanto isso pode custar.",
    "Agendar Raio-X de 30–45 min.",
  ],
  ["/images/human-work.webp", "/images/tech-operations.webp"],
  ["/images/human-portrait.webp", "/images/tech-lab.webp"],
  ["/images/human-creative.webp", "/images/tech-agent-workflow.webp"],
  [
    "Três pessoas ficcionais colaborando em estúdio com laptops e desenhos",
    "Três profissionais brasileiros ficcionais mapeando um fluxo de IA em estúdio",
  ],
  [
    "Três pessoas ficcionais colaborando em torno de computadores e desenhos",
    "Três profissionais brasileiros ficcionais mapeando um fluxo de IA em estúdio",
  ],
  [
    "Três pessoas brasileiras ficcionais em retrato editorial",
    "Três profissionais brasileiros ficcionais configurando tecnologia em estúdio",
  ],
  [
    "Pessoa brasileira ficcional organizando grids e materiais em estúdio",
    "Profissional brasileiro fictício configurando fluxo de agente de IA",
  ],
];

const PAGE_REPLACEMENTS = {
  "/": [
    [
      "Insightfy integra branding, automações, marketing e agentes de IA em uma solução fullstack para empresas e pessoas que pensam no futuro.",
      "Insight conecta marca, aquisição, automações e agentes de IA para empresas atenderem melhor, reduzirem retrabalho e crescerem com controle.",
    ],
    [
      "Branding, automações, marketing e agentes no mesmo sistema.",
      "Marca, aquisição, automações e agentes de IA conectados para sua empresa atender melhor, reduzir retrabalho e crescer com controle.",
    ],
    [
      "Somos uma agência de IA. Integramos branding, automações, marketing e agentes em uma solução fullstack para empresas e pessoas que pensam no futuro.",
      "Começamos pelo processo real, automatizamos o previsível e mantemos decisões críticas com pessoas. Para empresas que precisam integrar WhatsApp, CRM, equipe e dados.",
    ],
    ["Construir minha solução", "Agendar Raio-X de 30–45 min"],
    [
      "mailto:contato@insightfy.com.br?subject=Vamos%20construir%20juntos",
      "/diagnostico-comercial",
    ],
  ],
  "/automacao-de-atendimento-e-vendas": [
    [
      "comece pelo processo que mais pesa hoje.",
      "encontre onde atendimento e vendas travam.",
    ],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Você sai com gargalos priorizados e um primeiro fluxo para validar com sua equipe.",
    ],
  ],
  "/agentes-de-ia-para-whatsapp": [
    [
      "comece pelo processo que mais pesa hoje.",
      "defina o primeiro fluxo que o agente pode assumir.",
    ],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Você sai com escopo, fontes permitidas e critérios claros para passagem a uma pessoa.",
    ],
  ],
  "/diagnostico-comercial": [
    [
      "Raio-X de Atendimento e Vendas.",
      "descubra onde seus leads param — e o que vale automatizar primeiro.",
    ],
    [
      "Uma sessão direta para desenhar o percurso dos leads, localizar espera e retrabalho e escolher uma hipótese de automação pequena, mensurável e reversível.",
      "Em 30–45 minutos, mapeamos canais, espera, retrabalho, responsáveis e sistemas. Você sai com gargalos observados, dados que ainda faltam e uma hipótese de teste quando houver viabilidade.",
    ],
    [
      "traga o fluxo. a gente organiza o próximo teste.",
      "traga o fluxo. saia com o próximo passo claro.",
    ],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Conversa inicial, sem promessa de economia. Se automação não for o próximo passo, diremos.",
    ],
    [
      "mailto:contato@insightfy.com.br?subject=Raio-X%20de%20Atendimento%20e%20Vendas",
      "mailto:contato@insightfy.com.br?subject=Agendar%20Raio-X%20de%20Atendimento%20e%20Vendas&body=Quero%20agendar%20um%20Raio-X%20de%2030%20a%2045%20min.%0A%0AEmpresa:%0AEquipe:%0ACanais%20usados:%0APrincipal%20gargalo:",
    ],
  ],
  "/automacao-com-ia-natal": [
    ["proximidade sem caricatura.", "presença local, processo concreto."],
    [
      "comece pelo processo que mais pesa hoje.",
      "comece pela fila que mais consome sua equipe.",
    ],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Você sai com um ponto de partida conectado aos canais, à equipe e aos sistemas usados hoje.",
    ],
  ],
  "/automacao-com-ia-santa-catarina": [
    [
      "automação com IA para empresas em Santa Catarina.",
      "automação com IA para empresas em Santa Catarina, com implantação acompanhada.",
    ],
    [
      "Atendemos empresas em Santa Catarina de forma remota e combinada conforme a necessidade do projeto. A proposta começa pelo processo e só avança quando há contexto e viabilidade.",
      "Mapeamos atendimento e vendas à distância, definimos responsáveis dos dois lados e começamos por um piloto pequeno antes de ampliar.",
    ],
    [
      "atendimento regional, alegação precisa.",
      "implantação remota, acompanhamento próximo.",
    ],
    [
      "Esta página descreve disponibilidade de atendimento. Resultados, depoimentos ou operações regionais só serão publicados quando existirem dados e autorização.",
      "Atendemos à distância com revisões curtas, responsáveis definidos e critérios para ampliar somente quando o piloto funciona.",
    ],
    [
      "comece pelo processo que mais pesa hoje.",
      "comece com um piloto remoto e acompanhado.",
    ],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Você sai com responsáveis, limites e critérios para decidir se vale ampliar.",
    ],
  ],
  "/cases": [
    ["Cases e evidências de automação | Insight", "Como medimos resultados | Insight"],
    [
      "Como a Insight documenta contexto, processo, intervenção e resultado antes de publicar um case de automação ou agente de IA.",
      "Como a Insight define processo atual, hipótese, limites e critérios antes de medir uma automação ou agente de IA.",
    ],
    ["CASES / EVIDÊNCIA", "MÉTODO / EVIDÊNCIA"],
    ["evidência antes de promessa.", "como medimos antes de prometer."],
    [
      "Um case útil explica o contexto, o processo anterior, a intervenção, os limites e o resultado autorizado. Não publicamos números sem autorização nem transformamos hipótese em sucesso.",
      "Todo projeto começa com processo atual, hipótese, limite e critério de decisão. Cases identificáveis entram aqui somente com validação do cliente.",
    ],
    ["a biblioteca começa com o método.", "o método vem antes da métrica."],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Seu processo pode começar com uma hipótese clara e terminar com evidência comparável.",
    ],
  ],
  "/sobre": [
    [
      "da Zona Leste de Natal para operações que querem avançar.",
      "da Zona Leste de Natal para equipes que querem avançar sem ampliar retrabalho.",
    ],
    [
      "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
      "Conte como sua equipe trabalha hoje. A Insight organiza o problema e assume um próximo passo concreto.",
    ],
    ["Converse com a Insight sobre o seu processo.", "Agendar Raio-X de 30–45 min."],
  ],
  "/privacidade": [
    [
      '<link rel="canonical" href="https://insightfy.com.br/"/>',
      '<link rel="canonical" href="https://insightfy.com.br/privacidade"/>',
    ],
  ],
  "/insighthub": [
    ["InsightHub — trabalho com contexto", "InsightHub — operação em um fluxo"],
    ["trabalho, contexto", "trabalho, clientes"],
    ["mesmo lugar.", "mesmo fluxo."],
    [
      "trabalho, contexto e agentes no mesmo lugar.",
      "trabalho, clientes e agentes no mesmo fluxo.",
    ],
    [
      "InsightHub organiza o que precisa acontecer hoje — entre pessoas, projetos, clientes e agentes.",
      "InsightHub mostra prioridade, responsável, andamento e histórico em um só lugar — sem reconstruir informação em planilhas, mensagens e ferramentas separadas.",
    ],
    [
      "InsightHub organiza trabalho, projetos, clientes, pessoas e agentes em um fluxo com contexto.",
      "InsightHub reúne prioridades, responsáveis, clientes, projetos e agentes em um fluxo visível para toda a equipe.",
    ],
    [
      "Conte como seu time trabalha hoje.",
      "Mostre onde sua equipe perde tempo procurando informação ou cobrando o próximo passo.",
    ],
  ],
  "/blog/como-automatizar-atendimento-sem-perder-qualidade": [
    [
      "Esse mapa evita automatizar uma etapa isolada enquanto o restante continua dependendo de cópia manual, memória ou mensagens perdidas. Ele também mostra onde a empresa precisa pedir dados pessoais. A orientação da ANPD reforça que tecnologias de rastreamento e coleta devem ser tratadas com transparência, finalidade e escolhas compreensíveis para o titular.",
      "Esse mapa evita automatizar uma etapa isolada enquanto o restante continua dependendo de cópia manual, memória ou mensagens perdidas. No site da empresa, o guia da ANPD ajuda a tratar cookies e tecnologias de rastreamento com transparência, finalidade e escolhas compreensíveis para o titular.",
    ],
  ],
};

function replaceAll(value, replacements) {
  return replacements.reduce(
    (current, [before, after]) => current.split(before).join(after),
    value,
  );
}

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

export function rewriteSiteCopy(source, pathname) {
  const normalizedPathname = normalizePathname(pathname);
  const withGlobalCopy = replaceAll(source, GLOBAL_REPLACEMENTS);
  return replaceAll(withGlobalCopy, PAGE_REPLACEMENTS[normalizedPathname] ?? []);
}

export async function applySiteCopyOverrides(response, { method, pathname }) {
  if (method === "HEAD" || !response.body) {
    return response;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!/text\/(?:html|x-component)/i.test(contentType)) {
    return response;
  }

  const source = await response.text();
  const rewritten = rewriteSiteCopy(source, pathname);
  if (rewritten === source) {
    return new Response(source, response);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  headers.set("x-insight-copy-version", COPY_OVERRIDE_VERSION);

  return new Response(rewritten, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export { COPY_OVERRIDE_VERSION };
