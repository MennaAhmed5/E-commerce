require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT||8000;

const userRouter = require('./routes/userRouter');
const cartRoute=require('./routes/cartroutes')

 

//Middlewars
app.use(express.json())

//Routes
app.use("/api/v1/users",userRouter);
app.use('/api/v1/cart',cartRoute)





//Serve images in directory named images
app.use(express.static('uploads'));

//DB
mongoose.connect(process.env.DBURL)
.then(()=>console.log("DB connected successfully..."))
.catch((err)=>console.log(err));


app.listen(port,()=>{
    console.log(`app listen on port ${port}`)
})