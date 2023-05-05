import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./style.css";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // Check if credentials match the registration form
      if (
        formData.email ===
          // Replace with the actual email value from the registration form
          "email@example.com" &&
        formData.password ===
          // Replace with the actual password value from the registration form
          "password"
      ) {
        // Credentials match, perform login logic here
        console.log("Login successful");
        // Reset form
        setFormData({
          email: "",
          password: "",
          errors: {}
        });
      } else {
        // Credentials do not match
        const error = { login: "Invalid email or password" };
        setFormData({ ...formData, errors: error });
      }
    } else {
      setFormData({ ...formData, errors });
    }
  };

  const validateForm = () => {
    const errors = {};
    const { email, password } = formData;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const { email, password, errors } = formData;

  return (
    <div className="back">
      <Header />
    <Container className="login-form-container">
      <h2 className="mt-5 mb-4 text-center">Login </h2>
      <Form onSubmit={handleSubmit}>
        {errors.login && <Alert color="danger">{errors.login}</Alert>}
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
        <Button color="primary" block className="submit-button">
          Login
        </Button>
      </Form>
    </Container>
    <Footer />
    </div>
  );
};

export default LoginForm;
