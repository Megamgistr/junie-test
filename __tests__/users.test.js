const users = require('../src/routes/users');

describe('Users Routes', () => {
  test('should have deleteUserByName function', () => {
    expect(users.deleteUserByName).toBeDefined();
    expect(typeof users.deleteUserByName).toBe('function');
  });
});
