import { Page } from "playwright";

const expectedAssistantName = "Assistify - Concierge";

export const validateAssistants = async (page: Page): Promise<void> => {
  const iconSelector = '[data-testid="SmartToyIcon"]';
  await page.waitForSelector(iconSelector);
  await page.click(iconSelector);

  await page.waitForSelector("text=All Assistants");
  await page.waitForSelector(`text=${expectedAssistantName}`);
};
