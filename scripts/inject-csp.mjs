import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");
const cspMetaPattern =
  /<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*\/?>/i;

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b, "en"));
}

function collectInlineScriptHashes(html) {
  const hashes = new Set();
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = scriptPattern.exec(html)) !== null) {
    const [, attrs, body] = match;

    if (/\ssrc\s*=/.test(attrs)) {
      continue;
    }

    hashes.add(
      `'sha256-${createHash("sha256").update(body).digest("base64")}'`
    );
  }

  return Array.from(hashes).sort((a, b) => a.localeCompare(b, "en"));
}

function buildCspContent(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://img.shields.io",
    "font-src 'self'",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests"
  ].join("; ");
}

async function injectCsp(filePath) {
  const originalHtml = await readFile(filePath, "utf8");
  const htmlWithoutCsp = originalHtml.replace(cspMetaPattern, "");
  const hashes = collectInlineScriptHashes(htmlWithoutCsp);
  const content = buildCspContent(hashes);
  const meta = `<meta http-equiv="Content-Security-Policy" content="${content}">`;

  if (!htmlWithoutCsp.includes("<head>")) {
    throw new Error(`Cannot inject CSP meta; <head> not found in ${filePath}`);
  }

  await writeFile(filePath, htmlWithoutCsp.replace("<head>", `<head>${meta}`));

  return hashes.length;
}

const htmlFiles = await listHtmlFiles(outDir);
let inlineScriptCount = 0;

for (const filePath of htmlFiles) {
  inlineScriptCount += await injectCsp(filePath);
}

console.log(
  `[inject-csp] injected hash-based CSP into ${htmlFiles.length} HTML files (${inlineScriptCount} inline script hashes).`
);
