import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { guidebookSlugs } from "../scripts/guidebook-slugs.mjs";

const root = process.cwd();
const contentDir = path.join(root, "src/content/guidebook/en");
const navFilePath = path.join(root, "src/components/guidebook/guidebook-nav.ts");

async function readDirectorySlugs() {
  const entries = await readdir(contentDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
    .map((entry) => entry.name.replace(/\.md$/, ""));
}

// Mirrors generate-sitemap.mjs's readLocales() regex-extraction pattern: a
// plain .mjs script can't import guidebook-nav.ts (TypeScript) directly, so
// this parses the guidebookNavGroups literal's slug entries the same way
// that file already parses locale-list.ts.
async function readGuidebookNavGroupsSlugs() {
  const source = await readFile(navFilePath, "utf8");
  return [...source.matchAll(/slug:\s*"([^"]+)",/g)].map((match) => match[1]);
}

function diffSets(labelA, setA, labelB, setB) {
  const onlyInA = setA.filter((slug) => !setB.includes(slug));
  const onlyInB = setB.filter((slug) => !setA.includes(slug));
  const failures = [];

  if (onlyInA.length > 0) {
    failures.push(`In ${labelA} but not ${labelB}: ${onlyInA.join(", ")}`);
  }

  if (onlyInB.length > 0) {
    failures.push(`In ${labelB} but not ${labelA}: ${onlyInB.join(", ")}`);
  }

  return failures;
}

const [directorySlugs, navSlugs] = await Promise.all([
  readDirectorySlugs(),
  readGuidebookNavGroupsSlugs()
]);

// Checks both guidebookNavGroups and guidebook-slugs.mjs against the
// filesystem (the ground truth) -- not just guidebookNavGroups against the
// directory. This closes the drift gap flagged during 000011-020's review:
// guidebook-slugs.mjs is a hand-synced literal with no prior automated check
// tying it back to either guidebookNavGroups or the actual content files.
const failures = [
  ...diffSets("guidebookNavGroups (guidebook-nav.ts)", navSlugs, "src/content/guidebook/en/", directorySlugs),
  ...diffSets("guidebook-slugs.mjs", [...guidebookSlugs], "src/content/guidebook/en/", directorySlugs)
];

if (failures.length > 0) {
  console.error("[check-guidebook-nav-registration] slug set mismatch detected:");
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `[check-guidebook-nav-registration] ${navSlugs.length} slugs consistent across guidebookNavGroups, guidebook-slugs.mjs, and the filesystem.`
);
