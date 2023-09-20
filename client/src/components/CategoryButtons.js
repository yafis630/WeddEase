import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles/CategoryButtons.css'; 
import ShoppingButton from '../assets/shopping.png';
import HiringButton from '../assets/hiring.png';
import Footer from './Footer';

const CategoryButtons = () => {
  return (
    <div className="back-img ">
      <Header />
      <div className='content-container' >
         <h2 className="welcome-text">Welcome</h2>
          <h5>Please choose the service you want to avail</h5>

          <div className="button-container roll-in-left">
          
            <Link to="/ShoppingServices">
              <Card className="button-card">
                <Card.Img src= {ShoppingButton} />
              </Card>
            </Link>
            <Link to="/WorkerCategory">
              <Card className="button-card">
                <Card.Img src={HiringButton} />
              </Card>
            </Link>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryButtons;
