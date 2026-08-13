import { getTranslations } from "next-intl/server";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import toolkitChangelog from "@/data/toolkit-changelog.json";

const FULL_HISTORY_URL = "https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md";

export async function ChangelogSection() {
  const t = await getTranslations("changelog");
  const entries = toolkitChangelog.entries;

  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {t("description")}
          </p>
        </div>

        <ul className="mt-8 grid gap-4">
          {entries.map((entry) => (
            <li key={entry.version}>
              <article className="rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <a
                    className="font-mono text-[var(--text-mono)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    href={entry.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    v{entry.version}
                  </a>
                  <time className="text-[var(--text-body-sm)] text-text-muted" dateTime={entry.date}>
                    {entry.date}
                  </time>
                </div>

                {entry.highlights.length > 0 && (
                  <ul className="mt-3 grid gap-1.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        className="text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary"
                        key={highlight}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            className="font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={FULL_HISTORY_URL}
            rel="noreferrer"
            target="_blank"
          >
            {t("fullHistoryLabel")} →
          </a>
        </div>
      </div>
    </section>
  );
}
