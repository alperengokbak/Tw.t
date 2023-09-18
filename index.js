import express from "express";
import tweetRoutes from "./src/routes/TweetRoute.js";
import userRoutes from "./src/routes/UserRoute.js";
import widgetRoutes from "./src/routes/WidgetRoute.js";
import profileRoutes from "./src/routes/ProfileRoute.js";
import userProcessRoute from "./src/routes/UserProcessRoute.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to the chat");

  socket.on("send_message", (data) => {
    socket.broadcast.emit("message", "A user has joined the chat");
  });
  socket.on("disconnect", () => {
    io.emit("message", "User has left the chat");
  });
});

app.use("/auth", userRoutes);
app.use("/", userProcessRoute);
app.use("/tweet", tweetRoutes);
app.use("/", widgetRoutes);
app.use("/profile", profileRoutes);

server.listen(port, () => console.log(`App running on port ${port}`));
