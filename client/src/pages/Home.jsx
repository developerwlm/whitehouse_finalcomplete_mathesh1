import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSiteEffects, getWhatsAppUrl } from '../hooks/useSiteEffects';
import { getFaqs } from '../services/api';
import {
  FaRobot,
  FaCode,
  FaVideo,
  FaBullhorn,
  FaPalette,
  FaFilm,
  FaCamera
} from 'react-icons/fa';

const brandLogos = [
  { src: '../assets/images/brands/Bhima-jewellery.webp', alt: 'Bhima Jewellery' },
  { src: '../assets/images/brands/adcb-edtech.webp', alt: 'ADCB EdTech' },
  { src: '../assets/images/brands/Branding-Agency-in-Madurai-Whitelabel-Media-e1792753378166.webp', alt: 'Branding Agency in Madurai' },
  { src: '../assets/images/brands/hyundai.webp', alt: 'Hyundai' },
  { src: '../assets/images/brands/kcms.webp', alt: 'KCMs' },
  { src: '../assets/images/brands/suzuki.webp', alt: 'Suzuki' },
  { src: '../assets/images/brands/Tough-tribes.webp', alt: 'Tough Tribes' },
  { src: '../assets/images/brands/v2-trendy.webp', alt: 'V2 Trendy' },
  { src: '../assets/images/brands/vinfast.webp', alt: 'Vinfast' },
  { src: '../assets/images/brands/yamaha.webp', alt: 'Yamaha' },
  { src: '../assets/images/brands/yara-hypermarket.webp', alt: 'Yara Hypermarket' },
];

// Shown while the CMS is loading or when it is unreachable.
const FALLBACK_FAQS = [
  {
    question: 'Why choose Whitehouse Academy in Madurai?',
    answer: 'Learn practical skills with expert trainers, live projects, and placement assistance.',
  },
  {
    question: 'Does Whitehouse Academy provide placement assistance?',
    answer: 'Yes, we offer 100% placement assistance for career opportunities.',
  },
  {
    question: 'Do students get hands-on training?',
    answer: 'Yes, students gain practical experience through live projects.',
  },
  {
    question: 'Is expert career guidance available?',
    answer: 'Yes, we provide expert guidance to help students plan their careers.',
  },
  {
    question: 'What makes Whitehouse Academy different?',
    answer: 'Practical training, live projects, career guidance and placement assistance.',
  },
];


/**
 * Converted from the supplied Whitehouse index.html.
 * Copy your original images folder into public/images.
 * Copy your original css files into src/css.
 */
export default function Home() {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [dataVersion, setDataVersion] = useState(0);

  // Load the general questions from the CMS; keep the static list if it fails.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getFaqs({ scope: 'general' });
        if (cancelled || data.length === 0) return;
        setFaqs(data.map((faq) => ({ question: faq.question, answer: faq.answer })));
        setDataVersion((value) => value + 1);
      } catch (error) {
        console.error('Failed to load the FAQs from the CMS:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useSiteEffects(dataVersion);

  return (
    <>
      <Navbar activePage="home" />

      <main id="main">


        <section className="hero hero--cosmic">
          <div className="hero__stars" aria-hidden="true"></div>
          <div className="hero__orbit hero__orbit--one" aria-hidden="true"></div>
          <div className="hero__orbit hero__orbit--two" aria-hidden="true"></div>

          <div className="container hero__cosmic-inner">
            <div className="hero__cosmic-copy">
              <span className="eyebrow reveal reveal-down">
                <span className="eyebrow__dot"></span>
                Whitehouse – Practical Skill Development Institute in Madurai
              </span>

              <p className="hero__kicker reveal reveal-up reveal-d1">Learn Build</p>
              <h1 className="hero__title hero__title--cosmic reveal reveal-up reveal-d2">
                Real Skills, Build <span>Real Careers.</span>
              </h1>

              <p className="hero__cosmic-text reveal reveal-up reveal-d2">
              Welcome to Whitehouse, a skill development institute in Madurai by Whitelabel Media. Develop industry-relevant skills through hands-on training, real-time projects, and expert guidance, with 100% placement assistance to help you build a successful career.
              </p>
              <div className="hero__brands marquee reveal reveal-fade" role="region" aria-label="Brands our learners work with">
                <div className="marquee__track">
                  {[0, 1].map((group) => (
                    <div className="marquee__group" key={group} aria-hidden={group === 1}>
                      {brandLogos.map((brand) => (
                        <div className="marquee__item" key={brand.alt}>
                          <img
                            className="marquee__logo"
                            src={brand.src}
                            alt={group === 0 ? brand.alt : ''}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
           
              <div className="btn-group hero__cosmic-actions reveal reveal-up reveal-d3">
                <a className="btn btn--primary btn--lg" href="/courses">
                  Explore Courses
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                
                <a className="btn btn--outline btn--lg" href="/contact">Contact Us</a>
              </div>

              <ul className="hero__points hero__trust-row reveal reveal-up reveal-d4">
                <li className="hero__point">Live interactive classes</li>
                <li className="hero__point">Project-based curriculum</li>
                <li className="hero__point">Placement guidance</li>
              </ul>

            
            </div>

            <div className="hero__cosmic-media reveal reveal-right">
              <div className="hero__image-frame">
                <img
                  src="../assets/images/front/New-Hero-image-student.webp"
                  alt="Students attending a live in-person class at Whitehouse"
                  width="482"
                  height="511"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>

              <div className="hero__float hero__float--tl">
                <span className="hero__float-icon" aria-hidden="true">✧</span>
                <span>
                  <strong>4.9 / 5</strong>
                  <small>Average learner rating</small>
                </span>
              </div>

              <div className="hero__float hero__float--br">
                <span className="hero__float-icon hero__float-icon--teal" aria-hidden="true">✦</span>
                <span>
                  <strong>12,400+</strong>
                  <small>Learners trained</small>
                </span>
              </div>
            </div>
          </div>

          <a className="hero__scroll-cue" href="#about-intro" aria-label="Scroll to discover more">
            <span aria-hidden="true">↓</span>
          </a>

          <div className="hero__promo container reveal reveal-up">
            <div className="hero__promo-item">
              <span className="hero__promo-icon" aria-hidden="true">✦</span>
              <div>
                <strong>Practical Skill Development</strong>
                <p>Live interactive classes and a project-based curriculum.</p>
              </div>
            </div>
            <div className="hero__promo-divider" aria-hidden="true"></div>
            <div className="hero__promo-item hero__promo-item--second">
              <strong className="hero__promo-highlight">100%</strong>
              <div>
                <strong>Placement Assistance</strong>
                <p>Expert career guidance to support your next step.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="section section--alt" id="about-intro">
          <div className="container split">
            <div className="split__media split__media-stack reveal reveal-left">
              <div className="ratio ratio--4-3">
                <img src="../assets/images/front/11_8_11zon-scaled.webp" alt="Learners collaborating during a study session at Whitehouse"
                  width="900" height="675" loading="lazy" decoding="async" />
              </div>
              <div className="split__badge">
                <span>
                  <strong>11+</strong>
                  <small>Years of teaching experience</small>
                </span>
              </div>
            </div>

            <div className="reveal reveal-right reveal-d1">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Who we are</span>
              <p><strong>We Make Learning Fit Your Life</strong></p>
              <h2>Learn From a Team That Actually Does the Work</h2>
              <p className="lead" style={{ marginBottom: '2rem' }}>
                Whitehouse is a practical skill development institute in Madurai focused on industry-oriented training. We help students, graduates, and working professionals develop digital, creative, and technical skills through practical learning and project-based experience.
                Our goal is to help learners build confidence, develop professional skills, and explore career opportunities.
              </p>
              <div className="btn-group mt-2">
                <a className="btn btn--primary" href="/about">More about us</a>
                <a className="btn btn--outline" href="/reviews">Read student reviews</a>
              </div>
            </div>
          </div>
        </section>


        <section className="section" id="popular-courses">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Popular courses</span>
              <h2>Programmes our learners love the most</h2>
              <p>Choose from career tracks in development, data, design and marketing. Every course includes live
                classes, assignments, mentor support and a completion certificate.</p>
            </div>

            <div className="grid grid--3">

              <article className="course-card reveal reveal-up">
                <div className="course-card__media">
                  <img src="../assets/images/course/vfx.webp" alt="Web development student writing front-end code" width="800" height="500" loading="lazy" decoding="async" />
                  <span className="badge badge--level">Beginner to Advanced</span>
                  <span className="course-card__cat">VFX & Animations</span>
                </div>
                <div className="course-card__body">
                  <h3 className="course-card__title"><a href="/course-details?course=vfx-animations">VFX & Animations</a></h3>
                  <p className="course-card__desc">Create stunning visual effects and animations.</p>
                  <ul className="course-card__meta">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                      6 Months
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h16" /><path d="M7 20v-6" /><path d="M12 20V8" /><path d="M17 20v-9" /></svg>
                      Beginner to Advanced
                    </li>
                  </ul>
                  <div className="course-card__footer">
                    <div className="course-card__actions">
                      <a className="btn btn--primary btn--sm" href="/course-details?course=vfx-animations">View Details</a>
                      <a className="btn btn--whatsapp btn--sm" href={getWhatsAppUrl({ course: "VFX & Animations" })} data-wa data-wa-course="VFX & Animations">Enquire Now</a>
                    </div>
                  </div>
                </div>
              </article>


              <article className="course-card reveal reveal-up reveal-d1">
                <div className="course-card__media">
                  <img src="../assets/images/course/digital_marketing.webp" alt="Digital marketing student using tools and strategies" width="800" height="500" loading="lazy" decoding="async" />
                  <span className="badge badge--level">Beginner to Advanced</span>
                  <span className="course-card__cat">Digital Marketing</span>
                </div>
                <div className="course-card__body">
                  <h3 className="course-card__title"><a href="/course-details?course=digital-marketing">Digital Marketing</a></h3>
                  <p className="course-card__desc">Master digital marketing strategies and tools to drive business growth.</p>
                  <ul className="course-card__meta">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                      8 Months
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h16" /><path d="M7 20v-6" /><path d="M12 20V8" /><path d="M17 20v-9" /></svg>
                      Beginner to Advanced
                    </li>
                  </ul>
                  <div className="course-card__footer">
                    <div className="course-card__actions">
                      <a className="btn btn--primary btn--sm" href="/course-details?course=digital-marketing">View Details</a>
                      <a className="btn btn--whatsapp btn--sm" href={getWhatsAppUrl({ course: "digital-marketing" })} data-wa data-wa-course="digital-marketing">Enquire Now</a>
                    </div>
                  </div>
                </div>
              </article>


              <article className="course-card reveal reveal-up reveal-d2">
                <div className="course-card__media">
                  <img src="../assets/images/course/video.webp" alt="Video editing interface wireframes" width="800" height="500" loading="lazy" decoding="async" />
                  <span className="badge badge--level">Beginner to Advanced</span>
                  <span className="course-card__cat">Video Editing</span>
                </div>
                <div className="course-card__body">
                  <h3 className="course-card__title"><a href="/course-details?course=video-editing">Video Editing</a></h3>
                  <p className="course-card__desc">Edit videos to create compelling content.</p>
                  <ul className="course-card__meta">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                      5 Months
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h16" /><path d="M7 20v-6" /><path d="M12 20V8" /><path d="M17 20v-9" /></svg>
                      Beginner to Advanced
                    </li>
                  </ul>
                  <div className="course-card__footer">
                    <div className="course-card__actions">
                      <a className="btn btn--primary btn--sm" href="/course-details?course=video-editing">View Details</a>
                      <a className="btn btn--whatsapp btn--sm" href={getWhatsAppUrl({ course: "Video Editing" })} data-wa data-wa-course="Video Editing">Enquire Now</a>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="flex-center mt-3 reveal">
              <a className="btn btn--outline btn--lg" href="/courses">
                View all courses
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>


        <section className="section section--alt" id="why-us">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Why choose us</span>
              <h2>Training that respects your time and your ambition</h2>
              <p>We keep batches small, sessions interactive and support continuous — so you never feel alone in the
                middle of a difficult topic.</p>
            </div>


            <div className="grid grid--3">
              <div className="card reveal reveal-up">
                <span className="card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-10-5L2 8l10 5 10-5Z" /><path d="M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></svg>
                </span>
                <h3>Expert industry trainers</h3>
                <p>Every session is led by a practitioner who works on live projects and teaches from real experience, not slides.</p>
              </div>

              <div className="card reveal reveal-up reveal-d1">
                <span className="card__icon card__icon--accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></svg>
                </span>
                <h3>Small, focused batches</h3>
                <p>Limited seats per batch mean your doubts get answered in class and your progress is genuinely tracked.</p>
              </div>

              <div className="card reveal reveal-up reveal-d2">
                <span className="card__icon card__icon--teal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="9" /></svg>
                </span>
                <h3>Learn by building</h3>
                <p>Assignments, mini projects and a capstone build the portfolio that convinces interviewers.</p>
              </div>

              <div className="card reveal reveal-up">
                <span className="card__icon card__icon--teal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2" /><path d="m10 9 5 3-5 3Z" /><path d="M8 21h8" /></svg>
                </span>
                <h3>Recordings& revision</h3>
                <p>Missed a class? Every session is recorded and available with notes, code files and practice sets.</p>
              </div>

              <div className="card reveal reveal-up reveal-d1">
                <span className="card__icon card__icon--accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-3V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" /><path d="M9 7h6" /></svg>
                </span>
                <h3>Career& placement support</h3>
                <p>Resume reviews, portfolio feedback and mock interviews are included in every career-track course.</p>
              </div>

              <div className="card reveal reveal-up reveal-d2">
                <span className="card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <h3>Flexible weekend batches</h3>
                <p>Weekday evening and weekend options are available so working professionals can learn without disruption.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="section section--dark" id="benefits">
          <div className="container">
            <div className="split">
              <div className="reveal reveal-left">
                <span className="eyebrow eyebrow--light"><span className="eyebrow__dot"></span>Why Choose Whitehouse</span>
                <h2>Learn by Doing, Grow by Experience.</h2>
                <p className="lead">
                  Education is more than a syllabus. We pair every course with mentoring, doubt-clearing sessions and
                  career preparation, so the skills you gain actually convert into opportunities.
                </p>
                <ul className="check-list check-list--light mt-2">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span><strong>Practical First:
                      We give you more practical experience than other marketing companies do.</strong></span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span><strong>Agency-Backed:
                      Learn from the team behind Whitelabel Media's real client campaigns</strong></span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span><strong>Offline Only:
                      In-person classes mean better focus, instant doubt clearing and real teamwork.</strong></span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span><strong>Career-Focused:
                      Training that ends with portfolio, interviews and placement support.</strong></span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span><strong>Industry-Relevant Skills:
                      Learn tools, techniques, and workflows relevant to today's digital and creative industries.</strong></span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span><strong>100% Placement Assistance:
                      Get dedicated placement assistance to prepare for job opportunities and build your professional career with confidence.</strong></span>
                  </li>
                </ul>
              </div>

              <div className="reveal reveal-right reveal-d1">
                <div className="ratio ratio--4-3">
                  <img src="../assets/images/front/15_12_11zon-scaled.webp"
                    alt="Trainer explaining a concept to learners during a live session"
                    width="900" height="675" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="section" id="testimonials">
          <div className="container">

            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow">
                <span className="eyebrow__dot"></span>
                Student Stories
              </span>

              <h2>Real Learning. Real Results.</h2>

              <p>
                Hear from students who turned practical training into real careers.
              </p>
            </div>

            <div className="slider reveal"
              data-slider
              data-per-view="3"
              data-autoplay="6500"
              tabIndex="0"
              role="region"
              aria-label="Student testimonials">

              <div className="slider__viewport">

                <ul className="slider__track" data-slider-track>

                  <li className="slider__slide">
                    <div className="testimonial">

                      <span className="testimonial__quote" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
                        </svg>
                      </span>

                      <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="testimonial__text">
                        I joined the data science track with no coding
                        background. The weekly doubt sessions and the
                        capstone project made everything click. The
                        dashboard project is now the first thing I show
                        in interviews.
                      </p>

                      <div className="testimonial__person">
                        <span className="avatar avatar--b" aria-hidden="true">KM</span>

                        <span>
                          <span className="testimonial__name">Karthik Menon</span>
                          <span className="testimonial__meta">Data Science &Analytics</span>
                        </span>
                      </div>

                    </div>
                  </li>

                  <li className="slider__slide">
                    <div className="testimonial">

                      <span className="testimonial__quote" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
                        </svg>
                      </span>

                      <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="testimonial__text">
                        The UI/UX programme is entirely practical.
                        We interviewed real users, ran usability
                        tests and presented our work. My portfolio
                        review session alone was worth joining
                        the course.
                      </p>

                      <div className="testimonial__person">
                        <span className="avatar avatar--c" aria-hidden="true">SN</span>

                        <span>
                          <span className="testimonial__name">Sneha Nair</span>
                          <span className="testimonial__meta">UI/UX Design Professional</span>
                        </span>
                      </div>

                    </div>
                  </li>

                  <li className="slider__slide">
                    <div className="testimonial">

                      <span className="testimonial__quote" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
                        </svg>
                      </span>

                      <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="testimonial__text">
                        As a working professional, the weekend cloud
                        and DevOps batch was perfect for me. The labs
                        are realistic and the trainer shared practical
                        checklists I still use at work every day.
                      </p>

                      <div className="testimonial__person">
                        <span className="avatar avatar--d" aria-hidden="true">FV</span>

                        <span>
                          <span className="testimonial__name">Faizan Vora</span>
                          <span className="testimonial__meta">Cloud Computing &DevOps</span>
                        </span>
                      </div>

                    </div>
                  </li>

                  <li className="slider__slide">
                    <div className="testimonial">

                      <span className="testimonial__quote" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
                        </svg>
                      </span>

                      <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="testimonial__text">
                        The VFX &Animations changed how I approach
                        problems. The trainer explained concepts with
                        live examples and reviewed my project code
                        line by line. I built a portfolio I am
                        genuinely proud of.
                      </p>

                      <div className="testimonial__person">
                        <span className="avatar avatar--e" aria-hidden="true">AR</span>

                        <span>
                          <span className="testimonial__name">Ananya Raghavan</span>
                          <span className="testimonial__meta">VFX &Animations</span>
                        </span>
                      </div>

                    </div>
                  </li>

                  <li className="slider__slide">
                    <div className="testimonial">

                      <span className="testimonial__quote" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
                        </svg>
                      </span>

                      <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="testimonial__text">
                        My speaking confidence has completely changed.
                        Daily practice in a small group, recordings
                        of my own voice and honest feedback made more
                        difference than years of reading grammar books.
                      </p>

                      <div className="testimonial__person">
                        <span className="avatar avatar--a" aria-hidden="true">MD</span>

                        <span>
                          <span className="testimonial__name">Meera Deshpande</span>
                          <span className="testimonial__meta">Spoken English &Communication</span>
                        </span>
                      </div>

                    </div>
                  </li>

                  <li className="slider__slide">
                    <div className="testimonial">

                      <span className="testimonial__quote" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5 5C6.5 5 4 7.5 4 10.5V19h8v-8H7.8c0-1.6 1.1-2.9 2.7-3.2L9.5 5Zm10 0C16.5 5 14 7.5 14 10.5V19h8v-8h-4.2c0-1.6 1.1-2.9 2.7-3.2L19.5 5Z" />
                        </svg>
                      </span>

                      <div className="testimonial__stars" role="img" aria-label="Rated 5 out of 5 stars">
                        ★★★★★
                      </div>

                      <p className="testimonial__text">
                        The cyber security labs are what I loved most.
                        Working through the OWASP Top 10 in a safe
                        environment and writing a proper report taught
                        me more than any tutorial series.
                      </p>

                      <div className="testimonial__person">
                        <span className="avatar avatar--b" aria-hidden="true">RS</span>

                        <span>
                          <span className="testimonial__name">Rohit Sharma</span>
                          <span className="testimonial__meta">Cyber Security Essentials</span>
                        </span>
                      </div>

                    </div>
                  </li>

                </ul>
              </div>

              <div className="slider__controls">

                <button className="slider__btn"
                  type="button"
                  data-slider-prev
                  aria-label="Previous testimonials">

                  <svg viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>

                </button>

                <div className="slider__dots" data-slider-dots></div>

                <button className="slider__btn"
                  type="button"
                  data-slider-next
                  aria-label="Next testimonials">

                  <svg viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>

                </button>

              </div>
            </div>

            <div className="flex-center mt-2 reveal">
              <a className="btn btn--outline" href="/reviews">
                Read all student reviews
              </a>
            </div>

          </div>
        </section>
          <section className="section section--tint" id="brands">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Our network</span>
              <h2>Brands We've Empowered</h2>
              <p>Learners from our programmes now build and grow with teams at companies across India.</p>
            </div>
          </div>

          <div className="marquee reveal reveal-fade" role="region" aria-label="Brands our learners work with">
            <div className="marquee__track">
              <div className="marquee__group">
               
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/Bhima-jewellery.webp" alt="Bhima Jewellery" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/adcb-edtech.webp" alt="ADCB EdTech" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/Branding-Agency-in-Madurai-Whitelabel-Media-e1792753378166.webp" alt="Branding Agency in Madurai" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/hyundai.webp" alt="Hyundai" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/kcms.webp" alt="KCMs" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/suzuki.webp" alt="Suzuki" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/Tough-tribes.webp" alt="Tough Tribes" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/v2-trendy.webp" alt="V2 Trendy" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/vinfast.webp" alt="Vinfast" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/yamaha.webp" alt="Yamaha" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/yara-hypermarket.webp" alt="Yara Hypermarket" />
                </div>
              </div>


              <div className="marquee__group" aria-hidden="true">
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/White-Label-Logo-New-scaled.webp" alt="Whitelabel Media" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/Bhima-jewellery.webp" alt="Bhima Jewellery" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/adcb-edtech.webp" alt="ADCB EdTech" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/Branding-Agency-in-Madurai-Whitelabel-Media-e1792753378166.webp" alt="Branding Agency in Madurai" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/hyundai.webp" alt="Hyundai" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/kcms.webp" alt="KCMs" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/suzuki.webp" alt="Suzuki" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/Tough-tribes.webp" alt="Tough Tribes" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/v2-trendy.webp" alt="V2 Trendy" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/vinfast.webp" alt="Vinfast" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/yamaha.webp" alt="Yamaha" />
                </div>
                <div className="marquee__item">
                  <img className="marquee__logo" src="../assets/images/brands/yara-hypermarket.webp" alt="Yara Hypermarket" />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="section section--alt" id="faq">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>FAQ</span>
              <h2>FAQs – Whitehouse Academy Madurai</h2>
              <p>Cannot find your answer here? Send us a WhatsApp message and our admissions team will reply
                personally.</p>
            </div>

            <div className="faq" data-accordion="single">
              {faqs.map((faq, index) => (
                <div
                  className={`faq__item reveal reveal-up${index === 0 ? ' is-open' : ''}`}
                  key={faq.question}
                >
                  <h3 className="mb-0">
                    <button
                      className="faq__q"
                      type="button"
                      id={`faq-${index + 1}-btn`}
                      aria-expanded={index === 0}
                      aria-controls={`faq-${index + 1}`}
                    >
                      <span>{index + 1}. {faq.question}</span>
                      <span className="faq__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                      </span>
                    </button>
                  </h3>
                  <div className="faq__a" id={`faq-${index + 1}`} role="region" aria-labelledby={`faq-${index + 1}-btn`}>
                    <div className="faq__a-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


<section className="text-marquee">
  <div className="text-marquee__track">
    <span><FaRobot /> AI Video Editing</span>
    <span><FaCode /> Coding</span>
    <span><FaVideo /> Video Editing</span>
    <span><FaBullhorn /> Digital Marketing</span>
    <span><FaPalette /> Graphic Design</span>
    <span><FaFilm /> VFX and Animation</span>
    <span><FaCamera /> Drone Photography</span>

    {/* Duplicate for continuous marquee animation */}
    <span><FaRobot /> AI Video Editing</span>
    <span><FaCode /> Coding</span>
    <span><FaVideo /> Video Editing</span>
    <span><FaBullhorn /> Digital Marketing</span>
    <span><FaPalette /> Graphic Design</span>
    <span><FaFilm /> VFX and Animation</span>
    <span><FaCamera /> Drone Photography</span>
  </div>
</section>

        <section className="section">
          <div className="container">
            <div className="cta reveal reveal-zoom">
              <div className="cta__inner">
                <div>
                  <span className="eyebrow eyebrow--light"><span className="eyebrow__dot"></span>Next batch starts soon</span>
                  <h2>Talk to our admissions team today</h2>
                  <p>Tell us your goal and we will suggest the right course, share the batch schedule and explain the
                    fee options. No obligation, no pressure — just honest guidance.</p>
                </div>
                <div className="cta__actions">
                  <a className="btn btn--accent btn--lg" href="/contact">Contact Us</a>
                  <a className="btn btn--ghost-light btn--lg" href={getWhatsAppUrl({ topic: "the next batch schedule and fee options" })} data-wa data-wa-topic="the next batch schedule and fee options">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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


