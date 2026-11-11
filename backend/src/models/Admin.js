const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Administrator" },
    phone: { type: String, default: "", trim: true },
    avatar: { type: String, default: "", trim: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
  },
  { timestamps: true }
);

adminSchema.methods.verifyPassword = function verifyPassword(plain) {
  return bcrypt.compare(String(plain), this.passwordHash);
};

adminSchema.statics.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(String(plain), 10);
};

module.exports = mongoose.model("Admin", adminSchema);
