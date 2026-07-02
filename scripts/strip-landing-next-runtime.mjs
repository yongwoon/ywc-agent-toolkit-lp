import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const locales = ["en", "ja", "ko", "zh", "es"];

function stripNextRuntime(html) {
  return html
    .replace(
      /<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="script")(?=[^>]*\bhref="\/_next\/[^"]+")[^>]*\/?>/g,
      ""
    )
    .replace(/<script\b[^>]*\bsrc="\/_next\/[^"]+"[^>]*><\/script>/g, "")
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
