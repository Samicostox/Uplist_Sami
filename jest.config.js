/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
      "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
    
  },
  testEnvironment: 'jsdom',

};