import React from "react";
//import Home from './Home';
import { Navbar, Nav } from "react-bootstrap";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./App.css";

function Main() {
  return (
    <div className="body">
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">WeddEase</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
    <div>
    <Container fluid className="background-image">
        <Row>
          <Col lg={{ span: 6, offset: 6 }} xs={12}>
            <div className="button-group">
              <Button variant="outline-light" className="button-margin">Become a Seller</Button>
              <Button variant="outline-light" className="button-margin">Login</Button>
              <Button variant="outline-light" className="button-margin">Sign up</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <div>
      <footer className="footer">
        <Container>
          <p>Developed by Sam</p>
        </Container>
      </footer>
    </div>
    </div>
  );
}

export default Main;
