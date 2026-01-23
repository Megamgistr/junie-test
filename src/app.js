const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store for demonstration
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
  { id: 3, name: 'Item 3', description: 'Third item' }
];

// GET route - Get all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// GET route - Get item by id
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.status(200).json(item);
});

// POST route - Create new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    description: description || ''
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT route - Update existing item
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  items[itemIndex] = {
    id,
    name,
    description: description || items[itemIndex].description
  };
  
  res.status(200).json(items[itemIndex]);
});

// DELETE route - Delete item by id
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = items[itemIndex];
  items.splice(itemIndex, 1);
  
  res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
});

// Helper function to reset items (useful for testing)
app.resetItems = () => {
  items = [
    { id: 1, name: 'Item 1', description: 'First item' },
    { id: 2, name: 'Item 2', description: 'Second item' },
    { id: 3, name: 'Item 3', description: 'Third item' }
  ];
};

module.exports = app;
