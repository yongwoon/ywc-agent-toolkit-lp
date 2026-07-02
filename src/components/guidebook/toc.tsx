"use client";

import { useEffect, useMemo, useState } from "react";
import type { GuidebookTocItem } from "@/lib/guidebook-content";

type TocProps = {
  items: readonly GuidebookTocItem[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const h2Items = useMemo(() => items.filter((item) => item.depth === 2), [items]);

  useEffect(() => {
    if (h2Items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-76px 0px -60% 0px",
        threshold: [0, 1]
      }
    );

    h2Items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [h2Items]);

  if (h2Items.length === 0) {
    return <aside aria-label="On this page" className="hidden min-[1181px]:block" />;
  }

  return (
    <aside
      aria-label="On this page"
      className="sticky top-[60px] hidden h-[calc(100vh-60px)] overflow-y-auto py-8 pl-8 min-[1181px]:block"
    >
      <p className="mb-4 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint">
        On this page
      </p>
      <nav className="border-l border-border-subtle">
        <ul className="space-y-1">
          {h2Items.map((item) => {
            const active = item.id === activeId;

            return (
              <li key={item.id}>
                <a
                  className={cx(
                    "-ml-px block border-l px-4 py-1.5 font-mono text-[var(--text-mono-sm)] leading-snug outline-none transition-[border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:text-accent focus-visible:shadow-[var(--focus-ring)]",
                    active
                      ? "border-accent text-accent"
                      : "border-transparent text-text-muted"
                  )}
                  href={`#${item.id}`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
