const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/whitehouse";

async function connectDatabase() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`[db] connected to ${mongoose.connection.name}`);

  return mongoose.connection;
}

module.exports = { connectDatabase, MONGODB_URI };
