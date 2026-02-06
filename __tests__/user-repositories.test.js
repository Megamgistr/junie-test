const express = require('express');
const request = require('supertest');
const { router, resetRepositories } = require('../src/user-repositories');

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/user-repositories', router);

describe('User Repositories Routes', () => {
  beforeEach(() => {
    // Reset repositories before each test
    resetRepositories();
  });

  describe('POST /user-repositories - Create', () => {
    test('should create a new user repository with all fields', async () => {
      const newRepo = {
        userId: 1,
        repositoryName: 'test-repo',
        description: 'A test repository',
        isPrivate: true
      };

      const response = await request(app)
        .post('/user-repositories')
        .send(newRepo)
        .expect(201);

      expect(response.body).toMatchObject({
        id: 1,
        userId: 1,
        repositoryName: 'test-repo',
        description: 'A test repository',
        isPrivate: true
      });
      expect(response.body.createdAt).toBeDefined();
    });

    test('should create a repository with minimal required fields', async () => {
      const newRepo = {
        userId: 2,
        repositoryName: 'minimal-repo'
      };

      const response = await request(app)
        .post('/user-repositories')
        .send(newRepo)
        .expect(201);

      expect(response.body).toMatchObject({
        id: 1,
        userId: 2,
        repositoryName: 'minimal-repo',
        description: '',
        isPrivate: false
      });
    });

    test('should return 400 when userId is missing', async () => {
      const newRepo = {
        repositoryName: 'test-repo'
      };

      const response = await request(app)
        .post('/user-repositories')
        .send(newRepo)
        .expect(400);

      expect(response.body.error).toBe('userId and repositoryName are required');
    });

    test('should return 400 when repositoryName is missing', async () => {
      const newRepo = {
        userId: 1
      };

      const response = await request(app)
        .post('/user-repositories')
        .send(newRepo)
        .expect(400);

      expect(response.body.error).toBe('userId and repositoryName are required');
    });
  });

  describe('GET /user-repositories - Read', () => {
    test('should return empty array when no repositories exist', async () => {
      const response = await request(app)
        .get('/user-repositories')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    test('should return all user repositories', async () => {
      // Create test repositories
      await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'repo1' });
      
      await request(app)
        .post('/user-repositories')
        .send({ userId: 2, repositoryName: 'repo2' });

      const response = await request(app)
        .get('/user-repositories')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].repositoryName).toBe('repo1');
      expect(response.body[1].repositoryName).toBe('repo2');
    });

    test('should get a specific repository by ID using query parameter', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo' });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .get(`/user-repositories?id=${repoId}`)
        .expect(200);

      expect(response.body.id).toBe(repoId);
      expect(response.body.repositoryName).toBe('test-repo');
    });

    test('should get a specific repository by ID using path parameter', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo' });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .get(`/user-repositories/${repoId}`)
        .expect(200);

      expect(response.body.id).toBe(repoId);
      expect(response.body.repositoryName).toBe('test-repo');
    });

    test('should return 404 when repository not found by query parameter', async () => {
      const response = await request(app)
        .get('/user-repositories?id=999')
        .expect(404);

      expect(response.body.error).toBe('Repository not found');
    });

    test('should return 404 when repository not found by path parameter', async () => {
      const response = await request(app)
        .get('/user-repositories/999')
        .expect(404);

      expect(response.body.error).toBe('Repository not found');
    });
  });

  describe('PUT /user-repositories/:id - Update (Full)', () => {
    test('should update all fields of a repository', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'old-repo', description: 'old desc' });

      const repoId = createResponse.body.id;

      const updatedData = {
        userId: 2,
        repositoryName: 'new-repo',
        description: 'new description',
        isPrivate: true
      };

      const response = await request(app)
        .put(`/user-repositories/${repoId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject({
        id: repoId,
        userId: 2,
        repositoryName: 'new-repo',
        description: 'new description',
        isPrivate: true
      });
      expect(response.body.updatedAt).toBeDefined();
    });

    test('should return 404 when updating non-existent repository', async () => {
      const response = await request(app)
        .put('/user-repositories/999')
        .send({ userId: 1, repositoryName: 'test' })
        .expect(404);

      expect(response.body.error).toBe('Repository not found');
    });

    test('should return 400 when required fields are missing in update', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo' });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .put(`/user-repositories/${repoId}`)
        .send({ userId: 1 })
        .expect(400);

      expect(response.body.error).toBe('userId and repositoryName are required');
    });
  });

  describe('PATCH /user-repositories/:id - Update (Partial)', () => {
    test('should partially update a repository', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo', description: 'original' });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .patch(`/user-repositories/${repoId}`)
        .send({ description: 'updated description' })
        .expect(200);

      expect(response.body).toMatchObject({
        id: repoId,
        userId: 1,
        repositoryName: 'test-repo',
        description: 'updated description'
      });
      expect(response.body.updatedAt).toBeDefined();
    });

    test('should update only isPrivate field', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo', isPrivate: false });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .patch(`/user-repositories/${repoId}`)
        .send({ isPrivate: true })
        .expect(200);

      expect(response.body.isPrivate).toBe(true);
      expect(response.body.repositoryName).toBe('test-repo');
    });

    test('should not allow changing the ID', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo' });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .patch(`/user-repositories/${repoId}`)
        .send({ id: 999, description: 'new desc' })
        .expect(200);

      expect(response.body.id).toBe(repoId);
      expect(response.body.id).not.toBe(999);
    });

    test('should return 404 when patching non-existent repository', async () => {
      const response = await request(app)
        .patch('/user-repositories/999')
        .send({ description: 'test' })
        .expect(404);

      expect(response.body.error).toBe('Repository not found');
    });
  });

  describe('DELETE /user-repositories/:id - Delete', () => {
    test('should delete a repository', async () => {
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'test-repo' });

      const repoId = createResponse.body.id;

      const response = await request(app)
        .delete(`/user-repositories/${repoId}`)
        .expect(200);

      expect(response.body.message).toBe('Repository deleted successfully');
      expect(response.body.repository.id).toBe(repoId);

      // Verify it's actually deleted
      await request(app)
        .get(`/user-repositories/${repoId}`)
        .expect(404);
    });

    test('should return 404 when deleting non-existent repository', async () => {
      const response = await request(app)
        .delete('/user-repositories/999')
        .expect(404);

      expect(response.body.error).toBe('Repository not found');
    });

    test('should handle multiple deletions correctly', async () => {
      // Create multiple repositories
      const repo1 = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'repo1' });
      
      const repo2 = await request(app)
        .post('/user-repositories')
        .send({ userId: 2, repositoryName: 'repo2' });

      // Delete first repository
      await request(app)
        .delete(`/user-repositories/${repo1.body.id}`)
        .expect(200);

      // Verify only second repository remains
      const response = await request(app)
        .get('/user-repositories')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].id).toBe(repo2.body.id);
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete CRUD lifecycle', async () => {
      // Create
      const createResponse = await request(app)
        .post('/user-repositories')
        .send({ userId: 1, repositoryName: 'lifecycle-repo', description: 'initial' })
        .expect(201);

      const repoId = createResponse.body.id;

      // Read
      await request(app)
        .get(`/user-repositories/${repoId}`)
        .expect(200);

      // Update (PUT)
      await request(app)
        .put(`/user-repositories/${repoId}`)
        .send({ userId: 1, repositoryName: 'updated-repo', description: 'updated' })
        .expect(200);

      // Update (PATCH)
      await request(app)
        .patch(`/user-repositories/${repoId}`)
        .send({ isPrivate: true })
        .expect(200);

      // Delete
      await request(app)
        .delete(`/user-repositories/${repoId}`)
        .expect(200);

      // Verify deletion
      await request(app)
        .get(`/user-repositories/${repoId}`)
        .expect(404);
    });
  });
});
