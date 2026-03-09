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
Update a specific user by Name.

**Parameters:**
- `name` (string) - User Name

**Request Body:**
```json
{
  "email": "new-email@example.com"
}
```

**Response:**
```json
{
  "name": "John Doe",
  "email": "new-email@example.com"
}
```

### PATCH /api/users/:name
Partially update a specific user by Name.

**Parameters:**
- `name` (string) - User Name

**Request Body:**
```json
{
  "email": "updated-email@example.com"
}
```

**Response:**
```json
{
  "name": "John Doe",
  "email": "updated-email@example.com"
}
```

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
