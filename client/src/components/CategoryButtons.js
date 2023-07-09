import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/CategoryButtons.css'; // Import the CSS file for custom styling
import ShoppingButton from '../assets/shopping.png';
import HiringButton from '../assets/hiring.png';

const CategoryButtons = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="content-container">
          <h2 className="welcome-text">Welcome</h2>
          <h5>Please choose the service you want to avail</h5>

          <div className="button-container">
          <div className="card-row">
            <Link to="/Categories">
              <Card className="worker-card">
                <Card.Img src= {ShoppingButton} />
              </Card>
            </Link>
            <Link to="/WorkerCategory">
              <Card className="worker-card">
                <Card.Img src={HiringButton} />
              </Card>
            </Link>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryButtons;
