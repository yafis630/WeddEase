import React, { useState,useContext } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Card, CardImg } from "reactstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/forms.css";
import AuthContext from "../context/AuthProvider";

const UploadProduct = () => {
  const { auth } = useContext(AuthContext);
  const [uploadedImages, setUploadedImages] = useState({
    upimages: [],
  });


  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setUploadedImages({ ...uploadedImages, upimages:  [...files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const formDataToSend = new FormData();
  
    // Append each image file to the FormData object
    for (let i = 0; i < uploadedImages.upimages.length; i++) {
      formDataToSend.append("upimages", uploadedImages.upimages[i]);
    }
  
    try {
      const response = await fetch("http://localhost:8080/wedease/samples", {
        method: "POST",
        body: formDataToSend,
        headers:{
        Authentication: `Bearer ${auth}`,}
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Product uploaded");
        window.location.href = "/ShoppingServices";
      } else {
        alert("Product not uploaded");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred.");
    }
  };
  




  

  return (
    <div className="back">
      <Header />
      <Container className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Product upload</h2>
        <Form onSubmit={handleSubmit} >
          <FormGroup>
          <Label for="upimages">Product Image</Label>
          <Input
            multiple
            type="file"
            name="upimages"
            id="upimages"
            onChange={handleImageChange}
            className="input-field"
          />
        </FormGroup>

          <Button color="primary" block className="submit-button">
            Upload 
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default UploadProduct;

 