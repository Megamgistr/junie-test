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

### DELETE /api/users/:name
Delete a user by their name. Added in vNext.

**Parameters:**
- `name` (string) - User Name

**Response:**
```json
true
```

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
