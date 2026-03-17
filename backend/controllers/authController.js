const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validateInput } = require("../utils/validators");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

const formatAuthResponse = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  token: generateToken(user._id),
});

exports.registerUser = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const { isValid, errors } = validateInput({ username, email, password });
    if (!isValid) {
      return res.status(400).json({ message: errors[0] });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "An account with this email already exists"
            : "Username is already taken",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json(formatAuthResponse(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json(formatAuthResponse(user));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
