import { readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const outDir = path.join(process.cwd(), "out");
const htmlPath = path.join(outDir, "en/index.html");
const jsBudgetBytes = 150 * 1024;
const cssBudgetBytes = 30 * 1024;
// Matches the GitHub Pages deploy build's next.config.ts basePath, if any: asset URLs
// in the HTML are prefixed (e.g. "/ywc-agent-toolkit-lp/_next/..."), but the physical
// files still live at out/_next/..., so the prefix must be stripped before joining.
const basePath = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/ywc-agent-toolkit-lp" : "";

function unique(values) {
  return Array.from(new Set(values));
}

function stripBasePath(assetPath) {
  return basePath && assetPath.startsWith(basePath)
    ? assetPath.slice(basePath.length)
    : assetPath;
}

async function gzipSizeFromOut(assetPath) {
  const absolutePath = path.join(outDir, stripBasePath(assetPath).replace(/^\//, ""));
  return gzipSync(await readFile(absolutePath)).length;
}

const html = await readFile(htmlPath, "utf8");
const jsAssets = unique(
  Array.from(html.matchAll(/<script[^>]+src="([^"]+)"/g), (match) => match[1]).filter((src) =>
    stripBasePath(src).startsWith("/_next/")
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
