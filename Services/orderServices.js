// services/orderService.js
const Order = require("../Models/OrderModel");

const getAllOrders = async () => {
  return await Order.find().populate("user").populate("cartItems.product");
};

const getOrderById = async (orderId) => {
  return await Order.findById(orderId)
    .populate("user")
    .populate("cartItems.product");
};

const placeOrder = async (orderData) => {
  return await Order.create(orderData);
};

const cancelOrder = async (orderId) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { isCancelled: true },
    { new: true }
  );
};

module.exports = { getAllOrders, getOrderById, placeOrder, cancelOrder };
