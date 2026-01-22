import { expect, test } from "@playwright/test";

test.describe("Explorer page", () => {
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

    await expect(
      page.getByText("No characters match that search yet."),
    ).toBeVisible();
  });

  test("pagination navigates to next page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Go to page 2" }).click();

    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByText(/Page 2 \\//)).toBeVisible();
  });

  test("pagination navigates back to previous page", async ({ page }) => {
    await page.goto("/?page=2");

    await page.getByRole("button", { name: "Go to page 1" }).click();

    await expect(page).toHaveURL(/page=1/);
    await expect(page.getByText(/Page 1 \\//)).toBeVisible();
  });

  test("opens character detail drawer", async ({ page }) => {
    await page.goto("/");

    const firstCard = page.locator('[aria-label^="View details for"]').first();
    await firstCard.click();

    await expect(page.getByText("Character details")).toBeVisible();
    await expect(page).toHaveURL(/id=/);
  });

  test("closes character detail drawer", async ({ page }) => {
    await page.goto("/");

    await page.locator('[aria-label^="View details for"]').first().click();
    await expect(page.getByText("Character details")).toBeVisible();

    await page.getByRole("button", { name: "Close character details" }).click();
    await expect(page.getByText("Character details")).not.toBeVisible();
  });

  test("opens drawer with keyboard interaction", async ({ page }) => {
    await page.goto("/");

    const firstCard = page.locator('[aria-label^="View details for"]').first();
    await firstCard.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByText("Character details")).toBeVisible();
  });

  test("restores state from URL params", async ({ page }) => {
    await page.goto("/?q=rick&page=1");

    await expect(page.getByLabel("Search characters")).toHaveValue("rick");
    await expect(page).toHaveURL(/q=rick/);
  });
});
