const mongoose = require("mongoose");

const syllabusModuleSchema = new mongoose.Schema(
  {
    module: { type: String, default: "" },
    topics: { type: [String], default: [] },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "", trim: true },
    categoryLabel: { type: String, default: "", trim: true },
    level: { type: String, default: "" },
    duration: { type: String, default: "" },
    mode: { type: String, default: "" },
    batch: { type: String, default: "" },
    language: { type: String, default: "" },
    certificate: { type: String, default: "" },
    seats: { type: String, default: "" },
    fee: { type: String, default: "" },
    oldFee: { type: String, default: "" },
    image: { type: String, default: "" },
    alt: { type: String, default: "" },
    summary: { type: String, default: "" },
    intro: { type: [String], default: [] },
    eligibility: { type: [String], default: [] },
    outcomes: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    careers: { type: [String], default: [] },
    syllabus: { type: [syllabusModuleSchema], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.index({ published: 1, order: 1 });

courseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Course", courseSchema);
