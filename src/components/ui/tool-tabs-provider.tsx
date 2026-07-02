"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";

export type Tool = "claude-code" | "codex";

const STORAGE_KEY = "ywc-tool-preference";
const DEFAULT_TOOL: Tool = "claude-code";

function isTool(value: string | null): value is Tool {
  return value === "claude-code" || value === "codex";
}

type Listener = () => void;

type ToolStore = {
  subscribe: (listener: Listener) => () => void;
  getSnapshot: () => Tool;
  getServerSnapshot: () => Tool;
  setTool: (next: Tool) => void;
};

// Reading localStorage during render would mismatch the server-rendered HTML, and reading it
// via setState-in-an-effect trips react-hooks/set-state-in-effect. useSyncExternalStore's
// subscribe callback is the React-sanctioned place to hydrate from an external, client-only
// source exactly once after mount, so we hydrate lazily there instead.
function createToolStore(): ToolStore {
  let tool: Tool = DEFAULT_TOOL;
  let hasHydrated = false;
  const listeners = new Set<Listener>();

  function hydrateFromStorageOnce() {
    if (hasHydrated) {
      return;
    }

    hasHydrated = true;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (isTool(stored)) {
        tool = stored;
      }
    } catch {
      // localStorage inaccessible (privacy mode / disabled) — stay on the default, memory-only state.
    }
  }

  return {
    subscribe(listener) {
      hydrateFromStorageOnce();
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      return tool;
    },
    getServerSnapshot() {
      return DEFAULT_TOOL;
    },
    setTool(next) {
      tool = next;

      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // localStorage inaccessible — keep working in memory only.
      }

      listeners.forEach((listener) => listener());
    }
  };
}

type ToolTabsContextValue = {
  tool: Tool;
  setTool: (tool: Tool) => void;
};

const ToolTabsContext = createContext<ToolTabsContextValue | null>(null);

export function ToolTabsProvider({ children }: { children: ReactNode }) {
  const [store] = useState<ToolStore>(createToolStore);
  const tool = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  return <ToolTabsContext.Provider value={{ tool, setTool: store.setTool }}>{children}</ToolTabsContext.Provider>;
}

export function useToolTabsContext(): ToolTabsContextValue {
  const context = useContext(ToolTabsContext);

  if (!context) {
    throw new Error("ToolTabs must be rendered within a ToolTabsProvider");
  }

  return context;
}
