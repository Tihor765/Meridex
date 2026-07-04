const express = require("express");
const router = express.Router();

const {
  addAddress,
  getAddresses,
  deleteAddress,
  updateAddress,
} = require("../controllers/addressController");

const protect = require("../middleware/authMiddleware");


// TEST ROUTE

router.get("/test", (req, res) => {
  res.send("Address route connected ✅");
});


// GET ADDRESSES

router.get(
  "/",
  protect,
  getAddresses
);


// ADD ADDRESS

router.post(
  "/",
  protect,
  addAddress
);


// DELETE ADDRESS

router.delete(
  "/:id",
  protect,
  deleteAddress
);
// UPDATE ADDRESS

router.put(
  "/:id",
  protect,
  updateAddress
);


module.exports = router;