const {
  getUserRepositories,
  getUserRepositoryById,
  getUserRepositoriesByUserId,
  createUserRepository,
  updateUserRepository,
  deleteUserRepository
} = require('../src/routes/user-repositories.js');

describe('User Repositories Routes', () => {
  describe('GET operations', () => {
    test('getUserRepositories should return an array', async () => {
      const result = await getUserRepositories();
      expect(Array.isArray(result)).toBe(true);
    });

    test('getUserRepositoryById should return null for non-existent ID', async () => {
      const result = await getUserRepositoryById('123');
      expect(result).toBeNull();
    });

    test('getUserRepositoriesByUserId should return an array', async () => {
      const result = await getUserRepositoriesByUserId('user123');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('POST operations', () => {
    test('createUserRepository should handle repository creation', async () => {
      const newRepo = {
        userId: 'user123',
        repositoryId: 'repo456',
        role: 'owner'
      };
      const result = await createUserRepository(newRepo);
      expect(result).toBeDefined();
    });

    test('createUserRepository should handle empty body', async () => {
      const result = await createUserRepository({});
      expect(result).toBeDefined();
    });
  });

  describe('PUT operations', () => {
    test('updateUserRepository should handle repository update', async () => {
      const updateData = {
        role: 'contributor'
      };
      const result = await updateUserRepository('123', updateData);
      expect(result).toBeDefined();
    });

    test('updateUserRepository should handle non-existent ID', async () => {
      const result = await updateUserRepository('nonexistent', { role: 'admin' });
      expect(result).toBeDefined();
    });
  });

  describe('DELETE operations', () => {
    test('deleteUserRepository should return true for successful deletion', async () => {
      const result = await deleteUserRepository('123');
      expect(result).toBe(true);
    });

    test('deleteUserRepository should handle deletion with valid ID', async () => {
      const result = await deleteUserRepository('repo123');
      expect(typeof result).toBe('boolean');
    });

    test('deleteUserRepository should handle non-existent ID', async () => {
      const result = await deleteUserRepository('nonexistent');
      expect(result).toBeDefined();
    });
  });
});
