const express = require("express");
const router = express.Router();

const {
  addAddress,
  getAddresses,
} = require("../controllers/addressController");

const protect = require("../middleware/authMiddleware");


// TEST
router.get("/test", (req, res) => {
  res.send("Address route connected ✅");
});


// Get Addresses
router.get("/", protect, getAddresses);


// Add Address
router.post("/", protect, addAddress);


module.exports = router;