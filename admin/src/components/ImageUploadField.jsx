import { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import client, { API_URL, getErrorMessage } from "../api/client";

// Turns a stored image value into a previewable URL.
// Absolute URLs, data URIs and "../" paths are used as-is; relative paths are
// prefixed with the API base so /uploads/* files resolve correctly.
export function resolveImageUrl(value) {
  if (!value) return "";
  const v = String(value);
  if (/^https?:\/\//i.test(v) || /^data:/i.test(v) || v.startsWith("../")) {
    return v;
  }
  return `${API_URL}${v.startsWith("/") ? "" : "/"}${v}`;
}

/**
 * Image field with manual path input + upload button and thumbnail preview.
 */
export default function ImageUploadField({ value, onChange, label = "Image" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewFailed, setPreviewFailed] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await client.post("/api/admin/upload", formData);
      onChange(data.url);
      setPreviewFailed(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const preview = resolveImageUrl(value);

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className="image-field">
        <div className="image-field-row">
          <input
            type="text"
            className="input"
            value={value || ""}
            placeholder="https://res.cloudinary.com/... or ../assets/images/..."
            onChange={(event) => {
              onChange(event.target.value);
              setPreviewFailed(false);
            }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => inputRef.current && inputRef.current.click()}
            disabled={uploading}
          >
            <FiUpload /> {uploading ? "Uploading…" : "Upload"}
          </button>
          {value ? (
            <button
              type="button"
              className="btn btn-ghost btn-icon"
              title="Clear image"
              onClick={() => {
                onChange("");
                setPreviewFailed(false);
              }}
            >
              <FiX />
            </button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden-file"
          onChange={handleFile}
        />
        {error ? <p className="field-error">{error}</p> : null}
        {preview && !previewFailed ? (
          <div className="image-preview">
            <img src={preview} alt="preview" onError={() => setPreviewFailed(true)} />
          </div>
        ) : preview && previewFailed ? (
          <p className="field-hint">Preview unavailable for this path.</p>
        ) : null}
      </div>
    </div>
  );
}
