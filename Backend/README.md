# User Registration API Documentation

## Endpoint

```
POST /users/v3/register_user/register
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
      "JWT_TOKEN_STRING",
      {
        "_id": "user_id",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        // ...other user fields (excluding password)
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
      },
      // ...other validation errors
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
curl -X POST http://localhost:8000/users/v3/register_user/register \
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

## Notes

- All fields are required.
- The password is securely hashed before storage.
- The response includes a JWT token