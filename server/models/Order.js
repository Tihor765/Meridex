const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productName: String,
    price: Number,
    customerName: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);