"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import Slugger from "github-slugger";
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { CodeBlock } from "@/components/ui/code-block";

type GuidebookMdxProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
};

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }

  return "";
}

function createHeading(level: 1 | 2 | 3, slugger: Slugger) {
  const Tag = `h${level}` as const;

  return function Heading({ children, ...props }: ComponentPropsWithoutRef<typeof Tag>) {
    const id = props.id ?? slugger.slug(textFromChildren(children));

    return (
      <Tag
        {...props}
        className={
          level === 1
            ? "scroll-mt-[76px] font-display text-h1 font-bold leading-[var(--lh-tight)] text-text-bright"
            : level === 2
              ? "group mt-12 scroll-mt-[76px] font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright"
              : "mt-8 scroll-mt-[76px] font-display text-[var(--text-h4)] font-bold leading-[var(--lh-snug)] text-text-bright"
        }
        id={id}
      >
        {level === 2 ? (
          <a
            aria-hidden="true"
            className="mr-2 opacity-0 outline-none transition-opacity duration-[var(--dur-fast)] group-hover:opacity-100 group-focus-within:opacity-100"
            href={`#${id}`}
            tabIndex={-1}
          >
            #
          </a>
        ) : null}
        {children}
      </Tag>
    );
  };
}

export function GuidebookMdx({ source }: GuidebookMdxProps) {
  const slugger = new Slugger();
  const H1 = createHeading(1, slugger);
  const H2 = createHeading(2, slugger);
  const H3 = createHeading(3, slugger);

  return (
    <MDXRemote
      {...source}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        p: (props) => (
          <p
            {...props}
            className="my-5 text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text"
          />
        ),
        a: (props) => (
          <a
            {...props}
            className="text-link underline decoration-border underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-accent"
          />
        ),
        ul: (props) => <ul {...props} className="my-5 list-none space-y-2 pl-0" />,
        li: ({ children, ...props }) => (
          <li {...props} className="relative pl-5 leading-[var(--lh-relaxed)] text-text">
            <span aria-hidden="true" className="absolute left-0 top-[0.35em] text-accent">
              ▪
            </span>
            {children}
          </li>
        ),
        code: ({ children, ...props }) => (
          <code
            {...props}
            className="rounded-xs border border-border-subtle bg-surface-raised px-1.5 py-0.5 font-mono text-[0.9em] text-amber-300"
          >
            {children}
          </code>
        ),
        pre: ({ children }) => {
          const code = textFromChildren(children).trimEnd();
          return <CodeBlock code={code} label="guidebook" multiline />;
        },
        blockquote: (props) => (
          <blockquote
            {...props}
            className="my-6 border border-[rgba(245,166,35,.3)] bg-[var(--accent-tint)] px-4 py-3 text-text-secondary before:mr-3 before:font-mono before:text-accent before:content-['!']"
          />
        ),
        table: (props) => (
          <div className="my-8 overflow-x-auto">
            <table {...props} className="w-full border-collapse text-left text-sm" />
          </div>
        ),
        th: (props) => (
          <th
            {...props}
            className="border-b border-border-subtle py-3 pr-4 font-mono text-label font-semibold uppercase tracking-[var(--ls-label)] text-text-faint"
          />
        ),
        td: (props) => (
          <td {...props} className="border-b border-border-subtle py-3 pr-4 text-text-secondary" />
        )
      }}
    />
  );
}
