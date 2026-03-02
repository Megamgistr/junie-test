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
    "name": "project-one",
    "owner": "123"
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
  "name": "project-one",
  "owner": "123"
}
```

### POST /api/user-repositories
Create a new user repository.

**Body:**
```json
{
  "name": "new-project",
  "owner": "123"
}
```

**Response:**
```json
{
  "id": "2",
  "name": "new-project",
  "owner": "123"
}
```

### PUT /api/user-repositories/:id
Update an existing user repository.

**Parameters:**
- `id` (string) - Repository ID

**Body:**
```json
{
  "name": "updated-project"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "updated-project",
  "owner": "123"
}
```

### DELETE /api/user-repositories/:id
Delete a user repository.

**Parameters:**
- `id` (string) - Repository ID

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
