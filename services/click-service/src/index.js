// click-service/src/index.js
const express = require("express");
const cors = require("cors"); // ✅ import cors
const redis = require("./redisClient");

const app = express();

// ✅ Enable CORS for all origins
app.use(cors({origin : "*"}));    

// ✅ Parse JSON request bodies
app.use(express.json());

app.post("/click", async (req, res) => {
  try {
    const { team } = req.body;
    if (!team) return res.status(400).json({ message: "team is required" });

    // Increment Redis counter
    await redis.incr(`clicks:${team}`);

    const red = parseInt(await redis.get("clicks:red")) || 0;
    const blue = parseInt(await redis.get("clicks:blue")) || 0;

    res.json({
      message: "Click recorded ✅",
      red,
      blue,
      total: red + blue,
    });
  } catch (err) {
    console.error("❌ Error processing click:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/score", async (req, res) => {
  try {
    const red = parseInt(await redis.get("clicks:red")) || 0;
    const blue = parseInt(await redis.get("clicks:blue")) || 0;
    res.json({ red, blue, total: red + blue });
  } catch (err) {
    console.error("❌ Error fetching score:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4001, () => console.log("🚀 click-service running on port 4001"));
