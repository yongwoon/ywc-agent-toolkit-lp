import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type FlowStepProps = {
  children: ReactNode;
};

export function FlowStep({ children }: FlowStepProps) {
  return (
    <span className="inline-flex min-h-10 w-full max-w-[28rem] items-center justify-center rounded-md border border-border-subtle bg-surface-raised px-3 py-2 text-center font-mono text-[var(--text-mono-sm)] font-semibold leading-snug text-text-bright shadow-[var(--edge-top)] [overflow-wrap:anywhere]">
      {children}
    </span>
  );
}

type FlowChainProps = {
  items: string;
};

export function FlowChain({ items }: FlowChainProps) {
  const parts = items
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-1.5">
      {parts.map((part, index) => (
        <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2" key={`${index}-${part}`}>
          <span className="flex h-7 w-7 items-center justify-center rounded-xs border border-border-subtle bg-bg-subtle font-mono text-[0.68rem] font-semibold leading-none text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 rounded-xs border border-border-subtle bg-surface-raised px-3 py-1.5 font-mono text-[var(--text-mono-sm)] leading-snug text-text-bright shadow-[var(--edge-top)] [overflow-wrap:anywhere]">
            {part}
          </span>
          {index < parts.length - 1 ? (
            <span aria-hidden="true" className="col-start-1 flex h-3 items-center justify-center text-text-faint">
              │
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type FlowBranchProps = {
  label: string;
  children: ReactNode;
};

export function FlowBranch({ label, children }: FlowBranchProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className="relative overflow-hidden rounded-md border border-border-subtle bg-surface shadow-[var(--edge-top)]">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-surface-raised px-4 py-3">
        <span className="font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-accent">
          {label}
        </span>
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent shadow-[var(--glow-accent-soft)]" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        {items.map((item, index) => (
          <div className="flex flex-col items-stretch gap-3" key={index}>
            {index > 0 ? (
              <div aria-hidden="true" className="flex items-center gap-3 text-text-faint">
                <span className="h-px flex-1 bg-border-subtle" />
                <span className="font-mono text-[0.7rem] leading-none">↓</span>
                <span className="h-px flex-1 bg-border-subtle" />
              </div>
            ) : null}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <span aria-hidden="true" className="flex items-center justify-center text-accent sm:px-1">
      <span className="sm:hidden">↓</span>
      <span className="hidden sm:inline">→</span>
    </span>
  );
}

function isFlowBranch(child: ReactElement): boolean {
  return typeof (child.props as { label?: unknown }).label === "string";
}

type FlowDiagramProps = {
  children: ReactNode;
};

// A responsive replacement for wide ASCII-art flow diagrams: trunk steps form the
// decision rail, then branches render as readable step lists that wrap safely on
// narrow documentation pages.
export function FlowDiagram({ children }: FlowDiagramProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const stepItems = items.filter((item) => !isFlowBranch(item));
  const branchItems = items.filter((item) => isFlowBranch(item));

  return (
    <div className="my-8 w-full overflow-hidden rounded-lg border border-border-subtle bg-bg-subtle p-4 shadow-[var(--edge-top)] sm:p-5">
      {stepItems.length > 0 ? (
        <div className="rounded-md border border-border-subtle bg-surface p-3 shadow-[var(--edge-top)]">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {stepItems.map((step, index) => (
              <div className="contents" key={index}>
                {step}
                {index < stepItems.length - 1 ? <Connector /> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {branchItems.length > 0 ? (
        <>
          <div aria-hidden="true" className="flex items-center gap-3 py-4 text-accent">
            <span className="h-px flex-1 bg-border-subtle" />
            <span className="font-mono text-[0.72rem] leading-none">◆</span>
            <span className="h-px flex-1 bg-border-subtle" />
          </div>
          <div
            className={cx(
              "grid items-start gap-4",
              branchItems.length > 1 && "lg:grid-cols-[0.9fr_1.1fr]"
            )}
          >
            {branchItems.map((branch, index) => (
              <div key={index}>{branch}</div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
