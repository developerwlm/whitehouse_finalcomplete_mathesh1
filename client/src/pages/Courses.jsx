import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteEffects, getWhatsAppUrl } from "../hooks/useSiteEffects";
import { getCourses, resolveAssetUrl } from "../services/api";
import {
  FaRobot,
  FaCode,
  FaVideo,
  FaBullhorn,
  FaPalette,
  FaFilm,
  FaCamera,
} from "react-icons/fa";

/* ---------- Static data (kept outside the component so it is created once) ---------- */

const STATIC_IMAGE_PREFIX = "../assets/images/course/";

/** Static assets are stored as bare filenames, CMS assets as root-relative paths. */
function courseImageSrc(image) {
  if (!image) return "";
  if (image.includes("/")) return resolveAssetUrl(image);
  return `${STATIC_IMAGE_PREFIX}${image}`;
}

/** Maps either a CMS course document or a fallback entry onto the card shape. */
function normalizeCourse(course) {
  return {
    category: course.category || course.slug || "",
    slug: course.slug || "",
    title: course.title || "",
    tag: course.categoryLabel || course.tag || course.category || "",
    level: course.level || "",
    duration: course.duration || "",
    image: courseImageSrc(course.image),
    wa: course.wa || course.title || "",
    desc: course.summary || course.desc || "",
  };
}

// Shown while the CMS API is loading or when it is unreachable.
const FALLBACK_COURSES = [
  {
    category: "vfx-animations",
    slug: "vfx-animations",
    title: "VFX & Animations",
    tag: "VFX & Animations",
    level: "Beginner to Advanced",
    duration: "6 Months",
    image: "vfx.webp",
    wa: "VFX & Animations",
    desc: "Learn rotoscoping and compositing, the core skills behind movie-quality visual effects. Train on real shots and workflows used in studios.",
  },
  {
    category: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    tag: "Digital Marketing",
    level: "Beginner",
    duration: "4 Months",
    image: "digital_marketing.webp",
    wa: "Digital Marketing",
    desc: "Learn digital marketing skills, including SEO, paid advertising, and social media marketing. Build strategies, grow audiences, and generate leads through hands-on live projects and real-world brand experience.",
  },
  {
    category: "video-editing",
    slug: "video-editing",
    title: "Video Editing",
    tag: "Video Editing",
    level: "Beginner to Advanced",
    duration: "8 Months",
    image: "video.webp",
    wa: "Video Editing",
    desc: "Master professional video editing for reels, ads, YouTube, and films. Learn cutting, motion graphics, colour grading, and sound design through hands-on projects to create engaging, high-quality videos.",
  },
  {
    category: "graphic-designing",
    slug: "graphic-designing",
    title: "Graphic Design",
    tag: "Graphic Design",
    level: "Intermediate",
    duration: "5 Months",
    image: "graphic.webp",
    wa: "Graphic Design",
    desc: "Learn to design logos, social media posts, banners, and brand identities using Photoshop and Illustrator. Build creative skills through hands-on projects and develop a professional design portfolio.",
  },
  {
    category: "ai-video-generation",
    slug: "ai-video-editing",
    title: "A.I. Video Generation",
    tag: "A.I. Video Generation",
    level: "Beginner",
    duration: "3 Months",
    image: "ai_video.webp",
    wa: "AI Video Generation",
    desc: "Create videos faster with modern AI tools. Learn prompting, scripting, visual generation and editing workflows for marketing, content and storytelling.",
  },
  {
    category: "coding",
    slug: "coding-programming",
    title: "Coding",
    tag: "Coding",
    level: "Advanced",
    duration: "6 Months",
    image: "coding.webp",
    wa: "Coding",
    desc: "Build complete web applications from front end to back end using the MEAN and MERN stacks, with real projects for your portfolio.",
  },
  {
    category: "drone-technology",
    slug: "drone-technology",
    title: "Drones",
    tag: "Drones",
    level: "Intermediate",
    duration: "4 Months",
    image: "drone.webp",
    wa: "Drone Technology",
    desc: "Learn to fly and film. Master drone controls, safety, cinematic shots and FPV flying for events, films, real estate and brands.",
  },
];

const FALLBACK_CARDS = FALLBACK_COURSES.map(normalizeCourse);

const TESTIMONIALS = [
  {
    avatar: "avatar--b",
    initials: "KM",
    name: "Karthik Menon",
    meta: "Data Science & Analytics",
    text: "I joined the data science track with no coding background. The weekly doubt sessions and the capstone project made everything click. The dashboard project is now the first thing I show in interviews.",
  },
  {
    avatar: "avatar--c",
    initials: "SN",
    name: "Sneha Nair",
    meta: "UI/UX Design Professional",
    text: "The UI/UX programme is entirely practical. We interviewed real users, ran usability tests and presented our work. My portfolio review session alone was worth joining the course.",
  },
  {
    avatar: "avatar--d",
    initials: "FV",
    name: "Faizan Vora",
    meta: "Cloud Computing & DevOps",
    text: "As a working professional, the weekend cloud and DevOps batch was perfect for me. The labs are realistic and the trainer shared practical checklists I still use at work every day.",
  },
  {
    avatar: "avatar--e",
    initials: "AR",
    name: "Ananya Raghavan",
    meta: "VFX & Animations",
    text: "The VFX & Animations changed how I approach problems. The trainer explained concepts with live examples and reviewed my project code line by line. I built a portfolio I am genuinely proud of.",
  },
  {
    avatar: "avatar--a",
    initials: "MD",
    name: "Meera Deshpande",
    meta: "Spoken English & Communication",
    text: "My speaking confidence has completely changed. Daily practice in a small group, recordings of my own voice and honest feedback made more difference than years of reading grammar books.",
  },
  {
    avatar: "avatar--b",
    initials: "RS",
    name: "Rohit Sharma",
    meta: "Cyber Security Essentials",
    text: "The cyber security labs are what I loved most. Working through the OWASP Top 10 in a safe environment and writing a proper report taught me more than any tutorial series.",
  },
];

const MARQUEE_ITEMS = [
  { Icon: FaRobot, label: "AI Video Editing" },
  { Icon: FaCode, label: "Coding" },
  { Icon: FaVideo, label: "Video Editing" },
  { Icon: FaBullhorn, label: "Digital Marketing" },
  { Icon: FaPalette, label: "Graphic Design" },
  { Icon: FaFilm, label: "VFX and Animation" },
  { Icon: FaCamera, label: "Drone Photography" },
];

const REVEAL_DELAY = ["", " reveal-d1", " reveal-d2"];

/* ---------- Small reusable SVGs (JSX attribute names are camelCase) ---------- */

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

const ClockIcon = () => (
  <svg aria-hidden="true" {...svgProps} strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const LevelIcon = () => (
  <svg aria-hidden="true" {...svgProps} strokeWidth="2">
    <path d="M4 20h16" />
    <path d="M7 20v-6" />
    <path d="M12 20V8" />
    <path d="M17 20v-9" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
  </svg>
);

export default function Courses() {
  const [courses, setCourses] = useState(FALLBACK_CARDS);
  const [dataVersion, setDataVersion] = useState(0);

  // Load the latest courses from the CMS; keep the static list if it fails.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getCourses();
        if (cancelled || data.length === 0) return;
        setCourses(data.map(normalizeCourse));
        setDataVersion((value) => value + 1);
      } catch (error) {
        console.error("Failed to load courses from the CMS:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useSiteEffects(dataVersion);

  const filters = useMemo(() => {
    const byCategory = new Map();
    courses.forEach((course) => {
      if (course.category && !byCategory.has(course.category)) {
        byCategory.set(course.category, course.tag || course.category);
      }
    });

    return [
      { value: "all", label: "All" },
      ...Array.from(byCategory, ([value, label]) => ({ value, label })),
    ];
  }, [courses]);

  useEffect(() => {
    const filterRoot = document.querySelector("[data-filter-root]");
    if (!filterRoot) return;

    const filterButtons = filterRoot.querySelectorAll("[data-filter-value]");
    const cards = filterRoot.querySelectorAll(".course-card[data-category]");
    const count = filterRoot.querySelector("[data-filter-count]");
    const empty = filterRoot.querySelector("[data-filter-empty]");

    const filterCourses = (category = "all") => {
      let visible = 0;

      cards.forEach((card) => {
        const show = category === "all" || card.dataset.category === category;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (count) {
        count.textContent = `Showing ${visible} course${visible === 1 ? "" : "s"}`;
      }

      if (empty) empty.hidden = visible !== 0;

      filterButtons.forEach((button) => {
        const active = button.dataset.filterValue === category;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    };

    const handlers = [];

    filterButtons.forEach((button) => {
      const handler = () => filterCourses(button.dataset.filterValue || "all");
      button.addEventListener("click", handler);
      handlers.push([button, handler]);
    });

    // Display all courses when the page first loads.
    filterCourses("all");

    return () => {
      handlers.forEach(([button, handler]) => {
        button.removeEventListener("click", handler);
      });
    };
  }, [courses]);

  return (
    <>
      <Navbar activePage="courses" />
      <main id="main">
        {/* ---------- Page hero ---------- */}
        <section className="page-hero">
          <div className="container">
            <div className="page-hero__inner">
              <nav aria-label="Breadcrumb">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li aria-current="page">Courses</li>
                </ol>
              </nav>
              <span className="eyebrow eyebrow--light reveal">
                <span className="eyebrow__dot"></span>Our Courses
              </span>
              <h1 className="reveal reveal-d1">
                Offline, practical, career-focused programs with placement support.
              </h1>
              <p className="reveal reveal-d2">
                Choose the right course for your career goals at Whitehouse, Madurai. Learn offline from industry professionals through hands-on training, live projects, and portfolio building, with 100% placement assistance and expert career guidance to support your career journey.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Course list ---------- */}
        <section className="section" data-filter-root="">
          <div className="container">
            <h2 className="sr-only">All courses at Whitehouse</h2>

            <div className="filter-bar">
              <div aria-label="Filter courses by category" className="filter" role="group">
                {filters.map(({ value, label }) => (
                  <button
                    key={value}
                    aria-pressed={value === "all"}
                    className={`filter__btn${value === "all" ? " is-active" : ""}`}
                    data-filter-value={value}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p aria-live="polite" className="filter-result" data-filter-count>
                Showing {courses.length} courses
              </p>
            </div>

            <div className="grid grid--3">
              {courses.map((course, i) => (
                <article
                  key={course.slug || course.category}
                  className={`course-card reveal${REVEAL_DELAY[i % 3]}`}
                  data-category={course.category}
                >
                  <div className="course-card__media">
                    <img
                      alt={`${course.title} training at Whitehouse`}
                      decoding="async"
                      height="500"
                      loading="lazy"
                      src={course.image}
                      width="800"
                    />
                    <span className="badge badge--level">{course.level}</span>
                    <span className="course-card__cat">{course.tag}</span>
                  </div>

                  <div className="course-card__body">
                    <h3 className="course-card__title">
                      <Link to={`/course-details?course=${course.slug}`}>{course.title}</Link>
                    </h3>
                    <p className="course-card__desc">{course.desc}</p>

                    <ul className="course-card__meta">
                      <li><ClockIcon />{course.duration}</li>
                      <li><LevelIcon />{course.level}</li>
                    </ul>

                    <div className="course-card__footer">
                      <div className="course-card__actions">
                        <Link className="btn btn--primary btn--sm" to={`/course-details?course=${course.slug}`}>
                          View Details
                        </Link>
                        <a className="btn btn--whatsapp btn--sm" data-wa="" data-wa-course={course.wa} href={getWhatsAppUrl({ course: course.wa })}>
                          Enquire Now
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="filter-empty" data-filter-empty hidden>
              No courses found in this category.
            </p>
          </div>
        </section>

        {/* ---------- What you get ---------- */}
        <section className="section section--alt">
          <div className="container">
            <div className="section-head section-head--center reveal">
              <span className="eyebrow"><span className="eyebrow__dot"></span>What You Get</span>
              <h2>More Than Learning. Skills for Life.</h2>
              <p>Gain practical experience, industry-relevant skills, expert guidance, and the confidence to turn your knowledge into real-world opportunities.</p>
            </div>
            <div className="grid grid--3">
              <div className="card reveal">
                <span aria-hidden="true" className="card__icon">
                  <svg {...svgProps} strokeWidth="1.9">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.4" />
                  </svg>
                </span>
                <h3>Learn Anytime. Revisit Anytime.</h3>
                <p>Access your course lessons whenever you need, revisit key concepts, and strengthen your skills at your own pace.</p>
              </div>
              <div className="card reveal reveal-d1">
                <span aria-hidden="true" className="card__icon card__icon--accent">
                  <svg {...svgProps} strokeWidth="1.9">
                    <rect height="18" rx="2" width="18" x="3" y="4" />
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                </span>
                <h3>Learn, Create, and Apply with Ease</h3>
                <p>Access useful learning resources and ready-to-use templates to practise your skills, simplify your workflow, and bring your ideas to life.</p>
              </div>
              <div className="card reveal reveal-d2">
                <span aria-hidden="true" className="card__icon card__icon--teal">
                  <svg {...svgProps} strokeWidth="1.9">
                    <path d="m9 11 3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" />
                  </svg>
                </span>
                <h3>Showcase Your Skills with Confidence</h3>
                <p>Earn a certificate upon successful course completion to highlight your learning achievements and support your professional growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section className="section" id="testimonials">
          <div className="container">
            <div className="section-head section-head--center reveal">
              <span className="eyebrow">
                <span className="eyebrow__dot"></span>
                Student Stories
              </span>
              <h2>Real Learning. Real Results.</h2>
              <p>Hear from students who turned practical training into real careers.</p>
            </div>

            <div
              className="slider reveal"
              data-slider
              data-per-view="3"
              data-autoplay="6500"
              tabIndex={0}
              role="region"
              aria-label="Student testimonials"
            >
              <div className="slider__viewport">
                <ul className="slider__track" data-slider-track>
                  {TESTIMONIALS.map((t) => (
                    <li className="slider__slide" key={t.name}>
                      <div className="testimonial">
                        <span className="testimonial__quote" aria-hidden="true">
                          <QuoteIcon />
                        </span>

                        <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                          ★★★★★
                        </div>

                        <p className="testimonial__text">{t.text}</p>

                        <div className="testimonial__person">
                          <span className={`avatar ${t.avatar}`} aria-hidden="true">{t.initials}</span>
                          <span>
                            <span className="testimonial__name">{t.name}</span>
                            <span className="testimonial__meta">{t.meta}</span>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="slider__controls">
                <button className="slider__btn" type="button" data-slider-prev aria-label="Previous testimonials">
                  <svg {...svgProps} strokeWidth="2.2">
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>
                </button>

                <div className="slider__dots" data-slider-dots></div>

                <button className="slider__btn" type="button" data-slider-next aria-label="Next testimonials">
                  <svg {...svgProps} strokeWidth="2.2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-center mt-2 reveal">
              <Link className="btn btn--outline" to="/reviews">
                Read all student reviews
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Text marquee (list repeated once for a seamless loop) ---------- */}
        <section className="text-marquee">
          <div className="text-marquee__track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(({ Icon, label }, i) => (
              <span key={`${label}-${i}`} aria-hidden={i >= MARQUEE_ITEMS.length ? "true" : undefined}>
                <Icon /> {label}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="section">
          <div className="container">
            <div className="cta reveal">
              <div className="cta__inner">
                <div>
                  <span className="eyebrow eyebrow--light">
                    <span className="eyebrow__dot"></span>We are here to help
                  </span>
                  <h2>Still not sure which course to pick?</h2>
                  <p>
                    Share your goal, current experience and available study time with our admissions team. We will
                    recommend a course, explain the batch schedule and walk you through the fee options — with no pressure
                    to enrol.
                  </p>
                </div>
                <div className="cta__actions">
                  <Link className="btn btn--accent btn--lg" to="/contact">Talk to a counsellor</Link>
                  <a className="btn btn--ghost-light btn--lg" data-wa="" data-wa-topic="choosing the right course" href={getWhatsAppUrl({ topic: "choosing the right course" })}>
                    <svg aria-hidden="true" {...svgProps} strokeWidth="2" width="18" height="18">
                      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                    </svg>
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