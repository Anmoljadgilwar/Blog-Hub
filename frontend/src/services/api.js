import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
};

// Posts API
export const postsAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient.get(`/posts?page=${page}&limit=${limit}`),
  getById: (id) => apiClient.get(`/posts/${id}`),
  getByUser: (userId, page = 1, limit = 10) =>
    apiClient.get(`/posts/user/${userId}?page=${page}&limit=${limit}`),
  search: (tags, page = 1, limit = 10) =>
    apiClient.get(`/posts/search?tags=${tags}&page=${page}&limit=${limit}`),
  create: (data) => apiClient.post("/posts", data),
  update: (id, data) => apiClient.put(`/posts/${id}`, data),
  delete: (id) => apiClient.delete(`/posts/${id}`),
};

export default apiClient;
