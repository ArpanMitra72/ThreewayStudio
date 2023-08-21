const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routers/auth");
const orderRoutes = require("./routers/orders");

const app = express();

app.use(express.json());
app.use(cors());
