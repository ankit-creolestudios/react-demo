const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  //   shippingInfo: {
  //     address: {
  //       type: String,
  //       required: true,
  //     },
  //     city: {
  //       type: String,
  //       required: true,
  //     },

  //     state: {
  //       type: String,
  //       required: true,
  //     },

  //     country: {
  //       type: String,
  //       required: true,
  //     },
  //     pinCode: {
  //       type: Number,
  //       required: true,
  //     },
  //     phoneNo: {
  //       type: Number,
  //       required: true,
  //     },
  //   },
  cartItem: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CartItem", cartSchema);
