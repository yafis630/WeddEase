import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthContext from "../context/AuthProvider";
import CartContext from "../context/CartContext";
import "../styles/CartPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "reactstrap";

const CartPage = () => {
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState([]);
  const { auth } = useContext(AuthContext);

  // Access cartItems from CartContext
  const { cartItems, setCustomValue } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wedease/cartedItems`,
          { headers: { Authentication: `Bearer ${auth}` } }
        );
        if (response.ok) {
          const data = await response.json();
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

  // Count the items in the cart
  const count = filteredProductDetail.length;

  // Update the count in your CartContext
  //setCustomValue(count);

  const totalPrice = filteredProductDetail.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleBuyNow = () => {
    navigate("/PaymentGatewayPage", {
      state: { totalAmount: totalPrice, filteredProductDetail, },
    });
  };

  const handleRemoveItem = async (_id) => {
    console.log(_id);
    try {
      const response = await fetch(`http://localhost:8080/wedease/delcart/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        setProductDetail((prevItems) => prevItems.filter((item) => item._id !== _id));
        // Remove the item from the cart context
        // Note: You may need to implement removeFromCart in your CartContext
      } else {
        throw new Error("Error removing item from cart.");
      }
    } catch (error) {
      console.log(error);
    }
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
                          src={`http://localhost:8080/pimages/${String(imagePath).substring(9)}`}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>
                    ))}
                  </Carousel>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <div >
                      <span>₹{item.price}</span><br /> {/* Display price in Indian Rupees */}
                      <span>Qty: {item.qty}</span>
                    </div>
                    <br />
                    <Button color="danger" onClick={() => handleRemoveItem(item._id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{totalPrice}</span> {/* Display total price in Indian Rupees */}
            </div>
            <Button className="buy-now-button" color="danger" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;