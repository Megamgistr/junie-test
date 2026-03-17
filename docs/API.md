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
Get a specific user by Name.

**Parameters:**
- `name` (string) - User Name

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "id": "124",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### PUT /api/users/:name
Update a specific user by Name (replace).

**Parameters:**
- `name` (string) - User Name

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

**Response:**
```json
{
  "id": "124",
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

### PATCH /api/users/:name
Update a specific user by Name (partial).

**Parameters:**
- `name` (string) - User Name

**Request Body:**
```json
{
  "email": "jane.new@example.com"
}
```

**Response:**
```json
{
  "id": "124",
  "name": "Jane Smith",
  "email": "jane.new@example.com"
}
```

## Authentication

All endpoints require Bearer token authentication.

**Header:**
```
Authorization: Bearer <token>
```
