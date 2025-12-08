# API Documentation

This document reflects the API as of 2025-12-08, based on source comments in src/routes/**.

## Authentication

All endpoints require Bearer token authentication.

Header:
```
Authorization: Bearer <token>
```

## Error Codes

- 400 Bad Request — Invalid input (e.g., malformed email)
- 401 Unauthorized — Missing/invalid Bearer token
- 404 Not Found — Resource does not exist
- 409 Conflict — Resource already exists (e.g., email already taken)

Error response shape:
```json
{
  "error": "NotFound",
  "message": "User not found",
  "status": 404
}
```

---

## Users

### GET /api/users
Get list of all users.

Auth: Required (Bearer)

Response 200: application/json (User[])

Example response (kept from previous docs):
```json
[
  {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

Example request:
```
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/users
```

---

### GET /api/users/:id
Get a specific user by ID.

Auth: Required (Bearer)

Parameters:
- id (string) — User ID

Response 200: application/json (User)

Example response (kept from previous docs):
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

Example request:
```
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/users/123
```

---

### GET /api/users/:name
Get a specific user by name.

Auth: Required (Bearer)

Parameters:
- name (string) — User name

Notes:
- This path overlaps with /api/users/:id in many routers and may be ambiguous.
  Consider changing to /api/users/by-name/:name in a future revision.

Response 200: application/json (User)

Example request:
```
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/users/john
```

Example response:
```json
{
  "id": "789",
  "name": "John",
  "email": "john@company.com"
}
```

---

### POST /api/users
Create a new user.

Auth: Required (Bearer)

Request body (application/json — CreateUserRequest):
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

Responses:
- 201 Created — Returns the created User
- 400 Bad Request — Validation error
- 401 Unauthorized
- 409 Conflict — Email already exists

Example request:
```
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com"}' \
  http://localhost:3000/api/users
```

Example response (201):
```json
{
  "id": "456",
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

---

## Types & Schemas

User:
```ts
{
  id: string; // Unique identifier
  name: string; // Full name
  email: string; // Email address
}
```

CreateUserRequest:
```ts
{
  name: string; // Full name
  email: string; // Unique email
}
```

Enums: none at this time.
