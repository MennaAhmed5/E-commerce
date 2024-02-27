const express=require('express');
const router = express.Router();
const authController = require("./../controllers/authController");
const adminController = require("./../controllers/adminController")



router.get('/users',authController.protect,authController.restrictTo('admin'),adminController.getAllUsers);
router.get('/products',authController.protect,authController.restrictTo('admin'),adminController.getAllProducts);
module.exports = router;
