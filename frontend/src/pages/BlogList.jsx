import React, { useEffect, useState } from "react";
import { postsAPI } from "@/services/api";
import { getErrorMessage } from "@/utils/auth";
import { useAuth } from "@/context/AuthContext";
import Alert from "@/components/Alert";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";

const BlogList = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTags, setSearchTags] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = searchTags
          ? await postsAPI.search(searchTags, page)
          : await postsAPI.getAll(page);

        setPosts(response.data.data ?? []);
        setTotalPages(response.data.pages ?? 1);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, searchTags]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearchTags(searchInput.trim());
  };

  const handleDelete = async (postId) => {
    const shouldDelete = window.confirm(
      "Delete this post? This action cannot be undone.",
    );

    if (!shouldDelete) {
      return;
    }

    setDeletingId(postId);
    setError("");

    try {
      await postsAPI.delete(postId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId),
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="page-section">
      <div className="container">
        <div className="hero-card">
          <div className="page-header">
            <div>
              <span className="eyebrow">Community publishing</span>
              <h1 className="page-title">Stories that feel crafted, not thrown together.</h1>
              <p className="page-subtitle">
                Browse recent posts, search by tags, and manage your own writing
                from the same polished dashboard.
              </p>
            </div>

            <form onSubmit={handleSearch} className="search-bar">
              <input
                type="text"
                placeholder="Search by tags like react, node, mongodb"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="input"
              />
              <button type="submit" className="button">
                Search
              </button>
              {searchTags ? (
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => {
                    setSearchInput("");
                    setSearchTags("");
                    setPage(1);
                  }}
                >
                  Clear
                </button>
              ) : null}
            </form>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>{posts.length}</strong>
              <span>Posts on this page</span>
            </div>
            <div className="stat-card">
              <strong>{searchTags ? "Tag search" : "Latest feed"}</strong>
              <span>{searchTags || "Fresh stories from every author"}</span>
            </div>
            <div className="stat-card">
              <strong>{isAuthenticated ? "Owner tools on" : "Read mode"}</strong>
              <span>
                {isAuthenticated
                  ? `Logged in as ${user?.username || "writer"}`
                  : "Login to edit and delete your own posts"}
              </span>
            </div>
          </div>

          <Alert message={error} />

          {loading ? (
            <LoadingState message="Loading posts..." />
          ) : posts.length === 0 ? (
            <EmptyState
              title="No posts found"
              description="Try a different tag search or publish the first post."
            />
          ) : (
            <>
              <div className="post-grid">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    isOwner={user?._id === post.author?._id}
                    deleting={deletingId === post._id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={() =>
                  setPage((currentPage) => Math.max(1, currentPage - 1))
                }
                onNext={() =>
                  setPage((currentPage) => Math.min(totalPages, currentPage + 1))
                }
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
