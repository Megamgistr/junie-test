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

### GET /api/users/:name
Get a specific user by name. Added in vNext.

**Parameters:**
- `name` (string) - User name

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### POST /api/users
Create a new user. Added in vNext.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": "generated-id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### PUT /api/users/:name
Update a user by name. Added in vNext.

**Parameters:**
- `name` (string) - User name

**Request body (partial fields to update):**
```json
{
  "email": "new-email@example.com"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "new-email@example.com"
}
```

### DELETE /api/users/:id
Delete a user by ID. Added in vNext.

**Parameters:**
- `id` (string) - User ID

**Response:**
```json
true
```

### DELETE /api/users/:name
Delete a user by name. Added in vNext.

**Parameters:**
- `name` (string) - User name

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

## Notes

- Endpoints that use `:id` and `:name` may overlap depending on your routing configuration. Ensure your server enforces appropriate parameter validation to avoid ambiguity in route matching.
