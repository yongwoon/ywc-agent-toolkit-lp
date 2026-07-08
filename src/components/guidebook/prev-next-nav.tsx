import type { Locale } from "@/i18n/locale-list";
import { withBasePath } from "@/lib/base-path";
import { Badge } from "@/components/ui/badge";
import type { LocalizedGuidebookPageMeta } from "@/lib/guidebook-nav-content";
import { formatGuidebookPageTitle, getGuidebookHref } from "./guidebook-nav";

type PrevNextNavProps = {
  locale: Locale;
  previous: LocalizedGuidebookPageMeta | undefined;
  next: LocalizedGuidebookPageMeta | undefined;
};

function NavCard({
  direction,
  locale,
  page
}: {
  direction: "Previous" | "Next";
  locale: Locale;
  page: LocalizedGuidebookPageMeta | undefined;
}) {
  if (!page) {
    return <div className="hidden min-[560px]:block" />;
  }

  return (
    <a
      className="group block rounded-md border border-border-subtle bg-surface p-4 shadow-[var(--edge-top)] outline-none transition-[background-color,border-color,transform] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] focus-visible:shadow-[var(--focus-ring)] motion-safe:hover:-translate-y-0.5"
      href={withBasePath(getGuidebookHref(locale, page.slug))}
    >
      <span className="font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint">
        {direction}
      </span>
      <span className="mt-2 block font-mono text-[var(--text-mono)] font-semibold text-accent">
        {formatGuidebookPageTitle(page)}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-text-muted">
        {page.description}
      </span>
    </a>
  );
}

export function PrevNextNav({ locale, previous, next }: PrevNextNavProps) {
  return (
    <footer className="mt-16 border-t border-border-subtle pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          className="font-mono text-[var(--text-mono-sm)] text-link underline decoration-border underline-offset-4 outline-none transition-colors duration-[var(--dur-fast)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]"
          href="https://github.com/yongwoon/ywc-agent-toolkit"
          rel="noreferrer"
          target="_blank"
        >
          Edit this page on GitHub
        </a>
        <Badge variant="amber">Guidebook v1</Badge>
      </div>
      <nav
        aria-label="Previous and next guidebook pages"
        className="mt-6 grid gap-4 min-[560px]:grid-cols-2"
      >
        <NavCard direction="Previous" locale={locale} page={previous} />
        <NavCard direction="Next" locale={locale} page={next} />
      </nav>
    </footer>
  );
}
