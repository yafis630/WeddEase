const express = require('express');
const router = express.Router();
const Worker = require('../models/worker');
const authenticateToken=require('../middlewares/authenticateToken');



router.post("/update-unavailable-dates",authenticateToken,async(req,res)=>{
   
   const  unavailableDates  = req.body;
   const filter={email:req.email.email};
   const update = {
    $addToSet: {
      unavailableDates: unavailableDates,
    }
  };
  const changed = await Worker.updateOne(filter,update ,{
    new:true
   }
    );
    console.log(changed);
    res.send(true);
  });

module.exports = router;

