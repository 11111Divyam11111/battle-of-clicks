// realtime-service/src/index.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const redis = require("./redisClient");

const app = express();
app.use(cors()); // Enable CORS
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins
});

io.on("connection", (socket) => {
  console.log("⚡ A client connected");

  // Emit current score every 2 seconds
  const interval = setInterval(async () => {
    const red = parseInt(await redis.get("red") || "0");
    const blue = parseInt(await redis.get("blue") || "0");
    socket.emit("scoreUpdate", { red, blue, total: red + blue });
  }, 2000);

  socket.on("disconnect", () => {
    console.log("⚡ A client disconnected");
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 4003;
server.listen(PORT, () => console.log(`✅ Realtime service running on port ${PORT}`));
