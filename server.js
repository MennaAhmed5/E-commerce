const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const colors = require('colors');
const cors = require('cors');
const cloudinary = require('cloudinary');


require('dotenv').config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  
  //middlewares
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cors());

const port = process.env.PORT||8000;

const userRouter = require('./routes/userRouter');
// const cartRoute=require('./routes/cartroutes')
const productRoutes= require("./routes/productRoutes");


 

//Middlewars
app.use(express.json())

//Routes
app.use("/api/v1/users",userRouter);
// app.use('/api/v1/cart',cartRoute);
app.use("/api/v1/product", productRoutes);
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To Node server </h1>");
});





//Serve images in directory named images
app.use(express.static('uploads'));

//DB
mongoose.connect(process.env.DBURL)
.then(()=>console.log("DB connected successfully..."))
.catch((err)=>console.log(err));


app.listen(port,()=>{
    console.log(`app listen on port ${port}`)
})