import { expect, test } from "@playwright/test";

const LOCALES = ["en", "ja", "ko", "zh", "es"];

test.describe("Footer Agents link", () => {
  for (const locale of LOCALES) {
    test(`links to /llms.txt without a locale prefix (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}/`);

      const llmsLink = page.locator('footer a[href="/llms.txt"]');
      await expect(llmsLink).toHaveAttribute("href", "/llms.txt");
      await expect(llmsLink).not.toHaveAttribute("target", "_blank");
      await expect(llmsLink).not.toHaveAttribute("rel", "noreferrer");
    });
  }

  test("existing external and locale-routable footer links are unaffected", async ({ page }) => {
    await page.goto("/en/");

    const githubLink = page.locator('footer a[href="https://github.com/yongwoon/ywc-agent-toolkit"]');
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noreferrer");

    const docsLink = page.locator('footer a[href="/en/guidebook/"]');
    await expect(docsLink).not.toHaveAttribute("target", "_blank");
  });
});
