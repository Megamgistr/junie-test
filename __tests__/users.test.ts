import { createUser } from '../src/routes/users';

describe('User Routes', () => {
  test('createUser should return success', async () => {
    const response = await createUser({});
    expect(response).toEqual({ status: 'success' });
  });

  test('createUser should handle invalid token', async () => {
    const response = await createUser({ token: 'invalid' });
    expect(response).toEqual({ status: 'error', message: 'Invalid token' });
  });
});
