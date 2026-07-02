"use client";

import {
  Children,
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
const ToolTabsPanel: FC<ToolTabsPanelProps> = () => null;
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

      // One message covers both misuse shapes we can't tell apart here: a real
      // <ToolTabs.Panel> with a mistyped tool value, and a non-Panel element that
      // wandered into <ToolTabs>'s children (which also arrives with no "tool" prop).
      if (!isTool(tool)) {
        throw new Error(
          `<ToolTabs> children must be <ToolTabs.Panel tool="claude-code" | "codex" label="...">; ` +
            `received a "tool" prop of ${JSON.stringify(tool)}. If this child isn't meant to be a ` +
            `ToolTabs.Panel, remove it from <ToolTabs>'s children.`
        );
      }

      if (!label) {
        throw new Error(`ToolTabs.Panel with tool="${tool}" is missing a required "label" prop.`);
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
    <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-[var(--edge-top)]">
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
            {panel.content}
          </div>
        );
      })}
    </div>
  );
}

ToolTabs.Panel = ToolTabsPanel;
