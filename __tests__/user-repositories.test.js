const {
  getUserRepositories,
  getUserRepositoryById,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository
} = require('../src/routes/user-repositories.ts');

describe('User Repositories Routes', () => {
  describe('GET /api/user-repositories', () => {
    test('getUserRepositories should return an array', async () => {
      const result = await getUserRepositories();
      expect(Array.isArray(result)).toBe(true);
    });

    test('getUserRepositories should return empty array initially', async () => {
      const result = await getUserRepositories();
      expect(result).toEqual([]);
    });
  });

  describe('GET /api/user-repositories/:id', () => {
    test('getUserRepositoryById should accept an id parameter', async () => {
      const result = await getUserRepositoryById('123');
      expect(result).toBeDefined();
    });

    test('getUserRepositoryById should return null for non-existent repository', async () => {
      const result = await getUserRepositoryById('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('POST /api/user-repositories', () => {
    test('createUserRepository should accept body parameter', async () => {
      const body = {
        userId: 'user123',
        repositoryId: 'repo456',
        role: 'owner'
      };
      const result = await createUserRepository(body);
      expect(result).toBeDefined();
    });

    test('createUserRepository should return null initially', async () => {
      const body = { userId: 'user1', repositoryId: 'repo1' };
      const result = await createUserRepository(body);
      expect(result).toBeNull();
    });
  });

  describe('PUT /api/user-repositories/:id', () => {
    test('updateUserRepository should accept id and body parameters', async () => {
      const id = '123';
      const body = { role: 'contributor' };
      const result = await updateUserRepository(id, body);
      expect(result).toBeDefined();
    });

    test('updateUserRepository should return null for non-existent repository', async () => {
      const result = await updateUserRepository('non-existent-id', { role: 'admin' });
      expect(result).toBeNull();
    });
  });

  describe('DELETE /api/user-repositories/:id', () => {
    test('deleteUserRepository should accept an id parameter', async () => {
      const result = await deleteUserRepository('123');
      expect(result).toBeDefined();
    });

    test('deleteUserRepository should return boolean', async () => {
      const result = await deleteUserRepository('123');
      expect(typeof result).toBe('boolean');
    });

    test('deleteUserRepository should return true for successful deletion', async () => {
      const result = await deleteUserRepository('existing-id');
      expect(result).toBe(true);
    });
  });
});
