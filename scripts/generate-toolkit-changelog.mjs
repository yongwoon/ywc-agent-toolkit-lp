import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const repo = "yongwoon/ywc-agent-toolkit";
const changelogUrl = `https://raw.githubusercontent.com/${repo}/main/CHANGELOG.md`;
const outputPath = path.join(cwd, "src/data/toolkit-changelog.json");

const MAX_ENTRIES = 5;
const MAX_HIGHLIGHTS = 3;
const HIGHLIGHT_MAX_LENGTH = 140;
// Matches "## [X.Y.Z] (date)" and "## [X.Y.Z](url) (date)" — the two heading
// shapes release-please produces; `## Unreleased` has no date and is dropped
// by construction (no special-cased string match needed).
const HEADING_PATTERN = /^\[(\d+\.\d+\.\d+)\](?:\([^)]*\))?\s*\((\d{4}-\d{2}-\d{2})\)/;
const SUBSECTION_PRIORITY = ["Added", "Changed", "Fixed"];
const BULLET_PATTERN = /^[*-]\s+(.*)$/;
// Strips trailing " ([#NNN](...)) ([hash](...))" PR/commit-link noise.
const TRAILING_LINK_NOISE = /(\s*\(\[[^\]]+\]\([^)]*\)\))+\s*$/;

function slugifyHeading(version, date) {
  return `${version.replace(/\./g, "")}-${date}`;
}

/**
 * Pure parser: splits Keep a Changelog text on `^## ` headings and keeps only
 * blocks with a version token and a trailing date, per FR2/FR3.
 */
export function parseChangelog(text) {
  const blocks = text.split(/^## /m).slice(1);
  const entries = [];

  for (const block of blocks) {
    const firstNewline = block.indexOf("\n");
    const heading = (firstNewline === -1 ? block : block.slice(0, firstNewline)).trim();
    const body = firstNewline === -1 ? "" : block.slice(firstNewline + 1);

    const match = heading.match(HEADING_PATTERN);
    if (!match) {
      continue;
    }

    const [, version, date] = match;
    const highlights = extractHighlights(body);

    entries.push({
      version,
      date,
      url: `https://github.com/${repo}/blob/main/CHANGELOG.md#${slugifyHeading(version, date)}`,
      highlights
    });

    if (entries.length >= MAX_ENTRIES) {
      break;
    }
  }

  return entries;
}

function extractHighlights(blockBody) {
  const subsections = splitSubsections(blockBody);
  const highlights = [];

  for (const name of SUBSECTION_PRIORITY) {
    for (const line of subsections[name] ?? []) {
      if (highlights.length >= MAX_HIGHLIGHTS) {
        return highlights;
      }
      highlights.push(truncateHighlight(line));
    }
  }

  return highlights;
}

function splitSubsections(blockBody) {
  const lines = blockBody.split("\n");
  const subsections = {};
  let current = null;

  for (const line of lines) {
    const headingMatch = line.match(/^### (\w+)/);
    if (headingMatch) {
      current = headingMatch[1];
      continue;
    }

    if (current === null) {
      continue;
    }

    const bulletMatch = line.match(BULLET_PATTERN);
    if (bulletMatch) {
      (subsections[current] ??= []).push(bulletMatch[1].trim());
    }
  }

  return subsections;
}

function truncateHighlight(line) {
  const stripped = line.replace(TRAILING_LINK_NOISE, "").trim();

  if (stripped.length <= HIGHLIGHT_MAX_LENGTH) {
    return stripped;
  }

  return `${stripped.slice(0, HIGHLIGHT_MAX_LENGTH)}…`;
}

async function readExistingCatalog() {
  try {
    const raw = await readFile(outputPath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.entries) ? parsed : null;
  } catch {
    return null;
  }
}

async function fetchChangelog() {
  const response = await fetch(changelogUrl, {
    headers: { "User-Agent": "ywc-agent-toolkit-lp-build" }
  });

  if (!response.ok) {
    throw new Error(`CHANGELOG.md fetch responded with ${response.status}`);
  }

  return response.text();
}

async function main() {
  const existingCatalog = await readExistingCatalog();
  let catalog = existingCatalog;
  let source = "cached";

  try {
    const text = await fetchChangelog();
    const entries = parseChangelog(text);

    if (entries.length === 0) {
      throw new Error("no dated release entries found in CHANGELOG.md");
    }

    catalog = { generatedAt: new Date().toISOString(), entries };
    source = "github-raw";
  } catch (error) {
    console.warn(
      `[generate-toolkit-changelog] could not build changelog from GitHub (${error instanceof Error ? error.message : String(error)}), ` +
        `falling back to ${existingCatalog ? "cached" : "empty"} catalog.`
    );

    if (existingCatalog === null) {
      catalog = { generatedAt: new Date().toISOString(), entries: [] };
      source = "fallback";
    }
  }

  if (source === "github-raw") {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
  }

  console.log(
    `[generate-toolkit-changelog] wrote ${catalog.entries.length} entries to toolkit-changelog.json (source: ${source}).`
  );
}

// Only run the fetch/write side effects when invoked directly (`node
// scripts/generate-toolkit-changelog.mjs`), not when `parseChangelog` is
// imported for testing.
if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
