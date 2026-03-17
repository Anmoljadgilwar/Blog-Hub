import React from "react";
import { Link } from "react-router-dom";
import { formatDate, truncateText } from "@/utils/auth";

const PostCard = ({ post, isOwner = false, deleting = false, onDelete }) => {
  const authorName = post.author?.username || "Unknown author";

  return (
    <article className="post-card">
      <header className="post-card__header">
        <div>
          <h2 className="post-card__title">
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </h2>
          <p className="post-card__meta">
            By <strong>{authorName}</strong> on {formatDate(post.createdAt)}
          </p>
        </div>
        {isOwner ? <span className="eyebrow">Your post</span> : null}
      </header>

      <p className="post-card__excerpt">{truncateText(post.content)}</p>

      {post.tags?.length ? (
        <div className="tag-list">
          {post.tags.map((tag) => (
            <span key={`${post._id}-${tag}`} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="owner-actions">
        <Link to={`/post/${post._id}`} className="text-link">
          Read more
        </Link>
        {isOwner ? (
          <>
            <Link to={`/post/${post._id}/edit`} className="button-secondary">
              Edit
            </Link>
            <button
              type="button"
              className="button-danger"
              onClick={() => onDelete?.(post._id)}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        ) : null}
      </div>
    </article>
  );
};

export default PostCard;
