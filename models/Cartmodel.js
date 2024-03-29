const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required: true
//   },
//   items: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     }
//   }]
// });




const cartSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ]
    
   
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


