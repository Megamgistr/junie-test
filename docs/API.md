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
    "id": "1",
    "name": "project-alpha",
    "ownerId": "123",
    "url": "https://github.com/johndoe/project-alpha"
  }
]
```

### GET /api/user-repositories/:id
Get a specific user repository by ID.

**Parameters:**
- `id` (string) - User Repository ID

**Response:**
```json
{
  "id": "1",
  "name": "project-alpha",
  "ownerId": "123",
  "url": "https://github.com/johndoe/project-alpha"
}
```

### POST /api/user-repositories
Create a new user repository.

**Body:**
```json
{
  "name": "new-repo",
  "ownerId": "123",
  "url": "https://github.com/johndoe/new-repo"
}
```

**Response:**
```json
{
  "id": "2",
  "name": "new-repo",
  "ownerId": "123",
  "url": "https://github.com/johndoe/new-repo"
}
```

### PUT /api/user-repositories/:id
Update an existing user repository.

**Parameters:**
- `id` (string) - User Repository ID

**Body:**
```json
{
  "name": "updated-repo-name"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "updated-repo-name",
  "ownerId": "123",
  "url": "https://github.com/johndoe/project-alpha"
}
```

### DELETE /api/user-repositories/:id
Delete a user repository.

**Parameters:**
- `id` (string) - User Repository ID

**Response:** 204 No Content

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
