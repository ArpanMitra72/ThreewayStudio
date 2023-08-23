const Order = require("../models/Order");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
      console.error("Error creating order:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the order" });
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },
  sendReply: async (req, res) => {
    const { orderId, reply, price } = req.body;

    try {
      // Fetch the order by ID
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Update the order with the reply and price
      order.reply = reply;
      order.price = price;

      // Save the updated order
      await order.save();

      res.status(200).json({ message: "Reply sent successfully" });
    } catch (error) {
      console.error("Error sending reply:", error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the reply" });
    }
  },
  getOrdersForLandingPage: async (req, res) => {
    const { role } = req.params;

    try {
      let orders;

      if (role === "manufacturer") {
        orders = await Order.find({ assignedTo: "manufacturer" });
      } else if (role === "transporter") {
        orders = await Order.find({ assignedTo: "transporter" });
      } else {
        // Handle unknown role or additional roles here
        orders = [];
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders for landing page:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
