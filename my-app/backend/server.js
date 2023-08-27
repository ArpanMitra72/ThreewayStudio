const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const usersRoutes = require("./routers/users");
const orderRoutes = require("./routers/orders");

var app = express();
var PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://arpanmitra2022:eBZ9CnwojMl4zyJO@myapp.ccjul7d.mongodb.net/myapp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.use("/auth", usersRoutes);
app.use("/orders", orderRoutes);

io.on("connection", (socket) => {
  console.log("Socket connected: " + socket.id);

  // Listen for new order notifications
  socket.on("newOrderNotification", (transporterId) => {
    console.log(`Received newOrderNotification from: ${socket.id}`);
    console.log("Transporter ID:", transporterId);
    // Notify the specific transporter
    console.log("Emitting newOrder event to transporter:", transporterId);
    // Notify the specific transporter
    console.log(`Received newOrderNotification from: ${socket.id}`);
    socket.to(transporterId).emit("newOrder", "You have a new order!");
  });

  // Join a specific room based on the user's ID (if needed)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // Other event listeners and handlers
});
