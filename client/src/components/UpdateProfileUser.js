import React, { useState, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";
import AuthContext from "../context/AuthProvider";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const UpdateProfileUser = () => {
  const navigate = useNavigate();
  const {auth}  = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  
  
  const handleCancel = async e => {
    navigate("/UserHome")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    

    try {
      const response = await fetch('http://localhost:8080/wedease/putuser', {
        method: 'POST',
        body: formDataToSend,
        headers: {Authentication: `Bearer ${auth}`,
      }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle successful registration, such as showing a success message or redirecting to a new page.
      
        navigate('/UserHome');
      } else {
        // Handle registration error, such as displaying an error message to the user.
        alert('Update Failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const { name, phoneNumber, } = formData;

  return (
    <div className="back">
      <Header />
      <Container className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Update Profile</h2>

        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Mobile no.</Label>
            <Input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="input-field"
              required
            />
          </FormGroup>
          
          <Button color="primary" block className="submit-button">
           Update Profile
          </Button>
          <Button color="danger" className="cancel-button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateProfileUser;