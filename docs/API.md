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
    "name": "my-awesome-repo",
    "description": "A very cool project",
    "ownerId": "123"
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
  "id": "repo-1",
  "name": "my-awesome-repo",
  "description": "A very cool project",
  "ownerId": "123"
}
```

### POST /api/user-repositories
Create a new user repository.

**Body:**
```json
{
  "name": "new-repo",
  "description": "New repository description",
  "ownerId": "123"
}
```

**Response:**
```json
{
  "id": "repo-2",
  "name": "new-repo",
  "description": "New repository description",
  "ownerId": "123"
}
```

### PUT /api/user-repositories/:id
Update a specific user repository.

**Parameters:**
- `id` (string) - User Repository ID

**Body:**
```json
{
  "description": "Updated description"
}
```

**Response:**
```json
{
  "id": "repo-1",
  "name": "my-awesome-repo",
  "description": "Updated description",
  "ownerId": "123"
}
```

### DELETE /api/user-repositories/:id
Delete a specific user repository.

**Parameters:**
- `id` (string) - User Repository ID

**Response:**
```json
{
  "success": true
}
```

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
