// controllers/categoryController.js
const { validationResult } = require("express-validator");
const categoryService = require("../Services/CategoryServices");
const categoryModel = require("../models/CategoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error getting categories:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await categoryService.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error getting category by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createCategory = async (req, res) => {
//   const category = categoryModel.create(req.body);
//   res.status(200).json({ category });
// };
const createCategory = async (req, res) => {
  const categoryData = req.body;

  try {
    const category = await categoryService.createCategory(categoryData);
    res.status(201).json(category);
  } catch (error) {
    const errors = validationResult(error);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.error("Error creating category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductsByCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const products = await categoryService.getProductsByCategory(categoryId);
    res.json(products);
  } catch (error) {
    console.error("Error getting products by category:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  getProductsByCategory,
};
