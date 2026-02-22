---
sidebar_position: 1
---

# User API:

- Purpose: User API is used to manage authentication of the user
- Route: http://localhost:3000/api/v1/user

## POST /register:

- Description: Used to register a new user
- BASE URL: http://localhost:3000
- END POINT: /api/v1/user

Request Header:
| Header | Value | Description |
| ------------ | ---------------- | ---------------------- |
| Content-Type | application/json | Specifies JSON payload |

Request Body:

```bash
{
"fullName": "John Doe",
"email": "john@example.com",
"username": "johndoe",
"password": "securePassword123"
}
```

Response:

```bash
{
"success": true,
"message": "User registered successfully",
"userId": "64d5f..."
}
```

Usage:

```js
import axios from "axios";

const response = await axios.post(
  "http://localhost:3000/api/v1/user/register",
  { fullName: name, email, username, password },
  { withCredentials: true }
);
```

## POST /login:

- Description: Used to register a new user
- BASE URL: http://localhost:3000
- END POINT: /api/v1/login

Request Header:
| Header | Value | Description |
| ------------ | ---------------- | ---------------------- |
| Content-Type | application/json | Specifies JSON payload |

Request Body:

```bash
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

<!--
Successful Response (200 OK) -->

<!-- ```bash
{
  "statusCode": 200,
  "success": true,
  "message": "User Logged in Successfully",
  "data": {
    "user": {
      "_id": "64d5f...",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "createdAt": "2024-10-10T10:30:00.000Z",
      "updatedAt": "2024-10-10T10:30:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
``` -->
<!--
Error Responses
❌ Missing Email or Password (400)
{
"success": false,
"message": "Email and Password are required"
}

❌ User Does Not Exist (409)
{
"success": false,
"message": "User with Email does not Exist"
}

❌ Email Not Verified (200)

A new verification code is automatically sent to the user's email.

{
"success": false,
"message": "Email not verified. A new verification code has been sent."
}

❌ Invalid Credentials (401)
{
"success": false,
"message": "Invalid User Credentials"
}

Usage Example
import axios from "axios";

const response = await axios.post(
"http://localhost:3000/api/v1/user/login",
{
email: "john@example.com",
password: "securePassword123"
},
{
withCredentials: true
}
);

console.log(response.data);

Notes -->
