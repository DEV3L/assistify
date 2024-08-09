import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import playwright from "playwright";
import { addExtra } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const extraPlaywright = addExtra(playwright as any);
extraPlaywright.use(StealthPlugin());

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    headless: isCI ? true : false,
    screenshot: "only-on-failure",
    launchOptions: {
      args: ["--disable-blink-features=AutomationControlled"],
    },
    storageState: isCI ? "storageState.json" : undefined,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
