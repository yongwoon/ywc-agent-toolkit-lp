import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "neutral" | "amber" | "cyan" | "pass" | "fail" | "agent";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  dot?: boolean;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-border-subtle bg-surface-raised text-text-secondary",
  amber: "border-accent/60 bg-[var(--accent-tint)] text-accent",
  cyan: "border-link/60 bg-[var(--cyan-tint)] text-link",
  pass: "border-state-pass/60 bg-[var(--green-tint)] text-state-pass",
  fail: "border-state-fail/60 bg-[var(--red-tint)] text-state-fail",
  agent: "border-state-agent/60 bg-[var(--violet-tint)] text-state-agent"
};

const dotClasses: Record<BadgeVariant, string> = {
  neutral: "bg-text-faint shadow-[0_0_8px_var(--text-faint)]",
  amber: "bg-accent shadow-[0_0_8px_var(--accent)]",
  cyan: "bg-link shadow-[0_0_8px_var(--link)]",
  pass: "bg-state-pass shadow-[0_0_8px_var(--state-pass)]",
  fail: "bg-state-fail shadow-[0_0_8px_var(--state-fail)]",
  agent: "bg-state-agent shadow-[0_0_8px_var(--state-agent)]"
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({
  variant = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cx(
        "inline-flex max-w-full items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)]",
        variantClasses[variant],
        className
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cx("size-1.5 shrink-0 rounded-full", dotClasses[variant])}
        />
      ) : null}
      <span className="truncate">{children}</span>
    </span>
  );
}
