const request = require('supertest');
const app = require('../src/app');

describe('Express App Routes', () => {
  beforeEach(() => {
    // Reset items before each test
    app.resetItems();
  });

  describe('GET /items', () => {
    test('should return all items', async () => {
      const response = await request(app).get('/items');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
    });
  });

  describe('GET /items/:id', () => {
    test('should return a specific item by id', async () => {
      const response = await request(app).get('/items/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Item 1',
        description: 'First item'
      });
    });

    test('should return 404 for non-existent item', async () => {
      const response = await request(app).get('/items/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found');
    });
  });

  describe('POST /items', () => {
    test('should create a new item', async () => {
      const newItem = {
        name: 'New Item',
        description: 'A new test item'
      };

      const response = await request(app)
        .post('/items')
        .send(newItem);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('New Item');
      expect(response.body.description).toBe('A new test item');
    });

    test('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/items')
        .send({ description: 'No name provided' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Name is required');
    });

    test('should create item with empty description if not provided', async () => {
      const response = await request(app)
        .post('/items')
        .send({ name: 'Item without description' });

      expect(response.status).toBe(201);
      expect(response.body.description).toBe('');
    });
  });

  describe('PUT /items/:id', () => {
    test('should update an existing item', async () => {
      const updatedData = {
        name: 'Updated Item',
        description: 'Updated description'
      };

      const response = await request(app)
        .put('/items/1')
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('Updated Item');
      expect(response.body.description).toBe('Updated description');
    });

    test('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .put('/items/999')
        .send({ name: 'Updated' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found');
    });

    test('should return 400 if name is missing', async () => {
      const response = await request(app)
        .put('/items/1')
        .send({ description: 'Only description' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Name is required');
    });
  });

  describe('DELETE /items/:id', () => {
    test('should delete an existing item', async () => {
      const response = await request(app).delete('/items/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Item deleted successfully');
      expect(response.body).toHaveProperty('item');
      expect(response.body.item).toEqual({
        id: 1,
        name: 'Item 1',
        description: 'First item'
      });
    });

    test('should verify item is actually deleted', async () => {
      // Delete the item
      await request(app).delete('/items/2');

      // Try to get the deleted item
      const response = await request(app).get('/items/2');
      expect(response.status).toBe(404);
    });

    test('should return 404 when deleting non-existent item', async () => {
      const response = await request(app).delete('/items/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found');
    });

    test('should reduce total items count after deletion', async () => {
      // Get initial count
      const initialResponse = await request(app).get('/items');
      const initialCount = initialResponse.body.length;

      // Delete an item
      await request(app).delete('/items/1');

      // Get new count
      const finalResponse = await request(app).get('/items');
      expect(finalResponse.body.length).toBe(initialCount - 1);
    });

    test('should delete correct item when multiple items exist', async () => {
      // Delete item with id 2
      await request(app).delete('/items/2');

      // Verify items 1 and 3 still exist
      const item1Response = await request(app).get('/items/1');
      expect(item1Response.status).toBe(200);

      const item3Response = await request(app).get('/items/3');
      expect(item3Response.status).toBe(200);

      // Verify item 2 is gone
      const item2Response = await request(app).get('/items/2');
      expect(item2Response.status).toBe(404);
    });
  });
});
