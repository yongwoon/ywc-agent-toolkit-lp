"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/locale-list";
import type { LocalizedGuidebookNavGroup } from "@/lib/guidebook-nav-content";
import { getGuidebookHref, normalizeGuidebookSlug } from "./guidebook-nav";

type SidebarNavProps = {
  locale: Locale;
  mobileOpen: boolean;
  navGroups: LocalizedGuidebookNavGroup[];
  onMobileClose: () => void;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function slugFromPathname(pathname: string | null) {
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const guidebookIndex = segments.indexOf("guidebook");

  return normalizeGuidebookSlug(
    guidebookIndex === -1 ? undefined : segments.slice(guidebookIndex + 1)
  );
}

export function SidebarNav({ locale, mobileOpen, navGroups, onMobileClose }: SidebarNavProps) {
  const pathname = usePathname();
  const activeSlug = slugFromPathname(pathname);
  const activeGroup = navGroups.find((group) =>
    group.pages.some((page) => page.slug === activeSlug)
  )?.groupId;
  const [closedGroups, setClosedGroups] = useState<ReadonlySet<string>>(() => new Set());

  const openGroups = useMemo(() => {
    const nextOpenGroups = new Set<string>();
    navGroups.forEach((group) => {
      if (!closedGroups.has(group.groupId) || group.groupId === activeGroup) {
        nextOpenGroups.add(group.groupId);
      }
    });
    return nextOpenGroups;
  }, [activeGroup, closedGroups, navGroups]);

  function toggleGroup(label: string) {
    setClosedGroups((current) => {
      const next = new Set(current);

      if (openGroups.has(label)) {
        next.add(label);
      } else {
        next.delete(label);
      }

      return next;
    });
  }

  return (
    <>
      {mobileOpen ? (
        <button
          aria-label="Close guidebook navigation"
          className="fixed inset-0 z-30 bg-bg/70 backdrop-blur-sm min-[861px]:hidden"
          onClick={onMobileClose}
          type="button"
        />
      ) : null}
      <aside
        className={cx(
          "fixed bottom-0 left-0 top-[60px] z-40 w-[min(264px,calc(100vw-2rem))] -translate-x-full border-r border-border-subtle bg-bg px-3 py-5 transition-transform duration-[var(--dur-normal)] ease-out motion-reduce:transition-none min-[861px]:sticky min-[861px]:z-10 min-[861px]:h-[calc(100vh-60px)] min-[861px]:w-auto min-[861px]:translate-x-0 min-[861px]:overflow-y-auto min-[861px]:bg-transparent min-[861px]:px-0 min-[861px]:pr-5",
          mobileOpen && "translate-x-0"
        )}
        id="guidebook-sidebar"
      >
        <nav aria-label="Guidebook navigation" className="space-y-6">
          {navGroups.map((group) => {
            const open = openGroups.has(group.groupId);

            return (
              <section key={group.groupId}>
                <button
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 rounded-xs px-2 py-1.5 text-left font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint outline-none transition-colors duration-[var(--dur-fast)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]"
                  onClick={() => toggleGroup(group.groupId)}
                  type="button"
                >
                  <span>{group.label}</span>
                  <span
                    aria-hidden="true"
                    className={cx(
                      "text-accent transition-transform duration-[var(--dur-fast)] motion-reduce:transition-none",
                      open && "rotate-90"
                    )}
                  >
                    ›
                  </span>
                </button>
                <div
                  className={cx(
                    "grid transition-[grid-template-rows,opacity] duration-[var(--dur-normal)] ease-out motion-reduce:transition-none",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="mt-1 space-y-1">
                      {group.pages.map((page) => {
                        const active = page.slug === activeSlug;

                        return (
                          <li key={page.slug}>
                            <a
                              aria-current={active ? "page" : undefined}
                              className={cx(
                                "block rounded-r-sm border-l-2 border-transparent px-3 py-2 font-mono text-[var(--text-mono-sm)] leading-snug text-text-muted outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]",
                                active && "border-l-accent bg-[var(--accent-tint)] text-accent"
                              )}
                              href={getGuidebookHref(locale, page.slug)}
                              onClick={onMobileClose}
                            >
                              {page.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
