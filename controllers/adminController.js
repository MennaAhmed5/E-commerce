const User = require("./../models/userModel");
const Product = require("./../models/productModel");




exports.getAllProducts = async(req,res) =>{
    try{
      const products = await Product.find();
      res.status(200).json({
        status:'success',
        result:products.length,
        data:{
             products
        }
      })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}


exports.getAllUsers = async(req,res) =>{
    try{
      const users= await User.find();
      res.status(200).json({
        status:'success',
        result:users.length,
        data:{
             users
        }
      })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}