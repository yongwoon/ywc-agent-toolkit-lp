import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the ywc-agent-toolkit landing page.
 *
 * This site is a static export (`output: "export"`) whose landing pages ship
 * with the Next.js runtime stripped (see scripts/strip-landing-next-runtime.mjs).
 * To test the artifact GitHub Pages actually serves — not a hydrated dev build —
 * the webServer builds the site and serves `out/` through a zero-dependency
 * static server that mirrors GitHub Pages semantics (directory-index for
 * `trailingSlash: true`, `404.html` with a real 404 status).
 */

const PORT = 3000;

// Never hardcode the base URL: CI/preview runs can point BASE_URL at a
// deployed URL, in which case we skip the local webServer entirely.
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run build && node test/e2e-static-server.mjs",
        url: `http://localhost:${PORT}/en/`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        stdout: "pipe",
        stderr: "pipe"
      }
});
