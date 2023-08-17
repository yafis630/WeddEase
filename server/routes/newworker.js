// routes/register.js
const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');
const multer = require('multer');
const path = require('path');
const authenticateToken=require('../middlewares/authenticateToken');

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
router.put("/putchange",async(req,res)=>{
  const seller=await Seller.findOne({email:req.email.email})
  const update = { bio: req.body.bio };
  const changed = await Worker.findOneAndUpdate(filter, update, {
      new: true,
    });
  
    res.send(true);
  });




  router.get('/workerHome', authenticateToken ,async (req, res) => {
    try {
      const workers = await Worker.find({ email:req.email.email }); 
      console.log(workers);
      res.json(workers);
  
    } catch (error) {
      console.error('Error fetching worker', error);
      res.status(500).json({ error: 'Failed to fetch worker' });
    }
  });

module.exports = router;
