import { Page } from "playwright";

const testUserEmail = process.env.GOOGLE_TEST_EMAIL ?? "";

export const validateUserDetails = async (page: Page): Promise<void> => {
  const iconSelector = '[data-testid="AccountCircleIcon"]';
  await page.waitForSelector(iconSelector);
  await page.click(iconSelector);

  await page.waitForSelector(`text=${testUserEmail}`);
  await page.waitForSelector(`text=Assistify - Concierge`);
};
