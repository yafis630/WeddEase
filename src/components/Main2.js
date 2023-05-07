import React from "react";

import { Link } from "react-router-dom";

import { Container, Button, Row, Col } from "react-bootstrap";
import "./App.css";

import CarouselCard from "./CarouselCard";
import Header from "./Header";
import Footer from "./Footer";


function Main() {
  return (
    
      <div className="body">
        
        <Header />
        <Container fluid className="background-image">
          <Row>
            <Col md={{ span: 6, offset: 6 }} xs={{ span: 12 }}>
              <div className="button-group">
                <Link to="/seller" className="button-link">
                  <Button variant="outline-light" className="button-margin">
                    Become a Seller
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
        
       <Footer />
        
      </div>
    
  );
}

export default Main;
