import type { HTMLAttributes, ReactNode } from "react";

type StatLane = "claude" | "codex";

export type StatCardProps = HTMLAttributes<HTMLElement> & {
  value: ReactNode;
  unit?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  lane?: StatLane;
};

const laneClasses: Record<StatLane, string> = {
  claude: "hover:border-lane-claude focus-within:border-lane-claude",
  codex: "hover:border-lane-codex focus-within:border-lane-codex"
};

const laneAccentClasses: Record<StatLane, string> = {
  claude: "text-lane-claude",
  codex: "text-lane-codex"
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function StatCard({
  value,
  unit,
  label,
  description,
  eyebrow,
  lane = "claude",
  className,
  ...props
}: StatCardProps) {
  return (
    <article
      {...props}
      className={cx(
        "group rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)] transition-[border-color,transform] duration-[var(--dur-base)] ease-out motion-safe:hover:-translate-y-0.5",
        laneClasses[lane],
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cx(
            "mb-4 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)]",
            laneAccentClasses[lane]
          )}
        >
          {eyebrow}
        </div>
      ) : null}
      <div className="flex flex-wrap items-end gap-x-2 gap-y-1 font-display font-bold leading-none tracking-[var(--ls-normal)] text-text-bright">
        <span className="text-[clamp(2.5rem,6vw,4.5rem)]">{value}</span>
        {unit ? (
          <span className="pb-2 font-mono text-[var(--text-mono)] font-semibold uppercase tracking-[var(--ls-label)] text-text-muted">
            {unit}
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
        {label}
      </h3>
      {description ? (
        <p className="mt-3 text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary">
          {description}
        </p>
      ) : null}
    </article>
  );
}
