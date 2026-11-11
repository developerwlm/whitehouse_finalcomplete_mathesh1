import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiFileText, FiHelpCircle, FiMail, FiPlus } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";

const STATS = [
  { key: "blogs", label: "Blog Posts", icon: <FiFileText />, to: "/blogs", accent: "blue" },
  { key: "courses", label: "Courses", icon: <FiBookOpen />, to: "/courses", accent: "green" },
  { key: "faqs", label: "FAQs", icon: <FiHelpCircle />, to: "/faqs", accent: "amber" },
  { key: "enquiries", label: "Enquiries", icon: <FiMail />, to: "/enquiries", accent: "purple" },
];

const QUICK_LINKS = [
  { label: "New blog post", to: "/blogs/new" },
  { label: "New course", to: "/courses/new" },
  { label: "New FAQ", to: "/faqs/new" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await Promise.all(
          STATS.map((stat) => client.get(`/api/admin/${stat.key}`))
        );
        if (!active) return;
        const next = {};
        results.forEach((res, index) => {
          next[STATS[index].key] = Array.isArray(res.data) ? res.data.length : 0;
        });
        setCounts(next);
      } catch (err) {
        if (active) setError(getErrorMessage(err));
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="stat-grid">
        {STATS.map((stat) => (
          <Link to={stat.to} className="stat-card" key={stat.key}>
            <span className={`stat-icon accent-${stat.accent}`}>{stat.icon}</span>
            <span className="stat-value">
              {loading ? "—" : counts[stat.key] ?? 0}
            </span>
            <span className="stat-label">{stat.label}</span>
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h2 className="card-title">Quick actions</h2>
        </div>
        <div className="card-body">
          <div className="quick-links">
            {QUICK_LINKS.map((link) => (
              <Link to={link.to} className="btn btn-secondary" key={link.to}>
                <FiPlus /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
