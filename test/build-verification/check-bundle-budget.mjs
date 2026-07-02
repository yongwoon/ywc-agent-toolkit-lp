import { readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const outDir = path.join(process.cwd(), "out");
const htmlPath = path.join(outDir, "en/index.html");
const jsBudgetBytes = 150 * 1024;
const cssBudgetBytes = 30 * 1024;

function unique(values) {
  return Array.from(new Set(values));
}

async function gzipSizeFromOut(assetPath) {
  const absolutePath = path.join(outDir, assetPath.replace(/^\//, ""));
  return gzipSync(await readFile(absolutePath)).length;
}

const html = await readFile(htmlPath, "utf8");
const jsAssets = unique(
  Array.from(html.matchAll(/<script[^>]+src="([^"]+)"/g), (match) => match[1]).filter((src) =>
    src.startsWith("/_next/")
  )
);
const cssAssets = unique(
  Array.from(
    html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g),
    (match) => match[1]
  )
);

const jsTotal = (await Promise.all(jsAssets.map(gzipSizeFromOut))).reduce((sum, size) => sum + size, 0);
const cssTotal = (await Promise.all(cssAssets.map(gzipSizeFromOut))).reduce((sum, size) => sum + size, 0);

console.log(`[check-bundle-budget] JS gzip: ${(jsTotal / 1024).toFixed(1)} KB`);
console.log(`[check-bundle-budget] CSS gzip: ${(cssTotal / 1024).toFixed(1)} KB`);

if (jsTotal > jsBudgetBytes || cssTotal > cssBudgetBytes) {
  console.error("[check-bundle-budget] budget exceeded: JS <= 150 KB, CSS <= 30 KB required for /en/.");
  process.exit(1);
}
