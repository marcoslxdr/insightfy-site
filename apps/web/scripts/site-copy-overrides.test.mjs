import assert from "node:assert/strict";
import test from "node:test";

import {
  applySiteCopyOverrides,
  COPY_OVERRIDE_VERSION,
  rewriteSiteCopy,
} from "./site-copy-overrides.mjs";

test("rewrites global CTA and page-specific closing copy", () => {
  const source = [
    "Estime onde sua empresa perde leads e quanto isso pode custar.",
    "comece pelo processo que mais pesa hoje.",
    "A conversa inicial organiza o percurso, os limites e uma hipótese pequena para testar.",
  ].join(" ");

  const rewritten = rewriteSiteCopy(source, "/agentes-de-ia-para-whatsapp");

  assert.match(rewritten, /Agendar Raio-X de 30–45 min\./);
  assert.match(rewritten, /defina o primeiro fluxo que o agente pode assumir\./);
  assert.match(rewritten, /fontes permitidas e critérios claros/);
  assert.doesNotMatch(rewritten, /hipótese pequena/);
});

test("replaces editorial photos with cache-safe tech assets", () => {
  const source = [
    '<img src="/images/human-work.webp" alt="Três pessoas ficcionais colaborando em estúdio com laptops e desenhos"/>',
    '<img src="/images/human-portrait.webp" alt="Três pessoas brasileiras ficcionais em retrato editorial"/>',
    '<img src="/images/human-creative.webp" alt="Pessoa brasileira ficcional organizando grids e materiais em estúdio"/>',
  ].join("");

  const rewritten = rewriteSiteCopy(source, "/");

  assert.match(rewritten, /\/images\/tech-operations\.webp/);
  assert.match(rewritten, /\/images\/tech-lab\.webp/);
  assert.match(rewritten, /\/images\/tech-agent-workflow\.webp/);
  assert.match(rewritten, /mapeando um fluxo de IA/);
  assert.match(rewritten, /configurando tecnologia/);
  assert.match(rewritten, /configurando fluxo de agente de IA/);
  assert.doesNotMatch(rewritten, /\/images\/human-/);
});

test("makes homepage promise concrete and routes primary CTA to diagnostic", () => {
  const source = [
    "Insightfy integra branding, automações, marketing e agentes de IA em uma solução fullstack para empresas e pessoas que pensam no futuro.",
    "Branding, automações, marketing e agentes no mesmo sistema.",
    "Construir minha solução",
    "mailto:contato@insightfy.com.br?subject=Vamos%20construir%20juntos",
  ].join(" ");

  const rewritten = rewriteSiteCopy(source, "/");

  assert.match(rewritten, /Insight conecta marca, aquisição/);
  assert.match(rewritten, /reduzir retrabalho e crescer com controle/);
  assert.match(rewritten, /Agendar Raio-X de 30–45 min/);
  assert.match(rewritten, /\/diagnostico-comercial/);
  assert.doesNotMatch(rewritten, /pessoas que pensam no futuro/);
});

test("repositions cases page as evidence method", () => {
  const source = [
    "Cases e evidências de automação | Insight",
    "CASES / EVIDÊNCIA",
    "evidência antes de promessa.",
    "a biblioteca começa com o método.",
  ].join(" ");

  const rewritten = rewriteSiteCopy(source, "/cases");

  assert.match(rewritten, /Como medimos resultados \| Insight/);
  assert.match(rewritten, /MÉTODO \/ EVIDÊNCIA/);
  assert.match(rewritten, /como medimos antes de prometer\./);
  assert.match(rewritten, /o método vem antes da métrica\./);
});

test("fixes privacy canonical without changing normal homepage links", () => {
  const source = [
    '<link rel="canonical" href="https://insightfy.com.br/"/>',
    '<a href="https://insightfy.com.br/">Voltar</a>',
  ].join("");

  const rewritten = rewriteSiteCopy(source, "/privacidade");

  assert.match(rewritten, /canonical" href="https:\/\/insightfy\.com\.br\/privacidade"/);
  assert.match(rewritten, /<a href="https:\/\/insightfy\.com\.br\/">Voltar<\/a>/);
});

test("rewrites InsightHub split hero and metadata", () => {
  const source = [
    "InsightHub — trabalho com contexto | Insight",
    "trabalho, contexto<br/>e agentes no<br/><em>mesmo lugar.</em>",
  ].join(" ");

  const rewritten = rewriteSiteCopy(source, "/insighthub");

  assert.match(rewritten, /InsightHub — operação em um fluxo \| Insight/);
  assert.match(rewritten, /trabalho, clientes<br\/>e agentes no<br\/><em>mesmo fluxo\.<\/em>/);
});

test("buffers changed HTML and removes stale entity headers", async () => {
  const response = new Response(
    "Estime onde sua empresa perde leads e quanto isso pode custar.",
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "content-length": "64",
        etag: '"old"',
      },
    },
  );

  const rewritten = await applySiteCopyOverrides(response, {
    method: "GET",
    pathname: "/diagnostico-comercial",
  });

  assert.equal(rewritten.headers.get("content-length"), null);
  assert.equal(rewritten.headers.get("etag"), null);
  assert.equal(rewritten.headers.get("x-insight-copy-version"), COPY_OVERRIDE_VERSION);
  assert.match(await rewritten.text(), /Agendar Raio-X de 30–45 min\./);
});

test("leaves non-HTML responses untouched", async () => {
  const response = new Response("Estime onde sua empresa perde leads e quanto isso pode custar.", {
    headers: { "content-type": "application/xml" },
  });

  const untouched = await applySiteCopyOverrides(response, {
    method: "GET",
    pathname: "/sitemap.xml",
  });

  assert.equal(untouched, response);
});
