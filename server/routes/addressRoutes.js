const express = require("express");
const router = express.Router();

const {
  addAddress,
  getAddresses,
} = require("../controllers/addressController");
const protect = require("../middleware/authMiddleware");

// Add Address
router.post("/", protect, addAddress);

module.exports = router;