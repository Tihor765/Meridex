const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        message: "Out of Stock",
      });
    }

    // Reduce stock
    product.stock -= 1;
    await product.save();

    // Create order
    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};