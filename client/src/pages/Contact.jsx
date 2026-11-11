import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteEffects, getWhatsAppUrl } from "../hooks/useSiteEffects";
import { submitEnquiry } from "../services/api";

export default function Contact() {
  useSiteEffects();

  useEffect(() => {
    // Contact form: validate and open the visitor's email application.
    const form = document.querySelector("[data-contact-form]");
    const status = document.querySelector("[data-form-status]");
    if (!form || !status) return;

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const fields = ["name", "phone", "email", "city", "gender", "course", "message"];
      let valid = true;

      fields.forEach((field) => {
        const input = form.elements.namedItem(field);
        const error = document.querySelector(`[data-error-for="${field}"]`);
        if (error) { error.textContent = ""; error.classList.remove("is-visible"); }
        input?.classList.remove("is-invalid");
        if (!String(formData.get(field) || "").trim() || (input && !input.checkValidity())) {
          valid = false;
          if (error) {
            error.textContent = field === "email" ? "Enter a valid e-mail address." : "This field is required.";
            error.classList.add("is-visible");
          }
          input?.classList.add("is-invalid");
        }
      });

      if (!valid) {
        status.textContent = "Please check the highlighted fields and try again.";
        return;
      }

      const button = form.querySelector('[type="submit"]');
      if (button) button.disabled = true;
      status.textContent = "Sending your enquiry…";

      try {
        const result = await submitEnquiry({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          city: formData.get("city"),
          gender: formData.get("gender"),
          course: formData.get("course"),
          message: formData.get("message"),
        });
        form.reset();
        status.textContent = result.message || "Thank you! Your enquiry has been received.";
      } catch (error) {
        status.textContent = error.message || "Unable to send your enquiry right now.";
      } finally {
        if (button) button.disabled = false;
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <>

      <Navbar activePage="contact" />
      <main id="main">
        {/* ==================================================================
         PAGE HERO
         ================================================================== */}
        <section className="page-hero">
          <div className="container">
            <div className="page-hero__inner reveal reveal-up">
              <nav aria-label="Breadcrumb">
                <ol className="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li><span aria-current="page">Contact Us</span></li>
                </ol>
              </nav>
              <span className="eyebrow eyebrow--light"><span className="eyebrow__dot"></span>Admissions & enquiries</span>
              <h1>Contact Whitehouse</h1>
              <p>
                Have a question about a course, fees or batch timings? Our admissions team is happy to help.
                Send an enquiry through the form below or reach us directly on WhatsApp, phone or e-mail.
              </p>
            </div>
          </div>
        </section>
        {/* ==================================================================
         CONTACT FORM + DETAILS
         ================================================================== */}
        <section className="section">
          <div className="container">
            <div className="contact-grid">
              {/* Enquiry form */}
              <div className="panel reveal reveal-left">
                <div className="panel__head">
                  <h2>Send us an enquiry</h2>
                  <p>Share your details and a short message, and we will get back to you with course information,
                    batch schedules and fee options.</p>
                </div>
                <form action="#" className="form" data-contact-form="" method="post" noValidate>
                  <div className="form__row">
                    <div className="form__group">
                      <label htmlFor="contact-name">Full name <span className="req">*</span></label>
                      <input autoComplete="name" className="form__control" id="contact-name" name="name" placeholder="e.g. Ananya Raghavan" required="" type="text" />
                      <span className="form__error" data-error-for="name" id="contact-name-error"></span>
                    </div>
                    <div className="form__group">
                      <label htmlFor="contact-phone">Phone number <span className="req">*</span></label>
                      <input autoComplete="tel" className="form__control" id="contact-phone" inputMode="tel" name="phone" placeholder="e.g. +91 98765 43210" required="" type="tel" />
                      <span className="form__error" data-error-for="phone" id="contact-phone-error"></span>
                    </div>
                  </div>
                  <div className="form__group">
                    <label htmlFor="contact-email">E-mail address <span className="req">*</span></label>
                    <input autoComplete="email" className="form__control" id="contact-email" name="email" placeholder="you@example.com" required="" type="email" />
                    <span className="form__error" data-error-for="email" id="contact-email-error"></span>
                  </div>
                  <div className="form__row">
                    <div className="form__group">
                      <label htmlFor="contact-city">City <span className="req">*</span></label>
                      <input autoComplete="address-level2" className="form__control" id="contact-city" name="city" placeholder="e.g. Bengaluru" required="" type="text" />
                      <span className="form__error" data-error-for="city" id="contact-city-error"></span>
                    </div>
                    <div className="form__group">
                      <label htmlFor="contact-gender">Gender <span className="req">*</span></label>
                      <select className="form__control" id="contact-gender" name="gender" required="">
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                      <span className="form__error" data-error-for="gender" id="contact-gender-error"></span>
                    </div>
                  </div>
                  <div className="form__group">
                    <label htmlFor="contact-course">Course of interest <span className="req">*</span></label>
                    <select className="form__control" id="contact-course" name="course" required="">
                      <option value="">Select a course</option>
                      <option value="VFX">VFX</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Drone Technology">Drone Technology</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Coding">Coding</option>
                      <option value="AI Video Editing">AI Video Editing</option>
                      <option value="Video Editing">Video Editing</option>
                    </select>
                    <span className="form__error" data-error-for="course" id="contact-course-error"></span>
                  </div>
                  <div className="form__group">
                    <label htmlFor="contact-message">Your message <span className="req">*</span></label>
                    <textarea className="form__control" id="contact-message" name="message" placeholder="Tell us which course you are interested in, your preferred batch timing and any questions you have." required="" rows="6"></textarea>
                    <span className="form__error" data-error-for="message" id="contact-message-error"></span>
                  </div>
                  <div className="form__note">
                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9"></circle><path d="M12 16v-5"></path><path d="M12 8h.01"></path>
                    </svg>
                    <span>Your enquiry is sent straight to our admissions team so they can reply to you. We use
                      your details only to respond to your enquiry and never share them with anyone else.</span>
                  </div>
                  <button className="btn btn--primary btn--lg btn--block" type="submit">Send Enquiry</button>
                  <div aria-live="polite" className="form__status" data-form-status="" role="status"></div>
                </form>
              </div>
              {/* Direct contact details */}
              <div className="panel reveal reveal-right reveal-d1">
                <h2>Reach us directly</h2>
                <ul className="info-list">
                  <li className="info-list__item">
                    <span aria-hidden="true" className="info-list__icon">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <div className="info-list__body">
                      <h4>Institute address</h4>
                      <p>44, 3rd Floor, Tirupparankunram (TPK) Main Road,Pasumalai<br />Madurai, Tamil Nadu 625004</p>
                    </div>
                  </li>
                  <li className="info-list__item">
                    <span aria-hidden="true" className="info-list__icon">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"></path></svg>
                    </span>
                    <div className="info-list__body">
                      <h4>Contact number</h4>
                      <p><a href="tel:+9180980 91797">+91 98765 43210</a></p>
                    </div>
                  </li>
                  <li className="info-list__item">
                    <span aria-hidden="true" className="info-list__icon">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect height="16" rx="2" width="20" x="2" y="4"></rect><path d="m2 7 10 6 10-6"></path></svg>
                    </span>
                    <div className="info-list__body">
                      <h4>E-mail address</h4>
                      <p><a href="mailto:placement@whitehouse.com">placement@whitehouse.com</a></p>
                    </div>
                  </li>
                  <li className="info-list__item">
                    <span aria-hidden="true" className="info-list__icon">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"></path></svg>
                    </span>
                    <div className="info-list__body">
                      <h4>WhatsApp</h4>
                      <p><a data-wa="" data-wa-topic="course fees and batch timings" href={getWhatsAppUrl({ topic: "course fees and batch timings" })}>Chat on WhatsApp — 9180980 91797</a></p>
                    </div>
                  </li>
                </ul>
                <a className="btn btn--whatsapp btn--block mt-2" data-wa="" data-wa-topic="course details, fees and batch timings" href={getWhatsAppUrl({ topic: "course details, fees and batch timings" })}>
                  <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"></path>
                  </svg>
                  Message us on WhatsApp
                </a>
                <a className="btn btn--outline btn--block mt-1" href="tel:+9180980 91797">Call the admissions desk</a>
              </div>
            </div>
          </div>
        </section>
        {/* ==================================================================
         MAP
         ================================================================== */}
        <section className="section section--alt">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Find us</span>
              <h2>Visit our learning centre</h2>
              <p>Prefer to meet in person? Our office is on Tirupparankunram (TPK) Main Road, Pasumalai in
                Madurai, and the admissions desk can schedule a counselling slot for you.</p>
            </div>
            <div className="map-embed reveal reveal-fade">
              <iframe allowFullScreen="" height="340" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Branding%20Agency%20in%20Madurai%20-%20Whitelabel%20Media&t=&z=15&ie=UTF8&iwloc=&output=embed" title="Map showing the Whitehouse learning centre location in Madurai" width="1200"></iframe>
            </div>
            <p className="mt-2 text-center muted">Note: the address shown above is a placeholder for this demonstration site.</p>
          </div>
        </section>
        {/* ==================================================================
         WORKING HOURS + SUPPORT
         ================================================================== */}
        <section className="section">
          <div className="container">
            <div className="grid grid--2">
              <div className="panel reveal reveal-left">
                <h2>Working hours</h2>
               <ul className="hours-list">
  <li>
    <span>Monday – Saturday</span>
    <span className="is-open">Daily 3 Batches</span>
  </li>
  <li>
    <span>Morning Batch</span>
    <span>9:00 AM – 12:00 PM</span>
  </li>
  <li>
    <span>Afternoon Batch</span>
    <span>1:00 PM – 4:00 PM</span>
  </li>
  <li>
    <span>Evening Batch</span>
    <span>5:00 PM – 8:00 PM</span>
  </li>
</ul>
                <p className="mt-2">In-person classes run in evening batches, so working professionals can attend after office
                  hours. Weekend batches are available for selected={true} programmes.</p>
              </div>
              <div className="panel reveal reveal-right reveal-d1">
                <h2>Support & response time</h2>
                <ul className="check-list">
                  <li>
                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>
                    <span>WhatsApp enquiries are usually answered within 30 minutes during working hours.</span>
                  </li>
                  <li>
                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>
                    <span>Enquiries received after hours are answered on the next working day.</span>
                  </li>
                  <li>
                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>
                    <span>Career counselling sessions are available by appointment.</span>
                  </li>
                  <li>
                    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg>
                    <span>Fee instalment details are shared on request for all career-track courses.</span>
                  </li>
                </ul>
                <a className="btn btn--whatsapp mt-2" data-wa="" data-wa-topic="course counselling and batch timings" href={getWhatsAppUrl({ topic: "course counselling and batch timings" })}>
                  <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"></path>
                  </svg>
                  Ask about counselling
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* ==================================================================
         CTA
         ================================================================== */}
        <section className="section">
          <div className="container">
            <div className="cta reveal reveal-zoom">
              <div className="cta__inner">
                <div>
                  <span className="eyebrow eyebrow--light"><span className="eyebrow__dot"></span>We are here to help</span>
                  <h2>Prefer to talk it through?</h2>
                  <p>Call the admissions desk or message us on WhatsApp and we will help you choose the right course,
                    explain the batch schedule and walk you through the fee options.</p>
                </div>
                <div className="cta__actions">
                  <a className="btn btn--accent btn--lg" href="tel:+9180980 91797">Call +91 98765 43210</a>
                  <a className="btn btn--ghost-light btn--lg" data-wa="" data-wa-topic="course details, fees and batch timings" href={getWhatsAppUrl({ topic: "course details, fees and batch timings" })}>
                    <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"></path>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* ====================================================================
       FOOTER
       ==================================================================== */}
      <Footer />
    </>
  );
}


