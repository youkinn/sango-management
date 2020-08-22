module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
