import { readFile } from "node:fs/promises";
import path from "node:path";

// Fails the build when the skill/agent counts quoted in the landing messages drift
// from the catalog generated out of ywc-agent-toolkit (src/data/agent-catalog.json).
const cwd = process.cwd();
const locales = ["en", "ja", "ko", "zh", "es"];

const catalog = JSON.parse(await readFile(path.join(cwd, "src/data/agent-catalog.json"), "utf8"));

const names = (kind, tool) =>
  new Set(catalog.entries.filter((e) => e.kind === kind && e.tool === tool).map((e) => e.name));

const claudeSkills = names("skill", "claude-code");
const codexSkills = names("skill", "codex");
const sharedSkills = [...claudeSkills].filter((name) => codexSkills.has(name)).length;
const allowedAgents = new Set([names("agent", "claude-code").size, names("agent", "codex").size]);

function leaves(value, keyPath = "") {
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${keyPath}[${i}]`));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, keyPath ? `${keyPath}.${k}` : k));
  }
  return typeof value === "string" ? [{ keyPath, text: value }] : [];
}

const failures = [];

for (const locale of locales) {
  const messages = JSON.parse(await readFile(path.join(cwd, `src/messages/${locale}.json`), "utf8"));
  let gridSum = 0;

  for (const { keyPath, text } of leaves(messages)) {
    // Feature Grid category tiles ("value": "10 skills") partition the shared set.
    if (keyPath.endsWith(".value") && /^\d+ skills$/.test(text)) {
      gridSum += Number.parseInt(text, 10);
      continue;
    }

    // "(?! propios)" skips the es phrase "3 skills propios de la herramienta" (tool-specific count).
    for (const m of text.matchAll(/(\d+)(?: 个)? skills\b(?! propios)/g)) {
      if (Number(m[1]) !== sharedSkills) {
        failures.push(`${locale}: ${keyPath} says "${m[0]}", expected ${sharedSkills} shared skills`);
      }
    }

    for (const m of text.matchAll(/(\d+) (?:custom )?agents\b/g)) {
      if (!allowedAgents.has(Number(m[1]))) {
        failures.push(`${locale}: ${keyPath} says "${m[0]}", expected one of ${[...allowedAgents].join("/")}`);
      }
    }
  }

  if (gridSum !== sharedSkills) {
    failures.push(`${locale}: feature grid skill tiles sum to ${gridSum}, expected ${sharedSkills}`);
  }
}

if (failures.length > 0) {
  console.error("[check-toolkit-counts] messages drift from the toolkit catalog:");
  failures.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}

console.log(
  `[check-toolkit-counts] ${locales.length} locales match catalog (shared skills ${sharedSkills}, agents ${[...allowedAgents].join("/")}).`
);
