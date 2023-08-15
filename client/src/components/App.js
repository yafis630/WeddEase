import React, { useState } from 'react';
import {Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import WorkerRegistration from "./WorkerRegistration";
import Main from "./Main";
import Contact from "./Contact";
import SellerButtons from "./SellerButtons";
import WorkerCategory from "./WorkerCategory";
import WorkerLogin from "./WorkerLogin";
import WorkerHome from "./WorkerHome";
import WorkerProfile from "./WorkerProfile";
import WorkerDetails from "./WorkerDetails";
import CategoryButtons from "./CategoryButtons";
import CartPage from "./CartPage";
import AddressPage from "./AddressPage";
import PaymentGatewayPage from "./PaymentGatewayPage";
import UpdateProfile from "./UpdateProfile";
import UpdateProfileSeller from "./UpdateProfileSeller";
import SellerPr from "./SellerPr";
import SellerCat from './SellerCat';
import Dashboard from "./Dashboard";
import SellerRegistration from "./SellerRegistration";
import SellerLogin from './SellerLogin';
import SellerHome from './SellerHome';
import {AuthProvider}  from "../context/AuthProvider";
import UploadProduct from './UploadProduct';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = '/LoginForm'; // Redirect to the login page after logout
  };
  return (
    <div>
       <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/SellerButtons" element={<SellerButtons />} exact />
        <Route path="/WorkerRegistration" element={<WorkerRegistration />} exact />
        <Route path="/WorkerLogin" element={<WorkerLogin />} exact />
        <Route path="/SellerRegistration" element={<SellerRegistration />} exact />
        <Route path="/SellerLogin" element={<SellerLogin />} exact />
        <Route path="/SellerHome" element={<SellerHome />} exact />
        <Route path="/UpdateProfileSeller" element={<UpdateProfileSeller />} exact />
        <Route path="/SellerPr" element={<SellerPr />} exact />
        <Route path="/SellerCat" element={<SellerCat />} exact />
        <Route path="/SellerHome" element={<SellerHome />} exact />
        <Route path="/LoginForm" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/CategoryButtons" element={<CategoryButtons />} />
        <Route path="/WorkerCategory" element={<WorkerCategory />} exact />
        <Route path="/WorkerHome" element={<WorkerHome />} exact />
        <Route path="/workers/:category" element={<WorkerProfile />} exact />
        <Route path="/workers/:category/:workerId" element={<WorkerDetails/>} exact />
        <Route path="/CartPage" element={<CartPage />} exact />
        <Route path="/address" element={<AddressPage />} exact />
        <Route path="/PaymentGatewayPage" element={<PaymentGatewayPage/>} exact />
        <Route path="/UpdateProfile" element={<UpdateProfile />} exact />
        <Route path="/UploadProduct" element={<UploadProduct />} exact />
        <Route path="/Dashboard" element={<Dashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />  
        <Route path="/AuthProvider" element={<AuthProvider/>} />                 
      </Routes>
      </AuthProvider>
      </div>
    
  );
}

export default App;