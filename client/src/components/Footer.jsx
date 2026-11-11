import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a className="logo" href="/" aria-label="Whitehouse — home">
              <img src="../assets/images/brands/WhiteLabel-Logo-Final.webp" alt="Whitehouse" />
            </a>
            <p>A career-focused training institute helping learners build practical, job-ready skills through
              in-person classes, real projects and dedicated mentor support.</p>
            <div className="socials">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Whitehouse on Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.3h2.5l.4-2.9h-2.9V9c0-.8.2-1.4 1.4-1.4h1.6V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.9H7.8v2.9h2.5V21h3.2Z"/></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Whitehouse on Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Whitehouse on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.9 8.5H4V20h2.9V8.5ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 20h-2.9v-6c0-1.5-.5-2.5-1.9-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H10.3s.1-9.9 0-11.5h2.9v1.7c.4-.7 1.2-1.7 3-1.7 2.2 0 3.8 1.4 3.8 4.5V20Z"/></svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="Whitehouse on YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.9a2.5 2.5 0 0 0-1.7-1.8C18.3 5.8 12 5.8 12 5.8s-6.3 0-7.9.3A2.5 2.5 0 0 0 2.4 7.9C2 9.5 2 12 2 12s0 2.5.4 4.1a2.5 2.5 0 0 0 1.7 1.8c1.6.3 7.9.3 7.9.3s6.3 0 7.9-.3a2.5 2.5 0 0 0 1.7-1.8c.4-1.6.4-4.1.4-4.1s0-2.5-.4-4.1ZM10 15.2V8.8l5.3 3.2-5.3 3.2Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3>Quick links</h3>
            <ul className="footer__links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3>Popular courses</h3>
            <ul className="footer__links">
              <li><a href="/course-details?course=vfx-animations">VFX & Animations</a></li>
              <li><a href="/course-details?course=graphic-design">Graphic Design Professional</a></li>
              <li><a href="/course-details?course=coding-programming">Coding & Programming</a></li>
              <li><a href="/course-details?course=video-editing">Video Editing</a></li>
              <li><a href="/course-details?course=ai-video-editing">AI Video Editing</a></li>
              <li><a href="/course-details?course=digital-marketing">Digital Marketing Mastery</a></li>
              <li><a href="/course-details?course=drone-technology">Drone Technology</a></li>
            </ul>
          </div>

          <div>
            <h3>Get in touch</h3>
            <ul className="footer__contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>44, 3rd Floor, Tirupparankunram (TPK) Main Road,Pasumalai<br />Madurai, Tamil Nadu 625004</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>
                <span><a href="tel:+9180980 91797">+91 80980 91797</a></span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                <span><a href="mailto:placement@whitehouse.com">placement@whitehouse.com</a></span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                <span>Mon – Sat: 9:00 AM – 8:00 PM<br />Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; <span data-year>2026</span> Whitehouse. All rights reserved.</p>
          <div className="footer__legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <a href="/refund-policy">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
