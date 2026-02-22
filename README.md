# InvoEase:

- Used to generate, store, edit & download invoices which can be used by small bussiness owners or freelancers
- It is backend of webapp using Nodejs-Express-MongoDB
- File Structure is divided into controllers, routers, models, etc

# Demo Video:

[![InvoEase Demo](https://img.youtube.com/vi/2y1lW90AVyM/maxresdefault.jpg)](https://www.youtube.com/watch?v=2y1lW90AVyM)

# Images:

![alt text](/assets/image.png)

![alt text](/assets/image-1.png)

![alt text](/assets/image-2.png)

![alt text](/assets/image-3.png)

![alt text](/assets/image-4.png)

![alt text](/assets/image-5.png)

![alt text](/assets/image-6.png)

![alt text](/assets/image-7.png)

![alt text](/assets/image-8.png)

# Getting Started

Follow the steps below to run both the **frontend** and **backend** locally.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/) (local instance or a MongoDB Atlas URI)

---

## 1. Clone the Repository

```bash
git clone https://github.com/anishs1207/invoease.git
cd invoease
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory and add the required environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

Start the backend server:

```bash
npm run dev
```

> The backend will start on `http://localhost:3000` by default.

---

## 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend/` directory and add the required environment variables:

```env
VITE_API_URL=http://localhost:5173
```

Start the frontend dev server:

```bash
npm run dev
```

> The frontend will start on `http://localhost:5173` by default (Vite).

---

Both servers need to be running simultaneously for the app to work correctly.
