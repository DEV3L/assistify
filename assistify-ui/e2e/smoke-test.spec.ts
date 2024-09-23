import { expect, test } from "@playwright/test";
import { validateAssistants } from "./assistants.steps";
import { validateDashboard } from "./dashboard.steps";
import { loginToGoogle } from "./login.steps";
import { validateUserDetails } from "./user-details.steps";

test("run smoke test", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle(/Assistify/);

  await loginToGoogle(page);
  await validateDashboard(page);
  await validateAssistants(page);
  await validateUserDetails(page);

  // await saveStorageState(page);
});
