const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/createorders", orderController.createOrder);
router.post("/assignedorders", orderController.getAssignedOrders);
router.get("/landingpage/:role", orderController.getOrdersForLandingPage);

module.exports = router;
