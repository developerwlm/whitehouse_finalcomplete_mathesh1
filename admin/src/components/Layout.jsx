import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiMail,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
  { to: "/blogs", label: "Blogs", icon: <FiFileText /> },
  { to: "/courses", label: "Courses", icon: <FiBookOpen /> },
  { to: "/faqs", label: "FAQs", icon: <FiHelpCircle /> },
  { to: "/enquiries", label: "Enquiries", icon: <FiMail /> },
  { to: "/profile", label: "Profile", icon: <FiUser /> },
];

// Page title derived from the current route.
function usePageTitle() {
  const { pathname } = useLocation();
  const match = NAV_ITEMS.find((item) => pathname.startsWith(item.to));
  if (match) return match.label;
  return "Admin";
}

export default function Layout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const pageTitle = usePageTitle();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={`admin-shell ${sidebarOpen ? "sidebar-open" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">W</span>
          <span className="brand-text">Whitehouse CMS</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-footer-text">Signed in as</span>
          <span className="sidebar-admin">{admin ? admin.name : "—"}</span>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="btn btn-ghost btn-icon menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="topbar-title">{pageTitle}</h1>
          <div className="topbar-right">
            <Link to="/profile" className="topbar-admin">
              {admin && admin.avatar ? (
                <img className="avatar avatar-img" src={admin.avatar} alt="" />
              ) : (
                <span className="avatar">
                  {(admin && admin.name ? admin.name[0] : "A").toUpperCase()}
                </span>
              )}
              <span className="topbar-admin-name">{admin ? admin.name : "Admin"}</span>
            </Link>
            <button type="button" className="btn btn-secondary" onClick={handleLogout}>
              <FiLogOut /> <span className="btn-label">Logout</span>
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
