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

### GET /api/user-repositories/:id
Get a specific user repository by ID.

### POST /api/user-repositories
Create a new user repository.

### PUT /api/user-repositories/:id
Update an existing user repository.

### DELETE /api/user-repositories/:id
Delete a user repository.

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
