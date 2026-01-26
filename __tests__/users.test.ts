import { getUsers, api } from '../src/routes/users';

describe('Users Routes', () => {
  test('getUsers should return an array', async () => {
    const users = await getUsers();
    expect(Array.isArray(users)).toBe(true);
  });

  test('api should return success when token is valid', async () => {
    const response = await api({ headers: { authorization: 'Bearer valid-token' } });
    expect(response).toEqual({ status: 'success' });
  });

  test('api should throw error when token is invalid', async () => {
    await expect(api({ headers: { authorization: 'Bearer invalid-token' } }))
      .rejects.toThrow('Invalid token');
  });
});
