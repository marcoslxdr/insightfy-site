import type { Dictionary } from "../types";

/** pt-BR copy — primary locale. Conversion copy by the copy agent. */
export const pt: Dictionary = {
  nav: {
    links: [
      { label: "Serviços", href: "#pilares" },
      { label: "Agentes", href: "#agentes" },
      { label: "Processo", href: "#processo" },
      { label: "Casos", href: "#casos" },
      { label: "Blog", href: "/blog" },
    ],
    cta: "Agendar conversa",
  },
  hero: {
    badge: "Software house · IA & sistemas",
    titleLines: [
      "Seu software sob medida,",
      "com agentes de IA que",
      "trabalham por você.",
    ],
    subtitle:
      "A Insightfy projeta e coloca em produção sistemas web, SaaS e automações com IA — feitos para o seu processo, não para o template de ninguém. Da primeira tela ao deploy.",
    ctaPrimary: "Agendar diagnóstico",
    ctaSecondary: "Ver casos",
    terminalTitle: "insightfy@prod ~ %",
  },
  socialProof: {
    label: "Founders e times que trocaram planilha e gambiarra por software de verdade.",
  },
  pillars: {
    title: "O que a gente entrega",
    subtitle:
      "Três frentes que conversam entre si: engenharia que aguenta produção, IA que resolve trabalho real e produtos próprios que usamos todo dia.",
    items: {
      systems: {
        title: "Sistemas sob medida",
        description:
          "Você descreve o processo, a gente entrega o sistema que ele merece. Web e SaaS desenhados do MVP à escala, sem amarras de ferramenta genérica.",
        bullets: [
          "Aplicações web e plataformas SaaS",
          "Integrações com ERP, CRM e APIs",
          "Do MVP validado ao produto em produção",
        ],
      },
      agents: {
        title: "Agentes de IA & automações",
        description:
          "Tarefas repetitivas que comem o dia da sua equipe viram agentes que rodam 24/7. Atendimento, dados e operações no piloto automático — com você no controle.",
        bullets: [
          "Atendimento e triagem automáticos",
          "Análise e relatórios de dados sob demanda",
          "Automação de fluxos entre sistemas",
        ],
      },
      products: {
        title: "Produtos próprios",
        description:
          "Não só construímos para clientes: construímos para nós. CRM e ferramentas SaaS da Insightfy, em desenvolvimento ativo e prontas para o seu time testar.",
        bullets: [
          "CRM próprio em evolução",
          "Ferramentas SaaS de produtividade",
          "Roadmap aberto, acesso antecipado",
        ],
      },
    },
  },
  agentsDemo: {
    title: "Agentes Insightfy em ação",
    subtitle:
      "Não é mágica, é log. Veja os agentes resolvendo casos reais de cliente — atendimento, dados, automação e integração — em paralelo.",
    agents: [
      {
        name: "Agente · Atendimento",
        task: "Recebe, classifica e responde tickets antes do seu time abrir o e-mail.",
        logs: [
          "[INIT] conectando à caixa de suporte",
          "[SCAN] novo ticket #4821 · prioridade: alta",
          "[GEN] intenção: 2ª via de fatura",
          "[GEN] redigindo resposta com base na KB",
          "[DONE] resposta enviada em 1,2s",
          "[WARN] caso fiscal escalado para humano",
        ],
      },
      {
        name: "Agente · Dados",
        task: "Consolida fontes espalhadas e entrega o relatório pronto toda segunda.",
        logs: [
          "[INIT] iniciando pipeline semanal",
          "[SCAN] lendo 12 fontes (ERP, ads, planilhas)",
          "[GEN] consolidando 48.320 linhas",
          "[GEN] calculando KPIs e variações",
          "[DONE] dashboard atualizado",
          "[DONE] resumo enviado no Slack",
        ],
      },
      {
        name: "Agente · Automação",
        task: "Tira o trabalho manual de cadastro e cobrança das costas da operação.",
        logs: [
          "[INIT] gatilho: novo pedido aprovado",
          "[GEN] emitindo nota e gerando cobrança",
          "[GEN] notificando cliente por WhatsApp",
          "[SCAN] checando pagamentos em atraso",
          "[DONE] 37 tarefas concluídas hoje",
          "[WARN] 2 casos aguardando aprovação",
        ],
      },
      {
        name: "Agente · Integração",
        task: "Mantém ERP, CRM e e-commerce falando a mesma língua, em tempo real.",
        logs: [
          "[INIT] handshake ERP ↔ CRM ↔ loja",
          "[SCAN] mapeando 340 registros novos",
          "[GEN] normalizando campos divergentes",
          "[DONE] sincronização concluída",
          "[DONE] estoque atualizado nos 3 sistemas",
        ],
      },
    ],
  },
  metrics: {
    items: [
      { value: "30+", label: "Projetos entregues" },
      { value: "98%", label: "Clientes satisfeitos" },
      { value: "99,9%", label: "Uptime em produção" },
      { value: "< 24h", label: "Para o primeiro retorno" },
    ],
  },
  process: {
    title: "Como a gente trabalha",
    subtitle:
      "Sem briefing infinito e sem caixa-preta. Um processo enxuto, do diagnóstico ao deploy — e depois dele.",
    steps: [
      {
        title: "Diagnóstico",
        description:
          "Mergulhamos no seu processo, suas dores e suas metas. Você sai com o escopo e o caminho claros.",
      },
      {
        title: "Design",
        description:
          "Desenhamos a arquitetura e os fluxos. Você aprova antes de uma linha de código existir.",
      },
      {
        title: "Build",
        description:
          "Construímos com engenharia sólida e agentes de IA, com entregas que você acompanha de perto.",
      },
      {
        title: "Deploy & evolução",
        description:
          "Colocamos em produção e seguimos junto, medindo, ajustando e fazendo o sistema crescer.",
      },
    ],
  },
  cases: {
    title: "Casos & portfólio",
    subtitle:
      "Problemas reais, resultados reais. Exemplos do que construímos nas três frentes.",
    items: [
      {
        title: "Atendimento que responde em segundos",
        summary:
          "Agente de IA assumiu a triagem de tickets de um e-commerce e derrubou o tempo de primeira resposta de horas para segundos, liberando o time para casos complexos.",
        tags: ["IA", "Atendimento", "Integração"],
      },
      {
        title: "Plataforma SaaS do zero à produção",
        summary:
          "Tiramos um produto B2B do papel: do MVP validado em semanas à plataforma em produção com clientes pagantes e escala.",
        tags: ["SaaS", "Web", "MVP"],
      },
      {
        title: "Dados consolidados no automático",
        summary:
          "Unificamos fontes dispersas em um pipeline único e relatórios automáticos, eliminando horas de planilha manual toda semana.",
        tags: ["Dados", "Automação"],
      },
    ],
  },
  finalCta: {
    title: "Vamos tirar seu próximo sistema do papel?",
    subtitle:
      "Conte seu desafio em poucas linhas. Em até 24h retornamos com um diagnóstico inicial e os próximos passos — sem compromisso.",
    form: {
      name: "Seu nome",
      email: "E-mail de trabalho",
      company: "Empresa",
      message: "Qual desafio você quer resolver?",
      submit: "Agendar meu diagnóstico",
    },
    successMessage:
      "Recebemos sua mensagem! Em breve nossa equipe entra em contato para agendar seu diagnóstico.",
  },
  footer: {
    tagline:
      "Insightfy — sistemas sob medida e agentes de IA que rodam de verdade.",
    columns: [
      {
        title: "Empresa",
        links: [
          { label: "Processo", href: "#processo" },
          { label: "Casos", href: "#casos" },
          { label: "Blog", href: "/blog" },
          { label: "Agendar conversa", href: "#contato" },
        ],
      },
      {
        title: "Serviços",
        links: [
          { label: "Sistemas sob medida", href: "#pilares" },
          { label: "Agentes de IA", href: "#agentes" },
          { label: "Produtos próprios", href: "#pilares" },
        ],
      },
      {
        title: "Contato",
        links: [
          { label: "Agendar diagnóstico", href: "#contato" },
          { label: "insightfy.com.br", href: "#contato" },
        ],
      },
    ],
    copyright: "© 2026 Insightfy. Todos os direitos reservados.",
  },
  blog: {
    navLabel: "Blog",
    hero: {
      eyebrow: "// Blog",
      title: "IA & agentes, sem enrolação",
      subtitle:
        "Guias práticos para founders e times que querem agentes de verdade em produção — e resultados mensuráveis.",
    },
    categories: {
      all: "Todos",
      agentes: "Agentes",
      automacao: "Automação",
      "casos-ia": "Casos IA",
      "atendimento-e-vendas": "Atendimento e vendas",
      "governanca-de-ia": "Governança de IA",
    },
    readingTime: "{n} min de leitura",
    related: "Continue lendo",
    ctaInline: {
      title: "Quer um agente assim no seu processo?",
      body: "Em um diagnóstico curto mapeamos onde automação com IA gera retorno de verdade — sem pitch genérico.",
      cta: "Agendar diagnóstico",
    },
    ctaEnd: {
      title: "Pronto para tirar o agente do slide e colocar em produção?",
      body: "Conte o processo que dói hoje. Em até 24h retornamos com um caminho claro.",
      cta: "Agendar conversa",
    },
    empty: "Nenhum post nesta categoria ainda.",
    backToBlog: "Ver todos os posts",
    featuredLabel: "Destaque",
    meta: {
      indexTitle: "Blog — IA & agentes",
      indexDescription:
        "Artigos da Insightfy sobre agentes de IA, automação e casos reais em produção.",
      categoryTitle: "Blog · {category}",
      categoryDescription:
        "Posts sobre {category} — agentes de IA e automação com engenharia de verdade.",
    },
  },
};
