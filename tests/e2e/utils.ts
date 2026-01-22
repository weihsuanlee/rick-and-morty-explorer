import { type Locator, type Page } from "@playwright/test";

export function getFirstCharacterCard(page: Page): Locator {
  return page.locator('[aria-label^="View details for"]').first();
}
