import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useResourceList from "../hooks/useResourceList";
import Badge from "../components/Badge";
import Flash from "../components/Flash";
import { formatDate } from "../utils/format";

export default function BlogList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { items, loading, error, reload } = useResourceList("blogs", debouncedSearch);

  const handleDelete = async (post) => {
    const confirmed = window.confirm(`Delete the blog post "${post.title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await client.delete(`/api/admin/blogs/${post.id}`);
      reload();
    } catch (err) {
      window.alert(getErrorMessage(err));
    }
  };

  return (
    <div>
      <Flash />
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="card">
        <div className="toolbar">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              className="input"
              type="search"
              placeholder="Search blogs…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Link to="/blogs/new" className="btn btn-primary">
            <FiPlus /> New post
          </Link>
        </div>

        <div className="table-wrap">
          {loading ? (
            <div className="state-box">Loading blogs…</div>
          ) : items.length === 0 ? (
            <div className="state-box">
              {debouncedSearch ? "No blog posts match your search." : "No blog posts yet."}
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((post) => (
                  <tr
                    key={post.id}
                    className="row-click"
                    onClick={() => navigate(`/blogs/${post.id}/edit`)}
                  >
                    <td>
                      <span className="cell-title">{post.title}</span>
                      <span className="cell-sub">/{post.slug}</span>
                    </td>
                    <td>{post.category || "General"}</td>
                    <td>
                      {post.published ? (
                        <Badge variant="green">Published</Badge>
                      ) : (
                        <Badge variant="gray">Draft</Badge>
                      )}
                    </td>
                    <td className="cell-muted">{formatDate(post.updatedAt || post.publishedAt)}</td>
                    <td className="col-actions" onClick={(event) => event.stopPropagation()}>
                      <div className="row-actions">
                        <Link
                          to={`/blogs/${post.id}/edit`}
                          className="btn btn-ghost btn-icon"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon btn-danger-text"
                          title="Delete"
                          onClick={() => handleDelete(post)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
