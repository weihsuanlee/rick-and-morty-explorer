import { expect, test } from "@playwright/test";

test.describe("Pagination", () => {
  test("navigates to next page", async ({ page }) => {
    await page.goto("/");

    const nextButton = page.getByLabel("Pagination next");
    await nextButton.click();

    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByText(/Page 2 \//)).toBeVisible();
  });

  test("navigates to specific page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Go to page 3" }).click();

    await expect(page).toHaveURL(/page=3/);
    await expect(page.getByText(/Page 3 \//)).toBeVisible();
  });

  test("navigates back to previous page", async ({ page }) => {
    await page.goto("/?page=2");

    const prevButton = page.getByLabel("Pagination prev");
    await prevButton.click();

    await expect(page).toHaveURL(/page=1/);
    await expect(page.getByText(/Page 1 \//)).toBeVisible();
  });

  test("disables previous button on first page", async ({ page }) => {
    await page.goto("/?page=1");

    const prevButton = page.getByLabel("Pagination prev");
    await expect(prevButton).toHaveAttribute("aria-disabled", "true");

    await prevButton.click({ force: true });
    await expect(page).toHaveURL(/page=1/);
  });
});
