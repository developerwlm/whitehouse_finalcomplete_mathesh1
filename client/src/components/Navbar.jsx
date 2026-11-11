
import React, { useState, useEffect } from "react";

export default function Navbar({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("whitehouse-theme") || "dark";
  });

  // Apply theme across the website
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("whitehouse-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { name: "Home", path: "/", key: "home" },
    { name: "About Us", path: "/about", key: "about" },
    { name: "Courses", path: "/courses", key: "courses" },
    { name: "Blog", path: "/blog", key: "blog" },
    { name: "Contact Us", path: "/contact", key: "contact" },
  ];

  return (
    <header className="header" data-header>
      <div className="container header__inner">

        {/* Logo */}
        <a
          className="logo"
          href="/"
          aria-label="Whitehouse Home"
          onClick={closeMenu}
        >
          <img
            src="/assets/images/brands/WhiteLabel-Logo-Final.webp"
            alt="Whitehouse"
          />
        </a>

        {/* Mobile overlay */}
        {menuOpen && (
          <div
            className="nav-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Navigation */}
        <nav
          className={`nav ${menuOpen ? "is-open" : ""}`}
          id="primary-nav"
          data-nav
          aria-label="Primary navigation"
        >
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  className={`nav__link ${
                    activePage === item.key ? "is-active" : ""
                  }`}
                  href={item.path}
                  aria-current={
                    activePage === item.key ? "page" : undefined
                  }
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__cta">

            {/* Light / Dark Theme Toggle */}
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-pressed={theme === "light"}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              title={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20.985 12.486A9 9 0 0 1 11.514 3.015a9 9 0 1 0 9.47 9.47Z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* WhatsApp */}
            <a
              className="btn btn--whatsapp btn--sm"
              href="https://wa.me/918098091797"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              WhatsApp
            </a>

            {/* Enquiry */}
            <a
              className="btn btn--primary btn--sm"
              href="/contact"
              onClick={closeMenu}
            >
              Enquire Now
            </a>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`nav-toggle ${menuOpen ? "is-active" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}
