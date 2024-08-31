import { Page } from "playwright";

const expectedAssistantName = "Assistify - Product Owner";

export const validateAssistants = async (page: Page): Promise<void> => {
  const assistantsIconSelector = '[data-testid="PersonIcon"]';
  await page.waitForSelector(assistantsIconSelector);
  await page.click(assistantsIconSelector);

  await page.waitForSelector("text=Your Assistants");
  await page.waitForSelector(`text=${expectedAssistantName}`);
};
