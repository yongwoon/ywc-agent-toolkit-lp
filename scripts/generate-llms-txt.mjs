import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const cwd = process.cwd();
const repo = "yongwoon/ywc-agent-toolkit";
const catalogPath = path.join(cwd, "src/data/agent-catalog.json");
const llmsTxtPath = path.join(cwd, "public/llms.txt");

const CONCURRENCY = 8;
const FETCH_TIMEOUT_MS = 10_000;
const DESCRIPTION_MAX_LENGTH = 160;

const TOOLS = ["claude-code", "codex"];
// Rendering order for the llms.txt "## " sections.
const SECTION_ORDER = [
  { kind: "skill", tool: "claude-code", heading: "Skills (Claude Code)" },
  { kind: "agent", tool: "claude-code", heading: "Agents (Claude Code)" },
  { kind: "skill", tool: "codex", heading: "Skills (Codex)" },
  { kind: "agent", tool: "codex", heading: "Agents (Codex)" }
];

const EXCLUDED_AGENT_FILENAMES = new Set(["README.md", "CLAUDE.md", "AGENTS.md"]);

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ywc-agent-toolkit-lp-build"
  };

  // ponytail: optional auth reduces unauthenticated rate-limit hits in CI; the
  // cache fallback below still covers the case where no token is present.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchTree() {
  const response = await fetchWithTimeout(
    `https://api.github.com/repos/${repo}/git/trees/main?recursive=1`,
    { headers: githubHeaders() }
  );

  if (!response.ok) {
    throw new Error(`GitHub Trees API responded with ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.tree)) {
    throw new Error("GitHub Trees API response is missing a tree array");
  }

  return { sha: data.sha, paths: data.tree.map((entry) => entry.path) };
}

function isExcludedAgentFile(filename) {
  return EXCLUDED_AGENT_FILENAMES.has(filename) || /^README\..*\.md$/i.test(filename);
}

function matchCatalogEntries(paths) {
  const matches = [];

  for (const filePath of paths) {
    for (const tool of TOOLS) {
      const skillPrefix = `${tool}/skills/`;
      const agentPrefix = `${tool}/agents/`;

      if (filePath.startsWith(skillPrefix) && filePath.endsWith("/SKILL.md")) {
        matches.push({ kind: "skill", tool, path: filePath });
        continue;
      }

      if (filePath.startsWith(agentPrefix) && filePath.endsWith(".md")) {
        const filename = filePath.slice(agentPrefix.length);

        if (!filename.includes("/") && !isExcludedAgentFile(filename)) {
          matches.push({ kind: "agent", tool, path: filePath });
        }
      }
    }
  }

  return matches;
}

/**
 * Per FR3: description is derived from frontmatter `description`, cut at the
 * first `Triggers:`/`Do not use for:` marker, then truncated to the first
 * sentence boundary, hard-capped at DESCRIPTION_MAX_LENGTH.
 */
function truncateDescription(rawDescription) {
  const markerIndex = rawDescription.search(/Triggers:|Do not use for:/);
  const beforeMarkers = markerIndex === -1 ? rawDescription : rawDescription.slice(0, markerIndex);
  const normalized = beforeMarkers.trim().replace(/\s+/g, " ");

  if (normalized.length === 0) {
    return null;
  }

  const sentenceMatch = normalized.match(/^.*?\.(?=\s|$)/);
  const sentence = sentenceMatch ? sentenceMatch[0] : normalized;

  if (sentence.length <= DESCRIPTION_MAX_LENGTH) {
    return sentence;
  }

  return `${sentence.slice(0, DESCRIPTION_MAX_LENGTH)}…`;
}

async function fetchCatalogEntry(match) {
  const url = `https://raw.githubusercontent.com/${repo}/main/${match.path}`;
  const response = await fetchWithTimeout(url, { headers: githubHeaders() });

  if (response.status === 404) {
    // Entry disappeared between the tree call and this fetch (race).
    console.warn(`[generate-llms-txt] "${match.path}" is gone (404), skipping.`);
    return null;
  }

  if (!response.ok) {
    console.warn(`[generate-llms-txt] "${match.path}" fetch failed (${response.status}), skipping.`);
    return null;
  }

  const raw = await response.text();
  let frontmatter;

  try {
    ({ data: frontmatter } = matter(raw));
  } catch (error) {
    console.warn(
      `[generate-llms-txt] "${match.path}" has unparsable frontmatter (${error instanceof Error ? error.message : String(error)}), skipping.`
    );
    return null;
  }

  const name = typeof frontmatter.name === "string" && frontmatter.name.trim().length > 0
    ? frontmatter.name.trim()
    : path.basename(match.path, path.extname(match.path));

  let description = null;

  if (typeof frontmatter.description === "string") {
    description = truncateDescription(frontmatter.description);
  }

  if (description === null) {
    console.warn(`[generate-llms-txt] "${match.path}" has no usable description, falling back to name.`);
    description = name;
  }

  return { name, kind: match.kind, tool: match.tool, description, path: match.path };
}

async function fetchEntriesWithBoundedConcurrency(matches) {
  const entries = [];
  let cursor = 0;

  async function worker() {
    while (cursor < matches.length) {
      const match = matches[cursor];
      cursor += 1;
      const entry = await fetchCatalogEntry(match);

      if (entry !== null) {
        entries.push(entry);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  return entries;
}

async function readExistingCatalog() {
  try {
    const raw = await readFile(catalogPath, "utf8");
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed.entries)) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

async function buildCatalogFromLive() {
  const { sha, paths } = await fetchTree();
  const matches = matchCatalogEntries(paths);

  if (matches.length === 0) {
    throw new Error("Trees API returned zero matching skill/agent entries");
  }

  const entries = await fetchEntriesWithBoundedConcurrency(matches);

  if (entries.length === 0) {
    throw new Error("All matched entries failed to fetch");
  }

  return {
    generatedAt: new Date().toISOString(),
    sourceCommit: sha,
    entries
  };
}

function renderLlmsTxt(catalog) {
  const byKindAndTool = (kind, tool) =>
    catalog.entries
      .filter((entry) => entry.kind === kind && entry.tool === tool)
      .sort((a, b) => a.name.localeCompare(b.name));

  const skillCount = catalog.entries.filter((entry) => entry.kind === "skill").length;
  const agentCount = catalog.entries.filter((entry) => entry.kind === "agent").length;

  const lines = [
    "# ywc-agent-toolkit",
    "",
    `> ${skillCount} skills and ${agentCount} agents for Claude Code and Codex — a distribution toolkit published on GitHub.`,
    ""
  ];

  for (const section of SECTION_ORDER) {
    const sectionEntries = byKindAndTool(section.kind, section.tool);
    lines.push(`## ${section.heading}`, "");

    for (const entry of sectionEntries) {
      const blobUrl = `https://github.com/${repo}/blob/main/${entry.path}`;
      lines.push(`- [${entry.name}](${blobUrl}): ${entry.description}`);
    }

    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

const existingCatalog = await readExistingCatalog();
let catalog = existingCatalog;
let source = "cached";

try {
  catalog = await buildCatalogFromLive();
  source = "github-api";
} catch (error) {
  console.warn(
    `[generate-llms-txt] could not build catalog from GitHub (${error instanceof Error ? error.message : String(error)}), ` +
      `falling back to ${existingCatalog ? "cached" : "empty"} catalog.`
  );

  if (existingCatalog === null) {
    catalog = { generatedAt: new Date().toISOString(), sourceCommit: null, entries: [] };
    source = "fallback";
  }
}

if (source === "github-api") {
  await mkdir(path.dirname(catalogPath), { recursive: true });
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
}

await mkdir(path.dirname(llmsTxtPath), { recursive: true });
await writeFile(llmsTxtPath, renderLlmsTxt(catalog));

console.log(
  `[generate-llms-txt] wrote ${catalog.entries.length} entries to llms.txt (source: ${source}).`
);
