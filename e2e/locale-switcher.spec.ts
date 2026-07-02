import { expect, test } from "@playwright/test";

// The header locale switcher is a native <details>/<summary> with <a> links, so
// it works without client JS. At the default desktop viewport only the desktop
// switcher is visible (the mobile menu is display:none), so :visible disambiguates.

test.describe("Locale switcher", () => {
  test("navigates to the selected locale", async ({ page }) => {
    await page.goto("/en/");

    const switcher = page.locator("header summary:visible").first();
    await switcher.click();

    const japaneseLink = page.locator('header a[hreflang="ja"]:visible').first();
    await expect(japaneseLink).toBeVisible();
    await japaneseLink.click();

    await page.waitForURL(/\/ja\/$/);
    await expect(page).toHaveURL(/\/ja\/$/);

    // The switcher reflects the active locale via its native label.
    await expect(page.locator("header summary:visible").first()).toContainText(
      "日本語"
    );
  });
});
