import { COPY_OVERRIDE_VERSION } from "./site-copy-overrides.mjs";

const baseUrl = (process.env.SITE_URL ?? process.argv[2] ?? "http://127.0.0.1:3010")
  .replace(/\/+$/, "");

const checks = [
  ["/", ["Insight conecta marca, aquisição", "Agendar Raio-X de 30–45 min", 'href="/diagnostico-comercial"', "/images/tech-operations.webp", "/images/tech-lab.webp", "/images/tech-agent-workflow.webp"]],
  ["/automacao-de-atendimento-e-vendas", ["encontre onde atendimento e vendas travam.", "gargalos priorizados"]],
  ["/agentes-de-ia-para-whatsapp", ["defina o primeiro fluxo que o agente pode assumir.", "fontes permitidas"]],
  ["/diagnostico-comercial", ["descubra onde seus leads param", "sem promessa de economia"]],
  ["/automacao-com-ia-natal", ["presença local, processo concreto.", "fila que mais consome sua equipe"]],
  ["/automacao-com-ia-santa-catarina", ["implantação acompanhada.", "piloto remoto e acompanhado"]],
  ["/cases", ["Como medimos resultados | Insight", "como medimos antes de prometer."]],
  ["/sobre", ["sem ampliar retrabalho.", "Agendar Raio-X de 30–45 min."]],
  ["/privacidade", ['rel="canonical" href="https://insightfy.com.br/privacidade"']],
  ["/insighthub", ["InsightHub — operação em um fluxo", "trabalho, clientes", "mesmo fluxo.", "/images/tech-operations.webp"]],
  ["/blog/como-automatizar-atendimento-sem-perder-qualidade", ["No site da empresa, o guia da ANPD", "/images/tech-operations.webp"]],
];

const failures = [];

for (const [pathname, expected] of checks) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const body = await response.text();
  const version = response.headers.get("x-insight-copy-version");

  if (!response.ok) {
    failures.push(`${pathname}: HTTP ${response.status}`);
  }

  if (version !== COPY_OVERRIDE_VERSION) {
    failures.push(`${pathname}: x-insight-copy-version=${version ?? "ausente"}`);
  }

  if (body.includes("/images/human-")) {
    failures.push(`${pathname}: referência de foto editorial antiga ainda presente`);
  }

  for (const marker of expected) {
    if (!body.includes(marker)) {
      failures.push(`${pathname}: texto ausente: ${marker}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Copy ${COPY_OVERRIDE_VERSION} verificada em ${checks.length} páginas (${baseUrl}).`);
}
