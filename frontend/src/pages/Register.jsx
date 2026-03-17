import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/services/api";
import { getErrorMessage } from "@/utils/auth";
import AuthFormShell from "@/components/AuthFormShell";
import FormField from "@/components/FormField";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await authAPI.register(formData);
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
      title="Create your account"
      subtitle="Join BlogHub to write, publish, and organize your articles."
      error={error}
      footerText="Already have an account?"
      footerLinkLabel="Login here"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="form-stack">
        <FormField
          label="Username"
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
          minLength="3"
        />
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
          placeholder="Use at least 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        <button type="submit" disabled={loading} className="button">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </AuthFormShell>
  );
};

export default Register;
