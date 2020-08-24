module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1' // 别名解析
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.ts']
};
