// aggregator-service/src/index.js
const Redis = require("./redisClient");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const SNAPSHOT_INTERVAL_MS = parseInt(process.env.SNAPSHOT_INTERVAL_MS) || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017";

async function runAggregator() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db("boc");
  const snapshots = db.collection("snapshots");
  console.log("✅ Connected to MongoDB");

  setInterval(async () => {
    try {
      const red = parseInt(await Redis.get("clicks:red")) || 0;
      const blue = parseInt(await Redis.get("clicks:blue")) || 0;
      const total = red + blue;

      await snapshots.insertOne({ red, blue, total, timestamp: new Date() });
      console.log(`💾 Snapshot saved: red=${red}, blue=${blue}, total=${total}`);
    } catch (err) {
      console.error("❌ Error saving snapshot:", err);
    }
  }, SNAPSHOT_INTERVAL_MS);
}

runAggregator().catch(err => console.error("❌ Aggregator error:", err));
