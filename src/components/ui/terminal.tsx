import type { HTMLAttributes, ReactNode } from "react";

type TerminalLineType =
  | "prompt"
  | "output"
  | "comment"
  | "success"
  | "error"
  | "info";

export type TerminalProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  glow?: boolean;
  children: ReactNode;
};

export type TerminalLineProps = HTMLAttributes<HTMLDivElement> & {
  type?: TerminalLineType;
  prompt?: "$" | "/" | string;
  caret?: boolean;
  children?: ReactNode;
};

const lineTypeClasses: Record<TerminalLineType, string> = {
  prompt: "text-text-bright",
  output: "text-text-secondary",
  comment: "text-text-faint",
  success: "text-state-pass",
  error: "text-state-fail",
  info: "text-link"
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TerminalRoot({
  title = "terminal",
  glow = false,
  className,
  children,
  ...props
}: TerminalProps) {
  return (
    <div
      {...props}
      className={cx(
        "overflow-hidden rounded-lg border border-border-subtle bg-surface font-mono text-[var(--text-mono)] leading-[var(--lh-mono)] shadow-[var(--edge-top)]",
        glow && "shadow-[var(--edge-top),var(--glow-accent-soft)]",
        className
      )}
    >
      <div className="grid min-h-[2.75rem] grid-cols-[1fr_auto_1fr] items-center border-b border-border-subtle bg-bg-subtle px-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-state-fail" />
          <span className="size-2.5 rounded-full bg-state-warn" />
          <span className="size-2.5 rounded-full bg-state-pass" />
        </div>
        <div className="max-w-[min(18rem,55vw)] truncate text-center text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-muted">
          {title}
        </div>
        <div />
      </div>
      <div className="space-y-1.5 p-4">{children}</div>
    </div>
  );
}

export function TerminalLine({
  type = "output",
  prompt,
  caret = false,
  className,
  children,
  ...props
}: TerminalLineProps) {
  const showPrompt = type === "prompt";
  const promptGlyph = prompt ?? "$";

  return (
    <div
      {...props}
      className={cx(
        "flex min-h-[1.5rem] items-baseline gap-3",
        lineTypeClasses[type],
        className
      )}
    >
      {showPrompt ? (
        <span aria-hidden="true" className="select-none text-accent">
          {promptGlyph}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
        {children}
        {caret ? (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[1em] w-[0.6em] translate-y-[0.16em] bg-[var(--caret)] motion-safe:animate-pulse"
          />
        ) : null}
      </span>
    </div>
  );
}

export const Terminal = Object.assign(TerminalRoot, {
  Line: TerminalLine
});
