import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";

type FeatureItem = {
  label: string;
  value: string;
  description: string;
};

function splitStatValue(value: string) {
  const match = value.match(/^(\d+)\s+(.+)$/);

  if (!match) {
    return { value, unit: undefined };
  }

  return { value: match[1], unit: match[2] };
}

function getLane(index: number) {
  return index < 2 ? "claude" : "codex";
}

const laneToolNames = {
  claude: "Claude Code",
  codex: "Codex"
} as const;

export async function FeatureGrid() {
  const t = await getTranslations("featureGrid");
  const items = t.raw("items") as FeatureItem[];

  return (
    <section className="border-b border-border-subtle" id="features">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <p className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent">
            Scale
          </p>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const lane = getLane(index);
            const stat = splitStatValue(item.value);

            return (
              <StatCard
                description={item.description}
                eyebrow={
                  <Badge dot variant={lane === "claude" ? "amber" : "cyan"}>
                    {laneToolNames[lane]}
                  </Badge>
                }
                key={item.label}
                label={item.label}
                lane={lane}
                unit={stat.unit}
                value={stat.value}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
