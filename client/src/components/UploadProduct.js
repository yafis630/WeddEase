import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import hiringCategories from "../data/hiringCategories";
import "../styles/forms.css";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,   
  Button,
  Alert
} from "reactstrap";

const options = hiringCategories.map((category, i) => (
    <option value={category.name} key={i}>
      {category.name}
    </option>
  ));

const UploadProduct = () => {
   
  const [products, setproducts] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],  // Change to an array to hold multiple images
    errors: {}
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setproducts({ ...products, [name]: value });
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setproducts({ ...products, images:  [...files] });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", products.name);
      formDataToSend.append("price", products.price);
      formDataToSend.append("description", products.description);
      formDataToSend.append("category", products.category);

      // Append each image file to the FormData object
      for (let i = 0; i < products.images.length; i++) {
        formDataToSend.append("images", products.images[i]);
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
          
        } else {
          alert("product not uploaded");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred.");
      }
    } else {
      setproducts(prevFormData => ({
        ...prevFormData,
        errors
      }));
    }
  };


  const validateForm = () => {
    const errors = {};
    const { name,description,price, } = products;
    if (!name.trim()) {
      errors.name = "product Name is required";
    }
    if (!price) {
     errors.price = "Please specify price";
   }
    if (!description.trim()) {
     errors.description = "Please specify description";
    }
    if (!products.images) {
      errors.images = 'Please upload your photo';
    }
    if (!products.category) {
      errors.profession = 'product profession is required';
    }
    return errors;
  };

  const { name, price,description,category, errors } = products;

  return (
    
      <div className="back">
        <Header />
        <Container
        className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Upload Product </h2>
        <Form onSubmit={handleSubmit} >
          {errors.name && <Alert color="danger">{errors.name}</Alert>}
          <FormGroup>
            <Label for="name">Product Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.category && <Alert color="danger">{errors.category}</Alert>}
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              type="select"
              name="category"
              id="category"
              value={category}
              onChange={handleChange}
              className="input-field"
              required
              >
              <option value="" disabled>
                -- select an option --
              </option>
              {options}
            </Input>
          </FormGroup>
          {errors.description && <Alert color="danger">{errors.description}</Alert>}
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              placeholder="Tell us about the Product."
              rows="3"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.price && <Alert color="danger">{errors.price}</Alert>}
          <FormGroup>
            <Label for="price">Price </Label>
            <Input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={handleChange}
              placeholder="Product Price"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.image && <Alert color="danger">{errors.image}</Alert>}
          <FormGroup>
            <Label for="image">Upload your image</Label>
              <Input
              multiple
              type="file"
              name="images"
              id="images"
              onChange={handleImageChange}
             // innerRef={fileInputRef}
             className="input-field"
              />
              </FormGroup>
              <Button color="primary" block className="submit-button">
            Upload Product
          </Button>
            </Form>
          </Container>
          <Footer />
        </div>
  );
};

export default UploadProduct;