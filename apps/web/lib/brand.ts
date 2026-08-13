export type CompanyBrandVariant = "insightfy" | "atria";

const requestedVariant = process.env.NEXT_PUBLIC_COMPANY_BRAND?.toLowerCase();

export const COMPANY_BRAND_VARIANT: CompanyBrandVariant =
  requestedVariant === "atria" ? "atria" : "insightfy";

export const COMPANY_BRAND =
  COMPANY_BRAND_VARIANT === "atria"
    ? {
        publicName: "Atria",
        wordmark: "atria",
        tagline: "Tudo converge. Sua operação avança.",
        descriptionPt:
          "Atria conecta tecnologia, processos, dados e pessoas para transformar operações em sistemas claros, integrados e prontos para avançar.",
        descriptionEn:
          "Atria connects technology, processes, data, and people into clear, integrated operations built to move forward.",
      }
    : {
        publicName: "Insightfy",
        wordmark: "Insightfy",
        tagline: "Sistemas sob medida e agentes de IA que funcionam de verdade.",
        descriptionPt:
          "Software house focada em sistemas sob medida e agentes de IA em produção.",
        descriptionEn:
          "Software house focused on custom systems and AI agents in production.",
      };

export const COMPANY_SITE_URL = "https://insightfy.com.br";

export function applyCompanyBrand<T>(value: T): T {
  if (COMPANY_BRAND_VARIANT !== "atria") return value;

  const replace = (input: unknown): unknown => {
    if (typeof input === "string") {
      return input
        .replaceAll("Agentes Insightfy", "Agentes Atria")
        .replaceAll("Insightfy agents", "Atria agents")
        .replaceAll("Insightfy's", "Atria's")
        .replaceAll("Insightfy", "Atria")
        .replaceAll("insightfy@prod", "atria@prod");
    }
    if (Array.isArray(input)) return input.map(replace);
    if (input && typeof input === "object") {
      return Object.fromEntries(
        Object.entries(input).map(([key, item]) => [key, replace(item)]),
      );
    }
    return input;
  };

  const branded = replace(value) as T;
  if (branded && typeof branded === "object" && "hero" in branded) {
    const dictionary = branded as Record<string, unknown>;
    const hero = dictionary.hero as Record<string, unknown> | undefined;
    const footer = dictionary.footer as Record<string, unknown> | undefined;
    const agentsDemo = dictionary.agentsDemo as Record<string, unknown> | undefined;
    const isEnglish =
      typeof footer?.copyright === "string" && footer.copyright.includes("All rights");

    if (hero) {
      hero.badge = "Tecnologia · IA · operações conectadas";
      hero.titleLines = [
        "Tecnologia, dados e pessoas.",
        "Tudo conectado para sua",
        "operação avançar.",
      ];
      hero.subtitle =
        "Atria transforma processos fragmentados em sistemas claros, integrados e operados por pessoas e agentes de IA.";
      if (isEnglish) {
        hero.badge = "Technology · AI · connected operations";
        hero.titleLines = [
          "Technology, data, and people.",
          "Everything connected to move",
          "your operation forward.",
        ];
        hero.subtitle =
          "Atria turns fragmented processes into clear, integrated systems run by people and AI agents.";
      }
    }
    if (footer) {
      footer.tagline = isEnglish
        ? "Everything converges. Your operation moves forward."
        : COMPANY_BRAND.tagline;
    }
    if (agentsDemo) {
      agentsDemo.title = isEnglish ? "Atria agents at work" : "Agentes Atria em ação";
    }
  }
  return branded;
}
