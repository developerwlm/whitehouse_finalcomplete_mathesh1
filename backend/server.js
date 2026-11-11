require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { connectDatabase } = require("./src/db");
const publicRoutes = require("./src/routes/public");
const adminRoutes = require("./src/routes/admin");

const app = express();
const PORT = Number(process.env.PORT) || 4000;

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (curl, Postman, server-to-server)
      // and any origin when the allow list is empty are accepted.
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`[cors] blocked origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const SITE_URL = "http://localhost:3000";
const ADMIN_URL = "http://localhost:3001";

const ENDPOINTS = [
  ["GET", "/api/health", "Service status"],
  ["GET", "/api/blogs", "Published blog posts"],
  ["GET", "/api/courses", "Published courses"],
  ["GET", "/api/faqs", "FAQs for the home and course pages"],
  ["POST", "/api/enquiries", "Send an enquiry e-mail and add a Google Sheet row"],
  ["POST", "/api/admin/login", "Admin sign-in"],
  ["PATCH", "/api/admin/profile", "Update the admin name, phone and photo"],
  ["POST", "/api/admin/upload", "Upload an image to Cloudinary"],
];

const LANDING_PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Whitehouse API</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 48px 20px;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: #f6f7fb;
        color: #16181d;
      }
      main { max-width: 760px; margin: 0 auto; }
      h1 { margin: 0 0 4px; font-size: 26px; }
      .status {
        display: inline-block;
        margin: 0 0 24px;
        padding: 4px 10px;
        border-radius: 999px;
        background: #e6f6ec;
        color: #1a7f45;
        font-size: 13px;
        font-weight: 600;
      }
      .links { display: flex; flex-wrap: wrap; gap: 12px; margin: 0 0 28px; }
      .links a {
        padding: 10px 18px;
        border-radius: 8px;
        background: #1e5eff;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
      }
      .links a.secondary { background: #fff; color: #1e5eff; border: 1px solid #c9d6ff; }
      h2 { font-size: 15px; text-transform: uppercase; letter-spacing: .06em; color: #6b7280; margin: 0 0 12px; }
      ul { list-style: none; margin: 0; padding: 0; background: #fff; border: 1px solid #e5e7ef; border-radius: 12px; overflow: hidden; }
      li { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-top: 1px solid #eef0f6; font-size: 14px; }
      li:first-child { border-top: 0; }
      li span.verb { min-width: 56px; font-weight: 700; color: #1e5eff; font-size: 12px; }
      li code { font-family: Consolas, Monaco, monospace; font-size: 13px; }
      li span.desc { margin-left: auto; color: #6b7280; font-size: 13px; text-align: right; }
    </style>
  </head>
  <body>
    <main>
      <h1>Whitehouse API</h1>
      <p class="status">● Running on port ${PORT}</p>
      <p class="links">
        <a href="${SITE_URL}">Open website →</a>
        <a class="secondary" href="${ADMIN_URL}">Open admin panel →</a>
      </p>
      <h2>Endpoints</h2>
      <ul>
        ${ENDPOINTS.map(
          ([verb, path, description]) =>
            `<li><span class="verb">${verb}</span><code>${path}</code><span class="desc">${description}</span></li>`
        ).join("\n        ")}
      </ul>
    </main>
  </body>
</html>`;

app.get("/", (_req, res) => {
  res.type("html").send(LANDING_PAGE);
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok", time: new Date().toISOString() });
});

app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found.`,
  });
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Image must be 5 MB or smaller."
          : error.message,
    });
  }

  const status = ["ValidationError", "CastError"].includes(error.name)
    ? 400
    : error.status || 500;

  if (status >= 500) {
    console.error("[api] error:", error);
  }

  return res
    .status(status)
    .json({ success: false, message: error.message || "Unexpected server error." });
});

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`[api] listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[api] failed to start:", error.message);
    process.exit(1);
  }
}

start();

module.exports = app;
