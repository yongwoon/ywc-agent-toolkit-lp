import { access, readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import type { Root, RootContent } from "mdast";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import type { Locale } from "@/i18n/locale-list";

export type GuidebookHeadingDepth = 2 | 3;

export type GuidebookTocItem = {
  id: string;
  title: string;
  depth: GuidebookHeadingDepth;
};

export type GuidebookFrontmatter = {
  title: string;
  description?: string;
  order?: number;
  slug?: string;
  group?: string;
  [key: string]: unknown;
};

export type ParsedGuidebookSource = {
  frontmatter: GuidebookFrontmatter;
  content: string;
};

export type GuidebookParseOptions = {
  filePath?: string;
};

export type GuidebookPage = ParsedGuidebookSource & {
  filePath: string;
  toc: GuidebookTocItem[];
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
};

export function parseGuidebookSource(
  source: string,
  options: GuidebookParseOptions = {},
): ParsedGuidebookSource {
  const parsed = matter(source);
  const content = parsed.content.trimStart();

  return {
    frontmatter: normalizeGuidebookFrontmatter(parsed.data, content, options.filePath),
    content,
  };
}

export function extractGuidebookToc(markdown: string): GuidebookTocItem[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown) as Root;
  const slugger = new GithubSlugger();
  const toc: GuidebookTocItem[] = [];

  visit(tree, "heading", (node) => {
    if (node.depth !== 2 && node.depth !== 3) {
      return;
    }

    const title = toPlainText(node.children).trim().replace(/\s+/g, " ");

    if (title.length === 0) {
      return;
    }

    toc.push({
      id: slugger.slug(title),
      title,
      depth: node.depth,
    });
  });

  return toc;
}

export async function serializeGuidebookMdx(
  markdown: string,
): Promise<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>> {
  return serialize(markdown, {
    parseFrontmatter: false,
    mdxOptions: {
      format: "mdx",
      remarkPlugins: [remarkGfm],
    },
    blockJS: true,
    blockDangerousJS: true,
  });
}

export async function loadGuidebookPage(filePath: string): Promise<GuidebookPage> {
  const source = await readFile(filePath, "utf8");
  const parsed = parseGuidebookSource(source, { filePath });

  return {
    ...parsed,
    filePath,
    toc: extractGuidebookToc(parsed.content),
    mdxSource: await serializeGuidebookMdx(parsed.content),
  };
}

const guidebookContentExtensions = [".md", ".mdx"] as const;

export async function findGuidebookContentPath(
  locale: string,
  slug: string,
): Promise<string | undefined> {
  for (const extension of guidebookContentExtensions) {
    const filePath = join(process.cwd(), "src", "content", "guidebook", locale, `${slug}${extension}`);

    try {
      await access(filePath);
      return filePath;
    } catch {
      continue;
    }
  }

  return undefined;
}

export async function loadGuidebookPageForLocale(
  locale: string,
  slug: string,
): Promise<GuidebookPage | undefined> {
  const contentPath = await findGuidebookContentPath(locale, slug);

  if (!contentPath) {
    return undefined;
  }

  return loadGuidebookPage(contentPath);
}

function normalizeGuidebookFrontmatter(
  data: Record<string, unknown>,
  content: string,
  filePath: string | undefined,
): GuidebookFrontmatter {
  const title =
    readOptionalString(data, "title") ?? extractFirstHeadingTitle(content) ?? inferTitleFromFilePath(filePath);
  const order = readOptionalNumber(data, "order") ?? inferOrderFromFilePath(filePath);

  if (title === undefined) {
    throw new Error('Guidebook content must include frontmatter title, an H1 heading, or a file path title.');
  }

  return {
    ...data,
    title,
    description: readOptionalString(data, "description") ?? extractFirstParagraphText(content),
    order,
    slug: readOptionalString(data, "slug"),
    group: readOptionalString(data, "group"),
  };
}

function readOptionalString(data: Record<string, unknown>, key: string): string | undefined {
  const value = data[key];

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`Guidebook frontmatter "${key}" must be a string when provided.`);
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readOptionalNumber(data: Record<string, unknown>, key: string): number | undefined {
  const value = data[key];

  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  throw new Error(`Guidebook frontmatter "${key}" must be a finite number when provided.`);
}

function extractFirstHeadingTitle(markdown: string): string | undefined {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown) as Root;
  let title: string | undefined;

  visit(tree, "heading", (node) => {
    if (node.depth !== 1 || title !== undefined) {
      return;
    }

    const headingText = toPlainText(node.children).trim().replace(/\s+/g, " ");

    if (headingText.length > 0) {
      title = headingText;
    }
  });

  return title;
}

function extractFirstParagraphText(markdown: string): string | undefined {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown) as Root;
  let seenTitleHeading = false;

  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 1) {
      seenTitleHeading = true;
      continue;
    }

    if (!seenTitleHeading || node.type !== "paragraph") {
      continue;
    }

    const text = toPlainText(node.children).trim().replace(/\s+/g, " ");

    if (text.length === 0) {
      continue;
    }

    const firstSentence = text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
    return firstSentence.trim();
  }

  return undefined;
}

function inferTitleFromFilePath(filePath: string | undefined): string | undefined {
  if (filePath === undefined) {
    return undefined;
  }

  const filename = basename(filePath).replace(/\.(md|mdx)$/i, "");
  const title = filename.replace(/^\d+[-_]?/, "").replace(/[-_]+/g, " ").trim();

  return title.length > 0 ? title : undefined;
}

function inferOrderFromFilePath(filePath: string | undefined): number | undefined {
  if (filePath === undefined) {
    return undefined;
  }

  const match = /^(\d+)/.exec(basename(filePath));
  return match === null ? undefined : Number(match[1]);
}

const cjkReadingLocales = new Set<Locale>(["ja", "ko", "zh"]);
const wordsPerMinute = 200;
const charsPerMinuteCjk = 400;

const readingTimeLabelByLocale: Record<Locale, (minutes: number) => string> = {
  en: (minutes) => `${minutes} min read`,
  ja: (minutes) => `読了目安 ${minutes}分`,
  ko: (minutes) => `${minutes}분 소요`,
  zh: (minutes) => `阅读约 ${minutes} 分钟`,
  es: (minutes) => `${minutes} min de lectura`
};

// CJK locales aren't space-delimited, so a words-per-minute estimate undercounts
// reading time -- fall back to a characters-per-minute heuristic for those locales.
export function estimateReadingMinutes(markdown: string, locale: Locale): number {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .trim();

  if (plainText.length === 0) {
    return 1;
  }

  if (cjkReadingLocales.has(locale)) {
    const charCount = plainText.replace(/\s+/g, "").length;
    return Math.max(1, Math.ceil(charCount / charsPerMinuteCjk));
  }

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function formatReadingTimeLabel(locale: Locale, minutes: number): string {
  const format = readingTimeLabelByLocale[locale] ?? readingTimeLabelByLocale.en;
  return format(minutes);
}

function toPlainText(nodes: RootContent[]): string {
  return nodes
    .map((node) => {
      if ("value" in node && typeof node.value === "string") {
        return node.value;
      }

      if ("alt" in node && typeof node.alt === "string") {
        return node.alt;
      }

      if ("children" in node && Array.isArray(node.children)) {
        return toPlainText(node.children as RootContent[]);
      }

      return "";
    })
    .join(" ");
}
