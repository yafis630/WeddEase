const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'products/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper file format to upload');
  }
});

// Register a new product
router.post('/uproduct', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const { name, price,category, description } = req.body;

    // Extract the file paths from the request files array
    const imagePaths = req.files.map(file => file.path);

    const product = new Product({
      name,
      price,
      description,
      category,
      imagePaths // Store the array of image paths in the database
    });

    await product.save();
    console.log(product);
    res.json(product);
  } catch (error) {
    console.error('Error uploading product', error);
    res.status(500).json({ error: 'Failed to upload product' });
  }
});

module.exports = router;
