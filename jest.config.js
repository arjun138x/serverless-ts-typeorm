/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"], // ✅ point Jest to __tests__
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"], // ✅ update setup path
  testMatch: ["**/*.spec.ts"],

  // 👇 Map AWS Lambda layer imports to local folders
  moduleNameMapper: {
    "^/opt/nodejs/(.*)$": [
      "<rootDir>/layers/db/nodejs/$1",
      "<rootDir>/layers/entities/nodejs/$1",
      "<rootDir>/layers/utils/nodejs/$1",
      "<rootDir>/layers/shared/nodejs/$1",
      "<rootDir>/layers/types/nodejs/$1",
    ],
  },
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverageFrom: ["src/**/*.ts", "layers/**/*.ts"],

  // 👇 Enable and configure coverage collection
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "layers/**/*.ts",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/__tests__/**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov", "html"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/__tests__/",
    "/coverage/",
  ],

  // 👇 Optional but recommended: enforce minimum coverage %
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },
};
