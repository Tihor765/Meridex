const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },


    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,

        image: String,

        price: Number,

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],


    shippingAddress: {

      fullName: String,

      phone: String,

      house: String,

      area: String,

      city: String,

      state: String,

      pincode: String,

      landmark: String,

    },


    totalAmount: {
      type: Number,
      required: true,
    },


    paymentInfo: {

      razorpayPaymentId: String,

      razorpayOrderId: String,

    },


    orderStatus: {

      type: String,

      default: "Processing",

    },

  },

  { timestamps: true }

);



module.exports = mongoose.model(
  "Order",
  orderSchema
);