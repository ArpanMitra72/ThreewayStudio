const express = require("express");
const router = express.Router();
const authController = require("../controller/userController");

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.get("/getUserRole", authController.getRole);

module.exports = router;
