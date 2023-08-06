const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');
const multer = require('multer');
const path = require('path');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/')
  },
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,Date.now() + path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage,
  limits:{fileSize:'1000000'},
  fileFilter:(req,file,cb)=>{
    const fileTypes=/jpeg|jpg|png|gif/
    const mimeType=fileTypes.test(file.mimetype)
    const extname=fileTypes.test(path.extname(file.originalname))
    if (mimeType && extname){
      return cb(null,true)
    }
    cb('give proper file format to upload')
  }
})


// Register a new user
router.post('/worker', upload.single('image'), async (req, res) => {
  try {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  const { name, email, phoneNumber, DOB, gender, bio, profession, password } = req.body;

    // Extract the file path from the request file object
    const imagePath = req.file.path;

    const worker = new Worker({
      name,
      email,
      phoneNumber,
      DOB,
      gender,
      bio,
      profession,
      password,
      imagePath // Store the file path in the database
    });
  await worker.save();
    console.log(worker);
    res.json(worker);
}catch(error){
  console.error('Error registering user', error);
  res.status(500).json({ error: 'Failed to register user' });
}
  
});

module.exports = router;