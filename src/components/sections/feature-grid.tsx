import { getLocale, getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { StatCard } from "@/components/ui/stat-card";
import { resolveLocalizedHref } from "@/lib/localized-href";

type StatLane = "claude" | "codex";

type FeatureItem = {
  label: string;
  value: string;
  description: string;
  lane: StatLane;
};

type FeatureGridCta = {
  label: string;
  target: string;
};

function splitStatValue(value: string) {
  const match = value.match(/^(\d+)\s+(.+)$/);

  if (!match) {
    return { value, unit: undefined };
  }

  return { value: match[1], unit: match[2] };
}

const laneToolNames = {
  claude: "Claude Code",
  codex: "Codex"
} as const;

export async function FeatureGrid() {
  const t = await getTranslations("featureGrid");
  const locale = await getLocale();
  const items = t.raw("items") as FeatureItem[];
  const cta = t.raw("cta") as FeatureGridCta;

  return (
    <section className="border-b border-border-subtle" id="features">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <SectionEyebrow>Coverage</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {t("description")}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const stat = splitStatValue(item.value);

            return (
              <StatCard
                description={item.description}
                eyebrow={
                  <Badge dot variant={item.lane === "claude" ? "amber" : "cyan"}>
                    {laneToolNames[item.lane]}
                  </Badge>
                }
                key={item.label}
                label={item.label}
                lane={item.lane}
                unit={stat.unit}
                value={stat.value}
              />
            );
          })}
        </div>
        <div className="mt-6">
          <a
            className="font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={resolveLocalizedHref(locale, cta.target)}
          >
            {cta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
