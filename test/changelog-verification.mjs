import { parseChangelog } from "../scripts/generate-toolkit-changelog.mjs";

let failed = false;

function assert(condition, message) {
  if (!condition) {
    failed = true;
    console.error(`[changelog-verification] FAIL: ${message}`);
  } else {
    console.log(`[changelog-verification] OK: ${message}`);
  }
}

const FIXTURE = `# Changelog

## Unreleased

### Added

* **ywc-architecture-invariants:** distribute the optional architecture contract validator.

## [1.32.0] (2026-08-12)

### Added

* **context safety:** add executable evaluation coverage.

### Changed

* **Codex distribution:** synchronize the eight affected skills.

## [1.31.0](https://github.com/yongwoon/ywc-agent-toolkit/compare/v1.30.1...v1.31.0) (2026-07-30)

### Added

* add ywc-adr skill ([#155](https://github.com/yongwoon/ywc-agent-toolkit/issues/155)) ([39b68a5](https://github.com/yongwoon/ywc-agent-toolkit/commit/39b68a5))
* **ywc-brainstorm:** add self-review pass ([#158](https://github.com/yongwoon/ywc-agent-toolkit/issues/158)) ([b3bb65d](https://github.com/yongwoon/ywc-agent-toolkit/commit/b3bb65d))
* **ywc-plan:** add pre-check section ([#157](https://github.com/yongwoon/ywc-agent-toolkit/issues/157)) ([a0d885b](https://github.com/yongwoon/ywc-agent-toolkit/commit/a0d885b))
* **extra:** should be capped out by the 3-highlight limit ([#999](https://github.com/yongwoon/ywc-agent-toolkit/issues/999)) ([abcdefg](https://github.com/yongwoon/ywc-agent-toolkit/commit/abcdefg))

### Fixed

* **ywc-toolkit-eval:** recognize security-engineer as Opus-tier role ([#160](https://github.com/yongwoon/ywc-agent-toolkit/issues/160)) ([66b1a9e](https://github.com/yongwoon/ywc-agent-toolkit/commit/66b1a9e))

## [1.30.1](https://github.com/yongwoon/ywc-agent-toolkit/compare/v1.30.0...v1.30.1) (2026-07-24)

### Fixed

* **toolkit-eval:** reject description-derived trigger fixtures from the coverage floor ([#153](https://github.com/yongwoon/ywc-agent-toolkit/issues/153)) ([6c73da7](https://github.com/yongwoon/ywc-agent-toolkit/commit/6c73da7))

## [1.30.0](https://github.com/yongwoon/ywc-agent-toolkit/compare/v1.29.0...v1.30.0) (2026-07-22)

### Added

* add isolated evaluation runners ([#151](https://github.com/yongwoon/ywc-agent-toolkit/issues/151)) ([0e8cee7](https://github.com/yongwoon/ywc-agent-toolkit/commit/0e8cee7))

## [1.29.0](https://github.com/yongwoon/ywc-agent-toolkit/compare/v1.28.1...v1.29.0) (2026-07-16)

### Added

* add ywc-auth-implement skill ([#144](https://github.com/yongwoon/ywc-agent-toolkit/issues/144)) ([da29d14](https://github.com/yongwoon/ywc-agent-toolkit/commit/da29d14))

## [1.28.1](https://github.com/yongwoon/ywc-agent-toolkit/compare/v1.28.0...v1.28.1) (2026-07-15)

### Fixed

* remove duplicate heading in changelog-sections ([#142](https://github.com/yongwoon/ywc-agent-toolkit/issues/142)) ([0ba4d03](https://github.com/yongwoon/ywc-agent-toolkit/commit/0ba4d03))
`;

const entries = parseChangelog(FIXTURE);

// --- Unreleased exclusion ---
assert(entries.length === 5, `caps at 5 entries and excludes Unreleased (got ${entries.length})`);
assert(
  !entries.some((entry) => entry.version === undefined || Number.isNaN(Date.parse(entry.date))),
  "every retained entry has a version and a parseable date"
);

// --- both heading shapes parsed ---
const v132 = entries.find((entry) => entry.version === "1.32.0");
assert(v132?.date === "2026-08-12", "no-link heading shape (## [X.Y.Z] (date)) parses version/date");
assert(
  v132?.url === "https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md#1320-2026-08-12",
  "url uses the CHANGELOG.md anchor, not the compare link"
);

const v131 = entries.find((entry) => entry.version === "1.31.0");
assert(v131?.date === "2026-07-30", "compare-link heading shape (## [X.Y.Z](url) (date)) parses version/date");
assert(
  v131?.url === "https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md#1310-2026-07-30",
  "compare link URL is discarded in favor of the anchor URL"
);

// --- subsection priority + cap ---
assert(v131?.highlights.length === 3, `highlights capped at 3 (got ${v131?.highlights.length})`);
assert(
  v131?.highlights[0] === "add ywc-adr skill",
  "Added subsection bullets come first, in source order"
);
assert(
  !v131?.highlights.some((line) => /extra/.test(line)),
  "the 4th Added bullet is dropped by the cap before Fixed is ever considered"
);

// --- Added-only vs Fixed-only entries render correctly ---
const v1301 = entries.find((entry) => entry.version === "1.30.1");
assert(v1301?.highlights.length === 1 && /toolkit-eval/.test(v1301.highlights[0]), "Fixed-only entry (no Added/Changed) still renders its highlight");

// --- trailing PR/commit link noise stripped ---
assert(
  !/\(\[#/.test(v131?.highlights[0] ?? ""),
  "trailing PR/commit markdown-link noise is stripped from highlight text"
);

// --- fallback contract: existing committed cache survives a parse failure ---
const emptyResult = parseChangelog("# Changelog\n\n## Unreleased\n\n### Added\n\n* nothing dated here\n");
assert(emptyResult.length === 0, "a changelog with no dated entries yields an empty array (caller falls back to cache)");

if (failed) {
  console.error("[changelog-verification] one or more assertions failed.");
  process.exit(1);
}

console.log("[changelog-verification] all assertions passed.");
