import { expect, test } from "@playwright/test";

test.describe("Locale routing", () => {
  test("redirects the root path to a locale home page", async ({ page }) => {
    // The root page keeps its Next runtime (it is not stripped) and redirects
    // via navigator.language. Wait for the resulting locale URL instead of a
    // fixed timeout.
    await page.goto("/");

    await page.waitForURL(/\/(en|ja|ko|zh|es)\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("serves a 404 for an unknown locale", async ({ page }) => {
    const response = await page.goto("/xx/");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: /page not found/i })
    ).toBeVisible();
  });
});
