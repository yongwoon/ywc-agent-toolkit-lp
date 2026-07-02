"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locale-list";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import githubStats from "@/data/github-stats.json";
import { getGuidebookHref, getGuidebookSlugFromPathname } from "./guidebook-nav";
import { SearchModal } from "./search-modal";

type TopBarProps = {
  locale: Locale;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
};

const navItems = ["Docs", "Skills", "Agents", "Hooks"];

export function TopBar({ locale, sidebarOpen, onSidebarToggle }: TopBarProps) {
  const pathname = usePathname();
  const activeSlug = getGuidebookSlugFromPathname(pathname);
  const starCount = githubStats.stars.toLocaleString("en-US");

  return (
    <header className="sticky top-0 z-40 h-[60px] border-b border-border-subtle bg-[rgba(11,10,9,.85)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-full max-w-[1560px] items-center gap-4 px-4 md:px-6">
        <button
          aria-controls="guidebook-sidebar"
          aria-expanded={sidebarOpen}
          aria-label="Toggle guidebook navigation"
          className="inline-flex size-9 items-center justify-center rounded-sm border border-border-subtle bg-surface-raised font-mono text-lg text-text-bright outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)] min-[861px]:hidden"
          onClick={onSidebarToggle}
          type="button"
        >
          {sidebarOpen ? "×" : "≡"}
        </button>

        <a
          className="flex min-w-0 items-center gap-1.5 font-mono text-[var(--text-mono)] font-semibold text-text-bright outline-none focus-visible:shadow-[var(--focus-ring)]"
          href={`/${locale}/`}
        >
          <span className="text-accent">$</span>
          <span className="truncate">ywc</span>
          <span className="hidden truncate text-text-muted sm:inline">-agent-toolkit</span>
        </a>

        <nav aria-label="Guidebook sections" className="hidden items-center gap-5 min-[861px]:flex">
          {navItems.map((item) => (
            <a
              className="font-mono text-[var(--text-mono-sm)] font-semibold text-text-muted outline-none transition-colors duration-[var(--dur-fast)] hover:text-accent focus-visible:shadow-[var(--focus-ring)] data-[active=true]:text-accent"
              data-active={item === "Docs"}
              href={item === "Docs" ? `/${locale}/guidebook/` : `/${locale}/`}
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>

        <SearchModal locale={locale} />

        <div className="ml-auto flex shrink-0 items-center gap-2 min-[861px]:ml-0">
          <a
            aria-label="ywc-agent-toolkit releases on GitHub"
            className="hidden h-[var(--control-h-sm)] items-center rounded-sm border border-border-subtle bg-surface-raised px-2 font-mono text-[var(--text-mono-sm)] font-semibold text-text-bright outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)] sm:inline-flex"
            href="https://github.com/yongwoon/ywc-agent-toolkit/releases"
            rel="noreferrer"
            target="_blank"
          >
            v1.x
          </a>
          <LocaleSwitcher
            className="hidden lg:block"
            getHref={(code) => getGuidebookHref(code, activeSlug)}
            value={locale}
          />
          <Button
            aria-label={`${starCount} stars on GitHub`}
            href="https://github.com/yongwoon/ywc-agent-toolkit"
            icon={<span aria-hidden="true">★</span>}
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="outline"
          >
            {starCount} stars
          </Button>
        </div>
      </div>
    </header>
  );
}
