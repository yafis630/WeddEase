import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Main from "./Main";
import Contact from "./Contact";
import Categories from "./Categories";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/LoginForm" element={<LoginForm />} exact />
        <Route path="/RegistrationForm" element={<RegistrationForm />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/categories" element={<Categories />} exact />
        
      </Routes>
      </div>
  );
}

export default App;