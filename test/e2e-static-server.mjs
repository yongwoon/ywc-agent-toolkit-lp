import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Zero-dependency static server for E2E tests.
 *
 * Mirrors GitHub Pages semantics for the static export in `out/`:
 * - `trailingSlash: true` -> `/en/` serves `out/en/index.html`
 * - a directory requested without a trailing slash redirects to add it
 * - any unknown path serves `out/404.html` with a real 404 status
 *
 * This keeps the tests faithful to production without a third-party dep or a
 * config file shipped into the deployed site.
 */

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const outDir = path.join(rootDir, "out");
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

function contentTypeFor(filePath) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

async function statKind(candidate) {
  try {
    const stats = await stat(candidate);
    if (stats.isFile()) {
      return "file";
    }
    if (stats.isDirectory()) {
      return "directory";
    }
    return "other";
  } catch {
    return "missing";
  }
}

async function resolveRequest(requestUrl) {
  const rawPath = (requestUrl ?? "/").split("?")[0].split("#")[0];
  const decodedPath = decodeURIComponent(rawPath);
  const normalized = path.posix.normalize(decodedPath);

  // Reject path traversal attempts outright.
  if (normalized.startsWith("..")) {
    return { status: 403 };
  }

  if (decodedPath.endsWith("/")) {
    const indexFile = path.join(outDir, normalized, "index.html");
    if ((await statKind(indexFile)) === "file") {
      return { status: 200, filePath: indexFile };
    }
    return { status: 404 };
  }

  const candidate = path.join(outDir, normalized);
  const kind = await statKind(candidate);

  if (kind === "file") {
    return { status: 200, filePath: candidate };
  }

  // A directory requested without a trailing slash: mirror trailingSlash: true.
  if (kind === "directory") {
    return { redirectTo: `${decodedPath}/` };
  }

  return { status: 404 };
}

const server = createServer(async (req, res) => {
  try {
    const result = await resolveRequest(req.url);

    if (result.redirectTo) {
      res.writeHead(308, { Location: result.redirectTo });
      res.end();
      return;
    }

    if (result.status === 200) {
      const body = await readFile(result.filePath);
      res.writeHead(200, { "Content-Type": contentTypeFor(result.filePath) });
      res.end(body);
      return;
    }

    if (result.status === 403) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    // Mirror GitHub Pages: unknown paths return 404.html with a 404 status.
    const notFoundPath = path.join(outDir, "404.html");
    if ((await statKind(notFoundPath)) === "file") {
      const body = await readFile(notFoundPath);
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(body);
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  }
});

if ((await statKind(outDir)) !== "directory") {
  console.error(
    `[e2e-static-server] Missing build output at ${outDir}. Run \`npm run build\` first.`
  );
  process.exit(1);
}

server.listen(port, () => {
  console.log(`[e2e-static-server] Serving ${outDir} at http://localhost:${port}`);
});
