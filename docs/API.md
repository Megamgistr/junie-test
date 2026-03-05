# API Documentation

## Users API

### GET /api/users
Get list of all users.

**Response:**
```json
[
  {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

### GET /api/users/:id
Get a specific user by ID.

**Parameters:**
- `id` (string) - User ID

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```

## User Repositories API

### GET /api/user-repositories
Get list of all user repositories.

**Response:**
```json
[
  {
    "id": "1",
    "userId": "123",
    "name": "my-repo",
    "description": "My first repository",
    "url": "https://github.com/johndoe/my-repo"
  }
]
```

### GET /api/user-repositories/:id
Get a specific repository by ID.

**Parameters:**
- `id` (string) - Repository ID

**Response:**
```json
{
  "id": "1",
  "userId": "123",
  "name": "my-repo",
  "description": "My first repository",
  "url": "https://github.com/johndoe/my-repo"
}
```

### POST /api/user-repositories
Create a new user repository.

**Request Body:**
```json
{
  "userId": "123",
  "name": "new-repo",
  "description": "A new project",
  "url": "https://github.com/johndoe/new-repo"
}
```

**Response:**
```json
{
  "id": "2",
  "userId": "123",
  "name": "new-repo",
  "description": "A new project",
  "url": "https://github.com/johndoe/new-repo"
}
```

### PUT /api/user-repositories/:id
Update a repository by ID.

**Parameters:**
- `id` (string) - Repository ID

**Request Body:**
```json
{
  "name": "updated-repo-name"
}
```

**Response:**
```json
{
  "id": "1",
  "userId": "123",
  "name": "updated-repo-name",
  "description": "My first repository",
  "url": "https://github.com/johndoe/my-repo"
}
```

### DELETE /api/user-repositories/:id
Delete a repository by ID.

**Parameters:**
- `id` (string) - Repository ID

**Response:**
```json
{
  "success": true
}
```
