
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  imagePaths: {
    type:[String] ,
 },
  price: {
    type: Number,
    trim: true,
  },
  
  description:{
    type: String,
  
    trim:true
  },
  Category:{
    type: String,
    trim:true
  },
  colour:{
    type: String,
    trim:true
  },
  material:{
    type: String,
    trim:true
  },
  brand:{
    type: String,
    trim:true
  },
  qty:{
    type: Number,
    required: true,
    trim:true
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  sellerEmail:{
    type:String
  }
  
});

module.exports = mongoose.model('Product', productSchema);
