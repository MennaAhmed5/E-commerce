const express = require("express");
const { validateCategory } = require("../middleware/validator");
const categoryController = require("../controllers/CategoryControllers");

const router = express.Router();

// GET all categories
router.get("/", categoryController.getCategories);

// GET category by ID
router.get("/:id", categoryController.getCategoryById);

// POST create category
router.post("/", categoryController.createCategory);

// GET products by category ID
router.get("/:id/products", categoryController.getProductsByCategory);

module.exports = router;
