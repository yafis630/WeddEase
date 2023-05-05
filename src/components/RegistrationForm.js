import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";
import "./style.css";


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
    confirmPassword: "",
    errors: {}
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Submit form data
      console.log("Form data:", formData);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        confirmPassword: "",
        errors: {}
      });
    } else {
      setFormData({ ...formData, errors });
    }
  };

  const validateForm = () => {
    const errors = {};
    const { name, email, phoneNumber, gender, password, confirmPassword } = formData;
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Mobile no. is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Mobile no. is invalid";
    }
    if (!gender.trim()) {
      errors.gender = "Please specify your gender";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const { name, email, phoneNumber, gender, password, confirmPassword, errors } = formData;

  return (
    <div className="back">
      <Header />
    <Container
      className="registration-form-container">
      <h2 className="mt-5 mb-4 text-center">Registration </h2>
      <Form onSubmit={handleSubmit}>
        {errors.name && <Alert color="danger">{errors.name}</Alert>}
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="input-field"
          />
        </FormGroup>
        {errors.email && <Alert color="danger">{errors.email}</Alert>}
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input-field"
          />
        </FormGroup>
        {errors.phoneNumber && <Alert color="danger">{errors.phoneNumber}</Alert>}
        <FormGroup>
          <Label for="phoneNumber">Mobile no.</Label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter your Mobile no."
            className="input-field"
          />
        </FormGroup>
        {errors.gender && <Alert color="danger">{errors.gender}</Alert>}
        <FormGroup>
          <Label for="gender">Email</Label>
          <Input
            type="select"
            name="gender"
            id="gender"
            value={gender}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input-field"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </Input>
        </FormGroup>
        {errors.password && <Alert color="danger">{errors.password}</Alert>}
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="input-field"
          />
        </FormGroup>
        {errors.confirmPassword && (
          <Alert color="danger">{errors.confirmPassword}</Alert>
        )}
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="input-field"
          />
        </FormGroup>
        <Button color="primary" block className="submit-button">
          Register
        </Button>
      </Form>
    </Container>
    <Footer />
    </div>
  );
};

export default RegistrationForm;