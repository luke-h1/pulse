// eslint-disable-next-line import/no-extraneous-dependencies
const { defaults } = require('jest-config');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  displayName: 'server',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  moduleNameMapper: {
    '^@graphql-hooks/(.*)$': '<rootDir>/../../../packages/graphql-hooks/src/$1',
  },
};
