// Shared slug source for generate-search-index.mjs and generate-sitemap.mjs.
// Duplicated rather than imported: these are plain Node .mjs scripts and
// guidebookNavGroups lives in TypeScript (src/components/guidebook/guidebook-nav.ts),
// which Node can't import directly (same constraint documented in
// generate-search-index.mjs's toPlainText/extractTitleAndSummary duplication).
//
// guidebookNavGroups is the single source of truth for page order/membership
// (src/lib/guidebook-nav-content.ts, generateStaticParams). Keeping this list
// here (rather than re-deriving it from a directory scan) is what lets both
// scripts stop mismatching the actual directory contents (e.g. treating
// README.md as a page) or missing future non-numeric-prefixed slugs.
//
// Kept in the same order as guidebookNavGroups so a reviewer can diff this
// file against guidebook-nav.ts's 16 entries to catch drift.
export const guidebookSlugs = [
  "01-introduction",
  "02-core-concepts",
  "03-quickstart",
  "04-general-cycle-small",
  "05-general-cycle-medium-large",
  "06-agentic-autonomous-loop",
  "07-starting-a-new-project",
  "08-onboarding-existing-repo",
  "09-testing-guide",
  "10-e2e-test-strategy",
  "11-design-review",
  "12-debugging-and-incident-postmortem",
  "13-executor-and-codegen-patterns",
  "14-skill-reference",
  "15-prerequisites-installation",
  "16-code-structure-and-maintainability"
];
