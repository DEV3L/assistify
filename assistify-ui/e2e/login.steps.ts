import { Page } from "playwright";

const isCI = !!process.env.CI;

const testUserEmail = process.env.GOOGLE_TEST_EMAIL ?? "";
const testUserPassword = process.env.GOOGLE_TEST_PASSWORD ?? "";

/**
 * Logs into Google using the provided Playwright page instance.
 *
 * @param {Page} page - The Playwright page instance to perform actions on.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 *
 * This function handles the login process for Google. It checks if the environment is CI (Continuous Integration)
 * and performs the login steps accordingly. If not in CI, it waits for the email input, fills it, clicks next,
 * waits for the password input, fills it, clicks next, and finally clicks the continue button if it appears.
 * The function waits for the "Sign Out" text to ensure the login was successful.
 */
export const loginToGoogle = async (page: Page): Promise<void> => {
  // Click the "Sign in with Google" button
  const signInButton = page.locator("text=Sign in with Google");
  await signInButton.click();

  if (!isCI) {
    await page.waitForSelector('input[type="email"]');
    await page.fill('input[type="email"]', testUserEmail);
    await page.click("text=Next");
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', testUserPassword);
    await page.click("text=Next");
  } else {
    await page.waitForTimeout(2500);
    await page.waitForSelector(`[data-identifier="${testUserEmail}"]`);
    await page.click(`[data-identifier="${testUserEmail}"]`);
    await page.waitForTimeout(2500);
  }

  const continueSelector = "text=Continue";
  await page.waitForSelector(continueSelector, { timeout: 2500 });
  const continueButton = page.locator(continueSelector);
  await continueButton.click();

  await page.waitForSelector("text=Welcome to Assistify");
};
