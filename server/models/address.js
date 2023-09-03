const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
     
  });

  const Address = mongoose.model('Address', addressSchema);

module.exports = Address;