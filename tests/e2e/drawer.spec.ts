import { expect, test } from "@playwright/test";

import { getFirstCharacterCard } from "./utils";

test.describe("Character drawer", () => {
  test("opens character detail drawer", async ({ page }) => {
    await page.goto("/");

    const firstCard = getFirstCharacterCard(page);
    await firstCard.click();

    await expect(page.getByText("Character details")).toBeVisible();
    await expect(page).toHaveURL(/id=/);
  });

  test("closes character detail drawer", async ({ page }) => {
    await page.goto("/");

    const firstCard = getFirstCharacterCard(page);
    await firstCard.click();
    await expect(page.getByText("Character details")).toBeVisible();

    await page.getByRole("button", { name: "Close character details" }).click();
    await expect(page.getByText("Character details")).not.toBeVisible();
  });

  test("opens drawer with keyboard interaction", async ({ page }) => {
    await page.goto("/");

    const firstCard = getFirstCharacterCard(page);
    await firstCard.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByText("Character details")).toBeVisible();
  });
});
