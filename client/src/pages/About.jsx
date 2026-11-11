import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSiteEffects, getWhatsAppUrl } from '../hooks/useSiteEffects';
import {
  FaRobot,
  FaCode,
  FaVideo,
  FaBullhorn,
  FaPalette,
  FaFilm,
  FaCamera
} from 'react-icons/fa';


/**
 * About page converted from the supplied about.html.
 * Keep image files in public/images/ and preserve the original CSS in src/css/.
 */
export default function About() {
  useSiteEffects();

  return (
    <>
      <Navbar activePage="about" />

      <main id="main">


        <section className="page-hero">
          <div className="container page-hero__inner reveal reveal-up">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li><a href="/">Home</a></li>
                <li aria-current="page">About Us</li>
              </ol>
            </nav>
            <span className="eyebrow eyebrow--light"><span className="eyebrow__dot"></span>About Whitehouse</span>
            <h1>We Make Learning Fit Your Life</h1>
            <p>
              Whitehouse, the education institute of Whitelabel Media in Madurai, offers practical, industry-focused courses in digital marketing, design, coding, and media. Gain professional skills through hands-on live projects, expert career guidance, and 100% placement assistance to build your career with confidence.
            </p>
          </div>
        </section>


        <section className="section" id="institute-intro">
          <div className="container split">
            <div className="split__media split__media-stack reveal reveal-left">
              <div className="ratio ratio--4-3">
                <img src="../assets/images/about/12_9_11zon-scaled.webp" alt="Modern educational campus building with a glass facade and students walking outside"
                  width="900" height="675" loading="lazy" decoding="async" />
              </div>
             
            </div>

            <div className="reveal reveal-right reveal-d1">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Who we are</span>
              <h2>A learning institute founded by trainers and working professionals</h2>
              <p className="lead">
                Whitehouse began in 2014 as a small weekend classroom in Bengaluru and grew into a
                full-fledged training institute serving learners across India. Our founders were practitioners who felt
                that most training had become passive, so they built a school that teaches in small classroom batches,
                answers questions in real time and measures success by what learners can actually build and do.
              </p>
              <ul className="check-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>Live, interactive classes with a practising trainer in every batch.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>Small groups so every doubt is answered and every learner is tracked.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>A project-driven curriculum reviewed every quarter with hiring teams.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>Mentor and placement support that continues after the course ends.</span>
                </li>
              </ul>
              <div className="btn-group mt-2">
                <a className="btn btn--primary" href="/courses">Browse our courses</a>
                <a className="btn btn--outline" href="/contact">Talk to our team</a>
              </div>
            </div>
          </div>
        </section>


        <section className="section section--alt" id="mission-vision">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Mission&vision</span>
              <h2>What drives us every single day</h2>
              <p>Three ideas shape how we design courses, train our trainers and support every learner who joins
                Whitehouse.</p>
            </div>

            <div className="grid grid--3">
              <div className="card reveal reveal-up">
                <span className="card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7Z" /><path d="M12 22V12" /><path d="m3 7 9 5 9-5" /></svg>
                </span>
                <h3>Our mission</h3>
                <p>To make high-quality, career-focused education affordable and accessible, so that any motivated
                  learner — regardless of city or background — can gain the practical skills employers actually hire
                  for.</p>
              </div>

              <div className="card reveal reveal-up reveal-d1">
                <span className="card__icon card__icon--accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                </span>
                <h3>Our vision</h3>
                <p>To become India's most trusted training institute for job-ready skills, known for honest guidance,
                  measurable learner outcomes and a mentor community that stays with learners throughout their careers.</p>
              </div>

              <div className="card reveal reveal-up reveal-d2">
                <span className="card__icon card__icon--teal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-9-9.5A5 5 0 0 1 12 6a5 5 0 0 1 9 5.5C19 16.5 12 21 12 21Z" /></svg>
                </span>
                <h3>Our values</h3>
                <p>Clarity over jargon, practice over theory and honesty over hype. We teach in plain language, keep our
                  promises realistic and treat every learner's time and money with genuine respect.</p>
              </div>
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
                  <img className="marquee__logo" src="../assets/images/brands/WhiteLabel-Logo-Final.webp" alt="Whitelabel Media" />
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

        <section className="section" id="methodology">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Our Values</span>
              <h2>Learn Today. Lead Tomorrow.</h2>
              <p>Driven by Purpose:
                To empower learners with practical skills, creative thinking, and industry knowledge for career growth.</p>
            </div>

            <div className="grid grid--4">
              <div className="step reveal reveal-up">
                <span className="step__num">01</span>
                <h3>Learn Faster. Grow Smarter.</h3>
                <p>We combine practical learning with modern tools to help learners build skills efficiently and stay ahead in the evolving digital world</p>
              </div>

              <div className="step reveal reveal-up reveal-d1">
                <span className="step__num">02</span>
                <h3>Practice Today. Succeed Tomorrow.</h3>
                <p>We focus on hands-on training and industry-relevant skills that prepare learners for real-world challenges and career opportunities.</p>
              </div>

              <div className="step reveal reveal-up reveal-d2">
                <span className="step__num">03</span>
                <h3>Learning Without Limits</h3>
                <p>We believe everyone deserves the opportunity to learn, grow, and build a brighter future through accessible digital education and practical skills.</p>
              </div>

              <div className="step reveal reveal-up reveal-d3">
                <span className="step__num">04</span>
                <h3>Your Growth Is Our Priority</h3>
                <p>We guide learners at every stage with continuous support, practical guidance, and encouragement to achieve their learning and career goals.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="section section--alt" id="why-students">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Easy Steps to Start</span>
              <h2>Your Learning Journey Begins Here</h2>
              <p>Choose your course, learn from experts, gain practical skills, and take the next step towards your dream career.</p>
            </div>

            <div className="grid grid--auto">
              <div className="value-card reveal reveal-up">
                <span className="value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></svg>
                </span>
                <div>
                  <h3>Find Your Passion. Build Your Future.</h3>
                  <p>Explore courses in digital marketing, graphic design, coding, video editing, AI, and drone technology to match your interests and career goals.</p>
                </div>
              </div>

              <div className="value-card reveal reveal-up reveal-d1">
                <span className="value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2" /><path d="m10 9 5 3-5 3Z" /><path d="M8 21h8" /></svg>
                </span>
                <div>
                  <h3>Learn Your Way. Grow Every Day.</h3>
                  <p>Build your skills at a comfortable pace with practical training, guided learning, and expert career guidance designed around your goals.</p>
                </div>
              </div>

              <div className="value-card reveal reveal-up reveal-d2">
                <span className="value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                </span>
                <div>
                  <h3>Turn Knowledge into Skills</h3>
                  <p>Gain hands-on experience through practical projects that help you apply what you learn and prepare for real-world challenges.</p>
                </div>
              </div>

              <div className="value-card reveal reveal-up">
                <span className="value-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
                </span>
                <div>
                  <h3>Celebrate Your Achievement</h3>
                  <p>Earn a certificate upon successful course completion and benefit from 100% placement assistance to take the next step towards your professional goals with confidence.</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        <section className="section" id="trainers">
          <div className="container">
            <div className="section-head section-head--center reveal reveal-up">
              <span className="eyebrow"><span className="eyebrow__dot"></span>Our Teacher</span>
              <h2>Expert Guidance. Real-World Skills.</h2>
              <p>Gain practical knowledge, industry insights, and hands-on experience from skilled mentors who help you turn your learning into career opportunities.</p>
            </div>

            <p className="text-center muted reveal">
              All our trainers are working professionals in their respective fields, which keeps lessons current and
              industry-relevant. The trainer profiles shown here are illustrative placeholders for this demonstration
              site and will be replaced with verified details.
            </p>

            <div className="grid grid--4 mt-3">

              <article className="trainer-card reveal reveal-zoom">
                <div className="trainer-card__media">
                  <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20corporate%20headshot%20of%20a%20friendly%20indian%20male%20software%20trainer%20wearing%20a%20navy%20blazer%2C%20plain%20light%20studio%20background&;image_size=portrait_4_3"
                    alt="Portrait of Aarav Iyer, full-stack web development trainer"
                    width="600" height="450" loading="lazy" decoding="async" />
                </div>
                <div className="trainer-card__body">
                  <h3>Aarav Iyer</h3>
                  <span className="trainer-card__role">Lead Trainer — Full-Stack Web Development</span>
                  <p>Eleven years of building web products, now teaching full-stack development. Aarav explains complex
                    architecture with simple analogies and reviews every learner's code personally.</p>
                  <div className="trainer-card__tags">
                    <span className="badge">HTML&CSS</span>
                    <span className="badge">JavaScript</span>
                    <span className="badge">Node.js</span>
                  </div>
                </div>
              </article>


              <article className="trainer-card reveal reveal-zoom reveal-d1">
                <div className="trainer-card__media">
                  <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20corporate%20headshot%20of%20a%20smiling%20indian%20female%20instructor%20in%20business%20attire%2C%20plain%20light%20studio%20background&;image_size=portrait_4_3"
                    alt="Portrait of Riya Kapoor, UI and UX design trainer"
                    width="600" height="450" loading="lazy" decoding="async" />
                </div>
                <div className="trainer-card__body">
                  <h3>Riya Kapoor</h3>
                  <span className="trainer-card__role">Senior Trainer — UI/UX Design</span>
                  <p>A designer-turned-mentor with nine years of product design experience. Riya teaches research,
                    wireframing and prototyping through live critiques of student work.</p>
                  <div className="trainer-card__tags">
                    <span className="badge">User Research</span>
                    <span className="badge">Wireframing</span>
                    <span className="badge">Prototyping</span>
                  </div>
                </div>
              </article>


              <article className="trainer-card reveal reveal-zoom reveal-d2">
                <div className="trainer-card__media">
                  <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20corporate%20headshot%20of%20a%20confident%20young%20indian%20male%20developer%20wearing%20glasses%20and%20a%20formal%20shirt%2C%20plain%20light%20studio%20background&;image_size=portrait_4_3"
                    alt="Portrait of Rohan Verma, cloud and cyber security trainer"
                    width="600" height="450" loading="lazy" decoding="async" />
                </div>
                <div className="trainer-card__body">
                  <h3>Rohan Verma</h3>
                  <span className="trainer-card__role">Senior Instructor — Cloud&Cyber Security</span>
                  <p>Specialises in cloud infrastructure and defensive security. Rohan runs hands-on labs and shows
                    learners how real incidents are investigated step by step.</p>
                  <div className="trainer-card__tags">
                    <span className="badge">Cloud</span>
                    <span className="badge">DevOps</span>
                    <span className="badge">Security</span>
                  </div>
                </div>
              </article>


              <article className="trainer-card reveal reveal-zoom reveal-d3">
                <div className="trainer-card__media">
                  <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20corporate%20headshot%20of%20a%20professional%20indian%20woman%20data%20science%20instructor%20in%20smart%20attire%2C%20plain%20light%20studio%20background&;image_size=portrait_4_3"
                    alt="Portrait of Priya Nair, data science and analytics trainer"
                    width="600" height="450" loading="lazy" decoding="async" />
                </div>
                <div className="trainer-card__body">
                  <h3>Priya Nair</h3>
                  <span className="trainer-card__role">Lead Instructor — Data Science&Analytics</span>
                  <p>A practising analytics mentor with a decade of experience. Priya makes statistics approachable and
                    guides learners from raw data all the way to a finished dashboard.</p>
                  <div className="trainer-card__tags">
                    <span className="badge">Python</span>
                    <span className="badge">SQL</span>
                    <span className="badge">Machine Learning</span>
                  </div>
                </div>
              </article>
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
                  <span className="eyebrow eyebrow--light"><span className="eyebrow__dot"></span>Start your journey</span>
                  <h2>Ready to learn with trainers who care about your outcome?</h2>
                  <p>Tell us your goal and our admissions team will recommend the right course, share the batch schedule
                    and explain the fee options. No obligation, no pressure — just honest guidance.</p>
                </div>
                <div className="cta__actions">
                  <a className="btn btn--accent btn--lg" href="/contact">Contact Us</a>
                  <a className="btn btn--ghost-light btn--lg" href={getWhatsAppUrl({ topic: "your courses and admission process" })} data-wa data-wa-topic="your courses and admission process">
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


