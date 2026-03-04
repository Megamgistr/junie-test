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
Get all user repositories.

**Response:**
```json
[]
```

### GET /api/user-repositories/:id
Get a specific user repository by ID.

**Parameters:**
- `id` (string) - Repository ID

**Response:**
```json
{
  "id": "1",
  "name": "sample-repo",
  "ownerId": "123"
}
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
Update a user repository.

**Parameters:**
- `id` (string) - Repository ID

**Body:**
```json
{
  "description": "Updated description"
}
```

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
