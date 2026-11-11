import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/client";

export default function Login() {
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already authenticated users skip the login screen.
  if (!loading && admin) {
    const target = (location.state && location.state.from) || "/dashboard";
    return <Navigate to={target} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(username.trim(), password);
      const target = (location.state && location.state.from) || "/dashboard";
      navigate(target, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-brand">
          <span className="brand-mark lg">W</span>
          <div>
            <h1 className="login-title">Whitehouse CMS</h1>
            <p className="login-subtitle">Sign in to manage your content</p>
          </div>
        </div>

        {error ? <div className="alert alert-error">{error}</div> : null}

        <div className="field">
          <label className="field-label" htmlFor="username">
            Username
          </label>
          <div className="input-with-icon">
            <FiUser className="input-icon" />
            <input
              id="username"
              className="input"
              type="text"
              autoComplete="username"
              value={username}
              placeholder="admin"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <div className="input-with-icon">
            <FiLock className="input-icon" />
            <input
              id="password"
              className="input"
              type="password"
              autoComplete="current-password"
              value={password}
              placeholder="••••••••"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
