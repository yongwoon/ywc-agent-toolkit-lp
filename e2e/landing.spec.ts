import { expect, test } from "@playwright/test";

const LOCALES = ["en", "ja", "ko", "zh", "es"] as const;
const GITHUB_REPO = "https://github.com/yongwoon/ywc-agent-toolkit";

test.describe("Landing page", () => {
  test("renders every primary section on the English page", async ({ page }) => {
    await page.goto("/en/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#top")).toBeAttached();
    await expect(page.locator("#features")).toBeVisible();
    await expect(page.locator("#install")).toBeVisible();
    await expect(page.locator("#faq")).toBeVisible();
  });

  test("exposes the install and GitHub calls to action in the hero", async ({ page }) => {
    await page.goto("/en/");

    // Scope to <main> so we hit the hero CTAs, not the header nav/badge.
    const hero = page.locator("main");

    const installCta = hero.getByRole("link", { name: "Install", exact: true }).first();
    await expect(installCta).toHaveAttribute("href", "#install");

    const githubCta = hero.getByRole("link", { name: /star on github/i });
    await expect(githubCta).toHaveAttribute("href", GITHUB_REPO);
    await expect(githubCta).toHaveAttribute("target", "_blank");
  });

  // Cheap cross-locale smoke: every locale route resolves and renders a heading
  // plus the install section, without duplicating the full structural assertions.
  for (const locale of LOCALES) {
    test(`resolves and renders the ${locale} locale home page`, async ({ page }) => {
      const response = await page.goto(`/${locale}/`);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("#install")).toBeVisible();
    });
  }
});
