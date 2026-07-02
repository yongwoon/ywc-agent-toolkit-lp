import { access } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import type { Locale } from "@/i18n/locale-list";
import { routing } from "@/i18n/routing";
import {
  findGuidebookPage,
  guidebookPages,
  normalizeGuidebookSlug
} from "@/components/guidebook/guidebook-nav";
import { GuidebookMdx } from "@/components/guidebook/guidebook-mdx";
import { PrevNextNav } from "@/components/guidebook/prev-next-nav";
import { Toc } from "@/components/guidebook/toc";
import { loadGuidebookPage, type GuidebookPage } from "@/lib/guidebook-content";

type GuidebookPageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

const contentExtensions = [".md", ".mdx"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => [
    { locale, slug: [] },
    ...guidebookPages.map((page) => ({
      locale,
      slug: page.slug.split("/")
    }))
  ]);
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findContentPath(locale: Locale, slug: string) {
  for (const extension of contentExtensions) {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "guidebook",
      locale,
      `${slug}${extension}`
    );

    if (await fileExists(filePath)) {
      return filePath;
    }
  }

  return undefined;
}

async function loadPlannedPage(locale: Locale, slug: string) {
  const contentPath = await findContentPath(locale, slug);

  if (!contentPath) {
    return undefined;
  }

  return loadGuidebookPage(contentPath);
}

export default async function Page({ params }: GuidebookPageProps) {
  const { locale: requestedLocale, slug: slugParam } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;
  const slug = normalizeGuidebookSlug(slugParam);
  const navPage = findGuidebookPage(slug);

  if (!navPage) {
    notFound();
  }

  const content = await loadPlannedPage(locale, slug);
  const pageTitle = content?.frontmatter.title ?? navPage.title;
  const pageDescription = content?.frontmatter.description ?? navPage.description;
  const tocItems: GuidebookPage["toc"] = content?.toc ?? [
    {
      id: "content-status",
      title: "Content status",
      depth: 2
    }
  ];

  return (
    <>
      <main
        className="min-w-0 px-0 py-8 min-[861px]:px-8"
        id="guidebook-content"
        tabIndex={-1}
      >
        <article className="mx-auto max-w-[70ch] text-wrap-pretty">
          <div className="mb-6 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint">
            Guidebook / {navPage.group}
          </div>
          <h1 className="scroll-mt-[76px] font-display text-h1 font-bold leading-[var(--lh-tight)] text-text-bright">
            {pageTitle}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[rgba(245,166,35,.35)] bg-[var(--accent-tint)] px-2.5 py-1 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-accent">
              Guide
            </span>
            <span className="rounded-full border border-border-subtle bg-surface px-2.5 py-1 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-muted">
              {content ? "Synced" : "Pending content sync"}
            </span>
          </div>
          <p className="mt-6 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {pageDescription}
          </p>

          <div className="mt-10 text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text">
            {content ? (
              <GuidebookMdx source={content.mdxSource} />
            ) : (
              <section
                aria-labelledby="content-status"
                className="rounded-md border border-[rgba(245,166,35,.3)] bg-[var(--accent-tint)] px-4 py-4"
              >
                <h2
                  className="scroll-mt-[76px] font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright"
                  id="content-status"
                >
                  Content status
                </h2>
                <p className="mt-4 text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text-secondary">
                  The route and navigation shell are ready. The markdown source for this page will
                  be synced by the guidebook content task, so this planned page stays build-safe
                  until content files are present.
                </p>
              </section>
            )}
          </div>

          <PrevNextNav locale={locale} slug={slug} />
        </article>
      </main>
      <Toc items={tocItems} />
    </>
  );
}
