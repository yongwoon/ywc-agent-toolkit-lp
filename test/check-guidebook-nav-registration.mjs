import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { guidebookSlugs } from "../scripts/guidebook-slugs.mjs";

const root = process.cwd();
const contentDir = path.join(root, "src/content/guidebook/en");
const navFilePath = path.join(root, "src/components/guidebook/guidebook-nav.ts");
const navFileLabel = "guidebookNavGroups (src/components/guidebook/guidebook-nav.ts)";
const guidebookSlugsLabel = "guidebook-slugs.mjs (scripts/guidebook-slugs.mjs)";
const directoryLabel = "src/content/guidebook/en/";

async function readDirectorySlugs() {
  const entries = await readdir(contentDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
    .map((entry) => entry.name.replace(/\.md$/, ""));
}

// Mirrors generate-sitemap.mjs's readLocales() regex-extraction pattern: a
// plain .mjs script can't import guidebook-nav.ts (TypeScript) directly, so
// this parses the guidebookNavGroups literal's slug entries the same way
// that file already parses locale-list.ts. No trailing-comma requirement in
// the pattern -- a formatter dropping the last entry's trailing comma should
// not change the match count. Guards against a silent 0-match parse (e.g. a
// future reformat of guidebook-nav.ts's object-literal style breaking the
// regex) the same way readLocales() guards its own zero-match case, so a
// broken parser fails loud with a specific message instead of misreporting
// every filesystem slug as "missing from guidebookNavGroups".
async function readGuidebookNavGroupsSlugs() {
  const source = await readFile(navFilePath, "utf8");
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

  if (slugs.length === 0) {
    throw new Error(
      `No slug entries found in ${navFilePath} -- the regex parser may be out of sync with guidebook-nav.ts's current formatting.`
    );
  }

  return slugs;
}

function diffSets({ labelA, setA, labelB, setB }) {
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
// (A direct navSlugs-vs-guidebookSlugs comparison is intentionally omitted:
// since both are already checked against the same filesystem ground truth,
// any divergence between them necessarily surfaces as one of them diverging
// from the filesystem too -- adding a third comparison would be dead code.)
//
// Note on prebuild ordering: generate-search-index.mjs (which runs earlier
// in the prebuild chain) already hard-throws if a guidebook-slugs.mjs entry
// has no matching file, so that specific direction is normally caught
// upstream of this script. This check still owns it independently -- and
// owns the orphan-file and guidebookNavGroups directions outright -- so
// reordering the prebuild chain must not silently change failure coverage.
const failures = [
  ...diffSets({ labelA: navFileLabel, setA: navSlugs, labelB: directoryLabel, setB: directorySlugs }),
  ...diffSets({ labelA: guidebookSlugsLabel, setA: [...guidebookSlugs], labelB: directoryLabel, setB: directorySlugs })
];

if (failures.length > 0) {
  console.error("[check-guidebook-nav-registration] slug set mismatch detected:");
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  console.error(
    "Fix by syncing guidebookNavGroups (guidebook-nav.ts), guidebook-slugs.mjs, and src/content/guidebook/en/*.md to register/remove the same slugs."
  );
  process.exit(1);
}

console.log(
  `[check-guidebook-nav-registration] ${navSlugs.length} slugs consistent across guidebookNavGroups, guidebook-slugs.mjs, and the filesystem.`
);
