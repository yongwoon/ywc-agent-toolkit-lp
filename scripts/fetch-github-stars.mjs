import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const repo = "yongwoon/ywc-agent-toolkit";
const outputPath = path.join(cwd, "src/data/github-stats.json");

async function readExistingStars() {
  try {
    const raw = await readFile(outputPath, "utf8");
    return JSON.parse(raw).stars;
  } catch {
    return null;
  }
}

async function fetchStars() {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "ywc-agent-toolkit-lp-build"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const data = await response.json();
  return data.stargazers_count;
}

const existingStars = await readExistingStars();
let stars = existingStars;
let source = "cached";

try {
  stars = await fetchStars();
  source = "github-api";
} catch (error) {
  if (existingStars === null) {
    stars = 0;
    source = "fallback";
  }

  console.warn(
    `[fetch-github-stars] could not reach GitHub API (${error instanceof Error ? error.message : String(error)}), ` +
      `using ${source} value ${stars}.`
  );
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({ stars }, null, 2)}\n`);

console.log(`[fetch-github-stars] wrote ${stars} stars for ${repo} (source: ${source}).`);
