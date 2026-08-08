import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const read = (path) => {
  const target = join(root, path);
  if (!existsSync(target)) {
    failures.push(`missing ${path}`);
    return "";
  }
  return readFileSync(target, "utf8");
};
const need = (source, expression, message) => {
  if (!expression.test(source)) failures.push(message);
};
const filesIn = (relative) => {
  const path = join(root, relative);
  if (!existsSync(path)) return [];
  return readdirSync(path, { recursive: true })
    .map((entry) => join(relative, entry))
    .filter((entry) => statSync(join(root, entry)).isFile());
};

const page = read("app/page.tsx");
const hubPage = read("app/insighthub/page.tsx");
const css = read("app/globals.css");
const layout = read("app/layout.tsx");
const vpsServer = read("scripts/serve-vps.mjs");
const leadProxy = read("scripts/lead-proxy.mjs");
const credits = read("CREDITS.md");
const appFiles = filesIn("app");
const appSource = appFiles
  .filter((path) => /\.(?:tsx?|jsx?)$/.test(path))
  .map((path) => read(path))
  .join("\n");
const componentFiles = filesIn("app/components").filter((path) => /\.tsx$/.test(path));

need(page, /<main\b/i, "page needs semantic <main>");
need(page, /<header\b/i, "page needs <header>");
need(page, /<nav\b[^>]*aria-label=/i, "navigation needs aria-label");
need(page, /<footer\b/i, "page needs <footer>");
need(page, /<h1\b/i, "page needs one clear h1");
if ((page.match(/<h1\b/gi) ?? []).length !== 1) failures.push("page must contain exactly one h1");
for (const id of ["empresa", "solucoes", "produto", "origem", "contato"]) {
  need(page, new RegExp(`<section\\b[^>]*\\bid=["']${id}["']`, "i"), `missing section #${id}`);
  need(page, new RegExp(`href=["']#${id}["']`, "i"), `header navigation missing #${id}`);
}
need(page, /id=["']top["']/i, "hero needs #top target");
need(appSource, /agent-insight-(?:full|head)-/i, "hero must use official agente Insight pixel v1.4 asset");
need(page, /o futuro vira[\s\S]*operação/i, "hero needs future-to-operation headline");
need(page, /Somos uma agência de IA/i, "hero must identify Insight as an AI agency");
for (const pillar of ["Branding", "automações", "marketing", "agentes", "fullstack"]) {
  need(page, new RegExp(pillar, "i"), `homepage must state fullstack pillar: ${pillar}`);
}
need(page, /Agentes de IA ajudam empresas e pessoas/i, "agent section must explain client outcomes");
need(page, /human-work\.webp/i, "hero needs human collaboration photograph");
need(page, /IMAGEM EDITORIAL GERADA[\s\S]*PESSOAS FICCIONAIS/i, "hero generated editorial needs honest labeling");
need(page, /<HeroAgentChat\b/, "hero needs interactive secondary agent chat");
need(appSource, /is-visible|scrollY|scroll/i, "agent chat needs scroll-triggered floating entrance");
need(appSource, /aria-controls=["']hero-agent-chat["']/, "agent trigger must expose chat disclosure state");
need(appSource, /role=["']dialog["']/, "agent chat needs accessible dialog semantics");
need(appSource, /fetch\(["']\/api\/leads["']/, "agent triage must submit to same-origin lead endpoint");
for (const field of ["name", "profile", "interest", "challenge", "timing", "email", "phone", "consent"]) {
  need(appSource, new RegExp(`\\b${field}\\b`), `agent triage missing field: ${field}`);
}
need(appSource, /activeContext|active_section/, "agent must adapt to active session context");
need(appSource, /agent-insight-head-\$\{agentState\}/, "agent expression must change with context state");
need(layout, /<SiteLoader\b/, "root layout needs logo entry loader");
need(appSource, /Carregando site da Insight/i, "loader needs accessible status label");
need(css, /@keyframes\s+loader-(?:logo|pixel|curtain)/i, "loader needs branded CSS motion");
need(page, /\/images\/human-[^"']+\.webp/i, "page needs optimized local human editorial imagery");
if ((page.match(/\/images\/human-[^"']+\.webp/gi) ?? []).length < 2) {
  failures.push("page needs at least two optimized human editorial images");
}
need(credits, /Pessoas são ficcionais/i, "generated editorials need fictional-person provenance");
need(credits, /editorial-site-v1\.5/i, "generated editorials need canonical source pointer");
need(appSource, /loading=["']lazy["']/i, "non-hero images need loading=lazy");
need(appSource, /decoding=["']async["']/i, "non-hero images need decoding=async");
need(appSource, /(?:priority|fetchPriority=["']high["'])/i, "hero mascot needs priority/fetchPriority");
need(page, /(?:width=\{|width=["'])/i, "images need explicit dimensions");
if (componentFiles.length < 4) failures.push("need at least four reusable app/components/*.tsx primitives");
need(page, /from ["'][./]+components\//, "page must compose reusable components");

need(css, /--(?:accent|insight-orange)\s*:\s*#ff7918/i, "CSS needs Insight orange #FF7918 token");
need(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i, "CSS needs reduced-motion override");
need(css, /:focus-visible/i, "CSS needs visible keyboard focus");
need(css, /max-width:\s*100%|overflow-x:\s*hidden/i, "CSS needs narrow-screen overflow protection");
need(css, /@media\s*\(max-width:/i, "CSS needs responsive breakpoint");
need(css, /\.capability-card h3[\s\S]{0,320}overflow-wrap:\s*anywhere/i, "capability titles need explicit overflow containment");
for (const motion of ["agent-thinking", "agent-street", "agent-success", "agent-listening"]) {
  need(css, new RegExp(`@keyframes\\s+${motion}`), `missing contextual agent motion: ${motion}`);
}

need(vpsServer, /url\.pathname === ["']\/api\/leads["']/, "VPS server must expose lead proxy route");
need(leadProxy, /x-insightfy-site-secret/i, "lead proxy must inject server-only secret");
need(leadProxy, /MAX_BODY_BYTES/, "lead proxy must cap payload size");
need(leadProxy, /allowedOrigins/, "lead proxy must enforce allowed origin");

need(layout, /lang=["']pt-BR["']/i, "root HTML needs lang=pt-BR");
need(layout, /title:\s*["'`](?!Starter Project)/i, "metadata needs non-placeholder title");
need(layout, /description:\s*["'`][^"'`]*Insightfy/i, "metadata description must mention Insightfy");
need(layout, /\/og-image\.webp/i, "metadata needs institutional OG image");
if (/Your site is taking shape|SkeletonPreview|codex-preview/i.test(appSource)) {
  failures.push("starter preview must be removed from shipped app source");
}
if (/agent-insighthub|liga-insighthub|ponto-insight/i.test(appSource)) {
  failures.push("InsightHub/Liga/legacy Ponto mascot assets are forbidden");
}
if (/framer-motion|<video\b|<canvas\b|data:image\//i.test(appSource)) {
  failures.push("heavy media or animation dependency is forbidden");
}

need(page, /href=["']\/insighthub["']/i, "homepage must link dedicated InsightHub route");
need(hubPage, /<main\b/i, "InsightHub route needs semantic <main>");
need(hubPage, /<h1\b/i, "InsightHub route needs one clear h1");
if ((hubPage.match(/<h1\b/gi) ?? []).length !== 1) failures.push("InsightHub route must contain exactly one h1");
need(hubPage, /href=["']\/["']/i, "InsightHub route needs link back to company homepage");
need(hubPage, /Hoje|Trabalho|Projetos|Cliente 360|Empresa/i, "InsightHub route needs factual product capabilities");

const runtime = appFiles.find((path) => {
  const source = read(path);
  return /window\.__ready/.test(source);
});
if (!runtime) {
  failures.push("missing client navigation runtime for ?jump and window.__ready");
} else {
  const source = read(runtime);
  need(source, /URLSearchParams\(window\.location\.search\)/, "runtime must read ?jump from URLSearchParams");
  need(source, /scrollIntoView/, "runtime must scroll valid ?jump target");
  need(source, /window\.__ready\s*=\s*true/, "runtime must set window.__ready = true");
}

if (failures.length) {
  console.error("SPEC RED — Insightfy site contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("SPEC GREEN — Insightfy site contract satisfied.");
}
