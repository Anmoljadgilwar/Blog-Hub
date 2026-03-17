import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { postsAPI } from "@/services/api";
import { formatDate, getErrorMessage } from "@/utils/auth";
import Alert from "@/components/Alert";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      try {
        const response = await postsAPI.getById(id);
        setPost(response.data.data);
        setError("");
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const isOwner = user?._id === post?.author?._id;

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Delete this post? This action cannot be undone.",
    );

    if (!shouldDelete) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await postsAPI.delete(id);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <section className="page-section">
        <div className="container">
          <LoadingState message="Loading post..." />
        </div>
      </section>
    );
  }

  if (error) {
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
            description="The article may have been removed or the link is invalid."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <article className="panel article-shell">
          <div className="article-header">
            <div>
              <span className="eyebrow">Featured article</span>
              <h1 className="page-title">{post.title}</h1>
            </div>
            <div className="article-meta">
              <span className="article-meta__pill">
                By <strong>{post.author?.username || "Unknown author"}</strong>
              </span>
              <span className="article-meta__pill">
                Published {formatDate(post.createdAt)}
              </span>
              {post.updatedAt !== post.createdAt ? (
                <span className="article-meta__pill">
                  Updated {formatDate(post.updatedAt)}
                </span>
              ) : null}
            </div>
            {isAuthenticated && isOwner ? (
              <div className="post-actions">
                <Link to={`/post/${post._id}/edit`} className="button-secondary">
                  Edit post
                </Link>
                <button
                  type="button"
                  className="button-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete post"}
                </button>
              </div>
            ) : null}
          </div>
          <div className="post-content">{post.content}</div>
          {post.tags?.length ? (
            <div className="tag-list" style={{ marginTop: "1.5rem" }}>
              {post.tags.map((tag) => (
                <span key={`${post._id}-${tag}`} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
          <Link to="/" className="text-link section-backlink">
            Back to posts
          </Link>
        </article>
      </div>
    </section>
  );
};

export default BlogPost;
