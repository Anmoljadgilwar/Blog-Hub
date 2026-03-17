const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validateUsername = (username) => {
  return username && username.length >= 3 && username.length <= 30;
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateTitle = (title) => {
  return title && title.length > 0 && title.length <= 100;
};

const validateContent = (content) => {
  return content && content.length > 0;
};

const validateInput = (data) => {
  const errors = [];

  if (data.email && !validateEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.username && !validateUsername(data.username)) {
    errors.push("Username must be between 3-30 characters");
  }

  if (data.password && !validatePassword(data.password)) {
    errors.push("Password must be at least 6 characters");
  }

  if (data.title && !validateTitle(data.title)) {
    errors.push("Title must be between 1-100 characters");
  }

  if (data.content && !validateContent(data.content)) {
    errors.push("Content is required and cannot be empty");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword,
  validateTitle,
  validateContent,
  validateInput,
};
