import type { Locale } from "@/i18n/types";

export const BLOG_CATEGORIES = [
  "agentes",
  "automacao",
  "casos-ia",
  "atendimento-e-vendas",
  "governanca-de-ia",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  tags: string[];
  cover?: string;
  draft?: boolean;
  featured?: boolean;
  translationKey?: string;
}

export interface BlogPostMeta extends BlogPostFrontmatter {
  slug: string;
  locale: Locale;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export const SITE_URL = "https://insightfy.com.br";
