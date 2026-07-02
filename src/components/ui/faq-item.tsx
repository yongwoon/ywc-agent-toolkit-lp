import type { DetailsHTMLAttributes, ReactNode } from "react";

export type FaqItemProps = Omit<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  "children"
> & {
  question: ReactNode;
  children: ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FaqItem({
  question,
  children,
  className,
  open,
  ...props
}: FaqItemProps) {
  return (
    <details
      {...props}
      open={open}
      className={cx(
        "group border-b border-border-subtle transition-[border-color,background-color] duration-[var(--dur-base)] open:border-l-2 open:border-l-accent open:bg-[var(--accent-tint)]",
        className
      )}
    >
      <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 px-4 py-5 text-left outline-none focus-visible:shadow-[var(--focus-ring)] [&::-webkit-details-marker]:hidden">
        <span className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-xs border border-border-subtle bg-surface-raised font-mono text-[1.2rem] leading-none text-accent transition-transform duration-[var(--dur-base)] motion-reduce:transition-none"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">×</span>
        </span>
      </summary>
      <div className="px-4 pb-5 text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text-secondary">
        {children}
      </div>
    </details>
  );
}
