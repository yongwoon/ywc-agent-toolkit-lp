import type { HTMLAttributes, ReactNode } from "react";

export type SectionEyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionEyebrow({
  className,
  children,
  ...props
}: SectionEyebrowProps) {
  return (
    <p
      {...props}
      className={cx(
        "flex items-center gap-2 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-4 shrink-0 bg-accent" />
      {children}
    </p>
  );
}
