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

    // Extract the file paths from the request files array
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
      imagePaths, // Store the array of image paths in the database
    });

    await product.save();
    console.log(product);
    res.json(product);
  } catch (error) {
    console.error("Error uploading product", error);
    res.status(500).json({ error: "Failed to upload product" });
  }
});

// Fetch products by category
 

router.get("/catelog/:category", async (req, res) => {

  try {
    let category = req.params.category;
    category = category.substring(9);
    const products = await Product.find({ Category: category });

    //console.log(products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/catelog/product/:productID", async (req, res) => {
  try {
    const { productID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productID))
      throw new Error("Invalid productID");

    const product = await Product.findById(productID);
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


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
 

router.get('/cartedItems', authenticateToken ,async (req, res) => {
  try {
    const carts = await Carts.find({ userEmail:req.email.email }); 
    res.json(carts);
 
  } catch (error) {
    console.error('Error fetching carts', error);
    res.status(500).json({ error: 'Failed to fetch carts' });
  }
});

router.post("/status", async (req, res) => {
  const { isSuccessful, productDetail } = req.body;

  try {
    // Extract the array of product IDs from productDetail
    const productIds = productDetail.map(product => product._id);

    // Create a filter to update products with matching IDs
    const filter = { _id: { $in: productIds } };

    // Create an update object to set the isSuccessful field
    const update = {
      $set: {
        isSuccessful: isSuccessful,
      },
    };

    // Use the updateMany method to update all matching products
    const changed = await Carts.updateMany(filter, update);

    console.log(changed);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
