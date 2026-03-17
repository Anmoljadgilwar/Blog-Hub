import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/services/api";
import { getErrorMessage } from "@/utils/auth";
import AuthFormShell from "@/components/AuthFormShell";
import FormField from "@/components/FormField";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { _id, username, email, token } = response.data;

      login({ _id, username, email }, token);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormShell
      title="Welcome back"
      subtitle="Sign in to publish and manage your posts."
      error={error}
      footerText="Don't have an account?"
      footerLinkLabel="Register here"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="form-stack">
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading} className="button">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthFormShell>
  );
};

export default Login;
