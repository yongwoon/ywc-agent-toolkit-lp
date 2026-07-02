import { expect, test } from "@playwright/test";

// The Copy button is server-rendered with no React handler; behavior comes from
// public/copy-command.js, which survives the landing-page runtime strip.

test.describe("Copy command", () => {
  test("copies the command and confirms with a Copied label", async ({
    page,
    context
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/en/");

    const copyButton = page
      .locator("#install")
      .getByRole("button", { name: /copy/i })
      .first();

    const command = await copyButton.getAttribute("data-copy-command");
    expect(command).toBeTruthy();

    await copyButton.click();
    await expect(copyButton).toHaveText("Copied");

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toBe(command);
  });

  test("falls back to Select when the clipboard write is rejected", async ({
    page
  }) => {
    // Force navigator.clipboard.writeText to reject so we exercise the
    // catch-branch fallback (text selection + "Select" label) deterministically.
    await page.addInitScript(() => {
      const rejecting = () => Promise.reject(new Error("clipboard blocked"));
      try {
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: { writeText: rejecting }
        });
      } catch {
        /* fall through to direct assignment below */
      }
      try {
        navigator.clipboard.writeText = rejecting;
      } catch {
        /* clipboard already replaced above */
      }
    });

    await page.goto("/en/");

    const copyButton = page
      .locator("#install")
      .getByRole("button", { name: /copy/i })
      .first();

    await copyButton.click();
    await expect(copyButton).toHaveText("Select");
  });
});
