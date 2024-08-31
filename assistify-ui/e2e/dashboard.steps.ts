import { expect } from "@playwright/test";
import { Page } from "playwright";

const testUserName = process.env.GOOGLE_TEST_NAME ?? "";
const testUserEmail = process.env.GOOGLE_TEST_EMAIL ?? "";

export const validateDashboard = async (page: Page): Promise<void> => {
  // Wait for the redirect and assert the welcome message
  const welcomeMessage = `Welcome, ${testUserName}`;
  console.log(`"Welcome message: ${welcomeMessage}`);

  await page.waitForSelector(`text=${welcomeMessage}`);
  const welcomeElement = page.locator(`text=${welcomeMessage}`);
  await expect(welcomeElement).toBeVisible();

  const messageResponseElement = page.locator(
    "text=/Briefly introduce yourself!/"
  );
  await expect(messageResponseElement).toBeVisible({ timeout: 10_000 });
};
