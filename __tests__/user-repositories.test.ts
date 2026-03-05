import { 
  getUserRepositories, 
  createUserRepository, 
  updateUserRepositoryById, 
  deleteUserRepositoryById 
} from '../src/routes/user-repositories';

describe('UserRepositories Routes', () => {
  test('getUserRepositories should return an empty array', async () => {
    const repos = await getUserRepositories();
    expect(repos).toEqual([]);
  });

  test('createUserRepository should return the created repository', async () => {
    const body = { name: 'test-repo' };
    const repo = await createUserRepository(body);
    expect(repo).toEqual({ id: 'new-repo', name: 'test-repo' });
  });

  test('updateUserRepositoryById should return the updated repository', async () => {
    const body = { name: 'updated-repo' };
    const repo = await updateUserRepositoryById('repo-123', body);
    expect(repo).toEqual({ id: 'repo-123', name: 'updated-repo' });
  });

  test('deleteUserRepositoryById should return true', async () => {
    const result = await deleteUserRepositoryById('repo-123');
    expect(result).toBe(true);
  });
});
