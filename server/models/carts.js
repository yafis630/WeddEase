
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  
  qty:{
    type: Number,
    required: true,
    trim:true
  },
  userEmail:{
    type:String
  },
  Username: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  imagePaths:{
    type:[String]
  },
  isSuccessful:{
    type: Boolean
  },
  sellerEmail:{
   type:String
  },
  productID:{
   type:String
  },
  phoneNumber: {
    type: Number,
    min: 10,
  },
  pincode: {
    type: String,
    trim: true,
    min: 6,
  },
  streetAddress: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  delivered:{
    type:String
  }
});

module.exports = mongoose.model('Carts', cartSchema);
