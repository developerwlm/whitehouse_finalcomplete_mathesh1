const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function getSecret() {
  return process.env.JWT_SECRET || "whitehouse-dev-secret-change-me";
}

function signToken(admin) {
  return jwt.sign(
    {
      id: String(admin._id),
      username: admin.username,
      name: admin.name,
      role: admin.role,
    },
    getSecret(),
    { expiresIn: JWT_EXPIRES_IN }
  );
}

async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, getSecret());
    const admin = await Admin.findById(payload.id).select(
      "name username phone avatar role"
    );

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Account no longer exists." });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Session expired. Please sign in again." });
  }
}

module.exports = { requireAdmin, signToken };
