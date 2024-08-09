import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

export default defineConfig({
  testDir: "./e2e",
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    headless: process.env.CI ? true : false,
    screenshot: "only-on-failure",
    launchOptions: {
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox-and-elevated",
        "--disable-dev-shm-usage",
      ],
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
