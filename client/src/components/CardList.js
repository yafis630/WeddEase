import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import '../styles/Categories.css';

const CardList = ({ data }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (id) => {
    if (selectedCard === id) {
      setSelectedCard(null); 
    } else {
      setSelectedCard(id);
    }
  };

  return (
    <div className="card-list">
      <Row>
        {data.map((item) => (
          <Col key={item.id} sm={4} className="mb-4">
            <Card
              className={`custom-card ${selectedCard === item.id ? 'selected' : ''}`}
              onClick={() => handleCardClick(item.id)} 
            >
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                {selectedCard === item.id && <Card.Text>{item.description}</Card.Text>}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardList;
