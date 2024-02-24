const User = require("./../models/userModel");
const userValidator = require('./../validation/userValidator');
const multer = require('multer');

//multer configure
const Filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/users')  // determine the photos place after user upload it
    },
    filename: function (req, file, cb) {
      cb(null, `user-${req.user.id}-${Date.now()}.jpeg`)  //determine unique photo name 
    }

});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype ==='image/png'||file.mimetype ==='image/jpg'||file.mimetype ==='image/jpeg'){
        cb(null,true)
    }else{
        cb(null, false)
    }
}
 const upload = multer({storage:Filestorage, fileFilter:fileFilter}).single('photo');
 exports.uploadUserPhoto = upload;
//array for multiple
//any() for any number of images

exports.getProfile= async (req,res)=>{
    try{
       
      const user = await User.findById(req.user.id);
     
      if(!user){
          res.status(404).json({
            status:'fail',
            message:'No user found with that ID'
          })
          return
      }

      res.status(200).json({
        status: 'success',
        data: {
          data: user
        }
      });
    }
    catch(err){
        res.status(500).json({
            status:'fail',
            message:err
          })   
    }
}

exports.updateProfile = async (req,res)=>{
    //return error if user try to update password here
    if(req.body.password || req.body.passwordConfirm){
       res.status(400).json({
        status:'fail',
        message:"this route is not for password updates. please use /updateMypassword",
      });
      return;
    }
    
    const {error,value} = userValidator.updateUser({
        name:req.body.name,
        email:req.body.email,
        photo: req.file.filename
     });

     if(error){
       
        res.status(400).json({
            status:'fail',
            message:"please enter valid data",
        });

      return;
     }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, value, {
        new: true,    // return new document after update
        runValidators: true   //to run validation
    });

    if(!updatedUser){
        res.status(400).json({
            status:'fail',
            message:"No user found  with that Id",
    });

      return;
    }

    res.status(200).json({
        status: 'success',
        data: {
          data: updatedUser
        }
      });
} 



