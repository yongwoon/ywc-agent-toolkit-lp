// Writes a plain-Markdown copy of every guidebook page next to its HTML route
// (out/{locale}/guidebook/{slug}.md) so LLMs and bots can read the guide
// without parsing the rendered page. The source files link to each other as
// "./NN-slug.md" and "./README.md", so serving them side by side keeps every
// cross-page link working unchanged. public/llms.txt indexes the English set.
//
// The sources embed a few JSX components (see guidebook-mdx.tsx); each is
// rewritten to the Markdown it stands for. A page that still contains a JSX
// tag afterwards fails the build, which is how a newly added component gets
// noticed here.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { guidebookSlugs } from "./guidebook-slugs.mjs";

const cwd = process.cwd();
const contentDir = path.join(cwd, "src/content/guidebook");
const outDir = path.join(cwd, "out");

// README.md is the table of contents every page links back to.
const PAGE_NAMES = ["README", ...guidebookSlugs];
const FENCE = /(^```[\s\S]*?^```[^\n]*$)/m;
const ATTRS = '((?:\\s+\\w+="[^"]*")*)';
const ENTITIES = { "&quot;": '"', "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#39;": "'" };

function decodeEntities(text) {
  return text.replace(/&(?:quot|amp|lt|gt|#39);/g, (entity) => ENTITIES[entity]);
}

function readAttribute(attributes, name) {
  const match = attributes.match(new RegExp(`\\b${name}="([^"]*)"`));
  return match ? decodeEntities(match[1]) : undefined;
}

// <CodeBlock label="…" code="…" /> -> fenced block. `label` and `prompt` are
// visual chrome (the tab label already names the tool) and are dropped.
function convertCodeBlocks(text) {
  return text.replace(
    new RegExp(`^[ \\t]*<CodeBlock${ATTRS}\\s*/>[ \\t]*$`, "gm"),
    (_, attributes) => `\`\`\`\n${readAttribute(attributes, "code") ?? ""}\n\`\`\``
  );
}

// Most ToolTabs show the same command for both tools; emit it once then.
function convertToolTabs(text) {
  return text.replace(/^[ \t]*<ToolTabs>\n([\s\S]*?)^[ \t]*<\/ToolTabs>[ \t]*$/gm, (_, inner) => {
    const panels = Array.from(
      inner.matchAll(new RegExp(`<ToolTabsPanel${ATTRS}\\s*>\\n([\\s\\S]*?)<\\/ToolTabsPanel>`, "g")),
      ([, attributes, body]) => ({
        label: readAttribute(attributes, "label") ?? readAttribute(attributes, "tool") ?? "",
        body: convertCodeBlocks(body.replace(/^[ \t]+/gm, ""))
          .trim()
          .replace(/```\n```/g, "```\n\n```")
      })
    );
    const isSameForAllTools = panels.every((panel) => panel.body === panels[0]?.body);

    return isSameForAllTools
      ? (panels[0]?.body ?? "")
      : panels.map((panel) => `**${panel.label}**\n\n${panel.body}`).join("\n\n");
  });
}

// <FlowDiagram> -> nested list: a step is an item, a branch is a bold item
// with its steps indented, a chain is one item joined by arrows.
function convertFlowDiagrams(text, filePath) {
  return text.replace(/^<FlowDiagram>\n([\s\S]*?)^<\/FlowDiagram>$/gm, (_, inner) => {
    const lines = [];
    let depth = 0;

    for (const rawLine of inner.split("\n")) {
      const line = rawLine.trim();
      const indent = "  ".repeat(depth);
      const branch = line.match(/^<FlowBranch label="([^"]*)">$/);
      const step = line.match(/^<FlowStep>(.*)<\/FlowStep>$/);
      const chain = line.match(/^<FlowChain items="([^"]*)" \/>$/);

      if (branch) {
        lines.push(`${indent}- **${decodeEntities(branch[1])}**`);
        depth += 1;
      } else if (line === "</FlowBranch>") {
        depth -= 1;
      } else if (step) {
        lines.push(`${indent}- ${step[1]}`);
      } else if (chain) {
        lines.push(`${indent}- ${decodeEntities(chain[1]).split(/\s*,\s*/).join(" → ")}`);
      } else if (line !== "") {
        throw new Error(`[generate-guidebook-markdown] unrecognized FlowDiagram line in ${filePath}: ${line}`);
      }
    }

    return lines.join("\n");
  });
}

function toPlainMarkdown(source, filePath) {
  // Odd segments are fenced code blocks and pass through untouched.
  const segments = source.replace(/^---\n[\s\S]*?\n---\n+/, "").split(new RegExp(FENCE, "gm"));
  const converted = segments.map((segment, index) =>
    index % 2 === 1
      ? segment
      : convertCodeBlocks(convertToolTabs(convertFlowDiagrams(segment, filePath)))
  );
  // Block-level JSX always starts a line with an uppercase tag; placeholders
  // such as `<N>` only appear inside inline code.
  const leftover = converted
    .filter((_, index) => index % 2 === 0)
    .join("\n")
    .match(/^[ \t]*<\/?[A-Z][A-Za-z]*/m);

  if (leftover) {
    throw new Error(
      `[generate-guidebook-markdown] ${filePath} still contains "${leftover[0].trim()}"; ` +
        "add a rule for that component in scripts/generate-guidebook-markdown.mjs"
    );
  }

  return `${converted.join("").trim()}\n`;
}

async function readLocales() {
  const entries = await readdir(contentDir, { withFileTypes: true });
  // Tool caches (.omc, .ruff_cache) can sit beside the locale directories.
  return entries
    .filter((entry) => entry.isDirectory() && /^[a-z]{2}$/.test(entry.name))
    .map((entry) => entry.name);
}

const locales = await readLocales();

if (locales.length === 0) {
  throw new Error(`[generate-guidebook-markdown] no locale directories under ${contentDir}`);
}

for (const locale of locales) {
  const targetDir = path.join(outDir, locale, "guidebook");
  await mkdir(targetDir, { recursive: true });

  for (const name of PAGE_NAMES) {
    const filePath = path.join(contentDir, locale, `${name}.md`);
    // A missing source fails the build: the HTML page links to this file.
    const source = await readFile(filePath, "utf8");
    await writeFile(path.join(targetDir, `${name}.md`), toPlainMarkdown(source, filePath));
  }
}

console.log(
  `[generate-guidebook-markdown] wrote ${locales.length * PAGE_NAMES.length} Markdown pages ` +
    `(${locales.length} locales x ${PAGE_NAMES.length} pages).`
);
