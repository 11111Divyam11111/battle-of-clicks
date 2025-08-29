// click-service/src/index.js
const express = require("express");
const cors = require("cors");
const redis = require("./redisClient");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// POST /click
app.post("/click", async (req, res) => {
  try {
    const { team } = req.body;
    if (!team) return res.status(400).json({ error: "Team is required" });

    await redis.incr(team); // increment Redis counter
    res.json({ message: "Click recorded" });
  } catch (err) {
    console.error("❌ Error processing click:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /score
app.get("/score", async (req, res) => {
  try {
    const red = parseInt(await redis.get("red") || "0");
    const blue = parseInt(await redis.get("blue") || "0");
    res.json({ red, blue, total: red + blue });
  } catch (err) {
    console.error("❌ Error getting score:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`✅ Click service running on port ${PORT}`));
