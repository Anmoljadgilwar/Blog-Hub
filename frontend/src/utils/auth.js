// Auth utilities
export const setAuthData = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const getAuthData = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return {
    user: user ? JSON.parse(user) : null,
    token,
  };
};

export const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Truncate text
export const truncateText = (text, length = 150) => {
  if (!text) {
    return "";
  }

  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// Error message formatter
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
};
