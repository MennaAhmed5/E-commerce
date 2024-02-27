// routes/orderRoutes.js
const express = require("express");
const { validateOrder } = require("../middleware/validator");
const orderController = require("../controllers/orderController");

const router = express.Router();

// GET all orders
router.get("/", orderController.getOrders);

// GET order by ID
router.get("/:id", orderController.getOrderById);

// POST place order
router.post("/", validateOrder, orderController.placeOrder);

// PATCH cancel order
router.patch("/:id/cancel", orderController.cancelOrder);

module.exports = router;
