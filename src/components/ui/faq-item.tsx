"use client";

import {
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode
} from "react";

export type FaqItemProps = Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> & {
  question: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  children: ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FaqItem({
  question,
  defaultOpen = false,
  open,
  onToggle,
  children,
  className,
  ...props
}: FaqItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const panelId = useId();
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  function handleToggle() {
    const nextOpen = !isOpen;

    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onToggle?.(nextOpen);
  }

  return (
    <div
      {...props}
      className={cx(
        "border-b border-border-subtle transition-[border-color,background-color] duration-[var(--dur-base)]",
        isOpen && "border-l-2 border-l-accent bg-[var(--accent-tint)]",
        className
      )}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-4 py-5 text-left outline-none focus-visible:shadow-[var(--focus-ring)]"
        onClick={handleToggle}
        type="button"
      >
        <span className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-xs border border-border-subtle bg-surface-raised font-mono text-[1.2rem] leading-none text-accent transition-transform duration-[var(--dur-base)] motion-reduce:transition-none"
        >
          {isOpen ? "×" : "+"}
        </span>
      </button>
      <div
        className={cx(
          "grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        id={panelId}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text-secondary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
