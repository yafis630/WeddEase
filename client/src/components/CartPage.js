import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthContext from "../context/AuthProvider";
import "../styles/CartPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wedease/cartedItems`,
          { headers: { Authentication: `Bearer ${auth}` } }
        );
        if (response.ok) {
          const data = await response.json();
          //console.log(data)
          setProductDetail(data);
        } else {
          throw new Error("Error fetching product data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth]);

  const filteredProductDetail = productDetail.filter(
    (item) => item.isSuccessful === undefined
  );
  console.log(filteredProductDetail)

  const totalPrice = filteredProductDetail.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
 
  const handleBuyNow = () => {
    navigate("/PaymentGatewayPage", { state: { totalAmount: totalPrice , productDetail} });
  };

  return (
    <div className="back-img">
      <Header />
      <div className="cart-page">
        <h2>Your Cart</h2>
        {filteredProductDetail.length > 0 ? (
          <>
            <div className="cart-items">
              {filteredProductDetail.map((item) => (
                <div key={item._id} className="cart-item">
                  <Carousel showThumbs={false}>
                    {item.imagePaths.map((imagePath, index) => (
                      <div key={index}>
                        <img
                          src={`http://localhost:8080/pimages/${String(
                            imagePath
                          ).substring(9)}`}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>
                    ))}
                  </Carousel>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <div className="cart-item-price-quantity">
                      <span>₹{item.price}</span> {/* Display price in Indian Rupees */}
                      <span>Qty: {item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{totalPrice}</span> {/* Display total price in Indian Rupees */}
            </div>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
