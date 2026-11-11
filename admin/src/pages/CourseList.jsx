import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useResourceList from "../hooks/useResourceList";
import Badge from "../components/Badge";
import Flash from "../components/Flash";

export default function CourseList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const { items, loading, error, reload } = useResourceList("courses", debouncedSearch);

  const handleDelete = async (course) => {
    const confirmed = window.confirm(`Delete the course "${course.title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await client.delete(`/api/admin/courses/${course.id}`);
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
              placeholder="Search courses…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Link to="/courses/new" className="btn btn-primary">
            <FiPlus /> New course
          </Link>
        </div>

        <div className="table-wrap">
          {loading ? (
            <div className="state-box">Loading courses…</div>
          ) : items.length === 0 ? (
            <div className="state-box">
              {debouncedSearch ? "No courses match your search." : "No courses yet."}
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((course) => (
                  <tr
                    key={course.id}
                    className="row-click"
                    onClick={() => navigate(`/courses/${course.id}/edit`)}
                  >
                    <td>
                      <span className="cell-title">{course.title}</span>
                      {course.categoryLabel ? (
                        <span className="cell-sub">{course.categoryLabel}</span>
                      ) : null}
                    </td>
                    <td className="cell-muted">/{course.slug}</td>
                    <td>{course.order ?? 0}</td>
                    <td>
                      {course.published ? (
                        <Badge variant="green">Published</Badge>
                      ) : (
                        <Badge variant="gray">Draft</Badge>
                      )}
                    </td>
                    <td className="col-actions" onClick={(event) => event.stopPropagation()}>
                      <div className="row-actions">
                        <Link
                          to={`/courses/${course.id}/edit`}
                          className="btn btn-ghost btn-icon"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon btn-danger-text"
                          title="Delete"
                          onClick={() => handleDelete(course)}
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
