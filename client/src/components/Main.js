import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import { Container, Button, Row, Col } from "react-bootstrap";
import "../styles/Main.css";
import Footer from "./Footer";
import CarouselCard from "./CarouselCard";
import Contact from "./Contact";
import Categories from "./Categories";


function Main() {
  return (
    
      <div className="body">
        <div>
        <Header />
        </div>
        
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
        <Routes>
        
        <Route path="/LoginForm" element={<LoginForm /> } />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/categories" element={<Categories />} exact />
            
        </Routes>
       
        <div>
            <Footer />
        </div>
      </div>
    
  );
}

export default Main;
