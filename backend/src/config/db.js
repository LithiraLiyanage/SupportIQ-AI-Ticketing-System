const mongoose = require("mongoose");

module.exports = async () => {
  const envUri = process.env.MONGO_URI;
  const defaultUri = "mongodb://localhost:27017/supportiq_ai_ticketing";
  let uri = envUri || defaultUri;

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected ->", uri);
    return;
  } catch (err) {
    console.warn(`Failed to connect to MongoDB at ${uri}:`, err && err.message ? err.message : err);
    console.warn("Falling back to in-memory MongoDB (mongodb-memory-server) for development/testing.");
  }
  // If user wants to skip the in-memory Mongo download (e.g., offline/dev), respect env flag.
  if (process.env.SKIP_MONGO_MEMORY === 'true') {
    console.warn('SKIP_MONGO_MEMORY=true - skipping mongodb-memory-server fallback. Running without DB.');
    return;
  }

  // Fallback: start an in-memory MongoDB instance so the app can run without an external DB.
  try {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    await mongoose.connect(memUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to in-memory MongoDB ->", memUri);
  } catch (memErr) {
    console.error("In-memory MongoDB start failed:", memErr);
    throw memErr;
  }
};
