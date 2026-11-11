
import { useState } from "react";
import { SITE } from "../hooks/useSiteEffects";
import { submitEnquiry } from "../services/api";

const rules = {
  name: (v) =>
    !v
      ? "Please enter your full name."
      : v.length < 2
      ? "Name must be at least 2 characters."
      : !/^[a-zA-Z\u00C0-\u024F][a-zA-Z\u00C0-\u024F\s.'-]{1,59}$/.test(v)
      ? "Please use letters only — no numbers or symbols."
      : "",

  // Exactly 10 digits
  phone: (v) =>
    !v
      ? "Please enter your phone number."
      : !/^[0-9]{10}$/.test(v)
      ? "Phone number must contain exactly 10 digits."
      : "",

  email: (v) =>
    !v
      ? "Please enter your e-mail address."
      : !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v)
      ? "Enter a valid e-mail address."
      : "",

  city: (v) =>
    !v
      ? "Please enter your city."
      : v.length < 2 ||
        !/^[a-zA-Z\u00C0-\u024F][a-zA-Z\u00C0-\u024F\s.'-]{1,39}$/.test(v)
      ? "Please enter a valid city name."
      : "",

  gender: (v) =>
    !v ? "Please select your gender." : "",

  message: (v) =>
    !v
      ? "Please tell us how we can help."
      : v.length < 10
      ? "Please add at least 10 characters."
      : v.length > 1000
      ? "Please keep your message under 1000 characters."
      : "",
};

export default function EnquiryForm({ course = "", successMessage }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    gender: "",
    course,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // Update form fields
  const update = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setValues((old) => ({
        ...old,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));

      setErrors((old) => ({
        ...old,
        phone: "",
      }));

      return;
    }

    setValues((old) => ({
      ...old,
      [name]: value,
    }));
  };

  // Validate form
  const validate = () => {
    const next = {};

    Object.entries(rules).forEach(([key, rule]) => {
      const error = rule((values[key] || "").trim());

      if (error) {
        next[key] = error;
      }
    });

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  // Submit enquiry
  const onSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    setStatus("");

    if (!validate()) {
      setStatus("Please correct the highlighted fields and try again.");
      return;
    }

    setSending(true);
    setStatus("Sending your enquiry...");

    try {
      const result = await submitEnquiry({
        ...values,
        source: "enquiry-form",
      });

      setStatus(
        result.message ||
          successMessage ||
          "Thank you! Your enquiry has been sent to our admissions team."
      );

      setValues({
        name: "",
        phone: "",
        email: "",
        city: "",
        gender: "",
        course,
        message: "",
      });

      setErrors({});
    } catch (error) {
      const message = [
        "New website enquiry",
        "",
        `Name: ${values.name}`,
        `Phone: ${values.phone}`,
        `Email: ${values.email}`,
        values.city && `City: ${values.city}`,
        values.gender && `Gender: ${values.gender}`,
        values.course && `Course of interest: ${values.course}`,
        "",
        "Message:",
        values.message,
      ]
        .filter(Boolean)
        .join("\n");

      const wa = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      setStatus(
        error.message ||
          "Automatic delivery failed. Please use WhatsApp or email."
      );

      window.open(wa, "_blank", "noopener,noreferrer");
    } finally {
      setSending(false);
    }
  };

  // Reusable input field
  const field = (name, label, type = "text", required = true) => (
    <div className="form__group" key={name}>
      <label htmlFor={`enquiry-${name}`}>
        {label}
      </label>

      <input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        value={values[name]}
        onChange={update}
        onBlur={() =>
          setErrors((old) => ({
            ...old,
            [name]: rules[name]?.(values[name].trim()) || "",
          }))
        }
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `enquiry-${name}-error` : undefined}
        required={required}
        maxLength={name === "phone" ? 10 : undefined}
        inputMode={name === "phone" ? "numeric" : undefined}
        autoComplete={
          name === "phone"
            ? "tel"
            : name === "email"
            ? "email"
            : name === "name"
            ? "name"
            : "off"
        }
        placeholder={
          name === "phone"
            ? "Enter 10-digit phone number"
            : ""
        }
      />

      {errors[name] && (
        <span
          id={`enquiry-${name}-error`}
          className="form__error is-visible"
        >
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {field("name", "Full name")}

      {field("phone", "Phone number", "tel")}

      {field("email", "Email address", "email")}

      {field("city", "City")}

      <div className="form__group">
        <label htmlFor="enquiry-gender">
          Gender
        </label>

        <select
          id="enquiry-gender"
          name="gender"
          value={values.gender}
          onChange={update}
          onBlur={() =>
            setErrors((old) => ({
              ...old,
              gender: rules.gender(values.gender),
            }))
          }
          aria-invalid={Boolean(errors.gender)}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {errors.gender && (
          <span className="form__error is-visible">
            {errors.gender}
          </span>
        )}
      </div>

      <div className="form__group">
        <label htmlFor="enquiry-course">
          Course of interest
        </label>

        <input
          id="enquiry-course"
          name="course"
          value={values.course}
          onChange={update}
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="enquiry-message">
          Message
        </label>

        <textarea
          id="enquiry-message"
          name="message"
          value={values.message}
          onChange={update}
          onBlur={() =>
            setErrors((old) => ({
              ...old,
              message: rules.message(values.message.trim()),
            }))
          }
          aria-invalid={Boolean(errors.message)}
          rows="4"
          maxLength={1000}
          required
        />

        {errors.message && (
          <span className="form__error is-visible">
            {errors.message}
          </span>
        )}
      </div>

      {status && (
        <div
          className="form__status is-visible"
          role="status"
          aria-live="polite"
        >
          {status}
        </div>
      )}

      <button
        className="btn btn--primary"
        type="submit"
        disabled={sending}
      >
        {sending ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
