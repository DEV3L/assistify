import type { Config } from "jest";
import nextJest from "next/jest.js";
import "ts-node/register";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
};

export default createJestConfig(config);
