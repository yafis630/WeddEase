import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const CategoryButtons = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="content-container">
          <h2 className="welcome-text">Welcome </h2>
          <h5>Please choose the service you want to avail
          </h5>

          <div className="button-container">
            <Link to="/WorkerCategory">
              <Button variant="primary" className="worker-button">Shopping Services</Button>
            </Link>
            <Link to="/SellerCategory">
              <Button variant="primary" className="worker-button">Hiring Services</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryButtons;