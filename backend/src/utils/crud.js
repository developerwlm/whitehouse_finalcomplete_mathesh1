const express = require("express");
const { buildUniqueSlug } = require("./slugify");

const PROTECTED_FIELDS = ["_id", "id", "__v", "createdAt", "updatedAt"];

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitize(body = {}) {
  const payload = { ...body };

  PROTECTED_FIELDS.forEach((field) => {
    delete payload[field];
  });

  return payload;
}

/**
 * Builds the standard admin CRUD routes for a collection.
 * All routes must be mounted behind `requireAdmin`.
 */
function createResourceRouter(Model, options = {}) {
  const {
    nameField = "title",
    slugField = "slug",
    searchFields = [nameField],
    sort = { order: 1, createdAt: -1 },
    beforeWrite,
  } = options;

  const hasSlug = Boolean(Model.schema.path(slugField));
  const hasPublishedAt = Boolean(Model.schema.path("publishedAt"));
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const filter = {};

      if (req.query.search && searchFields.length) {
        const pattern = new RegExp(escapeRegex(req.query.search), "i");
        filter.$or = searchFields.map((field) => ({ [field]: pattern }));
      }

      const docs = await Model.find(filter).sort(sort).lean();

      res.json(docs.map((doc) => ({ ...doc, id: String(doc._id) })));
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);

      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found." });
      }

      return res.json(doc.toJSON());
    } catch (error) {
      return next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const payload = sanitize(req.body);

      if (hasSlug) {
        payload[slugField] = await buildUniqueSlug(
          Model,
          payload[slugField] || payload[nameField]
        );
      }

      if (beforeWrite) {
        beforeWrite(payload, null, req);
      }

      const doc = await Model.create(payload);

      res.status(201).json(doc.toJSON());
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);

      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found." });
      }

      const payload = sanitize(req.body);

      if (hasSlug) {
        payload[slugField] = await buildUniqueSlug(
          Model,
          payload[slugField] || doc[slugField],
          doc._id
        );
      }

      if (hasPublishedAt && payload.published === true && !doc.publishedAt) {
        payload.publishedAt = new Date();
      }

      if (beforeWrite) {
        beforeWrite(payload, doc, req);
      }

      doc.set(payload);
      await doc.save();

      return res.json(doc.toJSON());
    } catch (error) {
      return next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found." });
      }

      return res.json({ success: true, message: "Deleted successfully." });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createResourceRouter, escapeRegex };
