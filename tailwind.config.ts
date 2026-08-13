import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "border-subtle": "var(--border-subtle)",
        text: "var(--text)",
        "text-bright": "var(--text-bright)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        link: "var(--link)",
        "lane-claude": "var(--lane-claude)",
        "lane-codex": "var(--lane-codex)",
        "state-pass": "var(--state-pass)",
        "state-fail": "var(--state-fail)",
        "state-warn": "var(--state-warn)",
        "state-agent": "var(--state-agent)",
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
