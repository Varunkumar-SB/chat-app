// Importing Dependencies
const express = require("express");
const router = express.Router();

// Custom imports
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");
const { protectRoute } = require("../middleware/protectRoute");

// Routes
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// Exporting Routers
module.exports = router;
