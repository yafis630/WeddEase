import React from "react";
import { Routes, Route } from "react-router-dom";
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
import CategoryButtons from "./CategoryButtons";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/SellerButtons" element={<SellerButtons />} exact />
        <Route path="/WorkerRegistration" element={<WorkerRegistration />} exact />
        <Route path="/WorkerLogin" element={<WorkerLogin />} exact />
        <Route path="/LoginForm" element={<LoginForm />} exact />
        <Route path="/RegistrationForm" element={<RegistrationForm />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/CategoryButtons" element={<CategoryButtons />} />
        <Route path="/WorkerCategory" element={<WorkerCategory />} exact />
        <Route path="/WorkerHome" element={<WorkerHome />} exact />
        <Route path="/WorkerProfile" element={<WorkerProfile />} exact />
        
      </Routes>
      </div>
  );
}

export default App;