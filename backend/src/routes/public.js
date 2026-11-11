const express = require("express");
const Blog = require("../models/Blog");
const Course = require("../models/Course");
const Faq = require("../models/Faq");
const { escapeRegex } = require("../utils/crud");
const { appendEnquiryRow } = require("../utils/sheets");
const { sendEnquiryMail } = require("../utils/mailer");

const router = express.Router();

/* ------------------------------- Blogs ------------------------------- */

router.get("/blogs", async (req, res, next) => {
  try {
    const filter = { published: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      const pattern = new RegExp(escapeRegex(req.query.search), "i");
      filter.$or = [
        { title: pattern },
        { excerpt: pattern },
        { category: pattern },
        { tags: pattern },
      ];
    }

    const blogs = await Blog.find(filter).sort({
      publishedAt: -1,
      createdAt: -1,
    });

    res.json(blogs.map((blog) => blog.toJSON()));
  } catch (error) {
    next(error);
  }
});

router.get("/blogs/:slug", async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found or not published." });
    }

    return res.json(blog.toJSON());
  } catch (error) {
    return next(error);
  }
});

/* ------------------------------ Courses ------------------------------ */

router.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.find({ published: true }).sort({
      order: 1,
      createdAt: 1,
    });

    res.json(courses.map((course) => course.toJSON()));
  } catch (error) {
    next(error);
  }
});

router.get("/courses/:slug", async (req, res, next) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    return res.json(course.toJSON());
  } catch (error) {
    return next(error);
  }
});

/* -------------------------------- FAQs ------------------------------- */

router.get("/faqs", async (req, res, next) => {
  try {
    const filter = { published: true };

    if (req.query.scope) {
      filter.scope = req.query.scope;
    }

    // When a course slug is given, return that course's FAQs plus the ones
    // that are shared by every course.
    if (req.query.courseSlug !== undefined) {
      filter.$or = [
        { courseSlug: String(req.query.courseSlug) },
        { courseSlug: "" },
      ];
    }

    const faqs = await Faq.find(filter).sort({ order: 1, createdAt: 1 });

    res.json(faqs.map((faq) => faq.toJSON()));
  } catch (error) {
    next(error);
  }
});

/* ----------------------------- Enquiries ----------------------------- */

router.post("/enquiries", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").trim();
    const email = String(req.body.email || "").trim();

    if (!name || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Name and phone number are required." });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid e-mail address." });
    }

    const enquiry = {
      name,
      phone,
      email,
      city: String(req.body.city || "").trim(),
      gender: String(req.body.gender || "").trim(),
      course: String(req.body.course || "").trim(),
      message: String(req.body.message || "").trim(),
      source: String(req.body.source || "website").trim(),
      createdAt: new Date().toISOString(),
    };

    const [mailResult, sheetResult] = await Promise.allSettled([
      sendEnquiryMail(enquiry),
      appendEnquiryRow(enquiry),
    ]);

    if (mailResult.status === "rejected") {
      console.error("[enquiry] e-mail delivery failed:", mailResult.reason.message);
    }

    if (sheetResult.status === "rejected") {
      console.error("[enquiry] Google Sheet write failed:", sheetResult.reason.message);
    }

    if (mailResult.status === "rejected" && sheetResult.status === "rejected") {
      return res.status(502).json({
        success: false,
        message:
          "We could not record your enquiry right now. Please call or message us on WhatsApp.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Thank you! Your enquiry has been received.",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
