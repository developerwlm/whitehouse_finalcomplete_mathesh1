const { v2: cloudinary } = require("cloudinary");

const FOLDER = "whitehouse";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function assertConfigured() {
  const { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret } = cloudinary.config();

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured.");
  }
}

/**
 * Uploads an in-memory image buffer to Cloudinary and resolves with the result.
 */
function uploadImage(buffer) {
  assertConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: FOLDER, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    stream.end(buffer);
  });
}

module.exports = { uploadImage };
