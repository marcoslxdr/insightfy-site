import type { Dictionary } from "../types";

/** EN copy — conversion copy by the copy agent. */
export const en: Dictionary = {
  nav: {
    links: [
      { label: "Services", href: "#pilares" },
      { label: "Agents", href: "#agentes" },
      { label: "Process", href: "#processo" },
      { label: "Cases", href: "#casos" },
      { label: "Blog", href: "/blog" },
    ],
    cta: "Book a call",
  },
  hero: {
    badge: "Software house · AI & systems",
    titleLines: [
      "Custom software,",
      "powered by AI agents",
      "that do the work for you.",
    ],
    subtitle:
      "Insightfy designs and ships production-grade web apps, SaaS, and AI automation — built around your process, not someone else's template. From first screen to deploy.",
    ctaPrimary: "Book a diagnosis",
    ctaSecondary: "See cases",
    terminalTitle: "insightfy@prod ~ %",
  },
  socialProof: {
    label: "Founders and teams who traded spreadsheets and duct tape for real software.",
  },
  pillars: {
    title: "What we deliver",
    subtitle:
      "Three fronts that work together: engineering that survives production, AI that handles real work, and products we build and use ourselves.",
    items: {
      systems: {
        title: "Custom systems",
        description:
          "You describe the process, we build the system it deserves. Web and SaaS designed from MVP to scale — no generic-tool handcuffs.",
        bullets: [
          "Web apps and SaaS platforms",
          "Integrations with ERP, CRM, and APIs",
          "From validated MVP to production",
        ],
      },
      agents: {
        title: "AI agents & automation",
        description:
          "The repetitive tasks eating your team's day become agents that run 24/7. Support, data, and operations on autopilot — with you in control.",
        bullets: [
          "Automated support and triage",
          "On-demand data analysis and reports",
          "Cross-system workflow automation",
        ],
      },
      products: {
        title: "Our own products",
        description:
          "We don't just build for clients — we build for ourselves. Insightfy's CRM and SaaS tools, in active development and ready for your team to try.",
        bullets: [
          "In-house CRM, always evolving",
          "SaaS productivity tools",
          "Open roadmap, early access",
        ],
      },
    },
  },
  agentsDemo: {
    title: "Insightfy agents at work",
    subtitle:
      "It's not magic, it's logs. Watch the agents solve real client cases — support, data, automation, and integration — in parallel.",
    agents: [
      {
        name: "Agent · Support",
        task: "Receives, classifies, and answers tickets before your team opens their inbox.",
        logs: [
          "[INIT] connecting to support inbox",
          "[SCAN] new ticket #4821 · priority: high",
          "[GEN] intent: invoice copy request",
          "[GEN] drafting reply from knowledge base",
          "[DONE] reply sent in 1.2s",
          "[WARN] tax case escalated to human",
        ],
      },
      {
        name: "Agent · Data",
        task: "Consolidates scattered sources and delivers the report ready every Monday.",
        logs: [
          "[INIT] starting weekly pipeline",
          "[SCAN] reading 12 sources (ERP, ads, sheets)",
          "[GEN] consolidating 48,320 rows",
          "[GEN] computing KPIs and deltas",
          "[DONE] dashboard refreshed",
          "[DONE] summary posted to Slack",
        ],
      },
      {
        name: "Agent · Automation",
        task: "Takes manual data entry and billing off your operations team's back.",
        logs: [
          "[INIT] trigger: new order approved",
          "[GEN] issuing invoice and billing",
          "[GEN] notifying customer via WhatsApp",
          "[SCAN] checking overdue payments",
          "[DONE] 37 tasks completed today",
          "[WARN] 2 cases awaiting approval",
        ],
      },
      {
        name: "Agent · Integration",
        task: "Keeps ERP, CRM, and your store speaking the same language, in real time.",
        logs: [
          "[INIT] handshake ERP ↔ CRM ↔ store",
          "[SCAN] mapping 340 new records",
          "[GEN] normalizing mismatched fields",
          "[DONE] sync complete",
          "[DONE] inventory updated across 3 systems",
        ],
      },
    ],
  },
  metrics: {
    items: [
      { value: "30+", label: "Projects delivered" },
      { value: "98%", label: "Satisfied clients" },
      { value: "99.9%", label: "Production uptime" },
      { value: "< 24h", label: "To first reply" },
    ],
  },
  process: {
    title: "How we work",
    subtitle:
      "No endless briefs, no black box. A lean process, from diagnosis to deploy — and beyond.",
    steps: [
      {
        title: "Diagnosis",
        description:
          "We dig into your process, pains, and goals. You leave with a clear scope and path.",
      },
      {
        title: "Design",
        description:
          "We design the architecture and flows. You approve before a single line of code exists.",
      },
      {
        title: "Build",
        description:
          "We develop with solid engineering and AI agents, shipping work you follow closely.",
      },
      {
        title: "Deploy & evolve",
        description:
          "We ship to production and stay on board — measuring, tuning, and growing the system.",
      },
    ],
  },
  cases: {
    title: "Cases & portfolio",
    subtitle:
      "Real problems, real results. Examples of what we've built across all three fronts.",
    items: [
      {
        title: "Support that replies in seconds",
        summary:
          "An AI agent took over ticket triage for an e-commerce brand and dropped first-response time from hours to seconds, freeing the team for complex cases.",
        tags: ["AI", "Support", "Integration"],
      },
      {
        title: "SaaS platform from zero to production",
        summary:
          "We took a B2B product from idea to reality: from an MVP validated in weeks to a production platform with paying customers and scale.",
        tags: ["SaaS", "Web", "MVP"],
      },
      {
        title: "Data consolidated on autopilot",
        summary:
          "We unified scattered sources into a single pipeline with automated reporting, cutting hours of manual spreadsheet work every week.",
        tags: ["Data", "Automation"],
      },
    ],
  },
  finalCta: {
    title: "Ready to get your next system off the ground?",
    subtitle:
      "Tell us your challenge in a few lines. Within 24h we'll reply with an initial diagnosis and next steps — no strings attached.",
    form: {
      name: "Your name",
      email: "Work email",
      company: "Company",
      message: "What challenge do you want to solve?",
      submit: "Book my diagnosis",
    },
    successMessage:
      "Got your message! Our team will reach out shortly to schedule your diagnosis.",
  },
  footer: {
    tagline: "Insightfy — custom systems and AI agents that actually run.",
    columns: [
      {
        title: "Company",
        links: [
          { label: "Process", href: "#processo" },
          { label: "Cases", href: "#casos" },
          { label: "Blog", href: "/blog" },
          { label: "Book a call", href: "#contato" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Custom systems", href: "#pilares" },
          { label: "AI agents", href: "#agentes" },
          { label: "Our own products", href: "#pilares" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Book a diagnosis", href: "#contato" },
          { label: "insightfy.com.br", href: "#contato" },
        ],
      },
    ],
    copyright: "© 2026 Insightfy. All rights reserved.",
  },
  blog: {
    navLabel: "Blog",
    hero: {
      eyebrow: "// Blog",
      title: "AI & agents, without the hype",
      subtitle:
        "Practical guides for founders and teams who want real agents in production — and measurable outcomes.",
    },
    categories: {
      all: "All",
      agentes: "Agents",
      automacao: "Automation",
      "casos-ia": "AI cases",
      "atendimento-e-vendas": "Service & sales",
      "governanca-de-ia": "AI governance",
    },
    readingTime: "{n} min read",
    related: "Keep reading",
    ctaInline: {
      title: "Want an agent like this in your process?",
      body: "In a short diagnosis we map where AI automation actually returns value — no generic pitch.",
      cta: "Book a diagnosis",
    },
    ctaEnd: {
      title: "Ready to take the agent off the slide and into production?",
      body: "Tell us the process that hurts today. Within 24h we come back with a clear path.",
      cta: "Book a call",
    },
    empty: "No posts in this category yet.",
    backToBlog: "View all posts",
    featuredLabel: "Featured",
    meta: {
      indexTitle: "Blog — AI & agents",
      indexDescription:
        "Insightfy articles on AI agents, automation, and real production cases.",
      categoryTitle: "Blog · {category}",
      categoryDescription:
        "Posts about {category} — AI agents and automation with real engineering.",
    },
  },
};
