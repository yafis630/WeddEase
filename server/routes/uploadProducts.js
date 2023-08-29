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
router.post("/uproduct", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }
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
  console.log("CART")
  try {
    const { name, price,qty,usertoken,imagePaths } = req.body;
    const decoded = jwt.verify(usertoken, "WedEase");
    const userEmail = decoded.email;
  
    const carts = new Carts({
      name,
      price,
      qty,
      userEmail,
      imagePaths
    });

    await carts.save();
    console.log(carts);
    res.json(carts);
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ error: "Failed to cart product" });
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
  const { isSuccessful, productDetail } = req.body;

  try {
    const productIds = productDetail.map(product => product._id);
    const filter = { _id: { $in: productIds } };
    const update = {
      $set: {
        isSuccessful: isSuccessful,
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

module.exports = router;
