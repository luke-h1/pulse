/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).{js,jsx,ts,tsx}',
    '<rootDir>/test/**/*.(spec|test).{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/../common/test/fileTransform.js',
    '^.+\\.css$': '<rootDir>/../common/test/cssTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^axios$': '<rootDir>/node_modules/axios/dist/axios.js',
    '^@frontend/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/../common/src/$1',
    '^@common-test/(.*)$': '<rootDir>/../common/test/$1',
    '^@editor/(.*)$': '<rootDir>/../../../packages/editor/src/$1',
    '^@ui/(.*)$': '<rootDir>/../../../packages/ui/src/$1',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  resetMocks: true,
  snapshotSerializers: ['jest-serializer-html'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};

module.exports = config;
