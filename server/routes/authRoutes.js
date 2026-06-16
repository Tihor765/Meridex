const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;