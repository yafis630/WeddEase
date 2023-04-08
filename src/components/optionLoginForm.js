import "./style.css";
import React, { useState } from "react";

function OptionLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Please enter your email";
    }
    if (!password) {
      errors.password = "Please enter your password";
    }
    if (Object.keys(errors).length === 0) {
      // Check if email and password match registration form data
      const registrationFormData = JSON.parse(
        localStorage.getItem("registrationFormData")
      );
      if (
        registrationFormData &&
        registrationFormData.email === email &&
        registrationFormData.password === password
      ) {
        console.log("Login successful");
      } else {
        setFormErrors({ invalidCredentials: "Invalid email or password" });
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        {formErrors.email && <div>{formErrors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        {formErrors.password && <div>{formErrors.password}</div>}
        {formErrors.invalidCredentials && (
          <div>{formErrors.invalidCredentials}</div>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default OptionLoginForm;
