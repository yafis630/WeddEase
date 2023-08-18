import React from "react";
import { Button } from "react-bootstrap";
import "../styles/SellerHome.css"; // Create a CSS file for styling SellerHome
import Header from "./Header";
import profile from "../data/profile-placeholder.png";

const SellerHome = () => {
  const handleLogout = () => {
    window.location.href = "/SellerLogin";
  };

  return (
    <div className="seller-home-container">
      <Header />
      <Button variant="secondary" className="logout-button" onClick={handleLogout}>
        Logout
      </Button>
      <div className="seller-profile">
        <img className="profile-picture" src={profile} alt="profile" />
      </div>
      <Button variant="info" className="update-profile-button" href="/UpdateProfileSeller">
        Update Profile
      </Button>
      <Button variant="success" className="update-product-button" href="/SellerPr">
        Upload Product
      </Button>
    </div>
  );
};

export default SellerHome;
