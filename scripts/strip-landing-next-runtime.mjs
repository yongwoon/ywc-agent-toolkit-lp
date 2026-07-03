import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const locales = ["en", "ja", "ko", "zh", "es"];
// Matches the GitHub Pages deploy build's next.config.ts basePath, if any, so the
// generated _next/ asset URLs are still recognized when GITHUB_PAGES=true prefixes them.
const basePath = process.env.GITHUB_PAGES === "true" ? "/ywc-agent-toolkit-lp" : "";
const nextAssetPathPattern = `${basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/_next/`;

function stripNextRuntime(html) {
  return html
    .replace(
      new RegExp(
        `<link\\b(?=[^>]*\\brel="preload")(?=[^>]*\\bas="script")(?=[^>]*\\bhref="${nextAssetPathPattern}[^"]+")[^>]*\\/?>`,
        "g"
      ),
      ""
    )
    .replace(
      new RegExp(`<script\\b[^>]*\\bsrc="${nextAssetPathPattern}[^"]+"[^>]*></script>`, "g"),
      ""
    )
    .replace(/<script>\s*\(?self\.__next_f[\s\S]*?<\/script>/g, "");
}

let strippedCount = 0;

for (const locale of locales) {
  const htmlPath = path.join(outDir, locale, "index.html");
  const originalHtml = await readFile(htmlPath, "utf8");
  const strippedHtml = stripNextRuntime(originalHtml);

  if (strippedHtml !== originalHtml) {
    await writeFile(htmlPath, strippedHtml);
    strippedCount += 1;
  }
}

console.log(`[strip-landing-next-runtime] stripped Next runtime from ${strippedCount} locale home pages.`);
