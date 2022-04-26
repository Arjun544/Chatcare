const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const server = require("http").createServer(app);
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { socketInit } = require("./socket");

const authRoutes = require("./routes/auth_routes");
const userRoutes = require("./routes/user_routes");
const conversationRoutes = require("./routes/conversation_routes");
const messageRoutes = require("./routes/message_routes");



// Sooket Connection
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Socket Connection
socketInit(io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Chatcare API");
});

app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/conversation/", conversationRoutes);
app.use("/api/message/", messageRoutes);

server.listen(5000, () => {
  console.log("Server started on port 5000");
});