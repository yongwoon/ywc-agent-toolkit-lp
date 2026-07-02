import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const outDir = path.join(cwd, "out");
const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL ?? "https://yongwoon.github.io/ywc-agent-toolkit-lp"
);

function normalizeSiteUrl(value) {
  return value.replace(/\/+$/, "");
}

function absoluteUrl(href) {
  return `${siteUrl}${href.startsWith("/") ? href : `/${href}`}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function readLocales() {
  const source = await readFile(path.join(cwd, "src/i18n/locale-list.ts"), "utf8");
  const matches = source.matchAll(/code:\s*"([^"]+)"[\s\S]*?href:\s*"([^"]+)"/g);
  const locales = Array.from(matches, ([, code, href]) => ({ code, href }));

  if (locales.length === 0) {
    throw new Error("No locales found in src/i18n/locale-list.ts");
  }

  return locales;
}

async function readGuidebookSlugs() {
  const guidebookDir = path.join(cwd, "src/content/guidebook/ko");
  const entries = await readdir(guidebookDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && /^\d+-.+\.md$/.test(entry.name))
    .map((entry) => entry.name.replace(/\.md$/, ""))
    .sort((a, b) => a.localeCompare(b, "en"));
}

function renderUrl({ loc, alternates = [] }) {
  const alternateXml = alternates
    .map(
      (alternate) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.code)}" href="${escapeXml(
          absoluteUrl(alternate.href)
        )}" />`
    )
    .join("\n");

  return [
    "  <url>",
    `    <loc>${escapeXml(absoluteUrl(loc))}</loc>`,
    alternateXml,
    "  </url>"
  ]
    .filter(Boolean)
    .join("\n");
}

const locales = await readLocales();
const guidebookSlugs = await readGuidebookSlugs();
const urls = [
  ...locales.map((locale) => ({
    loc: locale.href,
    alternates: locales
  })),
  ...guidebookSlugs.map((slug) => ({
    loc: `/ko/guidebook/${slug}/`
  }))
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls.map(renderUrl),
  "</urlset>",
  ""
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
  ""
].join("\n");

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "sitemap.xml"), sitemap);
await writeFile(path.join(outDir, "robots.txt"), robots);

console.log(
  `[generate-sitemap] wrote ${urls.length} URLs (${locales.length} locale home, ${guidebookSlugs.length} ko guidebook) using ${siteUrl}.`
);
