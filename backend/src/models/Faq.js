const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    // "general" -> home page FAQ, "course" -> course detail page FAQ
    scope: { type: String, enum: ["general", "course"], default: "general" },
    // Empty string means the FAQ applies to every course.
    courseSlug: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

faqSchema.index({ scope: 1, courseSlug: 1, order: 1 });

faqSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Faq", faqSchema);
