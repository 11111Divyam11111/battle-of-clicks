// aggregator-service/src/index.js
const express = require("express");
const cors = require("cors");
const redis = require("./redisClient");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Save a snapshot (simulating database save)
app.post("/snapshot", async (req, res) => {
  try {
    const red = parseInt(await redis.get("red") || "0");
    const blue = parseInt(await redis.get("blue") || "0");
    const total = red + blue;

    console.log(`💾 Snapshot saved: red=${red}, blue=${blue}, total=${total}`);
    res.json({ red, blue, total, message: "Snapshot saved" });
  } catch (err) {
    console.error("❌ Error saving snapshot:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`✅ Aggregator service running on port ${PORT}`));
