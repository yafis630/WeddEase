const mongoose = require('mongoose');

const selectedDataSchema = new mongoose.Schema({
  selectedDates: [{ type: Date }],
  usersName:String,
  usersEmail:String,
  workersEmail:String,
  workersName:String,
  phoneNo:String,
  isAccepted:Boolean,
  isSeen:Boolean
  
});

module.exports = mongoose.model('SelectedData', selectedDataSchema);


