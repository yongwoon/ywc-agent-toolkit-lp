import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        bg: "var(--ink-900)",
        "bg-subtle": "var(--ink-850)",
        surface: "var(--ink-800)",
        "surface-raised": "var(--ink-700)",
        border: "var(--ink-500)",
        "border-strong": "var(--ink-600)",
        "border-subtle": "var(--ink-700)",
        text: "var(--ink-100)",
        "text-bright": "var(--ink-050)",
        "text-secondary": "var(--ink-200)",
        "text-muted": "var(--ink-300)",
        "text-faint": "var(--ink-350)",
        accent: "var(--amber-500)",
        "accent-hover": "var(--amber-400)",
        link: "var(--cyan-500)",
        "lane-claude": "var(--amber-500)",
        "lane-codex": "var(--cyan-500)",
        "state-pass": "var(--green-500)",
        "state-fail": "var(--red-500)",
        "state-warn": "var(--amber-500)",
        "state-agent": "var(--violet-500)",
        "amber-300": "var(--amber-300)",
        "amber-500": "var(--amber-500)",
        "cyan-500": "var(--cyan-500)",
        "green-500": "var(--green-500)",
        "red-500": "var(--red-500)",
        "violet-500": "var(--violet-500)"
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)"
      },
      fontSize: {
        display: "var(--text-display)",
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        lead: "var(--text-lead)",
        label: "var(--text-label)"
      },
      borderRadius: {
        xs: "3px",
        sm: "5px",
        md: "8px",
        lg: "12px"
      },
      boxShadow: {
        md: "0 4px 16px rgba(0,0,0,0.45)",
        lg: "0 16px 48px rgba(0,0,0,0.55)",
        "glow-accent": "0 0 0 1px var(--amber-500), 0 0 24px -4px var(--amber-glow)"
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16,1,0.3,1)"
      }
    }
  }
} satisfies Config;

export default config;
