const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, default: "" },
    
    content: { type: String, default: "" },
    category: { type: String, default: "General", trim: true },
    tags: { type: [String], default: [] },
    metaTitle: { type: String, default: "", trim: true },
    metaDescription: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    author: { type: String, default: "Whitehouse Team" },
    readTime: { type: String, default: "" },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

blogSchema.index({ published: 1, publishedAt: -1 });

blogSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
