---
sidebar_position: 1
---

# Introduction

Let's first see what **InvoEase actually does** and learn a little about the repo.

### Use of InvoEase

- InvoEase is used to generate, store, edit & download invoices which can be used by small bussiness owners or freelancers to automate their invoice generation process
- Github Link: https://github.com/anishs1207/invoease
- Demo Link: https://drive.google.com/file/d/1tVLjabcYH08-LSIXkNEM4iMFbSDpA6v4/view?usp=sharing

### About Codebase

It is a full stack repo with following folders:

1. frontend (Vite React)
2. backend (Node-Express + MongoDB)
3. tests (for writing the tests)
4. .github (for CICD)
5. docs (for the Documentation for it)

## Backend

Backend for Invoease is a Nodejs-Express API with use of MongoDB 

### Controllers

- Folder: backend/src/controllers
- Purpose: It Includes the Bussiness Logic
- Includes: `auth.controller.js`, `invoice.controller` & `user.controller.js`

### DB Connection
- Folder: backend/src/db
- Purpose: to connect with db
- Includes: `index.js` (returns a functions to connect with the db)

### Middleware 
- Folder: backend/src/middlewares
- Purpose: to act as middle logic for incoming requests before passing to controllers
- Includes: `auth.middleware.js`, `errorhanderl.js`

### Models
- Folder: backend/src/models
- Purpose: to define schema for the model of MongoDB
- Includes: `invoice.model.js`, `subscription.model.js`, `user.model.js`

### Routes:
- Folder: backend/src/routes 
- Purpose: To define the routes & nested routes
- Includes: `admin.route.js`, `auth.router.js`, `invoice.router.js` & `user.route.js`

### Utils
- Folder: backend/src/utils
- Purpose: Some helper functions defined
- Includes: `ApiError.js`, `ApiResponse.js`, `asyncHandler.js` & `emailService.js`

### Important Files:

- Folder: backend/src/[`index.js` + `app.js` + `constants.js`]
- `app.js`: It is used  to define routes centrally & corrresponding routers + middlewares (cookieParer, cors, express, dotenv)
- `constants.js`: to store all constants centrally which are not sensitive
- `index.js`: to dotenv + connect with db + start server

## Setup of Backend:

- It is backend of webapp using Nodejs-Express-MongoDB
- File Structure is divided into controllers, routers, models, utils, etc

```bash
# to setup backend server
cd backend
npm install
npm run dev # to run the dev server
```

`cd` command it used to change directory to backend folder.

`npm install` is used to install all the dependencies.

`npm run dev` is used to start the dev server to run at `http://localhost:3000/`

## Setup of Frontend:

- Used to run the frontend

```bash
# to setup & start frontend
cd frontend
npm install
npm run dev
```

`cd` command it used to change directory to frontend folder.

`npm install` is used to install all the dependencies.

`npm run dev` is used to start the dev server to run at `http://localhost:5173/`

<!-- Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**. -->

<!-- ### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
- When installing Node.js, you are recommended to check all checkboxes related to dependencies. -->

