const Cart = require('../models/Cartmodel')
const Product= require('../models/productModel')


// const {v4:uuid} = require("uuid");
// const { validateNewCourse } = require("../validation/course.validator");
// const { findAllCourses, createCouse } = require("../services/course.service");
// {
//   "userId": "61e3f1a3d2f0a4f1e4f1e4f1",
//   "items": [
//     {
//       "productId": "61e3f1a3d2f0a4f1e4f1e4f2",
//       "quantity": 2,
//       "price": 10
//     },
//     {
//       "productId": "61e3f1a3d2f0a4f1e4f1e4f3",
//       "quantity": 1,
//       "price": 20
//     }
//   ]
// }


//get user Cart

const getCart=async (req , res)=>{
  const cart = await Cart.findOne({ user: req.user._id });
  if(!cart){
    req.json({message:"this user have no carts ........"})
  }

    res.json({message:"cart retrieved successfully",data:cart});
}

//add product to cart

const addToCart = async (req, res) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return res.json({ message: "Product not found!" });
  }

  // Get cart for the logged user
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });

    return res.json({ message: "Cart created", data: cart });
  }

  // Check if the product is already in the cart
  const cartItem = cart.cartItems.find(item => item.product.toString() === productId && item.color === color);

  if (cartItem) {
    // Update product quantity
    cartItem.quantity += 1;
    await cart.save();
    return res.json({ message: " quantity updated", data: cart });
  }

  // Product not in cart, push product to cartItems array
  cart.cartItems.push({ product: productId, color, price: product.price });
  await cart.save();

  res.status(200).json({ message: "Product added to cart ", data: cart });
};

// const addToCart = async (req, res) => {
//   const { productId, color } = req.body;
//   const product = await Product.findById(productId);

//   // 1) Get Cart for logged user
//   let cart = await Cart.findOne({ user: req.user._id });

//   if (!cart) {
//     // create cart fot logged user with product
//     cart = await Cart.create({
//       user: req.user._id,
//       cartItems: [{ product: productId, color, price: product.price }],
//     });


//     res.json({message:"cart created......."});
//   } else {
//     // product exist in cart, update product quantity
//     const productIndex = cart.cartItems.findIndex(
//       (item) => item.product.toString() === productId && item.color === color
//     );
    
//     if (productIndex > -1) {
//       const cartItem = cart.cartItems[productIndex];
//       cartItem.quantity += 1;
    
//       cart.cartItems[productIndex] = cartItem; 
//     } else {
//       // product not exist in cart,  push product to cartItems array
//       cart.cartItems.push({ product: productId, color, price: product.price });
//       res.json({message:"producted pushed to cart...."})
//     }
   
//   }
//   Cart.save();
//   res.json({message:"producted pushed to cart...."})

// }
const updateCartItem = async (req, res) => {
  const { quantity, color } = req.body;
  const productId = req.params.productId;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.json({ message: "No cart for this user" });
  }

  const cartItem = cart.cartItems.find(item => item.product.toString() === productId);

  if (!cartItem) {
    return res.json({ message: "Product not found in cart" });
  }

  cartItem.quantity = quantity;
  cartItem.color = color;

  await cart.save();

  res.json({ message: "Updated successfully", data: cart });
};

//
//   const updateCartItem = async (req, res) => {
    
//     const {quantity,color} = req.body;
//     const productId = req.params.productId;
//    const cart= await Cart.findOne({ user:req.user._id });
//    if(!cart){

//     res.json({message:"No cart for this user ........"})

//    }
//    const product=cart.cartItems.findById(productId);
//    if(product){
//    product.quantity=quantity;
//    product.color=color;

//   //  currentItem.color=color;
//   //  cart.cartItems[cartIndex]=currentItem;
//    }
//    else{
//     res.json({message:"there is no product matchs that id "})
//    }
//      await cart.save();
//     res.json({message:"updated success",data:cart})
// }
  

/////removeSpecificCartItem
  const removeCartItem = async (req, res) => {
    const productId = req.params.productId;
  //  const cart = await Cart.findOneAndUpdate({user:req.user._id}, { $pull: { cartItems: {_id:productId } } });// $pull: { cartItems: { _id: req.params.itemId } },
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { product: productId } } },
    { new: true } // to return the updated document
  );

     await cart.save();
    res.json({ message: 'Product removed from cart',data:cart});
  }



  //clear user cart
  const clearCart = async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(204).json({message:"cart deleted"});
  }






















// const updateCartItem=async (req, res) =>{
//   const productId = req.params.productId;
//   const updatedCartItem = req.body;
//   await Cart.findByIdAndUpdate(productId, updatedCartItem);
//   res.send(updatedCartItem.value);
// }



// const removeCartItem=async (req, res) =>{
//   const productId = req.params.productId;
//   await Cart.findByIdAndDelete(productId);
//   res.send({ message: 'Product removed from cart' });
// }



// const clearCart=async (req, res)=> {
//   await Cart.deleteMany({});
//   res.send({ message: 'Cart cleared' });
// }



module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};






















