import { useEffect, useState } from "react";
import { FiLock, FiSave } from "react-icons/fi";
import client, { getErrorMessage } from "../api/client";
import ImageUploadField from "../components/ImageUploadField";
import { useAuth } from "../context/AuthContext";

const EMPTY_PASSWORDS = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Profile() {
  const { admin, updateAdmin } = useAuth();

  const [form, setForm] = useState({ name: "", phone: "", avatar: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [changing, setChanging] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  useEffect(() => {
    if (!admin) return;
    setForm({
      name: admin.name || "",
      phone: admin.phone || "",
      avatar: admin.avatar || "",
    });
  }, [admin]);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);
    try {
      const { data } = await client.patch("/api/admin/profile", form);
      updateAdmin(data.admin);
      setNotice("Profile updated successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordNotice("");

    if (!passwords.currentPassword || !passwords.newPassword) {
      setPasswordError("Enter your current password and the new password.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }

    setChanging(true);
    try {
      const { data } = await client.post("/api/admin/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswords(EMPTY_PASSWORDS);
      setPasswordNotice(data.message || "Password updated successfully.");
    } catch (err) {
      setPasswordError(getErrorMessage(err));
    } finally {
      setChanging(false);
    }
  };

  return (
    <div>
      <form className="card" onSubmit={handleProfileSubmit}>
        <div className="card-head">
          <h2 className="card-title">Profile</h2>
        </div>
        <div className="card-body">
          {error ? <div className="alert alert-error">{error}</div> : null}
          {notice ? <div className="alert alert-success">{notice}</div> : null}

          <div className="form-grid">
            <ImageUploadField
              label="Profile photo"
              value={form.avatar}
              onChange={(value) => setField("avatar", value)}
            />

            <div className="field">
              <label className="field-label">
                Name <span className="req">*</span>
              </label>
              <input
                className="input"
                type="text"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="field">
              <label className="field-label">Phone number</label>
              <input
                className="input"
                type="tel"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder="10-digit mobile number"
              />
            </div>

            <div className="field">
              <label className="field-label">Username</label>
              <input
                className="input"
                type="text"
                value={admin ? admin.username : ""}
                disabled
              />
              <p className="field-hint">The sign-in username cannot be changed.</p>
            </div>
          </div>
        </div>

        <div className="card-foot">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <FiSave /> {saving ? "Saving…" : "Save profile"}
          </button>
        </div>
      </form>

      <form className="card" onSubmit={handlePasswordSubmit}>
        <div className="card-head">
          <h2 className="card-title">Change password</h2>
        </div>
        <div className="card-body">
          {passwordError ? <div className="alert alert-error">{passwordError}</div> : null}
          {passwordNotice ? (
            <div className="alert alert-success">{passwordNotice}</div>
          ) : null}

          <div className="form-grid">
            <div className="field">
              <label className="field-label">
                Current password <span className="req">*</span>
              </label>
              <input
                className="input"
                type="password"
                autoComplete="current-password"
                value={passwords.currentPassword}
                onChange={(event) =>
                  setPasswords((prev) => ({ ...prev, currentPassword: event.target.value }))
                }
              />
            </div>

            <div className="field">
              <label className="field-label">
                New password <span className="req">*</span>
              </label>
              <input
                className="input"
                type="password"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={(event) =>
                  setPasswords((prev) => ({ ...prev, newPassword: event.target.value }))
                }
              />
              <p className="field-hint">At least 6 characters.</p>
            </div>

            <div className="field">
              <label className="field-label">
                Confirm new password <span className="req">*</span>
              </label>
              <input
                className="input"
                type="password"
                autoComplete="new-password"
                value={passwords.confirmPassword}
                onChange={(event) =>
                  setPasswords((prev) => ({ ...prev, confirmPassword: event.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="card-foot">
          <button type="submit" className="btn btn-primary" disabled={changing}>
            <FiLock /> {changing ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
}
