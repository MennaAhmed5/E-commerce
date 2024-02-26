const mongoose = require('mongoose');
const Product = require('./../models/productModel');

const reviewSchema = mongoose.Schema(
    {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: [true, 'Comment can not be empty'],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Rating must belongs to product'],
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Rating must belongs to user'],
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );


  reviewSchema.statics.calcAverageRating = async function (productId) {
    const stats = await this.aggregate([
      //this=>model
      {
        $match: { product: productId },
      },
      {
        $group: {
          _id: '$product',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);
    console.log(stats);
    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating,
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: 0,
        ratingsAverage: 0,
      });
    }
  };
  
  reviewSchema.post('save', function () {
    this.constructor.calcAverageRating(this.product);
  });
  
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;