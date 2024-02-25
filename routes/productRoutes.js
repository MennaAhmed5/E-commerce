const express =require('express');
const authController = require('./../controllers/authController.js');
const {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} =require('../controllers/productController.js') ;
const { singleUpload } =require('../middlewares/multer.js');

const router = express.Router();


// PRODUCT ROUTES

// GET ALL PRODUCTS
router.get("/get-all", getAllProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProductController);
// singleUpload,
// CREATE PRODUCT
router.post("/create",authController.protect, authController.restrictTo('admin'), createProductController);

// UPDATE PRODUCT
router.put("/:id",authController.protect,authController.restrictTo('admin'),updateProductController);

// // UPDATE PRODUCT IMAGE
// router.put(
//   "/image/:id",
//   authController.protect,
//   authController.restrictTo('admin'),
//   singleUpload,
//   updateProductImageController
// );

// // delete product image
// router.delete(
//   "/delete-image/:id",
//   authController.protect,
//   authController.restrictTo('admin'),
//   deleteProductImageController
// );


// delete product
router.delete("/delete/:id", authController.protect, authController.restrictTo('admin'), deleteProductController);

// REVIEW PRODUCT
router.put("/:id/review", authController.protect, productReviewController);

module.exports = router;
