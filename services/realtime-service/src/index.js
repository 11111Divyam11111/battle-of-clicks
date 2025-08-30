const express = require("express");
const cors = require("cors");          // ✅ add cors
const { Server } = require("socket.io");
const http = require("http");
const redis = require("./redisClient");
require("dotenv").config();

const app = express();
app.use(cors({origin : "*"}));                        // ✅ enable CORS for HTTP routes
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } }); // ✅ Socket.IO CORS

// Broadcast score updates every 1 second
setInterval(async () => {
  try {
    const red = parseInt(await redis.get("clicks:red")) || 0;
    const blue = parseInt(await redis.get("clicks:blue")) || 0;
    io.emit("score:update", { red, blue, total: red + blue });
  } catch (err) {
    console.error("❌ Error broadcasting score:", err);
  }
}, 1000);

server.listen(4003, () => console.log("🚀 realtime-service running on port 4003"));
