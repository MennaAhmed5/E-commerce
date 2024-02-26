const express = require('express');
const router = express.Router({ mergeParams: true });
const authController = require('./../controllers/authController');
const productController = require('./../controllers/productController');

router.post("/",authController.protect,authController.restrictTo('admin'),productController.uploadProductPhoto,productController.createProduct);
router.patch("/:id",authController.protect,authController.restrictTo('admin'),productController.uploadProductPhoto,productController.updateProduct);
router.delete("/:id",authController.protect,authController.restrictTo('admin'),productController.deleteProduct);
router.get("/:id",productController.getOneProduct);
router.get("/",productController.getAllProduct);




module.exports = router;