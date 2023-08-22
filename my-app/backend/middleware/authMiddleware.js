const User = require("../models/user"); // Import your User model

const getUserById = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming your authenticated user's ID is available in req.user
    const user = await User.findById(userId); // Retrieve user document from the database

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.currentUser = user; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { getUserById };
