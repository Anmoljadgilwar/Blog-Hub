# 🚀 Blogging Platform - Complete Setup Guide

## 📦 Project Overview

This is a **full-stack blogging platform** following industry-standard practices with:

- **Backend**: Node.js/Express REST API
- **Frontend**: React SPA with React Router
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based
- **Code Quality**: Clean architecture, error handling, validation

## ⚙️ Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn** package manager
- **Git** (optional)

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd blogging-platform/backend
npm install
```

### 2. Configure Environment

```bash
# Create .env file from template
cp .env.example .env
```

Edit `.env` with your settings:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogging-platform
PORT=5000
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**MongoDB URI Examples:**

- **Local**: `mongodb://localhost:27017/blogging-platform`
- **Atlas**: `mongodb+srv://user:password@cluster.mongodb.net/blogging-platform`

### 3. Start Backend Server

```bash
npm start
```

✅ Server should run on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd blogging-platform/frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

✅ Frontend should open on `http://localhost:3000`

## 📚 API Reference

### Authentication

**Register User**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login User**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token - save it for authenticated requests:

```json
{
  "_id": "user-id",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Blog Posts (Public)

**Get All Posts**

```bash
GET /api/posts?page=1&limit=10
```

**Get Single Post**

```bash
GET /api/posts/:postId
```

**Search by Tags**

```bash
GET /api/posts/search?tags=javascript,react&page=1&limit=10
```

**Get User's Posts**

```bash
GET /api/posts/user/:userId?page=1&limit=10
```

### Blog Posts (Protected - Requires Auth)

**Create Post**

```bash
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "Post content here...",
  "tags": ["javascript", "react"]
}
```

**Update Post** (only owner)

```bash
PUT /api/posts/:postId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "tags": ["updated-tag"]
}
```

**Delete Post** (only owner)

```bash
DELETE /api/posts/:postId
Authorization: Bearer <token>
```

## 🧪 Testing with Postman

1. **Register/Login** to get JWT token
2. Copy the `token` from response
3. In Postman, set header: `Authorization: Bearer <token>`
4. Test protected endpoints

## 📁 Project Structure

```
blogging-platform/
│
├── backend/
│   ├── config/
│   │   └── db.js                 ✅ Database connection
│   ├── controllers/
│   │   ├── authController.js     ✅ Auth logic (register, login)
│   │   └── postController.js     ✅ Posts logic (CRUD)
│   ├── middleware/
│   │   ├── middleware.js         ✅ JWT verification
│   │   └── errorHandler.js       ✅ Global error handler
│   ├── models/
│   │   ├── User.js               ✅ User schema with password hashing
│   │   └── Post.js               ✅ Post schema with refs
│   ├── routes/
│   │   ├── authRoutes.js         ✅ Auth endpoints
│   │   └── postRoutes.js         ✅ Posts endpoints
│   ├── utils/
│   │   └── validators.js         ✅ Input validation
│   ├── .env.example              ✅ Environment template
│   ├── server.js                 ✅ Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        ✅ Navigation bar
│   │   │   ├── Footer.jsx        ✅ Footer
│   │   │   └── PrivateRoute.jsx  ✅ Protected routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx   ✅ Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx         ✅ Login page
│   │   │   ├── Register.jsx      ✅ Register page
│   │   │   ├── BlogList.jsx      ✅ Posts feed
│   │   │   ├── BlogPost.jsx      ✅ Single post view
│   │   │   └── CreatePost.jsx    ✅ Create post form
│   │   ├── services/
│   │   │   └── api.js            ✅ API client with interceptors
│   │   ├── utils/
│   │   │   └── auth.js           ✅ Auth helpers
│   │   ├── styles/
│   │   │   ├── App.css           ✅ Global styles
│   │   │   ├── auth.css          ✅ Auth page styles
│   │   │   ├── blog.css          ✅ Blog styles
│   │   │   ├── navbar.css        ✅ Navigation styles
│   │   │   └── footer.css        ✅ Footer styles
│   │   ├── App.jsx               ✅ Main app component
│   │   └── main.jsx              ✅ Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── FRONTEND.md
│
├── .gitignore
└── README.md
```

## ✨ Key Features Implemented

### Backend

- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ 7 post endpoints (CRUD + search)
- ✅ Pagination support
- ✅ Author-only edit/delete
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ CORS configuration
- ✅ MongoDB integration

### Frontend

- ✅ React with Hooks
- ✅ Context API for state management
- ✅ React Router for navigation
- ✅ Protected routes
- ✅ API client with interceptors
- ✅ Responsive design
- ✅ Search functionality
- ✅ Pagination
- ✅ Form validation
- ✅ Error handling

## 🐛 Troubleshooting

### Backend won't start

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

✅ Solution: Start MongoDB or update MONGO_URI in .env

### JWT Token Error

```
Error: Not authorized, token failed
```

✅ Solution: Include correct header: `Authorization: Bearer <token>`

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

✅ Solution: Update CORS_ORIGIN in backend .env to match frontend URL

### Port already in use

```
Error: listen EADDRINUSE :::5000
```

✅ Solution: Change PORT in .env or kill process using the port

## 🚀 Production Checklist

- [ ] Update JWT_SECRET to strong random value
- [ ] Change NODE_ENV to "production"
- [ ] Enable HTTPS
- [ ] Set CORS_ORIGIN to production domain
- [ ] Use MongoDB Atlas (not local)
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Set up CI/CD pipeline
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Deploy backend (Heroku, Railway, Render)
- [ ] Deploy frontend (Vercel, Netlify)

## 📖 Best Practices Used

✅ **Clean Code**

- Separated concerns (models, controllers, routes)
- Reusable components
- Clear naming conventions

✅ **Security**

- Password hashing
- JWT authentication
- Input validation
- Error handling

✅ **Performance**

- Pagination
- Database indexing
- Efficient queries
- Client-side caching

✅ **Scalability**

- Modular architecture
- Environment configuration
- Proper error handling

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push branch: `git push origin feature/amazing-feature`
4. Create Pull Request

## 📝 License

ISC License - feel free to use for learning purposes

## 👨‍💻 Author

**Anmol J.** - Full Stack Developer

---

**Happy coding! 🎉** For questions, refer to the API documentation above or check individual files for inline comments.
