const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const { log, Console } = require("console");
const mongoose = require("mongoose");
const Carts = require("../models/carts");
const jwt = require("jsonwebtoken"); 
const authenticateToken=require('../middlewares/authenticateToken');
const Worker = require('../models/worker');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "products/");
  },
  filename: (req, file, cb) => {
    const fileNameWithoutExtension = path.parse(file.originalname).name;
    const fileExt = path.extname(file.originalname);
    const uniqueFilename = `${Date.now()}_${fileNameWithoutExtension}${fileExt}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper file format to upload");
  },
});

// Register a new product
router.post("/uproduct", upload.array("images", 5),authenticateToken, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }
    const sellerEmail=req.email.email
    const { name, price, Category, description,brand,colour,qty,material } = req.body;
    const imagePaths = req.files.map((file) => file.path);
    const product = new Product({
      name,
      price,
      description,
      Category,
      brand,
      colour,
      material,
      qty,
      imagePaths,
      sellerEmail 
    });

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ error: "Failed to upload product" });
  }
});

//upload images in worker profile
router.post('/samples', upload.array("upimages",5),authenticateToken, async(req,res)=>{
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No images provided' });
  }
   const imagePaths = req.files.map((file) => file.path);

   console.log(imagePaths)
   const filter={email:req.email.email};
   const update = {
  $set: {
    imagePaths: imagePaths
  }
  };
const changed = await Worker.updateOne(filter,update ,{
  new:true
 }
  );
  console.log(changed);
  res.send(true);
})

//fetch images on the basis of worker id
router.get("/worker/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const images = await Worker.findById(id);
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});



// Fetch products by category
router.get("/catelog/:category", async (req, res) => {

  try {
    let category = req.params.category;
    category = category.substring(9);
    const products = await Product.find({ Category: category });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// fetch products in seller home
router.get("/catelog2", authenticateToken,async (req, res) => {
  try {
    const sellerEmail=req.email.email
    const products = await Product.find({ sellerEmail: sellerEmail });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

//delete products in seller home
router.delete('/delProducts/:_id', authenticateToken, async (req, res) => {
  const productId = req.params._id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// fetch products on the basis of product id
router.get("/catelog/product/:productID", async (req, res) => {
  try {
    const { productID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productID))
      throw new Error("Invalid productID");

    const product = await Product.findById(productID);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// save the carted items
router.post("/carted", async (req, res) => {
  try {
    const { name, price,qty,usertoken,imagePaths,sellerEmail,productID } = req.body;
    const decoded = jwt.verify(usertoken, "WedEase");
    const userEmail = decoded.email;
    const carts = new Carts({
      name,
      price,
      qty,
      userEmail,
      imagePaths,
      sellerEmail,
      productID
    });
    await carts.save();
    res.json(carts);
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ error: "Failed to cart product" });
  }
});

// update quantity
router.post("/quantity", async (req, res) => {
  const { filteredProductDetail } = req.body;

  try {
    for (const product of filteredProductDetail) {
      const { productID, qty } = product;

      const filter = { _id: productID };
      console.log(qty)
      const update = {
        $inc: {
          qty: -qty, 
        },
      };
      const changed = await Product.updateOne(filter, update, {
        new: true,
      });

      console.log(`Updated quantity for product ${productID}:`, changed);
    }

    res.send(true);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).send("Error updating quantity");
  }
});


 
//retrieve the carted items
router.get('/cartedItems', authenticateToken ,async (req, res) => {
  try {
    const carts = await Carts.find({ userEmail:req.email.email }); 
    res.json(carts);
 
  } catch (error) {
    console.error('Error fetching carts', error);
    res.status(500).json({ error: 'Failed to fetch carts' });
  }
});

router.post("/Address", async (req, res) => {
  const {Username,phoneNumber, pincode, streetAddress,state,city,filteredProductDetail} = req.body;

  try {
    const productIds = filteredProductDetail.map(product => product._id);
    const filter = { _id: { $in: productIds } };
    const update = {
      $set: {
        Username : Username,
        phoneNumber:phoneNumber,
        pincode:pincode,
        streetAddress:streetAddress,
        state:state,
        city:city,
      },
    };
    const changed = await Carts.updateMany(filter, update);
    console.log(changed);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/delivery/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const{delivered}=req.body
  try {
    const filter = {_id:orderId}
    const update = {
      $set: {
        delivered:delivered
      },
    };
    const changed = await Carts.updateOne(filter, update);
    console.log(changed);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//fetch the seller purchases
router.get('/purchases', authenticateToken ,async (req, res) => {
  try {
    const carts = await Carts.find({ sellerEmail:req.email.email }); 
    res.json(carts);
 
  } catch (error) {
    console.error('Error fetching carts', error);
    res.status(500).json({ error: 'Failed to fetch carts' });
  }
});


//remove carted images
router.delete('/delcart/:_id', authenticateToken, async (req, res) => {
  const productId = req.params._id;
  try {
    const deletedProduct = await Carts.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// check the payement status
router.post("/status", async (req, res) => {
  const { isSuccessful, filteredProductDetail } = req.body;

  try {
    const productIds = filteredProductDetail.map(product => product._id);
    const filter = { _id: { $in: productIds } };
    const update = {
      $set: {
        isSuccessful: isSuccessful,
      },
    };
    const changed = await Carts.updateMany(filter, update);

    console.log("payement status",changed);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
