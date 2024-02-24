const express=require('express');
const router = express.Router();
const {getCart,addToCart,updateCartItem,removeCartItem,clearCart}=require('../controllers/cartController');

router.get('/',getCart);
router.post('/',addToCart);
router.patch('/:productId',updateCartItem);
router.delete('/:productId',removeCartItem);
router.delete('/',clearCart);


module.exports = router;


// const express = require("express")
// const router = express.Router();
// const { getAllCourses, getCourseById, createCourse,
//     updateCourse, deleteCourse } = require('../controllers/courses.controller');

// router.get("/",getAllCourses)

// router.get("/:id",getCourseById )

// router.post("/",createCourse)
 
// router.patch("/:id",updateCourse)

// router.delete("/:id",deleteCourse)

// module.exports = router;