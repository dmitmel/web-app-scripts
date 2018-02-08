module.exports = {
  collectCoverageFrom: ['lib/**/*.js'],
  testMatch: [
    '<rootDir>/lib/**/__tests__/**/*.js',
    '<rootDir>/lib/**/?(*.)(spec|test).js'
  ],
  transform: {},
  coverageDirectory: 'coverage',
  testEnvironment: 'node'
};
