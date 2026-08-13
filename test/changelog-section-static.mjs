import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const outDir = path.join(rootDir, "out");

const LOCALES = ["en", "ja", "ko", "zh", "es"];
const FULL_HISTORY_HREF = 'href="https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md"';

let failed = false;

function assert(condition, message) {
  if (!condition) {
    failed = true;
    console.error(`[changelog-section-static] FAIL: ${message}`);
  } else {
    console.log(`[changelog-section-static] OK: ${message}`);
  }
}

async function verifyLocale(locale) {
  const htmlPath = path.join(outDir, locale, "index.html");
  const html = await readFile(htmlPath, "utf8").catch(() => null);

  assert(html !== null, `${locale}: out/${locale}/index.html exists`);
  if (html === null) {
    return;
  }

  // SocialProof -> ChangelogSection -> Faq ordering. SocialProof and Faq have
  // no stable localized text marker to search for across all 5 locales, so
  // anchor on the DOM structure this task owns: the changelog anchors
  // (CHANGELOG.md#<slug>) must appear before the FAQ section's id="faq".
  const firstChangelogAnchorIdx = html.indexOf("CHANGELOG.md#");
  const faqIdx = html.indexOf('id="faq"');

  assert(firstChangelogAnchorIdx !== -1, `${locale}: at least one CHANGELOG.md# anchor is rendered`);
  assert(faqIdx !== -1, `${locale}: FAQ section is present`);
  assert(
    firstChangelogAnchorIdx !== -1 && faqIdx !== -1 && firstChangelogAnchorIdx < faqIdx,
    `${locale}: changelog section renders before the FAQ section`
  );

  // Every version entry: version anchor + a <time> element (date) + at least one highlight line.
  const versionAnchors = Array.from(html.matchAll(/CHANGELOG\.md#(\d+-\d{4}-\d{2}-\d{2})/g));
  assert(versionAnchors.length > 0, `${locale}: at least one version entry rendered`);

  const timeElements = Array.from(html.matchAll(/<time[^>]*dateTime="(\d{4}-\d{2}-\d{2})"/g));
  assert(
    timeElements.length === versionAnchors.length,
    `${locale}: every version entry has a matching <time> date element (${timeElements.length} of ${versionAnchors.length})`
  );

  assert(html.includes(FULL_HISTORY_HREF), `${locale}: "Full history on GitHub" CTA links to the unanchored CHANGELOG.md URL`);

  // Anchor hrefs point at the canonical GitHub blob URL, not a raw or compare URL.
  const anchoredHrefPattern = /href="https:\/\/github\.com\/yongwoon\/ywc-agent-toolkit\/blob\/main\/CHANGELOG\.md#\d+-\d{4}-\d{2}-\d{2}"/;
  assert(anchoredHrefPattern.test(html), `${locale}: version links use the CHANGELOG.md anchor URL, not raw/compare`);
}

for (const locale of LOCALES) {
  await verifyLocale(locale);
}

if (failed) {
  console.error("[changelog-section-static] one or more assertions failed.");
  process.exit(1);
}

console.log("[changelog-section-static] all assertions passed.");
