import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css"; // You can create a separate CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <h5>About Us</h5>
            <p>
              We are a team of developers passionate about creating amazing
              websites and web applications.
            </p>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col md={4} className="footer-section">
            <h5>Contact Us</h5>
            <p>Email: contact@weddease.in</p>
            <p>Phone: 9070822303</p>
          </Col>
        </Row>
        <Row>
          <Col className="footer-bottom">
            <p>
              Developed by Yafis, Moumina, and Jasia &copy; {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
