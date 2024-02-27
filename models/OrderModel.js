const mongoose = require("mongoose");
const orderModel = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shoppingCart: {
      type: mongoose.Schema.ObjectId,
      ref: "ShoppingCart",
    },
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: Number,
    PaymentMethod: { type: String, enum: ["card", "cash"], default: "cash" },
    isPaid: { type: Boolean, default: false },
    paitAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    DeliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderModel);
