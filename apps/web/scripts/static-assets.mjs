import { readFile, stat } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const clientRoot = fileURLToPath(new URL("../dist/client/", import.meta.url));
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".avif", "image/avif"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".map", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

export function contentTypeForPath(pathname) {
  return contentTypes.get(extname(pathname).toLowerCase()) ?? "application/octet-stream";
}

export function cacheControlForPath(pathname) {
  return pathname.startsWith("/assets/")
    ? "public, max-age=31536000, immutable"
    : "public, max-age=3600, must-revalidate";
}

export async function serveStaticAsset(request) {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url).pathname);
  } catch {
    return null;
  }
  if (pathname === "/" || pathname.endsWith("/")) return null;
  const target = resolve(clientRoot, `.${pathname}`);
  const pathFromRoot = relative(clientRoot, target);
  if (!pathFromRoot || pathFromRoot.startsWith("..") || pathFromRoot.includes("\0")) return null;
  try {
    const metadata = await stat(target);
    if (!metadata.isFile()) return null;
    return new Response(request.method === "HEAD" ? null : await readFile(target), {
      status: 200,
      headers: {
        "cache-control": cacheControlForPath(pathname),
        "content-length": String(metadata.size),
        "content-type": contentTypeForPath(target),
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return null;
  }
}
