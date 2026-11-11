import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import ArrayField from "../components/ArrayField";
import ImageUploadField from "../components/ImageUploadField";
import SyllabusField from "../components/SyllabusField";

const EMPTY_COURSE = {
  title: "",
  slug: "",
  category: "",
  categoryLabel: "",
  level: "",
  duration: "",
  mode: "",
  batch: "",
  language: "",
  certificate: "",
  seats: "",
  fee: "",
  oldFee: "",
  image: "",
  alt: "",
  summary: "",
  intro: [],
  eligibility: [],
  outcomes: [],
  skills: [],
  careers: [],
  syllabus: [],
  order: "0",
  published: true,
};

const ARRAY_FIELDS = [
  { key: "intro", label: "Intro", hint: "One paragraph per line." },
  { key: "eligibility", label: "Eligibility", hint: "One point per line." },
  { key: "outcomes", label: "Outcomes", hint: "One point per line." },
  { key: "skills", label: "Skills", hint: "One skill per line." },
  { key: "careers", label: "Careers", hint: "One career per line." },
];

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_COURSE);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return undefined;
    let active = true;

    client
      .get(`/api/admin/courses/${id}`)
      .then(({ data }) => {
        if (!active) return;
        const next = { ...EMPTY_COURSE };
        Object.keys(EMPTY_COURSE).forEach((key) => {
          const value = data[key];
          if (Array.isArray(EMPTY_COURSE[key])) {
            next[key] = Array.isArray(value) ? value : [];
          } else if (key === "order") {
            next[key] = value === undefined || value === null ? "0" : String(value);
          } else if (key === "published") {
            next[key] = value !== false;
          } else {
            next[key] = value === undefined || value === null ? "" : value;
          }
        });
        next.syllabus = Array.isArray(data.syllabus)
          ? data.syllabus.map((module) => ({
              module: module.module || "",
              topics: Array.isArray(module.topics) ? module.topics : [],
            }))
          : [];
        setForm(next);
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

    const payload = { ...form, order: Number(form.order) || 0 };

    setSaving(true);
    try {
      if (isEdit) {
        await client.put(`/api/admin/courses/${id}`, payload);
      } else {
        await client.post("/api/admin/courses", payload);
      }
      navigate("/courses", {
        state: { flash: isEdit ? "Course updated successfully." : "Course created successfully." },
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
        <Link to="/courses" className="btn btn-ghost">
          <FiArrowLeft /> Back to courses
        </Link>
        <h2 className="page-title">{isEdit ? "Edit course" : "New course"}</h2>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <h3 className="section-title">Basics</h3>
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
                placeholder="Course title"
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
              <label className="field-label">Order</label>
              <input
                className="input"
                type="number"
                value={form.order}
                onChange={(event) => setField("order", event.target.value)}
              />
              <p className="field-hint">Lower numbers appear first.</p>
            </div>

            <div className="field">
              <label className="field-label">Category</label>
              <input
                className="input"
                type="text"
                value={form.category}
                onChange={(event) => setField("category", event.target.value)}
                placeholder="creative-media"
              />
            </div>

            <div className="field">
              <label className="field-label">Category label</label>
              <input
                className="input"
                type="text"
                value={form.categoryLabel}
                onChange={(event) => setField("categoryLabel", event.target.value)}
                placeholder="Creative Media"
              />
            </div>
          </div>

          <h3 className="section-title">Course details</h3>
          <div className="form-grid">
            <div className="field">
              <label className="field-label">Level</label>
              <input
                className="input"
                type="text"
                value={form.level}
                onChange={(event) => setField("level", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Duration</label>
              <input
                className="input"
                type="text"
                value={form.duration}
                onChange={(event) => setField("duration", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Mode</label>
              <input
                className="input"
                type="text"
                value={form.mode}
                onChange={(event) => setField("mode", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Batch</label>
              <input
                className="input"
                type="text"
                value={form.batch}
                onChange={(event) => setField("batch", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Language</label>
              <input
                className="input"
                type="text"
                value={form.language}
                onChange={(event) => setField("language", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Certificate</label>
              <input
                className="input"
                type="text"
                value={form.certificate}
                onChange={(event) => setField("certificate", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Seats</label>
              <input
                className="input"
                type="text"
                value={form.seats}
                onChange={(event) => setField("seats", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Fee</label>
              <input
                className="input"
                type="text"
                value={form.fee}
                onChange={(event) => setField("fee", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Old fee</label>
              <input
                className="input"
                type="text"
                value={form.oldFee}
                onChange={(event) => setField("oldFee", event.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Image alt text</label>
              <input
                className="input"
                type="text"
                value={form.alt}
                onChange={(event) => setField("alt", event.target.value)}
              />
            </div>
            <div className="field span-2">
              <label className="field-label">Summary</label>
              <textarea
                className="input textarea"
                rows={3}
                value={form.summary}
                onChange={(event) => setField("summary", event.target.value)}
              />
            </div>
            <div className="field span-2">
              <ImageUploadField
                label="Course image"
                value={form.image}
                onChange={(value) => setField("image", value)}
              />
            </div>
          </div>

          <h3 className="section-title">Content lists</h3>
          <div className="form-grid">
            {ARRAY_FIELDS.map((field) => (
              <ArrayField
                key={field.key}
                label={field.label}
                value={form[field.key]}
                onChange={(value) => setField(field.key, value)}
                hint={field.hint}
              />
            ))}
          </div>

          <h3 className="section-title">Syllabus</h3>
          <SyllabusField value={form.syllabus} onChange={(value) => setField("syllabus", value)} />

          <div className="field span-2 mt-16">
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

        <div className="card-foot">
          <Link to="/courses" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <FiSave /> {saving ? "Saving…" : "Save course"}
          </button>
        </div>
      </form>
    </div>
  );
}
