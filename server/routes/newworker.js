// routes/register.js
const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');
const multer = require('multer');
const path = require('path');
const authenticateToken=require('../middlewares/authenticateToken');
const SelectedData = require('../models/SelectedData');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/')
  },
  filename:(req,file,cb)=>{
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


// Register a new worker
router.post('/worker', upload.single('image'), async (req, res) => {
  try {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }
  const { name, email, phoneNumber, DOB, gender, bio, profession, password } = req.body;

   
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
      imagePath 
    });
  await worker.save();
    console.log(worker);
    res.json(worker);
}catch(error){
  console.error('Error registering user', error);
  res.status(500).json({ error: 'Failed to register user' });
}
  
});

//fetch workers
  router.get('/workerHome', authenticateToken ,async (req, res) => {
    try {
      const workers = await Worker.find({ email:req.email.email }); 
      res.json(workers);
   
    } catch (error) {
      console.error('Error fetching worker', error);
      res.status(500).json({ error: 'Failed to fetch worker' });
    }
  });


//update workers
  router.post("/putworker",authenticateToken, upload.single('image'),async(req,res)=>{
      if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
      }
      const { name, phoneNumber, bio } = req.body;
      const imagePath = req.file.path;

    const filter={email:req.email.email};
    const update = {
      $set: {
        name: name,
        bio: bio,
        phoneNumber: phoneNumber,
        imagePath: imagePath
      }
    };
    const changed = await User.updateOne(filter,update ,{
      new:true
     }
      );
      console.log(changed);
      res.send(true);
    });

    
//get the notifications from users
    router.get('/notification', authenticateToken ,async (req, res) => {
      try {
        const selectedData = await SelectedData.find({workersEmail:req.email.email }); 
        res.json(selectedData);
     
      } catch (error) {
        console.error('Error fetching worker', error);
        res.status(500).json({ error: 'Failed to fetch worker' });
      }
    });

//accept or reject notification
router.post("/request", authenticateToken, async (req, res) => {
  const { isAccepted, selectedDates, usersEmail } = req.body; 
    console.log(req.body);
      try {
         const filter = {workersEmail: req.email.email,usersEmail:usersEmail, selectedDates:selectedDates};
         console.log(filter)
          const update = {
          $set: {
              isAccepted: isAccepted,
            },
          };
          const changed = await SelectedData.updateOne(filter, update, {
            new: true,
       });
       console.log(changed);
          res.send(true);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
      });
      

      

module.exports = router;
