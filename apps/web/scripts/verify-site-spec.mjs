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

const page = read("app/[locale]/page.tsx");
const layout = read("app/[locale]/layout.tsx");
const css = read("app/globals.css");
const logo = read("components/Logo.tsx");
const nav = read("components/sections/Nav.tsx");
const footer = read("components/sections/Footer.tsx");
const hero = read("components/sections/Hero.tsx");
const brand = read("lib/brand.ts");
const leadProxy = read("scripts/lead-proxy.mjs");
const vpsServer = read("scripts/serve-vps.mjs");
const appFiles = filesIn("app");
const componentFiles = filesIn("components").filter((path) => /\.tsx$/.test(path));
const source = [...appFiles, ...componentFiles]
  .filter((path) => /\.(?:tsx?|jsx?)$/.test(path))
  .map(read)
  .join("\n");

need(page, /<main\b/i, "localized homepage needs semantic <main>");
need(page, /<Nav\b/, "localized homepage needs navigation");
need(page, /<Footer\b/, "localized homepage needs footer");
need(hero, /<(?:motion\.)?h1\b/i, "hero needs one clear h1");
if ((hero.match(/<(?:motion\.)?h1\b/gi) ?? []).length !== 1) failures.push("hero must contain exactly one h1");
need(nav, /<nav\b[^>]*aria-label=/i, "navigation needs aria-label");
need(nav, /aria-expanded=/i, "mobile navigation needs disclosure state");
need(nav, /aria-controls=/i, "mobile navigation needs controlled target");
need(footer, /<footer\b/i, "footer component needs semantic footer");
if (componentFiles.length < 8) failures.push("site needs reusable component architecture");

need(layout, /generateMetadata/, "localized layout needs generated metadata");
need(layout, /metadataBase/, "metadata needs stable base URL");
need(layout, /alternates:\s*\{[\s\S]*canonical/i, "metadata needs canonical URL");
need(layout, /languages:\s*\{/i, "metadata needs language alternates");
need(layout, /openGraph:\s*\{/i, "metadata needs OpenGraph");
need(layout, /twitter:\s*\{/i, "metadata needs Twitter card");
need(layout, /application\/ld\+json/i, "layout needs Organization JSON-LD");
need(layout, /COMPANY_SITE_URL/, "metadata must use canonical brand URL constant");
need(layout, /COMPANY_BRAND/, "metadata must use brand registry");

need(brand, /CompanyBrandVariant\s*=\s*["']insightfy["']\s*\|\s*["']atria["']/, "brand variants need typed contract");
need(brand, /NEXT_PUBLIC_COMPANY_BRAND/, "brand switch needs documented public env flag");
need(brand, /requestedVariant\s*===\s*["']atria["']\s*\?\s*["']atria["']\s*:\s*["']insightfy["']/, "unknown brand flag must fail closed to Insightfy");
need(brand, /Tudo converge\. Sua operação avança\./, "Atria variant needs approved working tagline");
need(logo, /COMPANY_BRAND_VARIANT\s*===\s*["']atria["']/, "logo must support Atria variant");
need(logo, /#FF7918/i, "Atria mark needs orange pixel token");
need(logo, /#0D0D0F/i, "Atria mark needs graphite token");
for (const asset of [
  "public/brand/atria/mark.svg",
  "public/brand/atria/favicon.svg",
  "public/brand/atria/lockup.svg",
  "public/brand/atria/og-image.svg",
]) {
  if (!existsSync(join(root, asset))) failures.push(`missing ${asset}`);
}

need(css, /prefers-reduced-motion:\s*reduce/i, "CSS needs reduced-motion support");
if (/<(?:img|Image)\b/i.test(source)) {
  need(source, /loading=["']lazy["']/i, "non-hero imagery needs lazy loading");
  need(source, /decoding=["']async["']/i, "images need async decoding");
  need(source, /(?:priority|fetchPriority=["']high["'])/i, "hero media needs priority");
}

need(vpsServer, /url\.pathname === ["']\/api\/leads["']/, "VPS server must expose lead proxy route");
need(leadProxy, /x-insightfy-site-secret/i, "lead proxy must preserve stable server secret header");
need(leadProxy, /MAX_BODY_BYTES/, "lead proxy must cap payload size");
need(leadProxy, /allowedOrigins/, "lead proxy must enforce allowed origin");

if (/Your site is taking shape|SkeletonPreview|codex-preview/i.test(source)) {
  failures.push("starter preview must not ship");
}

if (failures.length) {
  console.error("SPEC RED — institutional site contract failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("SPEC GREEN — institutional site contract satisfied.");
}
