// const {v4:uuid} = require("uuid");
// const { validateNewCourse } = require("../validation/course.validator");
// const { findAllCourses, createCouse } = require("../services/course.service");

const Cart = require('../models/Cartmodel')

const getCart=async (req , res)=>{
    const cart=await Cart.find();
    res.send(cart);

}

const addToCart=async (req, res)=> {
    const cartItem = req.body;
    const cart = new Cart(cartItem);
    await cart.save();
    res.status(201).send(cartItem.value);
  }

  const updateCartItem = async (req, res) => {
    const productId = req.params.productId;
    const updatedCartItem = req.body;
    updatedCartItem.productId = productId; 
    await Cart.findOneAndUpdate({ 'items.productId': productId }, { $set: { 'items.$': updatedCartItem } });
    res.send(updatedCartItem);
}
  
  const removeCartItem = async (req, res) => {
    const productId = req.params.productId;
    await Cart.findOneAndUpdate({ 'items.productId': productId }, { $pull: { items: { productId: productId } } });
    res.send({ message: 'Product removed from cart' });
  }
  
  const clearCart = async (req, res) => {
    await Cart.deleteMany({});
    res.send({ message: 'Cart cleared' });
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
