# 📝 Blogging Platform

A modern, full-stack blogging platform built with **Node.js/Express** backend and **React** frontend.

## ✨ Features

### Backend

- ✅ User authentication (JWT)
- ✅ User registration & login
- ✅ Create, read, update, delete (CRUD) blog posts
- ✅ Search posts by tags
- ✅ Pagination support
- ✅ Authorization (only authors can edit/delete their posts)
- ✅ MongoDB database integration
- ✅ Password hashing with bcrypt
- ✅ Error handling middleware
- ✅ Input validation

### Frontend (Coming Soon)

- User authentication UI
- Blog feed with pagination
- Create/edit blog post pages
- User profile page
- Responsive design

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin handling
- **dotenv** - Environment variables

### Frontend (In Progress)

- **React** - UI library
- **Axios** - HTTP client
- **React Router** - Navigation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## ⚙️ Installation

### Backend Setup

1. **Clone the repository & navigate to backend:**

   ```bash
   cd blogging-platform/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**

   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogging-platform
   PORT=5000
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

- **Method:** POST
- **Endpoint:** `/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with JWT token

#### Login User

- **Method:** POST
- **Endpoint:** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with JWT token

### Posts Endpoints

#### Get All Posts (Public)

- **Method:** GET
- **Endpoint:** `/posts?page=1&limit=10`
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `limit` - Posts per page (default: 10)
- **Response:** Array of posts with pagination metadata

#### Get Single Post (Public)

- **Method:** GET
- **Endpoint:** `/posts/:id`
- **Response:** Single post object

#### Get User's Posts (Public)

- **Method:** GET
- **Endpoint:** `/posts/user/:userId?page=1&limit=10`
- **Response:** User's posts with pagination

#### Search Posts by Tags (Public)

- **Method:** GET
- **Endpoint:** `/posts/search?tags=javascript,react&page=1&limit=10`
- **Response:** Posts matching tags

#### Create Post (Protected)

- **Method:** POST
- **Endpoint:** `/posts`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "tags": ["javascript", "web-development"]
  }
  ```
- **Response:** Created post object

#### Update Post (Protected)

- **Method:** PUT
- **Endpoint:** `/posts/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** (any of these fields)
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content...",
    "tags": ["updated-tag"]
  }
  ```
- **Response:** Updated post object

#### Delete Post (Protected)

- **Method:** DELETE
- **Endpoint:** `/posts/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Success message

## 🔐 Headers for Protected Routes

All protected routes require the following header:

```
Authorization: Bearer <your_jwt_token>
```

Get your token from the login or register endpoint and include it in all protected requests.

## 📁 Project Structure

```
blogging-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── postController.js     # Posts logic
│   ├── middleware/
│   │   ├── middleware.js         # Auth middleware
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Post.js               # Post schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth routes
│   │   └── postRoutes.js         # Posts routes
│   ├── utils/
│   │   └── validators.js         # Input validation
│   ├── .env.example              # Environment template
│   ├── server.js                 # Entry point
│   └── package.json
├── frontend/
│   └── (React app - To be completed)
└── README.md
```

## 🚀 Development

### Running the Backend

```bash
npm start
```

Uses **nodemon** for auto-restart on file changes.

### Testing the API

Use tools like **Postman** or **Thunder Client** to test endpoints:

1. Register a new user
2. Copy the token from response
3. Use the token in Authorization header for protected endpoints
4. Create, read, update, and delete posts

## 🐛 Troubleshooting

### MongoDB Connection Error

- Verify `MONGO_URI` in `.env` is correct
- Ensure MongoDB is running (if local)
- Check network access (if MongoDB Atlas)

### JWT Token Error

- Ensure `JWT_SECRET` is set in `.env`
- Include correct `Authorization: Bearer <token>` header
- Token may have expired (login again)

### CORS Error

- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Default is `http://localhost:3000`

## 📝 Best Practices Implemented

✅ Clean code structure with separation of concerns
✅ Proper error handling with middleware
✅ Input validation on all endpoints
✅ JWT-based authentication
✅ Password hashing with bcrypt
✅ Database schema validation
✅ Pagination for large datasets
✅ RESTful API design
✅ Environment variable management
✅ Request logging
✅ Comprehensive documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Anmol J.**

---

Happy blogging! 🎉
