---
sidebar_position: 1
---

# Introduction:

Let's first see what **InvoEase actually does** and learn a little about the repo.

### Use of InvoEase:

- InvoEase is used to generate, store, edit & download invoices which can be used by small bussiness owners or freelancers to automate their invoice generation process
- Github Link: https://github.com/anishs1207/invoease
- Demo Link: https://drive.google.com/file/d/1tVLjabcYH08-LSIXkNEM4iMFbSDpA6v4/view?usp=sharing

### About Codebase:

It is a full stack repo with following folders:

1. frontend (Vite React)
2. backend (Node-Express + MongoDB)
3. tests (for writing the tests)
4. .github (for CICD)
5. docs (for the Documentation for it)

### Backend :

/backend: Backend for Invoease is a Nodejs-Express API with use of MongoDB & conatins the following folders (/backend/src)

#### Controllers /controllers:

the bussines logic

1. admin.controller.js:

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

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
