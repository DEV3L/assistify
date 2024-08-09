import { Buffer } from "buffer";
import { readFileSync, writeFileSync } from "fs";
import { Page } from "playwright";

/**
 * Saves the storage state of the given Playwright page.
 *
 * This function performs the following steps:
 * 1. Saves the storage state to a JSON file.
 * 2. Reads the JSON file and converts its content to a Base64 string.
 * 3. Writes both the JSON and Base64 encoded storage state to files.
 *
 * @param {Page} page - The Playwright page whose storage state is to be saved.
 * @returns {Promise<void>} - A promise that resolves when the storage state has been saved.
 */
export const saveStorageState = async (page: Page): Promise<void> => {
  try {
    // Save the storage state to a JSON file
    await page.context().storageState({ path: "storageState.json" });
  } catch (e) {
    console.error("Error saving storage state", e);
  }

  // Read the JSON file and convert its content to a Base64 string
  const storageStateJson = readFileSync("storageState.json", "utf-8");
  const storageStateBase64 = Buffer.from(storageStateJson).toString("base64");

  // Write both the JSON and Base64 encoded storage state to files
  writeFileSync("storageState.json", storageStateJson);
  writeFileSync("storageState.base64", storageStateBase64);
};
