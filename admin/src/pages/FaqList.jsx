import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useResourceList from "../hooks/useResourceList";
import Badge from "../components/Badge";
import Flash from "../components/Flash";

export default function FaqList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { items, loading, error, reload } = useResourceList("faqs", debouncedSearch);

  const handleDelete = async (faq) => {
    const confirmed = window.confirm(`Delete the FAQ "${faq.question}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await client.delete(`/api/admin/faqs/${faq.id}`);
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
              placeholder="Search FAQs…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Link to="/faqs/new" className="btn btn-primary">
            <FiPlus /> New FAQ
          </Link>
        </div>

        <div className="table-wrap">
          {loading ? (
            <div className="state-box">Loading FAQs…</div>
          ) : items.length === 0 ? (
            <div className="state-box">
              {debouncedSearch ? "No FAQs match your search." : "No FAQs yet."}
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Scope</th>
                  <th>Applies to</th>
                  <th>Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((faq) => (
                  <tr
                    key={faq.id}
                    className="row-click"
                    onClick={() => navigate(`/faqs/${faq.id}/edit`)}
                  >
                    <td>
                      <span className="cell-title">{faq.question}</span>
                    </td>
                    <td>
                      {faq.scope === "course" ? (
                        <Badge variant="blue">Course</Badge>
                      ) : (
                        <Badge variant="purple">Home</Badge>
                      )}
                    </td>
                    <td className="cell-muted">
                      {faq.scope === "course"
                        ? faq.courseSlug
                          ? faq.courseSlug
                          : "All courses"
                        : "—"}
                    </td>
                    <td>
                      {faq.published ? (
                        <Badge variant="green">Published</Badge>
                      ) : (
                        <Badge variant="gray">Draft</Badge>
                      )}
                    </td>
                    <td className="col-actions" onClick={(event) => event.stopPropagation()}>
                      <div className="row-actions">
                        <Link
                          to={`/faqs/${faq.id}/edit`}
                          className="btn btn-ghost btn-icon"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon btn-danger-text"
                          title="Delete"
                          onClick={() => handleDelete(faq)}
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
