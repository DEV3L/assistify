import { expect, test } from '@playwright/test';


test('homepage has title and links to intro page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Assistify/);
  
    // Click the "Sign in with Google" button
    const signInButton = page.locator('text=Sign in with Google');
    await signInButton.click();
  
    // Wait for the Google login page to load and select the first user
    await page.waitForSelector('input[type="email"]');
    await page.fill('input[type="email"]', process.env.GOOGLE_TEST_EMAIL ?? ""); 
    await page.click('text=Next');
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', process.env.GOOGLE_TEST_PASSWORD ?? ""); 
    await page.click('text=Next');
    
    // Optional: Click the "Continue" button if it exists
    try {
      const continueButton = page.locator('text=Continue');
      await continueButton.click();
  } catch (e) {
      console.log('Continue button not found, skipping...');
  }
  
    // Wait for the redirect and assert the welcome message
    const welcomeMessage = `Welcome, ${process.env.GOOGLE_TEST_NAME ?? ""}`
    await page.waitForSelector(`text=${welcomeMessage}`);
    const welcomeElement = page.locator(`text=${welcomeMessage}`);
    await expect(welcomeElement).toBeVisible();
  });