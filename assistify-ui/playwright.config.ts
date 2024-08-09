import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import playwright from 'playwright';
import { addExtra } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

dotenv.config();
dotenv.config({ path: ".env.local", override: true });

const extraPlaywright = addExtra(playwright as any);
extraPlaywright.use(StealthPlugin());

export default defineConfig({
  testDir: "./e2e",
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    headless: process.env.CI ? true : false,
    screenshot: "only-on-failure",
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    permissions: ['geolocation'],
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
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
