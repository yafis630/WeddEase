import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/forms.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";
import CategoryButtons from "./CategoryButtons";


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

  const handleSubmit =async  e => {
    e.preventDefault();

    const response= await fetch('http://localhost:8080/wedease/login',{
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const {success,message} = await response.json();
    console.log(success);
    if (success) {
     window.location.href = '/CategoryButtons';
    } else {
      alert(message);
    }
    <Route path="/CategoryButtons" element={<CategoryButtons />} />
    
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
        setFormData({
          email: "",
          password: "",
          errors: {}
        });
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
      <h2 className="mt-5 mb-4 text-center">User Login </h2>
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
