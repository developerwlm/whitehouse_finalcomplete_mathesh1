function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Builds a slug from `value` that is not already used by another document.
 * `excludeId` lets an update keep its own current slug.
 */
async function buildUniqueSlug(Model, value, excludeId) {
  const base = slugify(value) || `item-${Date.now()}`;
  let candidate = base;
  let counter = 2;

  // Loops only while the candidate collides with an existing document.
  while (
    await Model.exists({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  return candidate;
}

module.exports = { slugify, buildUniqueSlug };
