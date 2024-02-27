const mongoose = require('mongoose');
 
const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "product name is required"],
      },
      description: {
        type: String,
        required: [true, "product description is required"],
      },
      price: {
        type: Number,
        required: [true, "product price is required"],
      },
      stock: {
        type: Number,
        required: [true, "product stock required"],
      },
      images:[String],

      category: {
        type: mongoose.Schema.ObjectId,
       // ref: 'Category',
       // required: [true, 'Product must be belong to category'],
      },
    //   subcategories: [
    //     {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'SubCategory',
    //     },
    //   ],

     
      // 
      // category: {
      //   type: "mongoose.Schema.Types.ObjectId",
      //   ref: "Category",
      // },
      // images: [
      //   {
      //     public_id: String,
      //     url: String,
      //   },
      // ],
      ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
      },
      ratingsQuantity: {
        type: Number,
        default: 0,
      },
      
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
  );
  

  productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
  });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
  