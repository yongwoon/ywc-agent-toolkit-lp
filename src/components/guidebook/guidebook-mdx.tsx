import { MDXRemote } from "next-mdx-remote/rsc";
import Slugger from "github-slugger";
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/ui/code-block";
import { FlowBranch, FlowChain, FlowDiagram, FlowStep } from "@/components/ui/flow-diagram";
import { ToolTabs, ToolTabsPanel } from "@/components/ui/tool-tabs";
import { getGuidebookHref, getGuidebookRootHref } from "@/components/guidebook/guidebook-nav";
import type { Locale } from "@/i18n/locale-list";

type GuidebookMdxProps = {
  source: string;
  locale: Locale | string;
};

// Guidebook markdown authors write cross-page links the way they'd work in a plain
// file browser -- "./05-general-cycle-medium-large.md", "./README.md" -- since that's
// what resolves correctly when reading the source .md files directly on GitHub. The
// rendered site has no matching file: each slug is a route (`/{locale}/guidebook/
// {slug}/`), so left as-is these hrefs resolve relative to the CURRENT page's URL
// (e.g. "./14-x.md" clicked from "/ko/guidebook/01-introduction/" lands on
// "/ko/guidebook/01-introduction/14-x.md", a 404). Rewrite them to real routes here
// instead of touching every content file.
function resolveGuidebookHref(locale: Locale | string, href: string): string {
  const match = /^\.\/(.+)\.md$/.exec(href);

  if (!match) {
    return href;
  }

  const [, target] = match;
  return target === "README" ? getGuidebookRootHref(locale) : getGuidebookHref(locale, target);
}

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

export function GuidebookMdx({ source, locale }: GuidebookMdxProps) {
  const slugger = new Slugger();
  const H1 = createHeading(1, slugger);
  const H2 = createHeading(2, slugger);
  const H3 = createHeading(3, slugger);

  return (
    <MDXRemote
      source={source}
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
        a: ({ href, ...props }) => (
          <a
            {...props}
            className="text-link underline decoration-border underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-accent"
            href={typeof href === "string" ? resolveGuidebookHref(locale, href) : href}
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
        ),
        // MDX content uses the flat <ToolTabsPanel> tag, not the compound <ToolTabs.Panel>
        // from FR-1's TSX-authoring sample: member-expression JSX tags resolve via a
        // components.ToolTabs.Panel property chain, and that static property doesn't survive
        // the Server Component boundary in production builds (works in `next dev`, fails
        // during `next build`'s SSG worker with "Expected component `ToolTabs.Panel` to be
        // defined"). The flat tag resolves ToolTabsPanel directly as its own named export,
        // sidestepping the property chain entirely. ToolTabs.Panel remains valid for direct
        // TSX/JSX consumers outside this MDX pipeline.
        ToolTabs,
        ToolTabsPanel,
        // CodeBlock is registered too since ToolTabsPanel content uses it as a direct JSX
        // tag, not the auto `pre` mapping above.
        CodeBlock,
        FlowDiagram,
        FlowStep,
        FlowBranch,
        FlowChain
      }}
      options={{
        parseFrontmatter: false,
        blockJS: true,
        blockDangerousJS: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
