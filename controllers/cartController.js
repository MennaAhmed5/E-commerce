const Cart = require('../models/Cartmodel')



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

const addToCart=async (req, res)=> {
    const {productId,color} = req.body;
    const product=  await Product.findById(productId);

    if(!product){
      return res.json({message:"product not found!"})
    }

    //get cart for the logged user

    const cart= await Cart.findOne({user:req.user._id});

    if(!cart){
     cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color:color, price: product.price }],
    });
    }else{
      //check if the product is already in the cart=>update quality
      const  productCartIndex= Cart.cartItem.findIndex((item )=>item.product.toString()===productId&&item.color===color);
      if (productCartIndex !==-1){
        const cartitem=cart.cartItems[productCartIndex];
        cartitem.quantity+=1;
        cart.cartItems[productCartIndex]=cartitem;
      }
      else{
        //if the product not in the cart u need to push it 

        cart.cartItems.push({product:productId,color,price:product.price})
      }
    };
    //
    // const cart = new Cart(cartItem);
    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', data: cart });
  }


//
  const updateCartItem = async (req, res) => {
    
    const {quantity,color} = req.body;
    const productId = req.params.productId;
   const cart= await Cart.findOne({ user:req.user._id });
   if(!cart){

    res.json({message:"No cart for this user ........"})

   }
   const cartIndex=cart.cartItems.findIndex((item)=>item._id.toString()=== productId);
   if(cartIndex > -1){
   const currentItem = cart.cartItems[cartIndex];
   currentItem.quantity=quantity;
   currentItem.color=color;
   cart.cartItems[cartIndex]=currentItem;
   }
   else{
    res.json({message:"there is no product matchs that id "})
   }
     await cart.save();
    res.json({message:"updated success",data:cart})
}
  

/////removeSpecificCartItem
  const removeCartItem = async (req, res) => {
    const productId = req.params.productId;
   const cart = await Cart.findOneAndUpdate({user:req.user._id}, { $pull: { cartItems: {_id:productId } } });// $pull: { cartItems: { _id: req.params.itemId } },
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





















// const courses = []

// const getAllCourses = async (req,res)=>{

//     // const courses = await Course.find();
//     const courses = await findAllCourses();
//     res.send(courses);
// }

// const getCourseById = async (req,res)=>{
//     // res.send(req.params.id);
//     //const course = courses.find((c)=>c.id === req.params.id);
//     const {id} = req.params;
//     const course = await Course.findOne({_id:id})
//    if(!course){
//     res.status(404).send("the course with given ID was not found");
//     return;
//    }
//     res.send(course);
// }
// const createCourse = async (req,res)=>{
//     const course =  await createCouse(value)
//     res.send(course);
//     // id:uuid()
//     // const course = { courseName: req.body.courseName, 
//     //     description: req.body.description, 
//     // };
//     // const {error, value} = validateNewCourse(req.body);
//     // if(error)
//     // {
//     //     //bad request
//     //     res.status(400).send({message:"Invalid form field.."})
//     //     return;
//     // }
//     // courses.push(course);
//     // const course = await Course.create(value)
    
// }

// const updateCourse = async(req,res)=>{
//     // looking up for the course
//     // const course= courses.find((c)=> c.id ===  req.params.id);
//     const {id} = req.params;
//     const course = await Course.findOne({_id:id})
//     if(!course){
//         res.status(404).send("the course with given ID was not exist");
//         return;
//     }
//     // course.name = req.body.name;
//     await Course.updateOne({_id:id},req.body)
//     const updatedCourse = await Course.findById(id);
//     res.send(updatedCourse);
// }

// const deleteCourse = async (req,res)=>{
//     // const course= courses.find((c)=> c.id ===  req.params.id);
//     const {id} = req.params;
//     const course = await Course.findOne({_id:id})
//     if(!course){
//         res.status(404).send("the course with given ID was not exist");
//         return;
//        }
//     // const index = courses.indexOf(course);
//     // courses.splice(index,1)[1];
//     await Course.deleteOne({_id:id})
//     // return;
//     res.send(course);
// }

// module.exports = {
//     getAllCourses,
//     getCourseById,
//     createCourse,
//     updateCourse,
//     deleteCourse
// }
