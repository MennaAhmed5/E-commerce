const Product = require('./../models/productModel');
const productValidator = require("./../validation/productValidator");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

 

const Filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/products'); // determine the images place
  },
  filename: function (req, file, cb) {
    cb(null, `product-${uuidv4()}-${Date.now()}.jpeg`); // determine unique images name
  }
});

const fileFilter = (req, file, cb) => {
  if (file) { // Check if file exists
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(new Error('No file uploaded'), false);
  }
};

const upload = multer({ storage: Filestorage, fileFilter: fileFilter }).any('images');

exports.uploadProductPhoto = upload;


exports.createProduct= async(req,res)=>{
    try{    
      const colorsArray = req.body.colors.split(',').map(color => color.trim());    
     const {error,value} = productValidator.newProduct({
        name: req.body.name,
        description: req.body.description,
        price:req.body.price, 
        quantity:req.body.quantity, 
        colors: colorsArray,
        category: req.body.category,
        images:req.files.map(file=>file.filename)
     });
      console.log(value);
      console.log(error);
     if(error){
        res.status(400).json({
            status:'fail',
            message:"please enter valid data",
        })

      return;
     }
    
     const newProduct = await Product.create(value); 
     
     console.log(newProduct)
     res.status(201).json({
         status:'success',
         data:{
             newProduct
         }
      });

    }catch(err){
      console.log(err);
      res.status(400).json({
        status:'fail',
        message:err,
      })

    }
}


exports.updateProduct = async (req,res)=>{
  const colorsArray = req.body.colors.split(',').map(color => color.trim());    

  try{
  const {error,value} = productValidator.updateProduct({
    name: req.body.name,
    description: req.body.description,
    price:req.body.price, 
    quantity:req.body.quantity, 
    colors: colorsArray,
    category: req.body.category,
    images:req.files.map(file=>file.filename)
  });

   if(error){
     
      res.status(400).json({
          status:'fail',
          message:"please enter valid data",
      });

    return;
   }
const updatedProduct= await Product.findByIdAndUpdate(req.params.id, value, {
      new: true,    // return new document after update
      runValidators: true   //to run validation
  });
  console.log(updatedProduct);
  if(!updatedProduct){
      res.status(400).json({
          status:'fail',
          message:"No product found  with that Id",
  });

    return;
  }

  res.status(200).json({
      status: 'success',
      data: {
        data: updatedProduct
      }
    });


  } catch(err){
    res.status(400).json({
      status:'fail',
      message:err,
    })
  }
} 



exports.deleteProduct = async (req,res)=>{
  
try{
  
  const deletedProduct= await Product.findByIdAndDelete(req.params.id);
   
  if(!deletedProduct){
    res.status(400).json({
        status:'fail',
        message:"No product found  with that Id",
    });

    return;
  }

  res.status(200).json({
      status: 'success',
      message:"product deleted  sucessfully"
    });

  } catch(err){
    res.status(400).json({
      status:'fail',
      message:err,
    })
  }
} 


exports.getAllProduct = async (req,res)=>{ 
    try{
      
      const allProducts= await Product.find();

      res.status(200).json({
          status: 'success',
          results:allProducts.length,
          data:{
            allProducts
          }
        });
    
      } catch(err){
        res.status(400).json({
          status:'fail',
          message:err,
        })
      }
  } 


  exports.getOneProduct = async (req,res)=>{ 
    try{
      
      const product= await Product.findById(req.params.id).populate('reviews');
      if(!product){
        res.status(400).json({
            status:'fail',
            message:"No product found  with that Id",
      });
     return;
    }

      res.status(200).json({
          status: 'success',
          data:{
            product
          }
        });
    
      } catch(err){
        res.status(400).json({
          status:'fail',
          message:err,
        })
      }
  } 

