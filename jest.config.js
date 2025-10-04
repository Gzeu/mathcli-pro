export default {
  preset: null,
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.mjs'],
  moduleFileExtensions: ['mjs', 'js', 'json'],
  testMatch: [
    '**/tests/**/*.test.mjs',
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.mjs',
    '**/tests/**/*.spec.js'
  ],
  transform: {},
  collectCoverageFrom: [
    'commands/**/*.js',
    'index.js',
    'catalog.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testTimeout: 10000,
  verbose: true,
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/'
  ]
};
