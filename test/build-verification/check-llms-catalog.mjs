import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "../..");
const outLlmsTxtPath = path.join(rootDir, "out/llms.txt");
const catalogPath = path.join(rootDir, "src/data/agent-catalog.json");
const llmsTxtPath = path.join(rootDir, "public/llms.txt");
const fetchOverridePath = path.join(currentDir, "force-network-failure.mjs");

let failed = false;

function assert(condition, message) {
  if (!condition) {
    failed = true;
    console.error(`[check-llms-catalog] FAIL: ${message}`);
  } else {
    console.log(`[check-llms-catalog] OK: ${message}`);
  }
}

// --- 1. out/llms.txt exists at the site root (not locale-prefixed) and follows the llms.txt structure ---

async function verifyExportedArtifact() {
  const stats = await stat(outLlmsTxtPath).catch(() => null);
  assert(stats?.isFile(), "out/llms.txt exists at the site root");

  if (!stats?.isFile()) {
    return;
  }

  const content = await readFile(outLlmsTxtPath, "utf8");
  const lines = content.split("\n");

  assert(lines[0] === "# ywc-agent-toolkit", "starts with the H1 title");
  assert(lines[2]?.startsWith(">") && /\d+ skills and \d+ agents/.test(lines[2]), "blockquote states live discovered counts");

  const expectedSections = [
    "## Skills (Claude Code)",
    "## Agents (Claude Code)",
    "## Skills (Codex)",
    "## Agents (Codex)"
  ];

  for (const heading of expectedSections) {
    assert(content.includes(heading), `contains section "${heading}"`);
  }

  const entryLines = lines.filter((line) => line.startsWith("- ["));
  assert(entryLines.length > 0, "at least one non-empty catalog entry rendered");

  const entryPattern = /^- \[[^\]]+\]\(https:\/\/github\.com\/yongwoon\/ywc-agent-toolkit\/blob\/main\/[^)]+\): .+$/;
  const malformed = entryLines.filter((line) => !entryPattern.test(line));
  assert(malformed.length === 0, "every entry uses the canonical GitHub blob URL, not the raw URL");
}

// --- 2. forced network failure still yields a successful prebuild, regenerated from cache ---

async function verifyNetworkFailureFallback() {
  const catalogBackup = await readFile(catalogPath, "utf8").catch(() => null);
  const llmsTxtBackup = await readFile(llmsTxtPath, "utf8").catch(() => null);

  assert(catalogBackup !== null, "committed src/data/agent-catalog.json exists as the fallback source");

  try {
    const result = spawnSync(
      process.execPath,
      ["--import", fetchOverridePath, "scripts/generate-llms-txt.mjs"],
      { cwd: rootDir, encoding: "utf8" }
    );

    assert(result.status === 0, "generate-llms-txt.mjs exits 0 when GitHub is unreachable");
    assert(/falling back to cached catalog/.test(result.stderr ?? ""), "logs a fallback warning naming the cause");

    const regenerated = await readFile(llmsTxtPath, "utf8").catch(() => null);
    assert(regenerated !== null && regenerated.length > 0, "public/llms.txt is regenerated (non-empty) from the cache");

    if (catalogBackup !== null) {
      const catalogAfter = await readFile(catalogPath, "utf8");
      assert(catalogAfter === catalogBackup, "cache file is left untouched on fallback (no empty-catalog overwrite)");
    }
  } finally {
    // Restore whatever the pre-test workspace had, regardless of assertion outcome.
    if (llmsTxtBackup !== null) {
      await writeFile(llmsTxtPath, llmsTxtBackup);
    }
    if (catalogBackup !== null) {
      await writeFile(catalogPath, catalogBackup);
    }
  }
}

await verifyExportedArtifact();
await verifyNetworkFailureFallback();

if (failed) {
  console.error("[check-llms-catalog] one or more assertions failed.");
  process.exit(1);
}

console.log("[check-llms-catalog] all assertions passed.");
