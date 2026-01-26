import { createUser } from '../src/routes/users';

describe('Users API', () => {
  test('createUser should return success when token is valid', async () => {
    const body = { name: 'John Doe' };
    const headers = { authorization: 'Bearer valid-token' };
    const result = await createUser(body, headers);
    expect(result).toEqual({ status: 'success' });
  });

  test('createUser should throw "Invalid token" when token is missing', async () => {
    const body = { name: 'John Doe' };
    await expect(createUser(body)).rejects.toThrow('Invalid token');
  });

  test('createUser should throw "Invalid token" when token is invalid', async () => {
    const body = { name: 'John Doe' };
    const headers = { authorization: 'Bearer wrong-token' };
    await expect(createUser(body, headers)).rejects.toThrow('Invalid token');
  });
});
