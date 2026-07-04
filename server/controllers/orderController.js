const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {

  console.log("🔥 NEW ORDER CONTROLLER RUNNING");

  try {

    const {
      items,
      shippingAddress,
      totalAmount,
      paymentInfo,
    } = req.body;


    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items found",
      });
    }



    for (const item of items) {

      console.log("ITEM:", item);


      let product =
        await Product.findById(
          item.product
        );


      if (!product) {

        product =
          await Product.findOne({
            name: item.name,
          });

      }


      if (!product) {

        return res.status(404).json({
          message: "Product not found",
        });

      }



      product.stock =
        product.stock -
        item.quantity;


      await product.save();

    }



    const order =
      await Order.create({

        user: req.user.id,

        items,

        shippingAddress,

        totalAmount,

        paymentInfo,

      });



    res.status(201).json({

      message:
        "Order placed successfully",

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

    const orders =
      await Order.find({
        user: req.user.id,
      })
      .sort({
        createdAt: -1,
      });


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