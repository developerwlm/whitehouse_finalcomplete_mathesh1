import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";

const EMPTY_FAQ = {
  question: "",
  answer: "",
  scope: "general",
  courseSlug: "",
  order: "0",
  published: true,
};

export default function FaqForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FAQ);
  const [courseSlugs, setCourseSlugs] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Course slug suggestions for the "applies to" field.
  useEffect(() => {
    let active = true;
    client
      .get("/api/admin/courses")
      .then(({ data }) => {
        if (!active || !Array.isArray(data)) return;
        setCourseSlugs(data.map((course) => course.slug).filter(Boolean));
      })
      .catch(() => {
        /* suggestions are optional */
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;

    client
      .get(`/api/admin/faqs/${id}`)
      .then(({ data }) => {
        if (!active) return;
        setForm({
          question: data.question || "",
          answer: data.answer || "",
          scope: data.scope === "course" ? "course" : "general",
          courseSlug: data.courseSlug || "",
          order: data.order === undefined || data.order === null ? "0" : String(data.order),
          published: data.published !== false,
        });
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

    if (!form.question.trim()) {
      setError("Question is required.");
      return;
    }
    if (!form.answer.trim()) {
      setError("Answer is required.");
      return;
    }

    const payload = {
      ...form,
      order: Number(form.order) || 0,
      courseSlug: form.scope === "course" ? form.courseSlug : "",
    };

    setSaving(true);
    try {
      if (isEdit) {
        await client.put(`/api/admin/faqs/${id}`, payload);
      } else {
        await client.post("/api/admin/faqs", payload);
      }
      navigate("/faqs", {
        state: { flash: isEdit ? "FAQ updated successfully." : "FAQ created successfully." },
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
        <Link to="/faqs" className="btn btn-ghost">
          <FiArrowLeft /> Back to FAQs
        </Link>
        <h2 className="page-title">{isEdit ? "Edit FAQ" : "New FAQ"}</h2>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-grid">
            <div className="field span-2">
              <label className="field-label">
                Question <span className="req">*</span>
              </label>
              <input
                className="input"
                type="text"
                value={form.question}
                onChange={(event) => setField("question", event.target.value)}
                placeholder="What would you like to ask?"
              />
            </div>

            <div className="field span-2">
              <label className="field-label">
                Answer <span className="req">*</span>
              </label>
              <textarea
                className="input textarea"
                rows={5}
                value={form.answer}
                onChange={(event) => setField("answer", event.target.value)}
                placeholder="Provide a clear answer"
              />
            </div>

            <div className="field">
              <label className="field-label">Scope</label>
              <select
                className="input select"
                value={form.scope}
                onChange={(event) => setField("scope", event.target.value)}
              >
                <option value="general">Home page FAQ (general)</option>
                <option value="course">Course page FAQ</option>
              </select>
            </div>

            <div className="field">
              <label className="field-label">Order</label>
              <input
                className="input"
                type="number"
                value={form.order}
                onChange={(event) => setField("order", event.target.value)}
              />
              <p className="field-hint">Lower numbers appear first.</p>
            </div>

            {form.scope === "course" ? (
              <div className="field span-2">
                <label className="field-label">Course slug</label>
                <input
                  className="input"
                  type="text"
                  list="course-slug-options"
                  value={form.courseSlug}
                  onChange={(event) => setField("courseSlug", event.target.value)}
                  placeholder="Leave blank to apply to all courses"
                />
                <datalist id="course-slug-options">
                  {courseSlugs.map((slug) => (
                    <option key={slug} value={slug} />
                  ))}
                </datalist>
                <p className="field-hint">
                  Leave blank to apply to every course. Pick a slug to target one course.
                </p>
              </div>
            ) : null}

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
          <Link to="/faqs" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <FiSave /> {saving ? "Saving…" : "Save FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
