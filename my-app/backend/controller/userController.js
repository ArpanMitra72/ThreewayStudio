const User = require("../models/user.js");

module.exports = {
  register: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error); // Add this line
      res.status(500).json({ error: "An error occurred" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password }); // Find the user
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Assuming the role is stored in the user document
      const userRole = user.role;

      res.status(200).json({ message: "Login successful", role: userRole });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },
};
