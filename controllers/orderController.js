// controllers/orderController.js
const { validationResult } = require("express-validator");
const orderService = require("../Services/orderServices");

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error getting order by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const placeOrder = async (req, res) => {
  const orderData = req.body;

  try {
    const order = await orderService.placeOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    const errors = validationResult(error);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.error("Error placing order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const canceledOrder = await orderService.cancelOrder(orderId);
    res.json(canceledOrder);
  } catch (error) {
    console.error("Error canceling order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getOrders, getOrderById, placeOrder, cancelOrder };
