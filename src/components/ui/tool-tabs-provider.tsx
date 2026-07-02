"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Tool = "claude-code" | "codex";

const STORAGE_KEY = "ywc-tool-preference";
const DEFAULT_TOOL: Tool = "claude-code";

function isTool(value: string | null): value is Tool {
  return value === "claude-code" || value === "codex";
}

type ToolTabsContextValue = {
  tool: Tool;
  setTool: (tool: Tool) => void;
};

const ToolTabsContext = createContext<ToolTabsContextValue | null>(null);

export function ToolTabsProvider({ children }: { children: ReactNode }) {
  const [tool, setToolState] = useState<Tool>(DEFAULT_TOOL);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (isTool(stored)) {
        setToolState(stored);
      }
    } catch {
      // localStorage inaccessible (privacy mode / disabled) — stay on the default, memory-only state.
    }
  }, []);

  function setTool(next: Tool) {
    setToolState(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage inaccessible — keep working in memory only.
    }
  }

  return <ToolTabsContext.Provider value={{ tool, setTool }}>{children}</ToolTabsContext.Provider>;
}

export function useToolTabsContext(): ToolTabsContextValue {
  const context = useContext(ToolTabsContext);

  if (!context) {
    throw new Error("ToolTabs must be rendered within a ToolTabsProvider");
  }

  return context;
}
