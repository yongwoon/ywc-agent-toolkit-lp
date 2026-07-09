# Content & Voice — ywc-agent-toolkit

Confident, technical, terminal-literate. Speaks to a peer who already uses Claude Code / Codex.
No hype, no exclamation marks, **no emoji**.

## Rules

- **Person:** address the reader as **"you"** ("without leaving your terminal", "pick your tool").
  The product is "the toolkit" or its name — never "we/our".
- **Tone:** plain, declarative, verb-first. Headlines are statements, not questions:
  *"The full dev workflow, automated." · "Built for both tools." · "Running in under a minute."*
- **Casing:** Sentence case for headlines & body. UPPERCASE + wide tracking **only** for the small
  mono eyebrows (`SCALE`, `INSTALL`, `WHY`, `FAQ`). Skill names stay lowercase-mono exactly as
  invoked: `ywc-plan`, `/ywc-agentic`, `ywc-impl-review`.
- **Numbers — the one hard constraint:** **"46 skills"** is true on both tools → safe to state.
  **Agent counts differ (13 Claude Code / 8 Codex)** → the hero must say **"expert agents"** (no
  number); the exact counts appear only in the Feature Grid, split by lane. Never let hero and
  feature grid contradict each other.
- **Punctuation motifs:** en-dash for asides (`— from planning and spec writing to…`), arrows for
  pipelines (`plan → spec → code → review → release`), leading `//` for terminal-style notes
  (`// Restart Claude Code or Codex after installation…`).
- **Grounded claims:** the before/after and features cite **real** skills (`ywc-plan`,
  `ywc-task-generator`, `ywc-impl-review`, `ywc-agentic`) — never invented capabilities or inflated
  metrics. Keep counts in sync with the toolkit's README "Supported Tools" table.
- **Install copy:** the LP covers the **plugin-marketplace / Codex-plugin** paths only (which have
  **no prerequisites**). Do **not** surface the bash-script fallback's git/bash/jq requirements —
  those belong to a path the LP doesn't document.

## Localization

5 locales (`en·ja·ko·zh·es`), `en` is source of truth. JA/KO/ZH/ES headlines run shorter or
longer than EN — write and lay out so copy tolerates **±40% length variance**; headlines never
rely on a fixed line count. CJK reads with a touch more line-height. Full translated strings for
every section live in the design-system project's `ui_kits/landing/messages.js` — reuse them.

## Examples

- ✅ "A collection of 46 skills and expert agents for Claude Code and Codex — from planning and spec writing to code generation, review, and release."
- ✅ "Plugin-marketplace and Codex-plugin installation have no prerequisites — the tool handles everything automatically."
- ❌ "🚀 The BEST AI toolkit that will 10x your workflow!!!"
- ❌ "46 skills and 13 agents for Claude Code and Codex" *(agent count is tool-specific — wrong in the hero)*
