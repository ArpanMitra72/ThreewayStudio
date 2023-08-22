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
  getAssignedOrders: async (req, res) => {
    try {
      const orders = await Order.find({ transporter: req.user._id });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
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
