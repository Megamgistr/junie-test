const express = require('express');
const router = express.Router();

// In-memory storage for user repositories
let userRepositories = [];
let nextId = 1;

// GET all user repositories or a specific one by ID
router.get('/', (req, res) => {
  const { id } = req.query;
  
  if (id) {
    const repository = userRepositories.find(repo => repo.id === parseInt(id));
    if (!repository) {
      return res.status(404).json({ error: 'Repository not found' });
    }
    return res.status(200).json(repository);
  }
  
  res.status(200).json(userRepositories);
});

// GET a specific user repository by ID (alternative route)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const repository = userRepositories.find(repo => repo.id === id);
  
  if (!repository) {
    return res.status(404).json({ error: 'Repository not found' });
  }
  
  res.status(200).json(repository);
});

// CREATE a new user repository
router.post('/', (req, res) => {
  const { userId, repositoryName, description, isPrivate } = req.body;
  
  // Validation
  if (!userId || !repositoryName) {
    return res.status(400).json({ error: 'userId and repositoryName are required' });
  }
  
  const newRepository = {
    id: nextId++,
    userId,
    repositoryName,
    description: description || '',
    isPrivate: isPrivate || false,
    createdAt: new Date().toISOString()
  };
  
  userRepositories.push(newRepository);
  res.status(201).json(newRepository);
});

// UPDATE an existing user repository
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { userId, repositoryName, description, isPrivate } = req.body;
  
  const repositoryIndex = userRepositories.findIndex(repo => repo.id === id);
  
  if (repositoryIndex === -1) {
    return res.status(404).json({ error: 'Repository not found' });
  }
  
  // Validation
  if (!userId || !repositoryName) {
    return res.status(400).json({ error: 'userId and repositoryName are required' });
  }
  
  const updatedRepository = {
    ...userRepositories[repositoryIndex],
    userId,
    repositoryName,
    description: description || '',
    isPrivate: isPrivate || false,
    updatedAt: new Date().toISOString()
  };
  
  userRepositories[repositoryIndex] = updatedRepository;
  res.status(200).json(updatedRepository);
});

// PATCH - partial update of an existing user repository
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  
  const repositoryIndex = userRepositories.findIndex(repo => repo.id === id);
  
  if (repositoryIndex === -1) {
    return res.status(404).json({ error: 'Repository not found' });
  }
  
  const updatedRepository = {
    ...userRepositories[repositoryIndex],
    ...updates,
    id, // Ensure ID cannot be changed
    updatedAt: new Date().toISOString()
  };
  
  userRepositories[repositoryIndex] = updatedRepository;
  res.status(200).json(updatedRepository);
});

// DELETE a user repository
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const repositoryIndex = userRepositories.findIndex(repo => repo.id === id);
  
  if (repositoryIndex === -1) {
    return res.status(404).json({ error: 'Repository not found' });
  }
  
  const deletedRepository = userRepositories[repositoryIndex];
  userRepositories.splice(repositoryIndex, 1);
  res.status(200).json({ message: 'Repository deleted successfully', repository: deletedRepository });
});

// Helper function to reset data (useful for testing)
function resetRepositories() {
  userRepositories = [];
  nextId = 1;
}

module.exports = { router, resetRepositories };
