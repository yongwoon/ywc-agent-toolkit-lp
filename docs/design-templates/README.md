# Templates

Copyable starting points for consuming projects. Each folder is self-contained: open the
`.dc.html` entry, or lift the markup/CSS into your own app.

- **landing-page/** — `LandingPage.dc.html` — full CLI/terminal marketing landing page
  (hero + animated terminal, problem/solution, feature grid, tabbed install, FAQ, footer)
  with a working locale switcher across all 5 locales. Section components come from the
  design-system bundle; copy is in `messages.js`; responsive rules in `page.css`.
- **skill-docs-page/** — `SkillDocsPage.dc.html` — Laravel-docs-style 3-column reference
  page (top bar · collapsible skill nav · prose · on-this-page TOC with scroll-spy).
  Pure HTML/CSS + vanilla JS; styling in `page.css`.

## How each template loads the design system

Every template has a sibling `ds-base.js` that links this design system's stylesheets and
loads `_ds_bundle.js`. It has ONE line to edit when you copy the folder into another project:

```js
const base = '../..';   // → point at the bound _ds/<folder> tree, relative to this page
```

In this design-system project `base = '../..'` resolves to the project root, so the templates
preview fully styled here. In a consuming project, set it to wherever the bound DS lives
(e.g. `_ds/ywc-agent-toolkit` at the root, or `../_ds/ywc-agent-toolkit` one level down).

## Using outside this tool (plain web / Next.js)

These `.dc.html` files are for this design tool's template picker. To drop the designs into a
plain site or the Next.js LP repo, use the fully-rendered references instead:
`ui_kits/landing/` and `ui_kits/skill-docs/` (standard HTML), plus the implementation guide in
`docs/design-system/` (tokens, Tailwind theme, component contracts, the docs-page pattern).
