"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode
} from "react";

import { isTool, useToolTabsContext, type Tool } from "./tool-tabs-provider";

export type { Tool };

export type ToolTabsPanelProps = {
  tool: Tool;
  label: string;
  children: ReactNode;
};

// Never rendered directly — ToolTabs reads this component's props from its
// children and renders the tab header + panel body itself. Typed as FC so JSX
// callers get prop checking without an unused render parameter.
//
// Exported by name (not only as the ToolTabs.Panel static property below): when this
// "use client" module is imported into a Server Component, Next.js gives each named
// export its own client reference, but a property bolted onto an export after
// declaration (ToolTabs.Panel = ...) does not survive that boundary in production
// builds — the member-expression JSX tag <ToolTabs.Panel> from MDX (rendered
// server-side by next-mdx-remote/rsc) fails with "Expected component `ToolTabs.Panel`
// to be defined" even though the same property resolves fine in `next dev`. MDX
// content must use the flat <ToolTabsPanel> tag registered from this named export
// instead (see guidebook-mdx.tsx); ToolTabs.Panel remains valid for direct TSX/JSX
// consumers that don't cross a Server Component boundary.
export const ToolTabsPanel: FC<ToolTabsPanelProps> = () => null;
ToolTabsPanel.displayName = "ToolTabs.Panel";

export type ToolTabsProps = {
  children: ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const laneTextClasses: Record<Tool, string> = {
  "claude-code": "text-lane-claude",
  codex: "text-lane-codex"
};

const laneBorderClasses: Record<Tool, string> = {
  "claude-code": "border-b-lane-claude",
  codex: "border-b-lane-codex"
};

// Claude Code skills are invoked as chat slash-commands (/skill-name), Codex skills as
// shell CLI invocations ($ codex exec ...). A single hardcoded prompt char on CodeBlock
// would visually claim every command is a shell command, which is only true for Codex.
const toolPromptChars: Record<Tool, string> = {
  "claude-code": "/",
  codex: "$"
};

// Panel content is a <CodeBlock ... /> authored directly in MDX (see FR-1's
// static-literal-props constraint) without a `prompt`, so inject the tool-appropriate
// prompt here rather than requiring every content file to set it explicitly. An
// explicit `prompt` already set on the content is left untouched. Children.map (not a
// plain isValidElement check) because MDX's indentation/newlines around the tag make
// this arrive as an array with whitespace text nodes, not a bare single element.
function withToolPrompt(content: ReactNode, tool: Tool): ReactNode {
  return Children.map(content, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const props = child.props as { prompt?: string };

    return cloneElement(child as ReactElement<{ prompt?: string }>, {
      prompt: props.prompt ?? toolPromptChars[tool]
    });
  });
}

type Panel = {
  tool: Tool;
  label: string;
  content: ReactNode;
};

function readPanels(children: ReactNode): Panel[] {
  // Read props off each child directly rather than checking `child.type === ToolTabsPanel`:
  // when <ToolTabs> is used from a Server Component (the MDX guidebook pipeline), the child
  // elements' `type` crosses the RSC boundary as an opaque client reference that does not
  // compare equal to the literal ToolTabsPanel function this client module holds.
  return Children.toArray(children)
    .filter((child): child is ReactElement<Partial<ToolTabsPanelProps>> => isValidElement(child))
    .map((child) => {
      const { tool, label, children: content } = child.props;

      // One message covers both misuse shapes we can't tell apart here: a real panel
      // with a mistyped tool value, and a non-panel element that wandered into
      // <ToolTabs>'s children (which also arrives with no "tool" prop). Names both the
      // TSX and MDX syntaxes — <ToolTabs.Panel> alone would mislead an MDX author,
      // since that compound form doesn't work in MDX (see this file's export comment).
      if (!isTool(tool)) {
        throw new Error(
          `<ToolTabs> children must be a panel: <ToolTabs.Panel tool="claude-code" | "codex" ` +
            `label="..."> in TSX, or <ToolTabsPanel tool="claude-code" | "codex" label="..."> in ` +
            `MDX content; received a "tool" prop of ${JSON.stringify(tool)}. If this child isn't ` +
            `meant to be a panel, remove it from <ToolTabs>'s children.`
        );
      }

      if (!label) {
        throw new Error(
          `ToolTabs panel with tool="${tool}" is missing a required "label" prop ` +
            `(ToolTabs.Panel in TSX / ToolTabsPanel in MDX).`
        );
      }

      return { tool, label, content };
    });
}

export function ToolTabs({ children }: ToolTabsProps) {
  const instanceId = useId();
  const { tool, setTool } = useToolTabsContext();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);
  const previousActiveIndex = useRef<number | null>(null);

  const panels = useMemo(() => readPanels(children), [children]);

  const activeIndex = useMemo(() => {
    const matched = panels.findIndex((panel) => panel.tool === tool);
    return matched === -1 ? 0 : matched;
  }, [panels, tool]);

  useEffect(() => {
    if (previousActiveIndex.current === null) {
      previousActiveIndex.current = activeIndex;
      return;
    }

    if (previousActiveIndex.current === activeIndex) {
      return;
    }

    previousActiveIndex.current = activeIndex;
    setEnteringIndex(activeIndex);
    const frame = requestAnimationFrame(() => setEnteringIndex(null));

    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  if (panels.length === 0) {
    return null;
  }

  function activateByIndex(index: number, focus: boolean) {
    const panel = panels[index];

    if (!panel) {
      return;
    }

    setTool(panel.tool);

    if (focus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const lastIndex = panels.length - 1;

    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault();
        activateByIndex(activeIndex >= lastIndex ? 0 : activeIndex + 1, true);
        break;
      }
      case "ArrowLeft": {
        event.preventDefault();
        activateByIndex(activeIndex <= 0 ? lastIndex : activeIndex - 1, true);
        break;
      }
      case "Home": {
        event.preventDefault();
        activateByIndex(0, true);
        break;
      }
      case "End": {
        event.preventDefault();
        activateByIndex(lastIndex, true);
        break;
      }
      case "Enter":
      case " ": {
        event.preventDefault();
        const focusedIndex = tabRefs.current.findIndex((el) => el === document.activeElement);
        activateByIndex(focusedIndex === -1 ? activeIndex : focusedIndex, true);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-[var(--edge-top)]">
      <div aria-label="Tool" className="flex border-b border-border-subtle" onKeyDown={handleKeyDown} role="tablist">
        {panels.map((panel, index) => {
          const isActive = index === activeIndex;
          const tabId = `${instanceId}-tab-${panel.tool}`;
          const panelId = `${instanceId}-panel-${panel.tool}`;

          return (
            <button
              aria-controls={panelId}
              aria-selected={isActive}
              className={cx(
                "border-b-2 border-transparent px-4 py-2.5 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-text-muted outline-none transition-colors duration-[var(--dur-fast)] ease-out motion-reduce:transition-none focus-visible:shadow-[var(--focus-ring)]",
                isActive && cx("text-text-bright", laneTextClasses[panel.tool], laneBorderClasses[panel.tool])
              )}
              id={tabId}
              key={panel.tool}
              onClick={() => activateByIndex(index, false)}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {panel.label}
            </button>
          );
        })}
      </div>
      {panels.map((panel, index) => {
        const isActive = index === activeIndex;
        const tabId = `${instanceId}-tab-${panel.tool}`;
        const panelId = `${instanceId}-panel-${panel.tool}`;

        return (
          <div
            aria-labelledby={tabId}
            className={cx(
              "motion-safe:transition-opacity motion-safe:duration-[var(--dur-base)] motion-safe:ease-out",
              isActive && enteringIndex === index ? "opacity-0" : "opacity-100"
            )}
            hidden={!isActive}
            id={panelId}
            key={panel.tool}
            role="tabpanel"
          >
            {withToolPrompt(panel.content, panel.tool)}
          </div>
        );
      })}
    </div>
  );
}

ToolTabs.Panel = ToolTabsPanel;
