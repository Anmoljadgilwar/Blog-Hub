import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { postsAPI } from "@/services/api";
import { getErrorMessage } from "@/utils/auth";
import Alert from "@/components/Alert";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import PostEditorForm from "@/components/PostEditorForm";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await postsAPI.getById(id);
        const currentPost = response.data.data;
        setPost(currentPost);
        setFormData({
          title: currentPost.title || "",
          content: currentPost.content || "",
          tags: currentPost.tags?.join(", ") || "",
        });
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await postsAPI.update(id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate(`/post/${id}`);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="page-section">
        <div className="container">
          <LoadingState message="Loading your draft..." />
        </div>
      </section>
    );
  }

  if (error && !post) {
    return (
      <section className="page-section">
        <div className="container">
          <Alert message={error} />
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="page-section">
        <div className="container">
          <EmptyState
            title="Post not found"
            description="This draft could not be loaded for editing."
          />
        </div>
      </section>
    );
  }

  if (user?._id !== post.author?._id) {
    return (
      <section className="page-section">
        <div className="container">
          <Alert message="You can only edit your own posts." />
        </div>
      </section>
    );
  }

  return (
    <PostEditorForm
      title="Edit your post"
      subtitle="Refine the message, tighten the structure, and republish with confidence."
      error={error}
      formData={formData}
      loading={saving}
      submitLabel="Save changes"
      loadingLabel="Saving..."
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default EditPost;
