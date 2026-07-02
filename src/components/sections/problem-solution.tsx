import { getLocale, getTranslations } from "next-intl/server";

import { InlineSkillText } from "@/components/ui/inline-skill-text";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

type ComparisonColumn = {
  title: string;
  items: string[];
};

function ComparisonList({
  column,
  tone,
  locale
}: {
  column: ComparisonColumn;
  tone: "before" | "after";
  locale: string;
}) {
  const mark = tone === "before" ? "✗" : "✓";
  const markClass =
    tone === "before" ? "text-state-fail" : "text-state-pass";

  return (
    <article className="rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]">
      <h3 className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
        {column.title}
      </h3>
      <ul className="mt-5 grid gap-4">
        {column.items.map((item) => (
          <li className="flex gap-3 text-text-secondary" key={item}>
            <span
              aria-hidden="true"
              className={`mt-0.5 font-mono text-[var(--text-mono)] font-semibold ${markClass}`}
            >
              {mark}
            </span>
            <span className="leading-[var(--lh-relaxed)]">
              <InlineSkillText locale={locale} text={item} />
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export async function ProblemSolution() {
  const t = await getTranslations("problemSolution");
  const locale = await getLocale();
  const before = t.raw("before") as ComparisonColumn;
  const after = t.raw("after") as ComparisonColumn;

  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <SectionEyebrow>Why</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <ComparisonList column={before} locale={locale} tone="before" />
          <ComparisonList column={after} locale={locale} tone="after" />
        </div>
      </div>
    </section>
  );
}
