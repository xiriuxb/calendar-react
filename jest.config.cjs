module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/test/mocks/styleMock.cjs",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
