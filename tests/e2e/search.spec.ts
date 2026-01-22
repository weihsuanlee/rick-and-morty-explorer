import { expect, test } from "@playwright/test";

test.describe("Search", () => {
  test("search updates results and URL", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search characters");
    await searchInput.fill("rick");

    await expect(page).toHaveURL(/q=rick/);

    const firstCard = page.locator('[aria-label^="View details for"]').first();
    await expect(firstCard).toBeVisible();
  });

  test("clearing search resets query param", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search characters");
    await searchInput.fill("morty");
    await expect(page).toHaveURL(/q=morty/);

    await searchInput.fill("");
    await expect(page).not.toHaveURL(/q=/);
  });

  test("shows empty state for no results", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByLabel("Search characters");
    await searchInput.fill("zzzzzzzzzz");

    await expect(page.getByText("No characters match that search yet.")).toBeVisible();
  });

  test("restores state from URL params", async ({ page }) => {
    await page.goto("/?q=rick&page=1");

    await expect(page.getByLabel("Search characters")).toHaveValue("rick");
    await expect(page).toHaveURL(/q=rick/);
  });
});
