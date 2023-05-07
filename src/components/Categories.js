import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';
import './Categories.css';

const Categories = () => {
  return (
    <div className='cat-body'>
      <Header />

      <Container>
        <Row>
          <Col>
            <h2 className="category">Categories</h2>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://weddingcardinvites.files.wordpress.com/2022/01/laser-cut-muslim-wedding-cards.jpg"
                alt="Invitation Cards"
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>Invitation Cards</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://www.lionsdeal.com/blog/wp-content/uploads/2017/08/disposable-wedding_resized.jpg"
                alt="Disposables"
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>Wedding Items</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://cdn.weddingwishlist.com/wp-content/uploads/2019/07/Bridal-Meke-up-artist.png"
                alt="Bridal Makeup"
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>Bridal Makeup</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://www.isaacluxe.co/wp-content/uploads/2019/05/groom-right-side-sec-image.jpg"
                alt="Groom Makeup"
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>Groom Makeup</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://cdn.shopify.com/s/files/1/0575/9605/1635/files/Capture_ead9ea81-6f80-46c4-8470-836f4930b64f.png?v=1660929963&width=550"
                alt="Nikah Nama"
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>Nikah Namah</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="https://totaleventsdfw.com/wp-content/uploads/2023/01/Wedding-Photographer.jpeg"
                alt="Wedding Photographers"
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>Wedding Photographers</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Categories
