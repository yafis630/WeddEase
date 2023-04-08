import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

function StartPage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRegistrationButtonClick = () => {
    setShowRegistrationForm(true);
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleRegistrationFormClose = () => {
    setShowRegistrationForm(false);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };

  return (
    <div>
      <h1>Welcome to my website!</h1>
      <button onClick={handleRegistrationButtonClick}>
        Register for an account
      </button>
      <button onClick={handleLoginButtonClick}>Login</button>
      {showRegistrationForm && (
        <RegistrationForm onClose={handleRegistrationFormClose} />
      )}
      {showLoginForm && <LoginForm onClose={handleLoginFormClose} />}
    </div>
  );
}

export default StartPage;
