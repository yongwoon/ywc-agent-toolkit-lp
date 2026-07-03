import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["src/content/guidebook", "src/data"];
const forbiddenPatterns = [
  /tools\/claude-code\/(?:skills|agents)\//,
  /tools\/codex-skill\/skills\//,
  /tools\/claude-code\/skills\/<skill-name>\/SKILL\.md/
];

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (/\.(md|json)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const failures = [];

for (const scanRoot of scanRoots) {
  const files = await collectFiles(path.join(root, scanRoot));

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const relativePath = path.relative(root, file);

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(source)) {
        failures.push(`${relativePath}: ${pattern}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Guidebook content contains stale source-repository paths:");
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("[check-guidebook-paths] source repository paths are current.");
