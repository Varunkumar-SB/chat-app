// Importing Dependencies
const express = require("express");
const router = express.Router();

// Custom imports
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

// Routes
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Exporting Routers
module.exports = router;
