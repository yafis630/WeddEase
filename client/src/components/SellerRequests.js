import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import AuthContext from "../context/AuthProvider";
import "../styles/CartPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "react-bootstrap";

function SellerRequests() {
  const [orders, setOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({});
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/purchases`, {
          headers: { Authentication: `Bearer ${auth}` },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error("Error fetching order data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth]);

  const filteredProductDetail = orders.filter(
    (item) => item.isSuccessful === true
  );

  const handledelivery = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8080/wedease/delivery/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delivered: true }),
      });

      if (response.ok) {
          setOrders((prevOrders) =>
          prevOrders.map((item) =>
            item._id === orderId ? { ...item, delivered: true } : item
          )
        );
        alert("Delivery status updated successfully");
      } else {
        throw new Error("Error delivering the product.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="back-img">
      <Header />
      <div className="cart-page">
        <h2>Incoming Purchase Requests</h2>
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
                  <div >
                    <h3>{item.name}</h3>
                    <span>Unit price: ₹{item.price}</span><br></br>

                    <span>Qty: {item.qty}</span>
                  </div>
                  <h3>Address details</h3>
                  <span>{item.Username}</span>
                  <span>{item.streetAddress}</span>
                  <span>{item.state}</span>
                  <span>{item.pincode}</span>
                  <span>{item.phoneNumber}</span>
                  <div>
                    <br />
                    {item.delivered ? (
                      <p>Product delivered successfully</p>
                    ) : (
                      <Button
                        variant="success"
                        className="update-product-button"
                        onClick={() => handledelivery(item._id)}
                      >
                        Delivered
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No purchase requests found.</p>
        )}
      </div>
    </div>
  );
}

export default SellerRequests;
