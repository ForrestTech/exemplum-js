const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/features/common/components/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["/node_modules/(?!jose|d3)"],
};

module.exports = createJestConfig(customJestConfig);
