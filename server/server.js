const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const addressRoutes = require("./routes/addressRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); // ✅ New
const paymentRoutes = require("./routes/paymentRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes); // ✅ New
app.use("/api/payments", paymentRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/api/addresses", addressRoutes);