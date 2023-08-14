import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/SellerCat.css'; // Import the CSS file

const SellerCat = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="product-list-container">
      <h2>Category Page</h2>
      <div className="product-card-list">
        {products.map((product) => (
          <Card key={product.id} className="product-card">
            <div className="product-images">
              {product.images.map((imageSrc, index) => (
                <img
                  key={index}
                  src={imageSrc}
                  alt={`Product ${index + 1}`}
                  className="product-image"
                />
              ))}
            </div>
            <Card.Body>
              <Card.Title className="product-card-title">{product.name}</Card.Title>
              <Card.Text className="product-card-description">{product.description}</Card.Text>
              <Card.Text className="product-card-price">Price: ${product.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellerCat;
