const express = require("express");
const Admin = require("../models/Admin");
const Blog = require("../models/Blog");
const Course = require("../models/Course");
const Faq = require("../models/Faq");
const { requireAdmin, signToken } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { createResourceRouter } = require("../utils/crud");
const { uploadImage } = require("../utils/cloudinary");
const { fetchEnquiryRows } = require("../utils/sheets");

const router = express.Router();

// Shape of the administrator payload returned to the admin UI.
function presentAdmin(admin) {
  return {
    id: String(admin._id),
    name: admin.name,
    username: admin.username,
    phone: admin.phone || "",
    avatar: admin.avatar || "",
    role: admin.role,
  };
}

/* ------------------------------- Session ------------------------------ */

router.post("/login", async (req, res, next) => {
  try {
    const username = String(req.body.username || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Username and password are required." });
    }

    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.verifyPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    return res.json({
      success: true,
      token: signToken(admin),
      admin: presentAdmin(admin),
    });
  } catch (error) {
    return next(error);
  }
});

/* ----------------------------- Bootstrap ------------------------------ */

// Replaces the removed seed script: create or reset the CMS administrator.
// Call it from Postman with the setup key from .env.
router.post("/setup", async (req, res, next) => {
  try {
    const expectedKey = String(
      process.env.ADMIN_SETUP_KEY || process.env.JWT_SECRET || ""
    ).trim();

    if (!expectedKey || String(req.body.setupKey || "").trim() !== expectedKey) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid setup key." });
    }

    const username = String(req.body.username || process.env.ADMIN_EMAIL || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || process.env.ADMIN_PASSWORD || "");

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Username and password are required." });
    }

    const admin = await Admin.findOneAndUpdate(
      { username },
      {
        username,
        passwordHash: await Admin.hashPassword(password),
        name: String(req.body.name || "Administrator").trim() || "Administrator",
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({ success: true, admin: presentAdmin(admin) });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({ success: true, admin: presentAdmin(req.admin) });
});

/* -------------------------------- Profile ------------------------------ */

router.patch("/profile", requireAdmin, async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required." });
    }

    req.admin.name = name;
    req.admin.phone = String(req.body.phone || "").trim();
    req.admin.avatar = String(req.body.avatar || "").trim();

    await req.admin.save();

    return res.json({ success: true, admin: presentAdmin(req.admin) });
  } catch (error) {
    return next(error);
  }
});

router.post("/change-password", requireAdmin, async (req, res, next) => {
  try {
    const currentPassword = String(req.body.currentPassword || "");
    const newPassword = String(req.body.newPassword || "");

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long.",
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Account no longer exists." });
    }

    if (!(await admin.verifyPassword(currentPassword))) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect." });
    }

    admin.passwordHash = await Admin.hashPassword(newPassword);
    await admin.save();

    return res.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    return next(error);
  }
});

/* --------------------------- Content management ------------------------ */

router.use(
  "/blogs",
  requireAdmin,
  createResourceRouter(Blog, {
    nameField: "title",
    searchFields: ["title", "category", "excerpt"],
    sort: { createdAt: -1 },
  })
);

router.use(
  "/courses",
  requireAdmin,
  createResourceRouter(Course, {
    nameField: "title",
    searchFields: ["title", "categoryLabel", "summary"],
    sort: { order: 1, createdAt: 1 },
  })
);

router.use(
  "/faqs",
  requireAdmin,
  createResourceRouter(Faq, {
    nameField: "question",
    searchFields: ["question", "answer"],
    sort: { scope: 1, order: 1, createdAt: 1 },
  })
);

/* ------------------------------- Uploads ------------------------------- */

router.post("/upload", requireAdmin, upload.single("image"), async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Select an image to upload." });
  }

  try {
    const result = await uploadImage(req.file.buffer);

    return res.status(201).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    return next(error);
  }
});

/* ------------------------------ Enquiries ------------------------------ */

// Enquiries live in a Google Sheet; the admin UI reads them through this proxy.
router.get("/enquiries", requireAdmin, async (req, res, next) => {
  try {
    const enquiries = await fetchEnquiryRows();

    if (req.query.status) {
      const status = String(req.query.status).toLowerCase();
      return res.json(
        enquiries.filter((enquiry) => enquiry.status.toLowerCase() === status)
      );
    }

    return res.json(enquiries);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
