const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

// Add Review
router.post("/", addReview);

// Get Reviews of a Product
router.get("/:productId", getReviews);

module.exports = router;