import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import "../styles/Main.css";
import Footer from "./Footer";
import CarouselCard from "./CarouselCard";
import Contact from "./Contact";
import WorkerCategory from "./WorkerCategory";
import SellerButtons from "./SellerButtons";


function Main() {
  return (
    
      <div className="body">
        <div>
        <Header />
        
        </div>
        
        <Container fluid className="background-image">
        <Alert variant="success" className="announcement-banner">
          10% off for new users using code "newuser100"
        </Alert>
          <Row>
            <Col md={{ span: 6, offset: 6 }} xs={{ span: 12 }}>
              <div className="button-group">
                <Link to="/SellerButtons" className="button-link">
                  <Button variant="outline-light" className="button-margin">
                    Become a Seller/Worker
                  </Button>
                </Link>
                <Link to="/LoginForm" className="button-link">
                  <Button variant="outline-light" className="button-margin">
                    Login
                  </Button>
                </Link>
                <Link to="/RegistrationForm" className="button-link">
                  <Button variant="outline-light" className="button-margin">
                    Sign up
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <Container><Row><CarouselCard /></Row></Container>
        <Routes>

        <Route path="/SellerButtons" element={<SellerButtons /> } />
        <Route path="/LoginForm" element={<LoginForm /> } />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/WorkerCategory" element={<WorkerCategory />} exact />
            
        </Routes>
       
        <div>
            <Footer />
        </div>
      </div>
    
  );
}

export default Main;