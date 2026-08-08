/**
 * i18n contract for the Insightfy landing page.
 *
 * STABLE CONTRACT: parallel agents (sections + copy refinement) depend on this
 * shape. Add keys conservatively; do not rename/remove existing keys without
 * updating every dictionary and every section component prop.
 */

export type Locale = "pt" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface PillarItem {
  title: string;
  description: string;
  bullets: string[];
}

export interface AgentDemoItem {
  name: string;
  task: string;
  logs: string[];
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface CaseItem {
  title: string;
  summary: string;
  tags: string[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Dictionary {
  nav: {
    links: NavLink[];
    cta: string;
  };
  hero: {
    badge: string;
    titleLines: string[];
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    terminalTitle: string;
  };
  socialProof: {
    label: string;
  };
  pillars: {
    title: string;
    subtitle: string;
    items: {
      systems: PillarItem;
      agents: PillarItem;
      products: PillarItem;
    };
  };
  agentsDemo: {
    title: string;
    subtitle: string;
    agents: AgentDemoItem[];
  };
  metrics: {
    items: MetricItem[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  cases: {
    title: string;
    subtitle: string;
    items: CaseItem[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
    };
    successMessage: string;
  };
  footer: {
    tagline: string;
    columns: FooterColumn[];
    copyright: string;
  };
  blog: {
    navLabel: string;
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    categories: {
      all: string;
      agentes: string;
      automacao: string;
      "casos-ia": string;
      "atendimento-e-vendas": string;
      "governanca-de-ia": string;
    };
    readingTime: string;
    related: string;
    ctaInline: {
      title: string;
      body: string;
      cta: string;
    };
    ctaEnd: {
      title: string;
      body: string;
      cta: string;
    };
    empty: string;
    backToBlog: string;
    featuredLabel: string;
    meta: {
      indexTitle: string;
      indexDescription: string;
      categoryTitle: string;
      categoryDescription: string;
    };
  };
}
