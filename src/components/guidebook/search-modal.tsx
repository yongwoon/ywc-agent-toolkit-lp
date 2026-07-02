"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/locale-list";
import searchEn from "@/data/guidebook-search.en.json";
import searchEs from "@/data/guidebook-search.es.json";
import searchJa from "@/data/guidebook-search.ja.json";
import searchKo from "@/data/guidebook-search.ko.json";
import searchZh from "@/data/guidebook-search.zh.json";
import { getGuidebookHref } from "./guidebook-nav";

type SearchEntry = {
  slug: string;
  title: string;
  summary: string;
};

const searchIndexByLocale: Record<Locale, SearchEntry[]> = {
  en: searchEn,
  ko: searchKo,
  ja: searchJa,
  zh: searchZh,
  es: searchEs
};

type SearchModalProps = {
  locale: Locale;
};

export function SearchModal({ locale }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const entries = searchIndexByLocale[locale] ?? searchIndexByLocale.en;

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (trimmed.length === 0) {
      return entries;
    }

    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(trimmed) ||
        entry.summary.toLowerCase().includes(trimmed)
    );
  }, [entries, query]);

  function openSearch() {
    setQuery("");
    setOpen(true);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setOpen(true);
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <button
        aria-label="Search guidebook"
        className="ml-auto hidden h-[var(--control-h-sm)] min-w-[12rem] items-center justify-between gap-4 rounded-sm border border-border-subtle bg-surface-raised px-3 font-mono text-[var(--text-mono-sm)] text-text-muted outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)] min-[861px]:inline-flex"
        onClick={openSearch}
        type="button"
      >
        <span>search docs</span>
        <kbd className="rounded-xs border border-border-subtle bg-bg-subtle px-1.5 py-0.5 text-label uppercase tracking-[var(--ls-label)] text-text-faint">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          aria-label="Search guidebook"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
        >
          <div
            className="w-full max-w-[36rem] overflow-hidden rounded-md border border-border-subtle bg-surface shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
              <span aria-hidden="true" className="text-text-faint">
                ⌕
              </span>
              <input
                className="flex-1 bg-transparent font-mono text-[var(--text-mono)] text-text-bright outline-none placeholder:text-text-faint"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search guidebook..."
                ref={inputRef}
                type="text"
                value={query}
              />
              <kbd className="rounded-xs border border-border-subtle bg-bg-subtle px-1.5 py-0.5 text-label uppercase tracking-[var(--ls-label)] text-text-faint">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-[var(--text-body-sm)] text-text-muted">
                  No matching pages.
                </li>
              ) : (
                results.map((entry) => (
                  <li key={entry.slug}>
                    <a
                      className="block rounded-sm px-3 py-2.5 outline-none transition-colors duration-[var(--dur-fast)] hover:bg-[var(--accent-tint)] focus-visible:bg-[var(--accent-tint)]"
                      href={getGuidebookHref(locale, entry.slug)}
                      onClick={() => setOpen(false)}
                    >
                      <span className="block font-mono text-[var(--text-mono)] font-semibold text-text-bright">
                        {entry.title}
                      </span>
                      <span className="mt-0.5 block text-[var(--text-body-sm)] text-text-muted">
                        {entry.summary}
                      </span>
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
