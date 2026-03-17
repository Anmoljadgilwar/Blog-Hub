import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postsAPI } from "@/services/api";
import { getErrorMessage } from "@/utils/auth";
import PostEditorForm from "@/components/PostEditorForm";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
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
      await postsAPI.create({
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostEditorForm
      title="Create a new post"
      subtitle="Shape your story, polish the details, and publish when it feels sharp."
      error={error}
      formData={formData}
      loading={loading}
      submitLabel="Publish post"
      loadingLabel="Publishing..."
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePost;
