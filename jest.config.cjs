// jest.config.js or jest.config.cjs if renamed
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
};
