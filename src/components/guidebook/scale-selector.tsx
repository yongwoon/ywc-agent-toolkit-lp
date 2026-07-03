import type { Locale } from "@/i18n/locale-list";
import { withBasePath } from "@/lib/base-path";
import { getGuidebookHref, type GuidebookPageMeta } from "./guidebook-nav";

type ScaleSelectorProps = {
  locale: Locale;
  currentSlug: string;
  pages: readonly GuidebookPageMeta[];
};

type ScaleSelectorCopy = {
  heading: string;
  current: string;
};

const copyByLocale: Record<Locale, ScaleSelectorCopy> = {
  en: { heading: "Choose by scale", current: "You are here" },
  ja: { heading: "規模で選ぶ", current: "現在のページ" },
  ko: { heading: "규모로 고르기", current: "현재 보는 중" },
  zh: { heading: "按规模选择", current: "当前页面" },
  es: { heading: "Elige según el alcance", current: "Estás aquí" }
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// 04/05/06 are alternative depths of the same job (small / medium-large / agentic),
// not a linear sequence. PrevNextNav's strict order otherwise implies readers must
// go through all three, so this surfaces them as a side-by-side choice instead.
export function ScaleSelector({ locale, currentSlug, pages }: ScaleSelectorProps) {
  const copy = copyByLocale[locale] ?? copyByLocale.en;

  return (
    <div className="mt-8 rounded-md border border-border-subtle bg-surface p-4">
      <p className="font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint">
        {copy.heading}
      </p>
      <div className="mt-3 grid gap-3 min-[720px]:grid-cols-3">
        {pages.map((page) => {
          const active = page.slug === currentSlug;

          return (
            <a
              key={page.slug}
              aria-current={active ? "page" : undefined}
              className={cx(
                "block rounded-md border p-3 outline-none transition-colors duration-[var(--dur-fast)] focus-visible:shadow-[var(--focus-ring)]",
                active
                  ? "border-accent bg-[var(--accent-tint)]"
                  : "border-border-subtle hover:border-accent hover:bg-[var(--accent-tint)]"
              )}
              href={withBasePath(getGuidebookHref(locale, page.slug))}
            >
              {active ? (
                <span className="mb-1 block font-mono text-[10px] font-semibold uppercase tracking-[var(--ls-label)] text-accent">
                  {copy.current}
                </span>
              ) : null}
              <span className="block font-mono text-[var(--text-mono-sm)] font-semibold text-text-bright">
                {page.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-text-muted">
                {page.description}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
