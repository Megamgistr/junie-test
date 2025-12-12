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

### PUT /api/users/:name
Update a user by name. Added in v1.1.0

Parameters:
- `name` (string) - User name
- Request body (`application/json`):
  - `email` (string, optional)
  - `name` (string, optional)

Example request:
```
PUT /api/users/john-doe
Content-Type: application/json

{
  "email": "john.new@example.com"
}
```

Response:
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john.new@example.com"
}
```

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
