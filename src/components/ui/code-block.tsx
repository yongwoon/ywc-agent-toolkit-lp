"use client";

import { useEffect, useId, useRef, useState, type HTMLAttributes } from "react";

export type CodeBlockProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  code: string;
  prompt?: "$" | "/" | string;
  label?: string;
  multiline?: boolean;
};

type CopyState = "idle" | "copied" | "failed";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CodeBlock({
  code,
  prompt = "$",
  label,
  multiline,
  className,
  ...props
}: CodeBlockProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const codeRef = useRef<HTMLElement>(null);
  const resetTimer = useRef<number | null>(null);
  const statusId = useId();
  const isMultiline = multiline ?? code.includes("\n");

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function scheduleReset() {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }

    resetTimer.current = window.setTimeout(() => {
      setCopyState("idle");
      resetTimer.current = null;
    }, 1800);
  }

  function selectCodeText() {
    const element = codeRef.current;

    if (!element || !window.getSelection) {
      return;
    }

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  async function handleCopy() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      selectCodeText();
      setCopyState("failed");
    } finally {
      scheduleReset();
    }
  }

  return (
    <div
      {...props}
      className={cx(
        "overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-[var(--edge-top)]",
        className
      )}
    >
      <div className="flex min-h-[2.5rem] items-center justify-between gap-3 border-b border-border-subtle bg-bg-subtle px-3">
        <span className="truncate font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-text-muted">
          {label ?? "command"}
        </span>
        <button
          aria-describedby={statusId}
          className="rounded-xs border border-border-subtle bg-surface-raised px-2.5 py-1.5 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-text-secondary outline-none transition-[background-color,border-color,color,transform] duration-[var(--dur-fast)] ease-out hover:border-accent hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)] motion-safe:hover:-translate-y-px motion-safe:active:scale-[0.98]"
          onClick={handleCopy}
          type="button"
        >
          {copyState === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={cx(
          "m-0 overflow-x-auto p-4 font-mono text-[var(--text-mono)] leading-[var(--lh-mono)] text-text-bright",
          isMultiline ? "whitespace-pre" : "whitespace-pre"
        )}
      >
        <span aria-hidden="true" className="mr-3 select-none text-accent">
          {prompt}
        </span>
        <code ref={codeRef} className="select-text">
          {code}
        </code>
      </pre>
      <span
        aria-live="polite"
        className="sr-only"
        id={statusId}
      >
        {copyState === "copied"
          ? "Command copied to clipboard."
          : copyState === "failed"
            ? "Clipboard copy failed. Command text is selected for manual copy."
            : ""}
      </span>
    </div>
  );
}
