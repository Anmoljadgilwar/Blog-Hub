const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const { validateInput } = require("../utils/validators");

const buildPagination = (query) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.max(
    1,
    Math.min(50, Number.parseInt(query.limit, 10) || 10),
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

const normalizeTags = (tags) => {
  if (!tags) {
    return [];
  }

  const rawTags = Array.isArray(tags) ? tags : String(tags).split(",");
  return [...new Set(rawTags.map((tag) => String(tag).trim()).filter(Boolean))];
};

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

exports.createPost = async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();
    const tags = normalizeTags(req.body.tags);

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const { isValid, errors } = validateInput({ title, content });
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: errors[0],
      });
    }

    const post = await Post.create({
      title,
      content,
      tags,
      author: req.user._id,
    });

    await post.populate("author", "username email");

    return res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { page, limit, skip } = buildPagination(req.query);

    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    return res.json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email",
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const { page, limit, skip } = buildPagination(req.query);
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ author: req.params.userId });

    return res.json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    if (req.body.title !== undefined) {
      post.title = req.body.title?.trim();
    }

    if (req.body.content !== undefined) {
      post.content = req.body.content?.trim();
    }

    if (req.body.tags !== undefined) {
      post.tags = normalizeTags(req.body.tags);
    }

    const { isValid, errors } = validateInput({
      title: post.title,
      content: post.content,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: errors[0],
      });
    }

    post = await post.save();
    await post.populate("author", "username email");

    return res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.searchByTags = async (req, res) => {
  try {
    const tagArray = normalizeTags(req.query.tags);

    if (!tagArray.length) {
      return res.status(400).json({
        success: false,
        message: "Tags parameter is required",
      });
    }

    const { page, limit, skip } = buildPagination(req.query);
    const filter = { tags: { $in: tagArray } };

    const posts = await Post.find(filter)
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);

    return res.json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
