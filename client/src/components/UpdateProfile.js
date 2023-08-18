import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Route, useNavigate } from "react-router-dom";
import "../styles/forms.css";
import AuthContext from "../context/AuthProvider";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    bio: "",
    image: "",
    password: "",
    confirmPassword: "",
    errors: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fileInputRef = useRef(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  

  
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);

      formDataToSend.append('phoneNumber', formData.phoneNumber);
      
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);
      formDataToSend.append('image', fileInputRef.current.files[0]);
      console.log(formData)
      try{
      const response = await fetch('http://localhost:8080/wedease/putworker', {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle successful registration, such as showing a success message or redirecting to a new page.
        alert('Updated Successful');
        navigate('/WorkerHome');
      } else {
        // Handle registration error, such as displaying an error message to the user.
        alert('Update Failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };


  const { name, phoneNumber, bio, image, password, confirmPassword, errors } = formData;


  return (
    <div className="back">
      <Header />
      <Container className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Update Profile</h2>

        <div className="worker-card-container">{workerList}</div>
        
        <div className="text-center">
          <div className="profile-pic-container">
            <img
              src={image || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg"} // Provide a default profile pic image
              alt="Profile"
              className="profile-pic"
            />
            {editing && (
              <>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                  innerRef={fileInputRef}
                  className="input-field"
                />
                <Button className="update-pic-button">Update Profile Pic</Button>
              </>
            )}
          </div>
        </div>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormGroup>
            <Label for="name">Name</Label>
            <div className="input-container">
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
               
                className="input-field"
                disabled={!editing}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Mobile no.</Label>
            <div className="input-container">
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                
                className="input-field"
                disabled={!editing}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="bio">Bio</Label>
            <div className="input-container">
              <Input
                type="textarea"
                name="bio"
                id="bio"
                value={bio}
                onChange={handleChange}
                
                rows="3"
                className="input-field"
                disabled={!editing}
              />
            </div>
          </FormGroup>
          {/* Rest of the form fields */}
          {editing ? (
            <>
              <Button color="primary" block className="submit-button">
                Update Profile
              </Button>
              <Button
              color="danger"
                className="cancel-button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              block
              className="submit-button"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
