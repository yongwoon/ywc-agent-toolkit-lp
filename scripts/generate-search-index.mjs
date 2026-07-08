import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { guidebookSlugs } from "./guidebook-slugs.mjs";

const cwd = process.cwd();
const contentDir = path.join(cwd, "src/content/guidebook");
const outputDir = path.join(cwd, "src/data");
const locales = ["en", "ko", "ja", "zh", "es"];

// Mirrors extractFirstHeadingTitle/extractFirstParagraphText/toPlainText in
// src/lib/guidebook-content.ts. Duplicated rather than imported: this is a plain
// Node .mjs script and that file is TypeScript, which Node can't import directly
// (see generate-sitemap.mjs for the same constraint/pattern).
function toPlainText(nodes) {
  return nodes
    .map((node) => {
      if ("value" in node && typeof node.value === "string") {
        return node.value;
      }

      if ("alt" in node && typeof node.alt === "string") {
        return node.alt;
      }

      if ("children" in node && Array.isArray(node.children)) {
        return toPlainText(node.children);
      }

      return "";
    })
    .join(" ");
}

function extractTitleAndSummary(markdown) {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown);
  let title;
  let summary;
  let seenTitle = false;

  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 1 && title === undefined) {
      title = toPlainText(node.children).trim().replace(/\s+/g, " ");
      seenTitle = true;
      continue;
    }

    if (seenTitle && node.type === "paragraph" && summary === undefined) {
      const text = toPlainText(node.children).trim().replace(/\s+/g, " ");

      if (text.length > 0) {
        summary = (text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text).trim();
      }
    }
  }

  return { title, summary };
}

let totalEntries = 0;

await mkdir(outputDir, { recursive: true });

for (const locale of locales) {
  const entries = [];

  for (const slug of guidebookSlugs) {
    const filePath = path.join(contentDir, locale, `${slug}.md`);
    const source = await readFile(filePath, "utf8");
    const { title, summary } = extractTitleAndSummary(source);

    entries.push({
      slug,
      title: title ?? slug,
      summary: summary ?? ""
    });
  }

  await writeFile(
    path.join(outputDir, `guidebook-search.${locale}.json`),
    `${JSON.stringify(entries, null, 2)}\n`
  );
  totalEntries += entries.length;
}

console.log(`[generate-search-index] wrote ${totalEntries} entries across ${locales.length} locales.`);
