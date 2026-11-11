import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import ArrayField from "../components/ArrayField";
import ImageUploadField from "../components/ImageUploadField";
import { formatDate } from "../utils/format";

const EMPTY_BLOG = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "General",
  tags: [],
  image: "",
  imageAlt: "",
  author: "Whitehouse Team",
  readTime: "",
  published: true,
};

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_BLOG);
  const [publishedAt, setPublishedAt] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;

    client
      .get(`/api/admin/blogs/${id}`)
      .then(({ data }) => {
        if (!active) return;
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          category: data.category || "General",
          tags: Array.isArray(data.tags) ? data.tags : [],
          image: data.image || "",
          imageAlt: data.imageAlt || "",
          author: data.author || "",
          readTime: data.readTime || "",
          published: data.published !== false,
        });
        setPublishedAt(data.publishedAt || null);
      })
      .catch((err) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, isEdit]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await client.put(`/api/admin/blogs/${id}`, form);
      } else {
        await client.post("/api/admin/blogs", form);
      }
      navigate("/blogs", {
        state: { flash: isEdit ? "Blog post updated successfully." : "Blog post created successfully." },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="state-box">Loading…</div>;

  return (
    <div>
      <div className="page-head">
        <Link to="/blogs" className="btn btn-ghost">
          <FiArrowLeft /> Back to blogs
        </Link>
        <h2 className="page-title">{isEdit ? "Edit blog post" : "New blog post"}</h2>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-grid">
            <div className="field span-2">
              <label className="field-label">
                Title <span className="req">*</span>
              </label>
              <input
                className="input"
                type="text"
                value={form.title}
                onChange={(event) => setField("title", event.target.value)}
                placeholder="Post title"
              />
            </div>

            <div className="field">
              <label className="field-label">Slug</label>
              <input
                className="input"
                type="text"
                value={form.slug}
                onChange={(event) => setField("slug", event.target.value)}
                placeholder="auto-generated from title"
              />
              <p className="field-hint">Leave blank to generate automatically.</p>
            </div>

            <div className="field">
              <label className="field-label">Category</label>
              <input
                className="input"
                type="text"
                value={form.category}
                onChange={(event) => setField("category", event.target.value)}
                placeholder="General"
              />
            </div>

            <div className="field span-2">
              <label className="field-label">Excerpt</label>
              <textarea
                className="input textarea"
                rows={2}
                value={form.excerpt}
                onChange={(event) => setField("excerpt", event.target.value)}
                placeholder="Short summary shown in listings"
              />
            </div>

            <div className="field span-2">
              <label className="field-label">Content (HTML)</label>
              <textarea
                className="input textarea code"
                rows={10}
                value={form.content}
                onChange={(event) => setField("content", event.target.value)}
                placeholder="<p>Write your post content here…</p>"
              />
            </div>

            <ArrayField
              label="Tags"
              value={form.tags}
              onChange={(value) => setField("tags", value)}
              hint="One tag per line."
              rows={4}
            />

            <div className="field">
              <label className="field-label">Author</label>
              <input
                className="input"
                type="text"
                value={form.author}
                onChange={(event) => setField("author", event.target.value)}
                placeholder="Whitehouse Team"
              />
            </div>

            <div className="field">
              <label className="field-label">Read time</label>
              <input
                className="input"
                type="text"
                value={form.readTime}
                onChange={(event) => setField("readTime", event.target.value)}
                placeholder="5 min read"
              />
            </div>

            <div className="field">
              <label className="field-label">Image alt text</label>
              <input
                className="input"
                type="text"
                value={form.imageAlt}
                onChange={(event) => setField("imageAlt", event.target.value)}
                placeholder="Describe the image"
              />
            </div>

            {isEdit ? (
              <div className="field">
                <label className="field-label">Published at</label>
                <div className="readonly-value">{formatDate(publishedAt)}</div>
              </div>
            ) : null}

            <div className="field span-2">
              <ImageUploadField
                label="Featured image"
                value={form.image}
                onChange={(value) => setField("image", value)}
              />
            </div>

            <div className="field span-2">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => setField("published", event.target.checked)}
                />
                <span>Published</span>
              </label>
            </div>
          </div>
        </div>

        <div className="card-foot">
          <Link to="/blogs" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <FiSave /> {saving ? "Saving…" : "Save post"}
          </button>
        </div>
      </form>
    </div>
  );
}
