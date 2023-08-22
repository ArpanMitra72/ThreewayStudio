const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String, required: true },
});
module.exports = mongoose.model("Order", orderSchema);
