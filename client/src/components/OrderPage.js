import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import AuthContext from "../context/AuthProvider";
import "../styles/CartPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


function OrderPage() {
    const [orders, setOrders] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `http://localhost:8080/wedease/orders`,
              { headers: { Authentication: `Bearer ${auth}` } }
            );
            if (response.ok) {
              const data = await response.json();
              setOrders(data);
            } else {
              throw new Error("Error fetching product data.");
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [auth]);

      return (
        <div className="back-img">
          <Header />
          <div className="cart-page">
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
              <>
                <div className="cart-items">
                  {orders.map((item) => (
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
                
                
              </>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      );
}

export default OrderPage;