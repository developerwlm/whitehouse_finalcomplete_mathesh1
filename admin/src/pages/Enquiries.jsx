import { useCallback, useEffect, useState } from "react";
import { FiMail, FiRefreshCw } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import Flash from "../components/Flash";
import { formatDate } from "../utils/format";

export default function Enquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Enquiries are stored in a Google Sheet, so this view is read-only.
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await client.get("/api/admin/enquiries");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setItems([]);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <Flash />
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="card">
        <div className="toolbar">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={load}
            disabled={loading}
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        <div className="table-wrap">
          {loading ? (
            <div className="state-box">Loading enquiries…</div>
          ) : items.length === 0 ? (
            <div className="state-box">No enquiries yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>City</th>
                  <th>Message</th>
                  <th>Source</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {items.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>
                      <span className="cell-title">{enquiry.name || "—"}</span>
                      {enquiry.email ? <span className="cell-sub">{enquiry.email}</span> : null}
                    </td>
                    <td>{enquiry.phone || "—"}</td>
                    <td>{enquiry.course || "—"}</td>
                    <td>{enquiry.city || "—"}</td>
                    <td className="cell-muted">{enquiry.message || "—"}</td>
                    <td className="cell-muted">{enquiry.source || "—"}</td>
                    <td className="cell-muted">{formatDate(enquiry.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {!loading && items.length > 0 ? (
        <p className="table-footnote">
          <FiMail /> {items.length} {items.length === 1 ? "enquiry" : "enquiries"} shown. Rows are
          managed in the linked Google Sheet.
        </p>
      ) : null}
    </div>
  );
}
