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
    "description": "A test project"
  }
]
```

### GET /api/user-repositories/:id
Get a specific user repository by ID.

**Parameters:**
- `id` (string) - Repository ID

**Response:**
```json
{
  "id": "1",
  "name": "project-alpha",
  "description": "A test project"
}
```

### POST /api/user-repositories
Create a new user repository.

**Body:**
```json
{
  "name": "project-beta",
  "description": "Another test project"
}
```

**Response:**
```json
{
  "id": "2",
  "name": "project-beta",
  "description": "Another test project"
}
```

### PUT /api/user-repositories/:id
Update an existing user repository.

**Parameters:**
- `id` (string) - Repository ID

**Body:**
```json
{
  "name": "project-updated"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "project-updated",
  "description": "A test project"
}
```

### DELETE /api/user-repositories/:id
Delete a user repository.

**Parameters:**
- `id` (string) - Repository ID

**Response:**
Status code 204 (No Content)

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
