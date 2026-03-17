# 🎨 Frontend Documentation

## Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- ✅ User authentication
- ✅ Blog feed with pagination
- ✅ Create/read blog posts
- ✅ Search posts by tags
- ✅ Responsive design
- ✅ Protected routes

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── context/         # React context (Auth)
│   ├── pages/           # Page components
│   ├── services/        # API calls
│   ├── styles/          # CSS files
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

## Testing the Frontend

1. Ensure backend is running on port 5000
2. Start frontend with `npm run dev`
3. Open http://localhost:3000 in browser
4. Register a new account
5. Create and view blog posts
6. Search posts by tags
