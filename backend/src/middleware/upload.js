const multer = require("multer");

// Images are buffered in memory and streamed straight to Cloudinary, so
// nothing is written to the local disk.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files can be uploaded."));
    }
    return callback(null, true);
  },
});

module.exports = { upload };
