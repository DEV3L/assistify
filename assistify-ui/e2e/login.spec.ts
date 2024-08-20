import { expect, test } from "@playwright/test";
import { loginToGoogle } from "./login.steps";

const testUserName = process.env.GOOGLE_TEST_NAME ?? "";
const testUserEmail = process.env.GOOGLE_TEST_EMAIL ?? "";

test("login and view dashboard", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle(/Assistify/);

  // Click the "Sign in with Google" button
  const signInButton = page.locator("text=Sign in with Google");
  await signInButton.click();

  await loginToGoogle(page);

  // Wait for the redirect and assert the welcome message
  const welcomeMessage = `Welcome, ${testUserName}`;
  console.log(`"Welcome message: ${welcomeMessage}`);

  await page.waitForSelector(`text=${welcomeMessage}`);
  const welcomeElement = page.locator(`text=${welcomeMessage}`);
  await expect(welcomeElement).toBeVisible();

  const emailElement = page.locator(`text=/${testUserEmail}/`);
  await expect(emailElement).toBeVisible({ timeout: 10_000 });

  await page.waitForSelector(`text=/Message:/`);

  const messageResponseElement = page.locator(`text=/Message:/`);
  await expect(messageResponseElement).toBeVisible({ timeout: 10_000 });

  // await saveStorageState(page);
});
