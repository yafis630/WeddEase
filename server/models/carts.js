
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
 // imagePaths: {
 //   type:[String] ,
    
// },
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
}
});

module.exports = mongoose.model('Carts', cartSchema);
