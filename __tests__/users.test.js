const users = require('../src/routes/users');

describe('Users Routes', () => {
  test('should export all user route functions', () => {
    expect(typeof users.getUsers).toBe('function');
    expect(typeof users.getUserById).toBe('function');
    expect(typeof users.getUserByName).toBe('function');
    expect(typeof users.createUser).toBe('function');
    expect(typeof users.updateUserByName).toBe('function');
    expect(typeof users.patchUserByName).toBe('function');
  });

  test('updateUserByName should be an async function', async () => {
    const result = await users.updateUserByName('testuser', {});
    expect(result).toBeNull();
  });

  test('patchUserByName should be an async function', async () => {
    const result = await users.patchUserByName('testuser', {});
    expect(result).toBeNull();
  });
});
