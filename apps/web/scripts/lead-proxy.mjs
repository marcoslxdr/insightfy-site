const MAX_BODY_BYTES = 24 * 1024;
const DEFAULT_BACKEND_URL = "http://127.0.0.1:8002/api/public/site-leads";

function jsonResponse(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

export function resolveClientIp(headers, fallback = "unknown") {
  const forwarded = headers.get("x-forwarded-for") ?? "";
  const first = forwarded.split(",", 1)[0].trim();
  return (first || fallback).slice(0, 64);
}

export async function forwardLeadRequest(request, options = {}) {
  const secret = options.secret ?? process.env.INSIGHTFY_SITE_LEAD_SECRET ?? "";
  if (secret.trim().length < 32) {
    return jsonResponse({ detail: "Atendimento temporariamente indisponível." }, 503);
  }
  if (request.method !== "POST") {
    return jsonResponse({ detail: "Método não permitido." }, 405);
  }

  const origin = request.headers.get("origin");
  const configuredOrigins = (process.env.INSIGHTFY_SITE_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedOrigins = new Set(
    options.allowedOrigins ?? (configuredOrigins.length
      ? configuredOrigins
      : ["https://insightfy.com.br", "https://www.insightfy.com.br"]),
  );
  if (origin && !allowedOrigins.has(origin)) {
    return jsonResponse({ detail: "Origem não permitida." }, 403);
  }
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return jsonResponse({ detail: "Envie os dados em JSON." }, 415);
  }

  const declaredLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ detail: "Dados excedem o limite permitido." }, 413);
  }
  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ detail: "Dados excedem o limite permitido." }, 413);
  }
  try {
    JSON.parse(new TextDecoder().decode(body));
  } catch {
    return jsonResponse({ detail: "JSON inválido." }, 400);
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const backendUrl = options.backendUrl ?? process.env.INSIGHTFY_LEADS_BACKEND_URL ?? DEFAULT_BACKEND_URL;
  try {
    const backendResponse = await fetchImpl(backendUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-insightfy-site-secret": secret,
        "x-insightfy-client-ip": (options.clientIp ?? "unknown").slice(0, 64),
      },
      body,
      signal: AbortSignal.timeout(8_000),
    });
    return new Response(await backendResponse.arrayBuffer(), {
      status: backendResponse.status,
      headers: {
        "cache-control": "no-store",
        "content-type": backendResponse.headers.get("content-type") ?? "application/json; charset=utf-8",
      },
    });
  } catch {
    return jsonResponse({ detail: "CRM indisponível. Tente novamente em instantes." }, 502);
  }
}
