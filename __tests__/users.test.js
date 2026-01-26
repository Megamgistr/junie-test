const users = require('../src/routes/users');

describe('Users Routes', () => {
  test('deleteUserByName should be a function', () => {
    expect(typeof users.deleteUserByName).toBe('function');
  });
});
