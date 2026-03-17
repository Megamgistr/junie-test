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
  "id": "1",
  "name": "project-alpha",
  "ownerId": "123"
}
```

### GET /api/user-repositories/:name
Get a specific user repository by name.

**Parameters:**
- `name` (string) - User Repository name

**Response:**
```json
{
  "id": "1",
  "name": "project-alpha",
  "ownerId": "123"
}
```

### POST /api/user-repositories
Create a new user repository.

**Body:**
```json
{
  "name": "project-beta",
  "ownerId": "123"
}
```

**Response:**
```json
{
  "id": "2",
  "name": "project-beta",
  "ownerId": "123"
}
```

### PUT /api/user-repositories/:name
Update an existing user repository by name.

**Parameters:**
- `name` (string) - User Repository name

**Body:**
```json
{
  "name": "project-beta-updated"
}
```

**Response:**
```json
{
  "id": "2",
  "name": "project-beta-updated",
  "ownerId": "123"
}
```

### DELETE /api/user-repositories/:id
Delete a user repository.

**Parameters:**
- `id` (string) - User Repository ID

**Response:**
204 No Content

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
