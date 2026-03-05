module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
