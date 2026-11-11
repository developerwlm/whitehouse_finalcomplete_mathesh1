import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirects unauthenticated visitors to the login page.
export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="page-loading">Loading&hellip;</div>;
  }

  if (!admin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
