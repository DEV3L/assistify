import { expect } from "@playwright/test";
import { Page } from "playwright";

const testUserName = process.env.GOOGLE_TEST_NAME ?? "";

export const validateDashboard = async (page: Page): Promise<void> => {
  await page.waitForSelector(`text=${testUserName}`);

  const messageResponseElement = page.locator("text=Chat with");
  await expect(messageResponseElement).toBeVisible({ timeout: 10_000 });
};
