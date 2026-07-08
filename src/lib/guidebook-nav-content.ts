import { cache } from "react";
import type { Locale } from "@/i18n/locale-list";
import {
  getGroupLabel,
  guidebookNavGroups,
  guidebookPages,
  type GuidebookGroupId,
  type GuidebookPageMeta
} from "@/components/guidebook/guidebook-nav";
import { loadGuidebookPageForLocale } from "@/lib/guidebook-content";

export type LocalizedGuidebookPageMeta = GuidebookPageMeta & {
  displayNumber: string;
};

export type LocalizedGuidebookNavGroup = {
  groupId: GuidebookGroupId;
  label: string;
  pages: LocalizedGuidebookPageMeta[];
};

// Sidebar titles/descriptions used to come straight from the hardcoded (Korean-only)
// guidebookNavGroups regardless of the page's actual locale. Each locale's content file
// already carries the correct title/description via its own H1 and lead paragraph
// (see loadGuidebookPage's frontmatter extraction), so derive the nav from that instead
// of maintaining a second, separately-translated copy of the same text.
export const loadLocalizedGuidebookNav = cache(
  async (locale: Locale): Promise<LocalizedGuidebookNavGroup[]> => {
    return Promise.all(
      guidebookNavGroups.map(async (group) => ({
        groupId: group.groupId,
        label: getGroupLabel(locale, group.groupId),
        pages: await Promise.all(
          group.pages.map(async (page) => {
            const content = await loadGuidebookPageForLocale(locale, page.slug);
            const displayNumber = String(
              1 + guidebookPages.findIndex((globalPage) => globalPage.slug === page.slug)
            ).padStart(2, "0");

            return {
              ...page,
              title: content?.frontmatter.title ?? page.title,
              description: content?.frontmatter.description ?? page.description,
              displayNumber
            };
          })
        )
      }))
    );
  }
);

export function findLocalizedGuidebookPage(
  nav: LocalizedGuidebookNavGroup[],
  slug: string
): LocalizedGuidebookPageMeta | undefined {
  return nav.flatMap((group) => group.pages).find((page) => page.slug === slug);
}

export function getLocalizedAdjacentGuidebookPages(nav: LocalizedGuidebookNavGroup[], slug: string) {
  const pages = nav.flatMap((group) => group.pages);
  const index = pages.findIndex((page) => page.slug === slug);

  return {
    previous: index > 0 ? pages[index - 1] : undefined,
    next: index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined
  };
}
