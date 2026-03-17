# 🔧 Backend Documentation

## Architecture

The backend follows a **MVC (Model-View-Controller)** pattern with proper separation of concerns:

```
Request → Routes → Controllers → Models → Database
                      ↓
                  Middleware (Auth, Error)
```

## File Descriptions

### `server.js`

Main entry point that:

- Connects to MongoDB
- Initializes Express app
- Registers middleware
- Mounts routes
- Starts server

### `config/db.js`

Database connection configuration using Mongoose.

### `models/`

**User.js**

- Username, email, password fields
- Pre-save hook for password hashing
- Timestamps for audit

**Post.js**

- Title, content, tags, author reference
- Mongoose population for author details
- Timestamps

### `controllers/`

**authController.js**

- `registerUser()` - Create new user account
- `loginUser()` - Authenticate and return JWT

**postController.js**

- `createPost()` - Create new blog post (protected)
- `getAllPosts()` - List all posts with pagination
- `getPostById()` - Get single post
- `getPostsByUser()` - Filter by author
- `updatePost()` - Update post (author only)
- `deletePost()` - Delete post (author only)
- `searchByTags()` - Search posts by tags

### `routes/`

**authRoutes.js**

- `POST /register` - Register user
- `POST /login` - Login user

**postRoutes.js**

- `GET /` - Get all posts
- `GET /search` - Search posts
- `GET /user/:userId` - Get user's posts
- `GET /:id` - Get single post
- `POST /` - Create post (protected)
- `PUT /:id` - Update post (protected)
- `DELETE /:id` - Delete post (protected)

### `middleware/`

**middleware.js** - JWT verification for protected routes

**errorHandler.js** - Global error handling middleware

### `utils/`

**validators.js** - Input validation helper functions

## API Response Format

All API responses follow a consistent format:

**Success Response:**

```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description"
}
```

## Authentication Flow

1. User registers with username, email, password
2. Password is hashed with bcrypt before storing in DB
3. User logs in and receives JWT token
4. Token is sent in `Authorization: Bearer <token>` header
5. Middleware verifies token and attaches user to request
6. Protected endpoints check user ownership

## Pagination

All list endpoints support pagination with query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Response includes:

- `count` - Items in current page
- `total` - Total items in collection
- `pages` - Total number of pages
- `page` - Current page number

## Error Handling

The application has 3 levels of error handling:

1. **Model Validation** - Mongoose schema validation
2. **Controller Validation** - Business logic checks
3. **Global Middleware** - Catches unhandled errors

Common error codes:

- `400` - Bad request (validation error)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error

## Running Tests

```bash
npm test
```

Currently placeholder - ready for implementation.

## Development

```bash
# Start with nodemon (auto-restart)
npm start

# Production build
npm run build
```

## Code Quality Standards

- ✅ Consistent naming conventions
- ✅ Proper error handling
- ✅ Input validation
- ✅ Comments for complex logic
- ✅ No console.log in production code
- ✅ Environment-based configuration
