<!-- ---
sidebar_position: 1
---



- backend for Invoease is a Nodejs-Express API with use of MongoDB
- conatins the following folders (/backend/src)

1. controllers (the bussines logic)

- admin.controller.js:

to handle the notifications sent to the user via a centralised panel
contains the following apis routes: (http://localhost:3000/api/v1/admin);

sendNotification, getNotifications,

router.post('/send-notifications', verifyJWT, authoriseAdmin, sendNotifications);
router.get('/all-notifications', verifyJWT, authoriseAdmin, getNotifications);
router.delete('/delete-notification/:alertText', verifyJWT, authoriseAdmin deleteNotificationByText);
router.put('/update-notification', verifyJWT, authoriseAdmin, updateNotificationById);

sendNotifications:

- auth.controller.js
- invoice.controller.js
- user.controller.js

2. db (to coonnect with db)

- index.js (retruns a functions to connect with the db)

3. middleware (to midkdares & intercept request):

- auth.middleware.js
- errorhanderl.js

4. models (to define schema for the model of mONGODB):
   invoice.model.js
   subscription.model.js
   user.model.js

5. routes (define the routes):
   admin.route.js
   auth.router.js
   invoice.router.js
   user.route.js
6. utils (some hekper functions):
   ApiError.js
   ApiResponse.js
   asyncHandler.js
   emailService.js

- and conatins the following files:
  /backend/
  app.js => defin the routes & corr routers + middlewares (cookieParer, cors, express, dotenv)
  constants.js => to store all constants centrally which are not sensitive
  index.js => to dotenv + connect with db + start server


Anyt ooriblem in steup of codebase:
email @ anishs1207@gmail.com

# API References:

1. User API: (/api/v1/user)

BASE URL: http://localhost:3000
END POINT: /api/v1/user/register

Requets Header:
| Header | Value | Description |
| ------------ | ---------------- | ---------------------- |
| Content-Type | application/json | Specifies JSON payload |

Description:
Registers a new user in the system.

Request Body:
{
"fullName": "John Doe",
"email": "john@example.com",
"username": "johndoe",
"password": "securePassword123"
}

Response (Success 201):

{
"success": true,
"message": "User registered successfully",
"userId": "64d5f..."
}

Response (Error 400/409):

{
"success": false,
"message": "Email already exists"
}

2. How Developers Use It in Code

Once the documentation is written, developers can implement it using whatever HTTP client they prefer (axios, fetch, etc.):

import axios from "axios";

const registerUser = async (name, email, username, password) => {
try {
const response = await axios.post(
"http://localhost:3000/api/v1/user/register",
{ fullName: name, email, username, password },
{ withCredentials: true }
);
console.log(response.data);
} catch (error) {
console.error(error.response?.data || error.message);
}
};

✅ Key points:

Docs describe what the API expects and returns.

Code shows how you call the API in a specific programming language.

Docs are language-agnostic; code examples can be in JS, Python, curl, etc.

If you want, I can write a full mini API doc for your /register endpoint in a clean, professional format like Swagger/OpenAPI style, so you could use it directly in documentation.

Do you want me to do that?

await axios.post("http://localhost:3000/api/v1/user/register",
{ email, fullName: name, username, password },
{ withCredentials: true })

b. POST http://localhost:3000/api/v1/user/login

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/verify", verifyCode);
router.get("/session", verifyJWT, getUserSession);
router.post("/resend-code", resendVerificationCode);
router.get("/get-notifications", verifyJWT, getUserNotifications);
router.delete("/delete-notifications", verifyJWT, deleteAllNotifications);
router.post("/subscribe", subscribeUser);
router.get("/check-subscribe", checkSubscriptionStatus); -->
