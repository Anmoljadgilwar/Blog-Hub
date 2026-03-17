import React from "react";
import Alert from "@/components/Alert";
import FormField from "@/components/FormField";

const PostEditorForm = ({
  title,
  subtitle,
  error,
  formData,
  loading,
  submitLabel,
  loadingLabel,
  onChange,
  onSubmit,
}) => {
  return (
    <section className="page-section">
      <div className="container">
        <div className="panel editor-shell">
          <div className="page-header">
            <div>
              <span className="eyebrow">Write and refine</span>
              <h1 className="page-title">{title}</h1>
              <p className="page-subtitle">{subtitle}</p>
            </div>
          </div>

          <div className="editor-grid">
            <div className="editor-card">
              <Alert message={error} />

              <form onSubmit={onSubmit} className="form-stack">
                <FormField
                  label="Title"
                  type="text"
                  name="title"
                  placeholder="Post title"
                  value={formData.title}
                  onChange={onChange}
                  required
                  maxLength="100"
                />
                <FormField
                  as="textarea"
                  label="Content"
                  name="content"
                  placeholder="Write your post content here..."
                  value={formData.content}
                  onChange={onChange}
                  required
                />
                <FormField
                  label="Tags"
                  type="text"
                  name="tags"
                  placeholder="react, node, mongodb"
                  value={formData.tags}
                  onChange={onChange}
                  helpText="Separate tags with commas so readers can discover related posts."
                />
                <div className="form-actions">
                  <button type="submit" disabled={loading} className="button">
                    {loading ? loadingLabel : submitLabel}
                  </button>
                </div>
              </form>
            </div>

            <aside className="editor-side">
              <span className="eyebrow">Editor notes</span>
              <h3>Make it memorable</h3>
              <div className="editor-tip-list">
                <div className="editor-tip">
                  Lead with a sharp title that tells readers exactly what they
                  will get.
                </div>
                <div className="editor-tip">
                  Break your content into readable paragraphs so the post feels
                  clean on both mobile and desktop.
                </div>
                <div className="editor-tip">
                  Use focused tags so your article shows up in the right
                  searches.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostEditorForm;
