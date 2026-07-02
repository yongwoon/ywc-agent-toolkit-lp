# Components — ywc-agent-toolkit

The 7 reusable primitives. In the design-system project they live as React components under
`components/core/` (`Button`, `Badge`, `CodeBlock`, `Terminal`, `StatCard`, `FaqItem`,
`LocaleSwitcher`). When implementing in the Next.js LP, recreate them under
`src/components/ui/` following these contracts — each is self-contained and reads styling from
the CSS custom properties (or Tailwind utilities mapped in `tailwind-theme.css`).

> The full reference source (props + styling) is in the design-system project's
> `components/core/<Name>.{jsx,d.ts,prompt.md}` — copy values from there for pixel fidelity.

---

## Button
Monospace CTA. `variant`: `primary` (amber fill, once per view) · `secondary` (raised surface) ·
`outline` (hairline) · `ghost` (text). `size`: `sm|md|lg`. Renders `<a>` when `href` set.
Props: `icon`, `iconRight`, `block`, `disabled`. Hover: lift 1px (+ amber glow on primary);
press: scale 0.98. Font `--font-mono`, radius `--radius-sm`, heights `--control-h*`.

```tsx
<Button variant="primary" size="lg" href="#install">Install now</Button>
<Button variant="outline" icon={<Star/>}>Star on GitHub</Button>
```

## Badge
Compact mono pill for status / counts / lanes. `variant`: `neutral|amber|cyan|pass|fail|agent`.
`dot` adds a glowing status indicator. `pass|fail|agent` carry pipeline meaning — don't use
decoratively. Radius `--radius-pill`, size `--text-label`.

```tsx
<Badge variant="amber" dot>41 skills</Badge>
<Badge variant="pass" dot>merged</Badge>
```

## CodeBlock
Copy-to-clipboard terminal command block (**the signature element**). Props: `code`,
`prompt` (default `$`, use `/` for slash-commands), `label` (uppercase caption bar), `multiline`.
The prompt glyph is amber + non-selectable so copied text is clean. **Clipboard failure falls
back to selecting the text** (non-secure context / denied) — never a dead end.

```tsx
<CodeBlock label="claude code" code="/plugin marketplace add yongwoon/ywc-agent-toolkit" />
```

## Terminal
Window-chrome shell for CLI demos / transcripts. Props: `title`, `glow` (amber halo — hero only).
Compose rows with `Terminal.Line` — `type`: `prompt|output|comment|success|error|info`;
`caret` on the last live line for a blinking block cursor. Title bar = traffic-light dots +
centered mono title; radius `--radius-lg`.

```tsx
<Terminal title="ywc-agent-toolkit — zsh" glow>
  <Terminal.Line type="prompt" prompt="/">ywc-agentic "add OAuth login"</Terminal.Line>
  <Terminal.Line type="success">✓ PR #248 merged</Terminal.Line>
  <Terminal.Line type="prompt" caret> </Terminal.Line>
</Terminal>
```

## StatCard
Feature-grid stat tile. Props: `value`, `unit`, `label`, `description`, `eyebrow`,
`lane` (`claude` = amber, `codex` = cyan). Big display figure; hover lifts 2px + reveals lane
border. Used for the 41/12 (Claude) and 41/7 (Codex) split — **hero says "expert agents", exact
counts live here.**

```tsx
<StatCard lane="claude" eyebrow="claude code" value="41" unit="skills"
  label="Workflow skills" description="Plan → spec → code → review → release." />
```

## FaqItem
Accordion row. Props: `question`, `defaultOpen` (uncontrolled) OR `open`+`onToggle` (controlled,
for single-open behavior). Rotating `+`→`×` glyph, amber left-rule when open, height animated via
`grid-template-rows` (compositor-friendly).

```tsx
const [open, setOpen] = useState(0);
{items.map((f,i)=>(
  <FaqItem key={i} question={f.q} open={open===i} onToggle={n=>setOpen(n?i:-1)}>{f.a}</FaqItem>
))}
```

## LocaleSwitcher
Dropdown for the 5 locales (`en·ja·ko·zh·es`), listing **native language names** so non-English
visitors self-serve. Props: `value`, `onChange(code)`, `locales`, `align`. Wire `onChange` to
next-intl navigation. Closes on outside click; active locale amber-tinted.

```tsx
<LocaleSwitcher value={locale} onChange={(code)=>router.push(`/${code}`)} />
```

---

## Section composition (LP)

The landing page composes these into sections (mirrors `src/components/sections/` in the LP repo):
`site-header` (wordmark · nav · GitHub star Badge · LocaleSwitcher · Install Button) → `hero`
(headline + CTAs + CodeBlock + animated Terminal) → `problem-solution` (2-col ✗/✓) → `feature-grid`
(4× StatCard + skill-category chips) → `install-steps` (tabbed Claude Code / Codex, numbered,
CodeBlock per step) → `faq` (single-open FaqItem list) → `site-footer` (link columns). See the
design-system project's `ui_kits/landing/` for the full reference implementation and the
5-locale copy in `messages.js`.
