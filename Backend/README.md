# User Registration & Login API Documentation

## User Registration Endpoint

```
POST /users/v3/api/register
```

## Description

This endpoint allows a new user to register by providing their first name, last name, email, and password.  
It validates the input, hashes the password, and stores the user in the database.  
On success, it returns the created user (without the password) and an authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullName.firstName` (string, min 3 characters) – required
- `fullName.lastName` (string, min 3 characters) – required
- `email` (string, valid email format) – required
- `password` (string, min 6 characters) – required

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "statuscode": 200,
    "data": [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
      {
        "_id": "64f1c2e5e4b0a2a1b2c3d4e5",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2024-07-06T12:34:56.789Z",
        "updatedAt": "2024-07-06T12:34:56.789Z",
        "__v": 0
      }
    ],
    "message": "the user has been successfully registerd in the database",
    "success": true,
    "errors": []
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "error": [
      {
        "msg": "the firstname should be at the very least 3 charecters",
        "param": "fullName.firstName",
        "location": "body"
      }
    ]
  }
  ```

### User Already Exists

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "the user already exsists in the database",
    "success": false,
    "errors": []
  }
  ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "statuscode": 500,
    "data": null,
    "message": "while registering a user somthing went worng",
    "success": false,
    "errors": []
  }
  ```

---

## Example cURL Request

```sh
curl -X POST http://localhost:8000/users/v3/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Login Endpoint

```
POST /users/v3/api/login
```

### Description

This endpoint allows an existing user to log in by providing their email and password.  
If the credentials are correct, it returns the user data (excluding the password) and a JWT authentication token.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, valid email format) – required
- `password` (string, min 6 characters) – required

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "statuscode": 200,
    "data": [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token
      {
        "_id": "64f1c2e5e4b0a2a1b2c3d4e5",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null,
        "createdAt": "2024-07-06T12:34:56.789Z",
        "updatedAt": "2024-07-06T12:34:56.789Z",
        "__v": 0
      }
    ],
    "message": "the user have been logind successfully",
    "success": true,
    "errors": []
  }
  ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": [
      {
        "msg": "invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "the password should be at the very least of 6 charecter",
        "param": "password",
        "location": "body"
      }
    ],
    "message": "the user have writen the password or email incorrectly",
    "success": false,
    "errors": [
      // ...validation errors
    ]
  }
  ```

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "statuscode": 401,
    "data": null,
    "message": "maybe invalid email or Password",
    "success": false,
    "errors": []
  }
  ```

#### Wrong Password

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "the user password or email is wrong please try again",
    "success": false,
    "errors": []
  }
  ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "statuscode": 500,
    "data": null,
    "message": "while logging in a user something went wrong",
    "success": false,
    "errors": []
  }
  ```

---

### Example cURL Request

```sh
curl -X POST http://localhost:8000/users/v3/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Get User Profile Endpoint

```
GET /users/v3/api/profile
```

### Description

This endpoint returns the authenticated user's profile information.  
It requires a valid JWT token to be sent in the `Authorization` header as a Bearer token or as a `token` cookie.

---

### Authentication

- **Required:** Yes (JWT token)
- **How to send:**  
  - As a cookie named `token`  
  - Or as a header:  
    ```
    Authorization: Bearer <JWT_TOKEN>
    ```

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "statuscode": 200,
    "data": {
      "_id": "64f1c2e5e4b0a2a1b2c3d4e5",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2024-07-06T12:34:56.789Z",
      "updatedAt": "2024-07-06T12:34:56.789Z",
      "__v": 0
    },
    "message": "the user profile have been create succesfully",
    "success": true,
    "errors": []
  }
  ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "statuscode": 401,
    "data": null,
    "message": "Unauthorized access",
    "success": false,
    "errors": []
  }
  ```

#### Token Missing

- **Status Code:** `402 Payment Required` (used here for missing token)
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "Access denied as token was inavilable",
    "success": false,
    "errors": []
  }
  ```

---

## Logout Endpoint

```
GET /users/v3/api/logout
```

### Description

This endpoint logs out the authenticated user by clearing the authentication token cookie and blacklisting the token.  
It requires a valid JWT token to be sent in the `Authorization` header as a Bearer token or as a `token` cookie.

---

### Authentication

- **Required:** Yes (JWT token)
- **How to send:**  
  - As a cookie named `token`  
  - Or as a header:  
    ```
    Authorization: Bearer <JWT_TOKEN>
    ```

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "statuscode": 200,
    "data": null,
    "message": "User logged out successfully",
    "success": true,
    "errors": []
  }
  ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "statuscode": 401,
    "data": null,
    "message": "Unauthorized access",
    "success": false,
    "errors": []
  }
  ```

#### Token Missing

- **Status Code:** `402 Payment Required` (used here for missing token)
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "Access denied as token was inavilable",
    "success": false,
    "errors": []
  }
  ```

---

### Example cURL Requests

**Get Profile:**
```sh
curl -X GET http://localhost:8000/users/v3/api/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Logout:**
```sh
curl -X GET http://localhost:8000/users/v3/api/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

### Notes

- All fields are required for both registration and login.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.
- Password is never returned in the response.