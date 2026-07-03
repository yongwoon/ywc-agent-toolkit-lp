const GITHUB_PAGES_BASE_PATH = "/ywc-agent-toolkit-lp";

// GITHUB_PAGES is set by the deploy workflow only; local dev and the CI build/test
// jobs stay basePath-free so localhost and the Playwright static server keep working
// at the origin root.
export const basePath =
  process.env.GITHUB_PAGES === "true" ? GITHUB_PAGES_BASE_PATH : "";

export function withBasePath(href: string): string {
  if (/^https?:\/\//.test(href) || href.startsWith("#")) {
    return href;
  }

  return `${basePath}${href}`;
}
