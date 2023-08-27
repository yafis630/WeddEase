
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  imagePaths: {
    type:[String] ,
     required:true
 },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  
  description:{
    type: String,
  
    trim:true
  },
  Category:{
    type: String,
    required: true,
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
    type: String,
    required: true,
    trim:true
  },
  createdAt: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
});

module.exports = mongoose.model('Product', productSchema);
