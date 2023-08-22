const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routers/users");
const orderRoutes = require("./routers/orders");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.use("/auth", usersRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
