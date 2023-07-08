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
import axios from "axios";
import hiringCategories from "../data/hiringCategories";
import "../styles/forms.css";


const options = hiringCategories.map((category, i) => (
  <option value={category.name} key={i}>
    {category.name}
  </option>
));
const WorkerRegistration = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    gender: "",
    bio: "",
    image: "",
    password: "",
    confirmPassword: "",
    errors: {}
  });

  const [form, setForm] = useState({});
  const [profession, setProfession] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/wedease/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    console.log(data);

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {

      console.log("Form data:", formData);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        DOB: "",
        gender: "",
        bio: "",
        image: "",
        password: "",
        confirmPassword: "",
        errors: {}
      });

      alert("Registration Successful");


    } else {
      setFormData({ ...formData, errors });
    }
  };

  const validateForm = () => {
    const errors = {};
    const { name, email, phoneNumber, gender, DOB, bio, image, password, confirmPassword, } = formData;
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
    if (!DOB.trim()) {
      errors.DOB = "Please specify your Date of Birth";
    }
    if (!gender.trim()) {
      errors.gender = "Please specify your gender";
    }
    if (!profession.trim()) {
      errors.profession = "Please specify your profession";
    }
    if (!image.trim()) {
      errors.image = "Please upload your photo";
    }
    if (!bio.trim()) {
      errors.bio = "Please specify your bio";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!agreedToTerms.trim()) {
      errors.agreed = "You need to agree terms and conditions";
    }
    return errors;
  };

  const { name, email, phoneNumber, gender, DOB, bio, image, password, confirmPassword, errors } = formData;


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
              required
            />
          </FormGroup>
          {errors.image && <Alert color="danger">{errors.image}</Alert>}
          <FormGroup>
            <Label for="image">Upload your image</Label>
            <Input
              type="file"
              name="image"
              id="image"
              value={image}
              onChange={handleChange}
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
              required
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
              required
            />
          </FormGroup>
          {errors.DOB && <Alert color="danger">{errors.DOB}</Alert>}
          <FormGroup>
            <Label for="DOB">Date of Birth</Label>
            <Input
              type="date"
              name="DOB"
              id="DOB"
              onChange={handleChange}
              value={DOB}
              placeholder="Enter your DOB"
              className="input-field"
              required
            />
          </FormGroup>
          {errors.gender && <Alert color="danger">{errors.gender}</Alert>}
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              value={gender}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Input>
          </FormGroup>
          {errors.profession && <Alert color="danger">{errors.profession}</Alert>}
          <FormGroup>
            <Label for="profession">Profession</Label>
            <Input
              type="select"
              name="profession"
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="input-field"
              required
            >
              <option value="" disabled>
                -- select an option --
              </option>
              {options}
            </Input>
          </FormGroup>
          {errors.bio && <Alert color="danger">{errors.bio}</Alert>}
          <FormGroup>
            <Label for="bio">Bio</Label>
            <Input
              type="textarea"
              name="bio"
              id="bio"
              value={bio}
              onChange={handleChange}
              placeholder="Tell us about yourself."
              rows="3"
              className="input-field"
              required
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
              required
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
              required
            />
          </FormGroup>
          {errors.agreed && <Alert color="danger">{errors.agreed}</Alert>}
          <FormGroup>
            <Label check>
              <Input
                type="checkbox"
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                checked={agreedToTerms}
              />{" "}
              I agree to the terms and conditions
            </Label>
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

export default WorkerRegistration;