import React from 'react';
import { Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/SellerButtons.css';

const SellerButtons = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="content-container">
          <h2 className="welcome-text">Welcome Seller/Worker</h2>
          <h5>Please Login to your account to continue. If you don't have
            an account, please register.
          </h5>

          <div className="button-container">
            <Link to="/WorkerRegistration">
              <Button variant="primary" className="worker-button">Register as Worker</Button>
            </Link>
            <Link to="/WorkerLogin">
              <Button variant="primary" className="worker-button">Login as Worker</Button>
            </Link>
            <Button variant="secondary" className="seller-button">Register as Seller</Button>
            <Button variant="secondary" className="seller-button">Login as Seller</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerButtons;

