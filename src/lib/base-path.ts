const GITHUB_PAGES_BASE_PATH = "/ywc-agent-toolkit-lp";

// Must be NEXT_PUBLIC_-prefixed: this module is imported by "use client" components
// (e.g. the root redirect, guidebook top bar/sidebar/search), and Next.js only inlines
// NEXT_PUBLIC_ vars as build-time literals in client bundles. An unprefixed var reads
// as undefined in the browser, silently collapsing basePath to "" after hydration.
// Set by the deploy workflow only; local dev and the CI build/test jobs stay
// basePath-free so localhost and the Playwright static server keep working at the
// origin root.
export const basePath =
  process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? GITHUB_PAGES_BASE_PATH : "";

export function withBasePath(href: string): string {
  if (/^https?:\/\//.test(href) || href.startsWith("#")) {
    return href;
  }

  return `${basePath}${href}`;
}
