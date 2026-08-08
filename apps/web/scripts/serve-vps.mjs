import { createServer } from "node:http";
import { Readable } from "node:stream";

import worker from "../dist/server/index.js";
import { forwardLeadRequest, resolveClientIp } from "./lead-proxy.mjs";
import { serveStaticAsset } from "./static-assets.mjs";

const port = Number.parseInt(process.env.PORT ?? "3010", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}

const server = createServer(async (incoming, outgoing) => {
  try {
    const host = incoming.headers.host ?? `127.0.0.1:${port}`;
    const forwardedProto = incoming.headers["x-forwarded-proto"];
    const protocol = Array.isArray(forwardedProto)
      ? forwardedProto[0]
      : (forwardedProto ?? "http").split(",", 1)[0].trim();
    const url = new URL(incoming.url ?? "/", `${protocol}://${host}`);
    const method = incoming.method ?? "GET";
    const init = {
      method,
      headers: incoming.headers,
    };

    if (method !== "GET" && method !== "HEAD") {
      init.body = Readable.toWeb(incoming);
      init.duplex = "half";
    }

    const request = new Request(url, init);
    const staticResponse = await serveStaticAsset(request);
    const response = staticResponse ?? (url.pathname === "/api/leads"
      ? await forwardLeadRequest(request, {
          clientIp: resolveClientIp(request.headers, incoming.socket.remoteAddress ?? "unknown"),
        })
      : await worker.fetch(
        request,
        {
          ASSETS: {
            fetch: async () => new Response("Not Found", { status: 404 }),
          },
        },
        {
          waitUntil() {},
          passThroughOnException() {},
        },
      ));

    outgoing.statusCode = response.status;
    outgoing.statusMessage = response.statusText;
    response.headers.forEach((value, name) => outgoing.setHeader(name, value));

    if (!response.body || method === "HEAD") {
      outgoing.end();
      return;
    }

    Readable.fromWeb(response.body).pipe(outgoing);
  } catch (error) {
    console.error(error);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    outgoing.end("Internal Server Error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Insightfy site listening on http://127.0.0.1:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
