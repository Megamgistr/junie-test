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

## User Repositories API

### GET /api/user-repositories
Get list of all user repositories.

**Response:**
```json
[
  {
    "id": "repo-1",
    "name": "my-cool-project",
    "url": "https://github.com/user/my-cool-project"
  }
]
```

### POST /api/user-repositories
Create a new user repository.

**Body:**
```json
{
  "name": "new-repo",
  "description": "A new repository"
}
```

### PUT /api/user-repositories/:id
Update an existing user repository.

**Parameters:**
- `id` (string) - Repository ID

### DELETE /api/user-repositories/:id
Delete a user repository.

**Parameters:**
- `id` (string) - Repository ID

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
