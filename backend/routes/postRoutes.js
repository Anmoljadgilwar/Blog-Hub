const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
  searchByTags,
} = require("../controllers/postController");
const { protect } = require("../middleware/middleware");

// Public routes
router.get("/", getAllPosts);
router.get("/search", searchByTags);
router.get("/user/:userId", getPostsByUser);
router.get("/:id", getPostById);

// Protected routes (require authentication)
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
