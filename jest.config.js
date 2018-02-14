module.exports = {
  testMatch: [
    '<rootDir>/lib/**/__tests__/**/*.js',
    '<rootDir>/lib/**/?(*.)(spec|test).js'
  ],
  collectCoverageFrom: ['lib/**/*.js', '!lib/cli/**/!(command)*.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node'
};
