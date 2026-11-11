
import { useEffect, useState } from "react";
import { submitEnquiry } from "../services/api";

const COURSE_OPTIONS = [
  "VFX & Animation",
  "Digital Marketing",
  "Drone Technology",
  "Graphic Design",
  "Coding",
  "AI Video Editing",
  "Video Editing",
];

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "course",
  "city",
  "gender",
  "message",
];

export default function HomeEnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // Open popup after 30 seconds
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 30000);

    return () => window.clearTimeout(timer);
  }, []);

  // Handle Escape key and background scroll
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !sending) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("popup-lock");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("popup-lock");
    };
  }, [open, sending]);

  const close = () => {
    if (!sending) {
      setOpen(false);
    }
  };

  // Clear field validation error
  const clearError = (input) => {
    const error = input.parentElement.querySelector(".form__error");

    if (error) {
      error.textContent = "";
      error.classList.remove("is-visible");
    }

    input.classList.remove("is-invalid");
  };

  // Allow only 10 phone digits
  const handlePhoneChange = (event) => {
    event.target.value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    clearError(event.target);
  };

  // Validate form fields
  const validateForm = (form, formData) => {
    let valid = true;

    REQUIRED_FIELDS.forEach((field) => {
      const input = form.elements.namedItem(field);
      const error = form.querySelector(
        `[data-error-for="${field}"]`
      );

      const value = String(formData.get(field) || "").trim();

      if (error) {
        error.textContent = "";
        error.classList.remove("is-visible");
      }

      input?.classList.remove("is-invalid");

      let errorMessage = "";

      if (!value) {
        errorMessage = "This field is required.";
      } else if (
        field === "phone" &&
        !/^[0-9]{10}$/.test(value)
      ) {
        errorMessage = "Phone number must contain exactly 10 digits.";
      } else if (
        field === "email" &&
        !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        errorMessage = "Please enter a valid email address.";
      } else if (field === "message" && value.length < 10) {
        errorMessage = "Please enter at least 10 characters.";
      } else if (field === "message" && value.length > 1000) {
        errorMessage = "Message cannot exceed 1000 characters.";
      }

      if (errorMessage) {
        valid = false;

        if (error) {
          error.textContent = errorMessage;
          error.classList.add("is-visible");
        }

        input?.classList.add("is-invalid");
      }
    });

    return valid;
  };

  // Submit enquiry
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (sending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("");

    if (!validateForm(form, formData)) {
      setStatus("Please check the highlighted fields.");
      return;
    }

    setSending(true);
    setStatus("Sending your enquiry...");

    const enquiryData = {
      name: String(formData.get("name")).trim(),
      phone: String(formData.get("phone")).trim(),
      email: String(formData.get("email")).trim(),
      city: String(formData.get("city")).trim(),
      gender: String(formData.get("gender")).trim(),
      course: String(formData.get("course")).trim(),
      message: String(formData.get("message")).trim(),
      source: "home-enquiry-popup",
    };

    try {
      const result = await submitEnquiry(enquiryData);

      form.reset();

      REQUIRED_FIELDS.forEach((field) => {
        const input = form.elements.namedItem(field);
        const error = form.querySelector(
          `[data-error-for="${field}"]`
        );

        input?.classList.remove("is-invalid");

        if (error) {
          error.textContent = "";
          error.classList.remove("is-visible");
        }
      });

      setStatus(
        result?.message ||
          "Thank you! Your enquiry has been received successfully."
      );
    } catch (error) {
      setStatus(
        error.message ||
          "Unable to send your enquiry. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="enquiry-popup__backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <section
        className="enquiry-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
      >
        {/* Close button */}
        <button
          className="enquiry-popup__close"
          type="button"
          onClick={close}
          disabled={sending}
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Header */}
        <div className="enquiry-popup__header">
          <span className="enquiry-popup__eyebrow">
            LET'S START LEARNING
          </span>

          <h2 id="enquiry-popup-title">
            Need help choosing the right course?
          </h2>

          <p>
            Share your details and our admissions team will get back
            to you with course fees and upcoming batch timings.
          </p>
        </div>

        {/* Enquiry form */}
        <form
          className="form enquiry-popup__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Full name */}
          <div className="form__group">
            <label htmlFor="popup-name">
              Full name <span className="req">*</span>
            </label>

            <input
              autoComplete="name"
              className="form__control"
              id="popup-name"
              name="name"
              placeholder="e.g. Ananya Raghavan"
              required
              type="text"
              maxLength={60}
              onChange={(e) => clearError(e.target)}
            />

            <span className="form__error" data-error-for="name" />
          </div>

          {/* Phone number */}
          <div className="form__group">
            <label htmlFor="popup-phone">
              Phone number <span className="req">*</span>
            </label>

            <input
              autoComplete="tel"
              className="form__control"
              id="popup-phone"
              inputMode="numeric"
              maxLength={10}
              name="phone"
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              required
              type="tel"
            />

            <span className="form__error" data-error-for="phone" />
          </div>

          {/* Email */}
          <div className="form__group">
            <label htmlFor="popup-email">
              Email address <span className="req">*</span>
            </label>

            <input
              autoComplete="email"
              className="form__control"
              id="popup-email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              onChange={(e) => clearError(e.target)}
            />

            <span className="form__error" data-error-for="email" />
          </div>

          {/* Course */}
          <div className="form__group">
            <label htmlFor="popup-course">
              Course of interest <span className="req">*</span>
            </label>

            <select
              className="form__control"
              id="popup-course"
              name="course"
              required
              defaultValue=""
              onChange={(e) => clearError(e.target)}
            >
              <option value="" disabled>
                Select a course
              </option>

              {COURSE_OPTIONS.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <span className="form__error" data-error-for="course" />
          </div>

          {/* City */}
          <div className="form__group">
            <label htmlFor="popup-city">
              City <span className="req">*</span>
            </label>

            <input
              autoComplete="address-level2"
              className="form__control"
              id="popup-city"
              name="city"
              placeholder="e.g. Madurai"
              required
              type="text"
              maxLength={40}
              onChange={(e) => clearError(e.target)}
            />

            <span className="form__error" data-error-for="city" />
          </div>

          {/* Gender */}
          <div className="form__group">
            <label htmlFor="popup-gender">
              Gender <span className="req">*</span>
            </label>

            <select
              className="form__control"
              id="popup-gender"
              name="gender"
              required
              defaultValue=""
              onChange={(e) => clearError(e.target)}
            >
              <option value="" disabled>
                Select a gender
              </option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer not to say</option>
            </select>

            <span className="form__error" data-error-for="gender" />
          </div>

          {/* Message */}
          <div className="form__group">
            <label htmlFor="popup-message">
              Your Message <span className="req">*</span>
            </label>

            <textarea
              className="form__control"
              id="popup-message"
              name="message"
              placeholder="Tell us which course you are interested in or ask your questions..."
              rows={4}
              minLength={10}
              maxLength={1000}
              required
              onChange={(e) => clearError(e.target)}
            />

            <span className="form__error" data-error-for="message" />
          </div>

          {/* Submit button */}
          <button
            className="enquiry-popup__submit"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Enquiry"}
          </button>

          {/* Status */}
          <div
            aria-live="polite"
            className="enquiry-popup__status"
            role="status"
          >
            {status}
          </div>
        </form>

        {/* Footer */}
        <div className="enquiry-popup__footer">
          <a
            className="enquiry-popup__whatsapp"
            href="https://wa.me/918098091797"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>

          <button
            className="enquiry-popup__later"
            type="button"
            onClick={close}
            disabled={sending}
          >
            Maybe later
          </button>
        </div>
      </section>
    </div>
  );
}
