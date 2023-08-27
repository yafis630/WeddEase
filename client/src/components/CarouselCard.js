import { Carousel, Card, Row, Col , Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import Groom from "../assets/groom.jpeg";

function CarouselCard() {
  return (
    <div>
    <Carousel>
      <Carousel.Item interval={1100}>
        <img
          className="d-block w-100"
          src="https://weddingcardinvites.files.wordpress.com/2022/01/laser-cut-muslim-wedding-cards.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Invitation Cards</h3>
          <p>We got a wide variety of invitation cards for you. </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1100}>
        <img
          className="d-block w-100"
          src="https://cdn.mos.cms.futurecdn.net/2nPAyuKxsXdZ37wsiKrCbF.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Wedding Photographers</h3>
          <p>
            Professional Photographers who make you feel at ease and capture the best moments of your life.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1100}>
        <img
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0575/9605/1635/files/Capture_ead9ea81-6f80-46c4-8470-836f4930b64f.png?v=1660929963&width=550"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Nikah Namah</h3>
          <p>Looking for nikah nama online? Shop for the best nikah nama from our collection of exclusive, customized & handmade products</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     {/* Worker Card */}
    <div className="mt-5">
        <h2 className='front-card'>Hire Our Best Workers</h2>
        <Container>
          <Row>
            <Col md={4}>
              <Card >
              
              <Link to ="/WorkerCategory">
                <Card.Img variant="top" 
                src="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fHww&w=1000&q=80" 
                className='card-image' />
                 </Link>
                 
                <Card.Body>
                  <Card.Title>Photographer</Card.Title>
                  
                </Card.Body>
              </Card>
            </Col>
      
            <Col md={4}>
              <Card >
              <Link to ="/WorkerCategory">
                <Card.Img variant="top" 
                src="https://media.istockphoto.com/id/523576663/photo/blondie-fashion-model-pretty-girl-portrait.jpg?s=612x612&w=0&k=20&c=vjEtJIURjxbHDXCz5XHhxqOg5XjSTSz5X-t_5ZYeg9M=" 
                className='card-image' />
                </Link>
                <Card.Body>
                  <Card.Title>Make-Up Artist</Card.Title>
                  
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
              <Link to ="/WorkerCategory">
                <Card.Img variant="top" 
                src="https://media.istockphoto.com/id/161838634/photo/rock-concert.jpg?s=612x612&w=0&k=20&c=ffT8W7fCeWYhCqcVGihq1cB79kN-hRJ66r3RSJpMoEM="
                className='card-image' />
                </Link>
                <Card.Body>
                  <Card.Title>Musician</Card.Title>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

 {/* Seller Card */}
      <div className="mt-5">
        <h2 className='front-card'>Purchase the top products.</h2>
        <Container>
          <Row>
 
            <Col md={4}>
              <Card >
              <Link to ="/ShoppingServices">
                <Card.Img variant="top" 
                src={Groom}
                className='card-image-container' />
                 </Link>
                <Card.Body>
                  <Card.Title>Groom Wear</Card.Title>
                  
                </Card.Body>
              </Card>
            </Col>
           
            <Col md={4}>
              <Card >
              <Link to ="/ShoppingServices">
                <Card.Img variant="top" 
                src="https://www.hunarcourses.com/blog/wp-content/uploads/2022/02/bridal-jewellery-1.jpg" 
                className='card-image-container' />
                </Link>
                <Card.Body>
                  <Card.Title>Jewellery</Card.Title>
                  
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
              <Link to ="/ShoppingServices">
                <Card.Img variant="top" 
                src="https://5.imimg.com/data5/SELLER/Default/2022/2/MI/TW/NM/7767235/bridal-dresses-rental.jpeg"
                className='card-image-container' />
                </Link>
                <Card.Body>
                  <Card.Title>Bridal Wear</Card.Title>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CarouselCard;