
import React, { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteEffects, getWhatsAppUrl } from "../hooks/useSiteEffects";
import {
  submitEnquiry,
  getCourseBySlug as fetchCourseBySlug,
  getFaqs,
  resolveAssetUrl,
} from "../services/api";

// Change this path if your courses.js is in another folder.
import { COURSES, getCourseBySlug } from "../data/courses";

// Keep the public URLs while connecting them to catalogue slugs.
const COURSE_ALIASES = {
  "vfx-animations": "vfx-animation",
  "video-editing": "video-editing",
  "graphic-design": "graphic-design",
  "digital-marketing": "digital-marketing",
  "coding-programming": "coding-programming",
  "drone-technology": "drone-technology",
};

// Used when the catalogue stores the same course under a different slug.
const TITLE_FALLBACKS = {
  "video-editing": ["video editing"],
  "graphic-design": ["graphic design"],
  "digital-marketing": ["digital marketing", "digital marketing mastery"],
  "coding-programming": ["coding", "coding & programming", "programming"],
  "drone-technology": ["drones", "drone technology"],
};

const normalizeTitle = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Shown while the CMS has no course-specific questions yet.
const buildDefaultCourseFaqs = (title) => [
  {
    question: `Who can join this ${title} course?`,
    answer: `This course is suitable for beginners and learners who want to build practical skills in ${title}. Check the eligibility details above or contact our team for guidance.`,
  },
  {
    question: "Do I need previous experience?",
    answer:
      "No prior experience is required for beginner-level learning. The course starts with the fundamentals and progresses through practical exercises and projects.",
  },
  {
    question: "Are practical projects included?",
    answer:
      "Yes. You will work on practical assignments and projects related to the course topics, with trainer guidance.",
  },
  {
    question: "Will I receive a certificate after completion?",
    answer:
      "Certificate details are shared by the admissions team. Please contact Whitehouse for the latest course and completion requirements.",
  },
  {
    question: "How can I enrol in this course?",
    answer:
      "Use the Enrol Now button or send an enquiry through the form below. Our admissions team will guide you through the next steps.",
  },
];

export default function CourseDetails() {
  // Read the selected course from ?course= or ?slug=
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("course") || params.get("slug") || "";
  const actualSlug = COURSE_ALIASES[requestedSlug] || requestedSlug;

  // First match by slug, then use a title fallback if the catalogue
  // uses a different slug for the same course.
  const staticCourse = useMemo(
    () =>
      getCourseBySlug(actualSlug) ||
      COURSES.find((item) =>
        (TITLE_FALLBACKS[requestedSlug] || []).some(
          (title) => normalizeTitle(item.title) === normalizeTitle(title)
        )
      ) ||
      null,
    [actualSlug, requestedSlug]
  );

  const [course, setCourse] = useState(staticCourse);
  const [courseFaqs, setCourseFaqs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  // Prefer the CMS copy so admin edits replace the static catalogue.
  useEffect(() => {
    let cancelled = false;

    setCourse(staticCourse);
    setLoaded(false);

    (async () => {
      const [courseResult, faqResult] = await Promise.allSettled([
        fetchCourseBySlug(actualSlug),
        getFaqs({ scope: "course", courseSlug: actualSlug }),
      ]);

      if (cancelled) return;

      if (courseResult.status === "fulfilled" && courseResult.value) {
        setCourse({
          ...courseResult.value,
          image: resolveAssetUrl(courseResult.value.image),
        });
      } else if (courseResult.status === "rejected") {
        console.error(
          "Failed to load the course from the CMS:",
          courseResult.reason
        );
      }

      if (faqResult.status === "fulfilled") {
        setCourseFaqs(faqResult.value);
      } else {
        console.error(
          "Failed to load the course FAQs:",
          faqResult.reason
        );
      }

      setLoaded(true);
      setDataVersion((value) => value + 1);
    })();

    return () => {
      cancelled = true;
    };
  }, [actualSlug, staticCourse]);

  useSiteEffects(dataVersion);

  // Dynamic enquiry form submission
  useEffect(() => {
    if (!course) return undefined;

    const form = document.querySelector("[data-enquiry-form]");
    const status = form?.querySelector("[data-form-status]");

    if (!form || !status) return undefined;

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const fields = [
        "name",
        "phone",
        "email",
        "city",
        "gender",
        "message",
      ];

      let valid = true;

      fields.forEach((field) => {
        const input = form.elements.namedItem(field);
        const error = form.querySelector(
          `[data-error-for="${field}"]`
        );

        if (error) {
          error.textContent = "";
          error.classList.remove("is-visible");
        }

        input?.classList.remove("is-invalid");

        if (
          !String(formData.get(field) || "").trim() ||
          (input && !input.checkValidity())
        ) {
          valid = false;

          if (error) {
            error.textContent =
              field === "email"
                ? "Enter a valid e-mail address."
                : "This field is required.";

            error.classList.add("is-visible");
          }

          input?.classList.add("is-invalid");
        }
      });

      if (!valid) {
        status.textContent =
          "Please check the highlighted fields and try again.";
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
          course: course.title,
          message: formData.get("message"),
        });

        form.reset();

        status.textContent =
          result.message ||
          "Thank you! Your enquiry has been received.";
      } catch (error) {
        status.textContent =
          error.message ||
          "Unable to send your enquiry right now.";
      } finally {
        if (button) button.disabled = false;
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [course]);

  // Waiting for the CMS before deciding the course does not exist
  if (!course && !loaded) {
    return (
      <>
        <Navbar activePage="courses" />

        <main className="section section--alt" id="main">
          <div className="container text-center">
            <p>Loading course details…</p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Course not found
  if (!course) {
    return (
      <>
        <Navbar activePage="courses" />

        <main className="section section--alt" id="main">
          <div className="container text-center">
            <h1>Course Not Found</h1>

            <p>
              Please select a valid course from our catalogue.
            </p>

            <a href="/courses" className="btn btn--primary">
              Browse All Courses
            </a>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activePage="courses" />

    

      <main data-course-detail="" id="main">

        {/* ================= COURSE HERO ================= */}

        <section className="detail-hero">
          <div className="container">

            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>

                <li>
                  <a href="/courses">Courses</a>
                </li>

                <li aria-current="page">
                  <span data-course-breadcrumb="">
                    {course.title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="detail-hero__grid">

              <div className="detail-hero__media reveal reveal-left">

                <div className="detail-tags">
                  <span className="badge badge--teal">
                    {course.categoryLabel}
                  </span>

                  <span className="badge badge--accent">
                    {course.mode}
                  </span>

                  <span className="badge">
                    Mentor Supported
                  </span>
                </div>

                <h1
                  className="detail-title"
                  data-course-title=""
                >
                  {course.title}
                </h1>

                <p className="detail-desc">
                  {course.summary}
                </p>

                <div className="ratio ratio--16-9">
                  <img
                    src={course.image}
                    alt={course.alt || course.title}
                    data-course-image=""
                    decoding="async"
                    fetchPriority="high"
                    width="1200"
                    height="900"
                  />
                </div>

              </div>

              {/* ENROLMENT CARD */}

              <aside
                aria-labelledby="enroll-heading"
                className="enroll-card reveal reveal-right"
              >
                <h2 className="sr-only" id="enroll-heading">
                  Enrolment details
                </h2>

                <dl className="enroll-card__rows">

                  <div className="enroll-row">
                    <dt>Level</dt>
                    <dd>{course.level}</dd>
                  </div>

                  <div className="enroll-row">
                    <dt>Duration</dt>
                    <dd>{course.duration}</dd>
                  </div>

                  <div className="enroll-row">
                    <dt>Mode</dt>
                    <dd>{course.mode}</dd>
                  </div>

                  <div className="enroll-row">
                    <dt>Batch</dt>
                    <dd>{course.batch}</dd>
                  </div>
                  <div className="enroll-row">
                    <dt>language</dt>
                    <dd>{course.language}</dd>
                  </div>

                  <div className="enroll-row">
                    <dt>Certificate</dt>
                    <dd>{course.certificate}</dd>
                  </div>

                </dl>

                <a
                  className="btn btn--primary btn--block"
                  href="/contact"
                >
                  Enrol Now
                </a>

                <a
                  className="btn btn--whatsapp btn--block"
                  data-wa=""
                  data-wa-course={course.title}
                  href={getWhatsAppUrl({ course: course.title })}
                >
                  Enquire on WhatsApp
                </a>

                <p className="enroll-card__foot">
                  Contact our admissions team for current batch
                  and enrolment details.
                </p>

              </aside>

            </div>
          </div>
        </section>

        {/* ================= INTRODUCTION & OUTCOMES ================= */}

        <section className="section">
          <div className="container">

            <div className="grid grid--sidebar">

              <div className="reveal reveal-left">

                <h2>Course introduction</h2>

                <div data-course-intro="">
                  {course.intro?.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <h2 className="mt-3">
                  What you will learn
                </h2>

                <ul className="check-list">
                  {course.outcomes?.map((item, index) => (
                    <li key={index}>
                      <svg
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* SKILLS SIDEBAR */}

              <aside className="reveal reveal-right reveal-d1">

                <div className="panel">
                  <h3>Skills you will build</h3>

                  <ul className="list-clean">
                    {course.skills?.map((skill, index) => (
                      <li key={index}>
                        <svg
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>

                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel mt-2">
                  <h3>Need guidance?</h3>

                  <p>
                    Not sure whether this course is right for you?
                    Contact our team for guidance.
                  </p>

                  <a
                    className="btn btn--whatsapp btn--block"
                    data-wa=""
                    data-wa-course={course.title}
                    href={getWhatsAppUrl({ course: course.title })}
                  >
                    Chat with an advisor
                  </a>

                  <a
                    className="btn btn--outline btn--block"
                    href="tel:+9180980 91797"
                  >
                    Call +91 98765 43210
                  </a>
                </div>

              </aside>

            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">

            <div className="grid grid--sidebar">

              <div className="reveal reveal-left">

                <h2>Eligibility criteria</h2>

                <ul className="check-list">
                  {course.eligibility?.map((item, index) => (
                    <li key={index}>
                      <svg
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="mt-3">
                  Skills covered in this course
                </h2>

                <div className="pill-list">
                  {course.skills?.map((skill, index) => (
                    <span className="pill" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

              <aside className="reveal reveal-right reveal-d1">

                <div className="panel">
                  <h3>How you will learn</h3>

                  <ul className="hours-list">
                    <li>
                      <span>Live classes</span>
                      <span>
                        Trainer-led sessions and guided practice
                      </span>
                    </li>

                    <li>
                      <span>100% Placement Assistance</span>
                      <span>Career Support</span>
                    </li>

                    <li>
                      <span>Assignments</span>
                      <span>
                        Hands-on practice and project work
                      </span>
                    </li>

                    <li>
                      <span>Mentor support</span>
                      <span>
                        Doubt clearing and project feedback
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="panel mt-2">

                  <h3>Career opportunities</h3>

                  <div className="pill-list">
                    {course.careers?.map((career, index) => (
                      <span className="pill" key={index}>
                        {career}
                      </span>
                    ))}
                  </div>

                  <p className="muted mt-1">
                    Career opportunities depend on practical
                    skills, portfolio quality and industry
                    experience.
                  </p>

                </div>

              </aside>

            </div>
          </div>
        </section>

        {/* ================= COURSE FAQ ================= */}

        <section className="section section--alt course-faq">
          <div className="container">

            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow">
                <span className="eyebrow__dot"></span>
                FAQs
              </span>
              <h2>Frequently asked questions</h2>
              <p>
                Find answers to common questions about the {course.title} course.
              </p>
            </div>

            <div className="faq" data-accordion="single">

              {/* Faqs come from the CMS when available. */}
              {(courseFaqs.length > 0
                ? courseFaqs
                : buildDefaultCourseFaqs(course.title)
              ).map((faq, index) => (
                <details className="faq__item" key={index} open={index === 0}>
                  <summary className="faq__q">
                    {faq.question}
                    <span className="faq__icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq__a">
                    <div className="faq__a-inner">{faq.answer}</div>
                  </div>
                </details>
              ))}

            </div>
          </div>
        </section>

        {/* ================= ENQUIRY SECTION ================= */}

        <section className="section section--alt">
          <div className="container">

            <div className="contact-grid">

              <div className="panel reveal reveal-left">

                <h2>
                  Have questions about this course?
                </h2>

                <p>
                  Send your details and your question. Our
                  admissions team will contact you with course
                  information, syllabus, batch timings and fees.
                </p>

                <ul className="check-list">
                  <li>
                    <span>
                      Personal guidance from our admissions team.
                    </span>
                  </li>

                  <li>
                    <span>
                      Clear information about syllabus, tools,
                      projects and fees.
                    </span>
                  </li>

                  <li>
                    <span>
                      No obligation — ask anything before enrolling.
                    </span>
                  </li>
                </ul>

                <div className="btn-group mt-2">

                  <a
                    className="btn btn--whatsapp"
                    data-wa=""
                    data-wa-course={course.title}
                    href={getWhatsAppUrl({ course: course.title })}
                  >
                    WhatsApp our team
                  </a>

                  <a
                    className="btn btn--outline"
                    href="tel:+9180980 91797"
                  >
                    Call +91 98765 43210
                  </a>

                </div>

              </div>

              {/* EXISTING EMAIL ENQUIRY FORM */}

              <div className="panel reveal reveal-right reveal-d1">

                <form
                  action="#"
                  className="form"
                  data-enquiry-form=""
                  method="post"
                >

                  <input
                    data-enquiry-course=""
                    name="course"
                    type="hidden"
                    value={course.title}
                  />

                  <div className="form__group">
                    <label htmlFor="enquiry-name">
                      Full name <span className="req">*</span>
                    </label>

                    <input
                      autoComplete="name"
                      className="form__control"
                      id="enquiry-name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      type="text"
                    />

                    <span
                      className="form__error"
                      data-error-for="name"
                    ></span>
                  </div>

                  <div className="form__group">
                    <label htmlFor="enquiry-phone">
                      Phone number <span className="req">*</span>
                    </label>

                    <input
                      autoComplete="tel"
                      className="form__control"
                      id="enquiry-phone"
                      name="phone"
                      placeholder="Enter phone number"
                      required
                      type="tel"
                    />

                    <span
                      className="form__error"
                      data-error-for="phone"
                    ></span>
                  </div>

                  <div className="form__group">
                    <label htmlFor="enquiry-email">
                      E-mail address <span className="req">*</span>
                    </label>

                    <input
                      autoComplete="email"
                      className="form__control"
                      id="enquiry-email"
                      name="email"
                      placeholder="Enter email address"
                      required
                      type="email"
                    />

                    <span
                      className="form__error"
                      data-error-for="email"
                    ></span>
                  </div>

                  <div className="form__group">
                    <label htmlFor="enquiry-city">
                      City <span className="req">*</span>
                    </label>

                    <input
                      autoComplete="address-level2"
                      className="form__control"
                      id="enquiry-city"
                      name="city"
                      placeholder="Enter your city"
                      required
                      type="text"
                    />

                    <span
                      className="form__error"
                      data-error-for="city"
                    ></span>
                  </div>

                  <div className="form__group">
                    <label htmlFor="enquiry-gender">
                      Gender <span className="req">*</span>
                    </label>

                    <select
                      className="form__control"
                      id="enquiry-gender"
                      name="gender"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>

                    <span
                      className="form__error"
                      data-error-for="gender"
                    ></span>
                  </div>

                  <div className="form__group">
                    <label htmlFor="enquiry-message">
                      How can we help? <span className="req">*</span>
                    </label>

                    <textarea
                      className="form__control"
                      id="enquiry-message"
                      name="message"
                      placeholder={`Tell us your questions about ${course.title}.`}
                      required
                      rows="5"
                    />

                    <span
                      className="form__error"
                      data-error-for="message"
                    ></span>
                  </div>

                  <div className="form__note">
                    <span>
                      Your details will be used to respond to
                      your course enquiry.
                    </span>
                  </div>

                  <button
                    className="btn btn--primary btn--lg btn--block"
                    type="submit"
                  >
                    Send Enquiry
                  </button>

                  <div
                    aria-live="polite"
                    className="form__status"
                    data-form-status=""
                    role="status"
                  ></div>

                </form>

              </div>

            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}

        <section className="section">
          <div className="container">

            <div className="cta reveal reveal-zoom">
              <div className="cta__inner">

                <div>
                  <span className="eyebrow eyebrow--light">
                    <span className="eyebrow__dot"></span>
                    Still deciding?
                  </span>

                  <h2>
                    Ready to start learning {course.title}?
                  </h2>

                  <p>
                    Contact our team to learn about the syllabus,
                    projects, batch options and enrolment.
                  </p>
                </div>

                <div className="cta__actions">

                  <a
                    className="btn btn--accent btn--lg"
                    href="/courses"
                  >
                    Browse all courses
                  </a>

                  <a
                    className="btn btn--ghost-light btn--lg"
                    data-wa=""
                    data-wa-course={course.title}
                    href={getWhatsAppUrl({ course: course.title })}
                  >
                    Chat on WhatsApp
                  </a>

                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
