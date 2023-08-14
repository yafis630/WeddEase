import React, { useState , useRef} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/SellerPr.css";
import SellerCat from "./SellerCat";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,   
  Button,
  Alert
} from "reactstrap";

const SellerPr = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],  // Change to an array to hold multiple images
    errors: {}
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images:  [...files] });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);

      // Append each image file to the FormData object
      for (let i = 0; i < formData.images.length; i++) {
        formDataToSend.append("images", formData.images[i]);
      }

      try {
        const response = await fetch("http://localhost:8080/wedease/uproduct", {
          method: "POST",
          body: formDataToSend
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          alert("product uploaded");
          window.location.href = '/SellerCat';
          <Route path="/SellerCat" element={<SellerCat />} ></Route>
        } else {
          alert("product not uploaded");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred.");
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        errors
      }));
    }
  };

  // Rest of your code remains the same...


  // Rest of your code remains the same...


  const validateForm = () => {
    const errors = {};
    const { name,description,price } = formData;
    if (!name.trim()) {
      errors.name = "product Name is required";
    }
    if (!price) {
     errors.price = "Please specify price";
   }
    if (!description.trim()) {
     errors.description = "Please specify description";
    }
    if (!formData.images) {
      errors.images = 'Please upload your photo';
    }
    return errors;
  };

  const { name, price,description,images, errors } = formData;

  return (
    <div className="app-container">
      <div className="back">
        <div className="seller-profile-container">
          <h2>Seller Profile</h2>
          <div className="product-upload-section">
            <h3>Upload Product</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="productName"
                value={name}
                onChange={handleChange}
                placeholder="Product Name"
              />
              {errors.name && (
                <p className="error-message">{errors.name}</p>
              )}
              <textarea
                name="productDescription"
                value={description}
                onChange={handleChange}
                placeholder="Product Description"
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
              <input
                type="number"
                name="productPrice"
                value={price}
                onChange={handleChange}
                placeholder="Product Price  ₹"
              />
              {errors.price && (
                <p className="error-message">{errors.price}</p>
              )}
              <input
              multiple
              type="file"
              name="images"
              id="images"
              onChange={handleImageChange}
             // innerRef={fileInputRef}

              />
              <button type="submit">Upload Product</button>
            </form>
          </div>
        
          
        </div>
      </div>
    </div>
  );
};

export default SellerPr;

 