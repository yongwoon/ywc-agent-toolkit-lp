import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import type { Locale } from "@/i18n/locale-list";
import { routing } from "@/i18n/routing";
import {
  formatGuidebookPageTitle,
  getGroupLabel,
  getGuidebookHref,
  getGuidebookRootHref,
  guidebookPages,
  isScaleChoiceSlug,
  normalizeGuidebookSlug
} from "@/components/guidebook/guidebook-nav";
import { GuidebookMdx } from "@/components/guidebook/guidebook-mdx";
import { PrevNextNav } from "@/components/guidebook/prev-next-nav";
import { ScaleSelector } from "@/components/guidebook/scale-selector";
import { Toc } from "@/components/guidebook/toc";
import {
  estimateReadingMinutes,
  formatReadingTimeLabel,
  loadGuidebookPageForLocale,
  type GuidebookPage
} from "@/lib/guidebook-content";
import {
  findLocalizedGuidebookPage,
  getLocalizedAdjacentGuidebookPages,
  loadLocalizedGuidebookNav
} from "@/lib/guidebook-nav-content";
import { buildPageMetadata } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";

type GuidebookPageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

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

export async function generateMetadata({
  params
}: GuidebookPageProps): Promise<Metadata> {
  const { locale: requestedLocale, slug: slugParam } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;
  const slug = normalizeGuidebookSlug(slugParam);
  const nav = await loadLocalizedGuidebookNav(locale);
  const navPage = findLocalizedGuidebookPage(nav, slug);

  if (!navPage) {
    notFound();
  }

  const isGuidebookRoot = !slugParam?.filter(Boolean).length;
  const getPath = (alternateLocale: Locale) =>
    isGuidebookRoot
      ? getGuidebookRootHref(alternateLocale)
      : getGuidebookHref(alternateLocale, slug);

  return buildPageMetadata({
    locale,
    title: navPage.title,
    description: navPage.description,
    path: getPath(locale),
    getAlternatePath: getPath
  });
}

export default async function Page({ params }: GuidebookPageProps) {
  const { locale: requestedLocale, slug: slugParam } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;
  const slug = normalizeGuidebookSlug(slugParam);
  const nav = await loadLocalizedGuidebookNav(locale);
  const navPage = findLocalizedGuidebookPage(nav, slug);

  if (!navPage) {
    notFound();
  }

  const content = await loadGuidebookPageForLocale(locale, slug);
  const pageTitle = formatGuidebookPageTitle(navPage);
  const pageDescription = navPage.description;
  const { previous, next } = getLocalizedAdjacentGuidebookPages(nav, slug);
  const tocItems: GuidebookPage["toc"] = content?.toc ?? [
    {
      id: "content-status",
      title: "Content status",
      depth: 2
    }
  ];
  const currentGroup = nav.find((group) => group.groupId === navPage.groupId);
  const groupHref = currentGroup?.pages[0]
    ? withBasePath(getGuidebookHref(locale, currentGroup.pages[0].slug))
    : undefined;
  const readingTimeLabel = content
    ? formatReadingTimeLabel(locale, estimateReadingMinutes(content.content, locale))
    : undefined;
  const scaleChoicePages = isScaleChoiceSlug(slug)
    ? nav.flatMap((group) => group.pages).filter((page) => isScaleChoiceSlug(page.slug))
    : undefined;

  return (
    <>
      <main
        className="min-w-0 px-0 py-8 min-[861px]:px-8"
        id="guidebook-content"
        tabIndex={-1}
      >
        <article className="mx-auto max-w-[70ch] text-wrap-pretty">
          <div className="mb-6 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint">
            <a
              className="outline-none transition-colors duration-[var(--dur-fast)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]"
              href={withBasePath(getGuidebookRootHref(locale))}
            >
              Guidebook
            </a>
            {" / "}
            {groupHref ? (
              <a
                className="outline-none transition-colors duration-[var(--dur-fast)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]"
                href={groupHref}
              >
                {getGroupLabel(locale, navPage.groupId)}
              </a>
            ) : (
              getGroupLabel(locale, navPage.groupId)
            )}
          </div>
          <h1 className="scroll-mt-[76px] font-display text-h1 font-bold leading-[var(--lh-tight)] text-text-bright">
            {pageTitle}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[rgba(245,166,35,.35)] bg-[var(--accent-tint)] px-2.5 py-1 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-accent">
              Guide
            </span>
            <span className="rounded-full border border-border-subtle bg-surface px-2.5 py-1 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-muted">
              {readingTimeLabel ?? "Pending content sync"}
            </span>
          </div>
          <p className="mt-6 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {pageDescription}
          </p>

          {scaleChoicePages ? (
            <ScaleSelector currentSlug={slug} locale={locale} pages={scaleChoicePages} />
          ) : null}

          <div className="mt-10 text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text">
            {content ? (
              <GuidebookMdx locale={locale} source={content.content} />
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

          <PrevNextNav locale={locale} next={next} previous={previous} />
        </article>
      </main>
      <Toc items={tocItems} />
    </>
  );
}
