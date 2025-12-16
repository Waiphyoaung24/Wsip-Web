/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__tests__/**/*.(test|spec).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};


