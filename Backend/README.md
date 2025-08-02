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

---

# Captain Registration & Login API Documentation

## Captain Registration Endpoint

```
POST /users/v3/api/register_captain
```

## Description

This endpoint allows a new captain to register by providing their personal details and vehicle information.
It validates the input, hashes the password, and stores the captain in the database.
On success, it returns the created captain (without the password) and an authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain.john@example.com",
  "password": "yourpassword",
  "vericle": {
    "colore": "Red",
    "capacity": 4,
    "vericle_type": "Car",
    "plate": "ABC123"
  }
}
```

### Field Requirements

- `fullName.firstname` (string, min 3 characters) – required
- `fullName.lastname` (string, min 3 characters) – required
- `email` (string, valid email format) – required
- `password` (string, min 6 characters) – required
- `vericle.colore` (string, min 3 characters) – required
- `vericle.capacity` (integer, min 2) – required
- `vericle.vericle_type` (string, min 3 characters) – required
- `vericle.plate` (string, min 3 characters) – required

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "statuscode": 200,
    "data": [
      "<JWT_TOKEN>",
      {
        "_id": "captain_id",
        "fullName": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "captain.john@example.com",
        "vericle": {
          "colore": "Red",
          "capacity": 4,
          "vericle_type": "Car",
          "plate": "ABC123"
        },
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "message": "the registration of the captain have been successfull",
    "success": true,
    "errors": []
  }
  ```

### Validation Error

- **Status Code:** `404 Not Found` (⚠️ **Security Issue**: Should be 400 Bad Request)
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "validation error",
    "success": false,
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "statuscode": 500,
    "data": null,
    "message": "somthing went wrong while registering the cptain",
    "success": false,
    "errors": []
  }
  ```

---

## Captain Login Endpoint

```
POST /users/v3/api/login_captain
```

## Description

This endpoint allows an existing captain to log in by providing their email and password.
It validates the credentials, generates an authentication token, and sets a cookie.
On success, it returns the captain details (without password) and an authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "captain.john@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, valid email format) – required
- `password` (string, min 6 characters) – required

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Headers:** Sets `token` cookie with JWT
- **Body:**
  ```json
  {
    "statuscode": 200,
    "data": [
      "<JWT_TOKEN>",
      {
        "_id": "captain_id",
        "fullName": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "captain.john@example.com",
        "vericle": {
          "colore": "Red",
          "capacity": 4,
          "vericle_type": "Car",
          "plate": "ABC123"
        },
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "message": "the captain has been login successfully",
    "success": true,
    "errors": []
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "the user deatail is not valid",
    "success": false,
    "errors": []
  }
  ```

### Captain Not Found

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "captain is not registerd in the data base",
    "success": false,
    "errors": []
  }
  ```

### Invalid Password

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "statuscode": 400,
    "data": null,
    "message": "the password of the captain is invalid",
    "success": false,
    "errors": []
  }
  ```

---

### Example cURL Requests

**Captain Registration:**
```sh
curl -X POST http://localhost:8000/users/v3/api/register_captain \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain.john@example.com",
    "password": "securepassword",
    "vericle": {
      "colore": "Red",
      "capacity": 4,
      "vericle_type": "Car",
      "plate": "ABC123"
    }
  }'
```

**Captain Login:**
```sh
curl -X POST http://localhost:8000/users/v3/api/login_captain \
  -H "Content-Type: application/json" \
  -d '{
    "email": "captain.john@example.com",
    "password": "securepassword"
  }'
```

---

## Security Analysis - Updated

### ✅ Fixed Issues

1. **~~Missing Request Parameter in Login Function~~** - **FIXED**
   - **File:** `captain.controller.js:48`
   - **Status:** ✅ Fixed - Function now has proper `async(req, res, next)=>` signature

2. **~~Incorrect HTTP Status Codes~~** - **FIXED**
   - **File:** `captain.controller.js:13`
   - **Status:** ✅ Fixed - Validation errors now return `400` instead of `404`

3. **~~Inconsistent Field Naming~~** - **FIXED**
   - **Files:** `captain.controller.js`, `captain.routes.js`, `captain.model.js`
   - **Status:** ✅ Fixed - All files now consistently use `vericle` field naming

4. **~~Password Field Case Sensitivity~~** - **FIXED**
   - **File:** `captain.controller.js:56`
   - **Status:** ✅ Fixed - Now uses correct `.select("-password")` case

5. **~~Token Generation Issue~~** - **FIXED**
   - **File:** `captain.controller.js:41`
   - **Status:** ✅ Fixed - Now calls `create_captain.generateAuthenticationToken()` on instance

### ⚠️ Remaining Critical Issues

1. **Missing Cookie Security Options**
   - **File:** `captain.controller.js:70`
   - **Issue:** Cookie set without security options
   - **Impact:** Vulnerable to XSS and CSRF attacks
   - **Current:** `res.cookie('token', Token)`
   - **Fix Needed:** 
     ```javascript
     res.cookie('token', Token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict',
       maxAge: 24 * 60 * 60 * 1000 // 24 hours
     })
     ```

<!-- 
  These Issues have been FIXED
2. **Method Name Typo**
   - **File:** `captain.controller.js:17`
   - **Issue:** `Captain.hashpassword(password)` should be `Captain.hashPassword(password)`
   - **Impact:** Function call will fail, registration won't work
   - **Fix:** Correct method name to match model definition

3. **Validation Field Mismatch**
   - **File:** `captain.routes.js:17`
   - **Issue:** Route validates `vericle.vehicle_type` but model expects `vericle.vericle_type`
   - **Impact:** Validation will pass but database save will fail
   - **Fix:** Change validation to `body('vericle.vericle_type')`

4. **Missing Return Statement**
   - **File:** `captain.controller.js:37-39`
   - **Issue:** Error creation without return statement
   - **Current:** `return new ApiError("somthing went wrong while registering the cptain",500)`
   - **Fix:** Should be `return res.status(500).json(new ApiError(...))`

5. **Inconsistent Error Response Format**
   - **File:** `captain.controller.js:59`
   - **Issue:** Error response not using ApiError class consistently
   - **Current:** `return res.status(400).json("captain is not registerd in the data base", 400)`
   - **Fix:** `return res.status(400).json(new ApiError("captain is not registerd in the data base", 400))` -->

### 🔍 Additional Vulnerabilities Found in Related Files

#### User Routes (`User.routes.js`)
1. **Inconsistent Field Naming**
   - **Issue:** User routes use `firstName`/`lastName` but captain uses `firstname`/`lastname`
   - **Impact:** Inconsistent API design, potential confusion
   - **Recommendation:** Standardize naming convention across all endpoints

#### Captain Model (`captain.model.js`)
1. **Missing Index on Email**
   - **Issue:** No database index on email field despite being used for lookups
   - **Impact:** Poor query performance
   - **Fix:** Add `index: true` to email field or create compound index

2. **Weak Password Validation**
   - **Issue:** Only checks minimum length, no complexity requirements
   - **Impact:** Weak passwords allowed
   - **Recommendation:** Add regex for password complexity

3. **Location Field Required but Not Validated in Routes**
   - **Issue:** Model requires location field but routes don't validate it
   - **Impact:** Registration will fail if location not provided
   - **Fix:** Add location validation to registration route or make field optional

### 🔒 Security Recommendations

1. **Add Rate Limiting** - Implement rate limiting for login attempts
2. **Input Sanitization** - Add additional input sanitization beyond validation
3. **Error Messages** - Use generic error messages to prevent information disclosure
4. **HTTPS Only** - Ensure cookies are only sent over HTTPS in production
5. **Password Complexity** - Consider stronger password requirements
6. **Account Lockout** - Implement account lockout after failed login attempts

---

### Notes

- All fields are required for both registration and login.
- The password is securely hashed before storage.
- The response includes a JWT token for authentication.
- Password is never returned in the response.
- **IMPORTANT:** Several critical bugs need to be fixed before these endpoints can function properly.

---

# Captain Module: Implementation Details & File Documentation

Below are summaries of the main backend files that implement the Captain registration, authentication, and profile functionality. This section is intended for developers who want to understand or extend the backend logic beyond the API endpoints.

## File: `src/routes/captain.routes.js`
**Purpose:**
Defines the Express routes for captain registration, login, profile, and logout. Applies validation and authentication middleware.

**Main Endpoints:**
- `POST /register` — Register a new captain (with input validation)
- `POST /login` — Login for existing captain (with input validation)
- `GET /profile` — Get captain profile (requires authentication)
- `GET /logout` — Logout captain (requires authentication)

**Key Notes:**
- Uses `express-validator` for input validation.
- Uses `auth_captain` middleware to protect profile and logout routes.
- Imports controller functions from `captain.controller.js`.

## File: `src/middleware/auth.middleware.captain.js`
**Purpose:**
Express middleware to authenticate captain requests using JWT tokens (from cookie or header).

**How it works:**
- Extracts token from cookie or `Authorization` header.
- Checks for token blacklisting (logout support).
- Verifies JWT and loads captain from DB.
- Attaches the captain to `req.captain` if authenticated.

**Security Notes:**
- Returns 402 if token is missing, blacklisted or invalid.
- Uses `ApiError` class for consistent error responses.
- Relies on `Captain` model and `jsonwebtoken`.

## File: `src/utils/CreateCaptain.utils.js`
**Purpose:**
Utility function to create and validate a new Captain document in the database.

**Main Function:**
- `CreateCaptain({ email, firstname, lastname, password, color, plate, capacity, vehicle_type })`

**How it works:**
- Validates all required fields (types and non-empty).
- Checks for existing captain by email.
- Creates new Captain with nested `fullName` and `vehicle` fields.
- Throws `ApiError` on validation or creation failure.

## File: `src/controllers/captain.controller.js`
**Purpose:**
Defines controller functions for captain registration, login, profile retrieval, and logout. Handles request validation, password hashing, token generation, and response formatting.

**Main Functions:**
- `Register_Captain` — Validates input, hashes password, creates captain, returns JWT and captain data.
- `Login_captain` — Validates credentials, checks password, generates JWT, sets cookie, returns captain data.
- `captain_profile` — Returns authenticated captain's profile.
- `log_out_captain` — Blacklists JWT token and clears cookie.

**Implementation Notes:**
- Uses `asyncHandler` for async error handling.
- Uses `ApiResponse` and `ApiError` for consistent API responses.
- Security: Password is always hashed and never returned. Token is set as cookie, but consider adding security options (`httpOnly`, `secure`, etc.).
- Relies on `CreateCaptain` utility for registration logic.

---

**For more details, see the code comments and function signatures in each respective file.**