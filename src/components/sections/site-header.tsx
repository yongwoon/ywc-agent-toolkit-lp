import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import githubStats from "@/data/github-stats.json";
import type { Locale } from "@/i18n/routing";

type NavLink = {
  label: string;
  target: string;
};

type SiteHeaderProps = {
  locale: Locale;
};

export async function SiteHeader({ locale }: SiteHeaderProps) {
  const t = await getTranslations("nav");
  const links = t.raw("links") as NavLink[];
  const github = t.raw("github") as NavLink;
  const starCount = githubStats.stars.toLocaleString("en-US");

  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-border-subtle bg-[rgba(11,10,9,.86)] backdrop-blur-[12px]">
      <div className="mx-auto flex min-h-[64px] max-w-[var(--container-wide)] items-center gap-3 px-[var(--gutter)]">
        <a
          aria-label={`${t("wordmark")} home`}
          className="flex min-w-0 items-center gap-1.5 font-mono text-[var(--text-mono)] font-semibold text-text-bright outline-none focus-visible:shadow-[var(--focus-ring)]"
          href="#top"
        >
          <span className="text-accent">$</span>
          <span className="truncate">ywc</span>
          <span className="hidden truncate text-text-muted sm:inline">
            -agent-toolkit
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="ml-5 hidden items-center gap-5 md:flex"
        >
          {links.map((link) => (
            <a
              className="font-mono text-[var(--text-mono-sm)] font-semibold text-text-muted outline-none transition-colors duration-[var(--dur-fast)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]"
              href={link.target}
              key={link.target}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <LocaleSwitcher value={locale} />
          <Button
            aria-label={`${starCount} stars on GitHub`}
            href={github.target}
            icon={<span aria-hidden="true">★</span>}
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="outline"
          >
            {starCount} stars
          </Button>
          <Button href="#install" size="sm" variant="primary">
            {links.find((link) => link.target === "#install")?.label ??
              "Install"}
          </Button>
        </div>

        <details className="group relative ml-auto sm:ml-0 md:hidden">
          <summary
            aria-label="Open navigation"
            className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-sm border border-border-subtle bg-surface-raised font-mono text-lg text-text-bright outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)] [&::-webkit-details-marker]:hidden"
          >
            <span aria-hidden="true" className="group-open:hidden">
              ≡
            </span>
            <span aria-hidden="true" className="hidden group-open:inline">
              ×
            </span>
          </summary>
          <div className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-md border border-border-subtle bg-surface-raised p-2 shadow-lg">
            <nav aria-label="Mobile navigation" className="grid gap-1">
              {links.map((link) => (
                <a
                  className="rounded-xs px-3 py-2 font-mono text-[var(--text-mono-sm)] font-semibold text-text-secondary outline-none transition-[background-color,color] duration-[var(--dur-fast)] hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]"
                  href={link.target}
                  key={link.target}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-2 grid gap-2 border-t border-border-subtle pt-2">
              <LocaleSwitcher align="start" className="w-full" value={locale} />
              <Button href="#install" size="sm" variant="primary" block>
                {links.find((link) => link.target === "#install")?.label ??
                  "Install"}
              </Button>
              <Button
                aria-label={`${starCount} stars on GitHub`}
                href={github.target}
                icon={<span aria-hidden="true">★</span>}
                rel="noreferrer"
                target="_blank"
                variant="outline"
                block
              >
                {starCount} stars
              </Button>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
