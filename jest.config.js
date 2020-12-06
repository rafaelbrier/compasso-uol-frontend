module.exports = {
    bail: true,
    clearMocks: true,
    testTimeout: 30000,
    moduleDirectories: ["src", "node_modules"],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.svg": "<rootDir>/config/svgrMock.js",
        "^.+\\.(css|scss)$": "<rootDir>/config/CSSStub.js",
    },
    setupFiles: [
        "<rootDir>/node_modules/regenerator-runtime/runtime",
        "core-js",
    ],
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
    transform: {
        "^.+\\.[jt]s?(x)?$": "babel-jest",
        "^.+\\.(svg|png|jpg)$": "<rootDir>/config/svgTransform.js",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
