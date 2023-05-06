import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./App.css"; // import your custom css for background image
import Footer from "./Footer";
import CarouselCard from "./CarouselCard";


function Main() {
  return (
    <Router>
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
            
        </Routes>
       
        <div>
            <Footer />
        </div>
      </div>
    </Router>
  );
}

export default Main;
