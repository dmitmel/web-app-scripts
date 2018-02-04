module.exports = {
  collectCoverageFrom: ['lib/**/*.js'],
  testMatch: [
    '<rootDir>/lib/**/__tests__/**/*.js',
    '<rootDir>/lib/**/?(*.)(spec|test).js'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node'
};
