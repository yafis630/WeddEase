import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Header from "./Header";
import Footer from "./Footer";
import classes from "../styles/ProductDetail.module.css";
import { Carousel } from "react-responsive-carousel";

import { useNavigate } from "react-router-dom";


const ProductDetails = (props) => {
  const navigate = useNavigate();
  const { productID } = useParams();
  const { auth } = useContext(AuthContext);
  const [productDetail, setProductDetail] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Initialize quantity as 0
  const [outOfStock, setOutOfStock] = useState(false); // State to track out of stock status

  // ... useEffect and other code ...

  const handleAddToCart = async () => {
    if (selectedQuantity <= 0) {
      // Quantity is 0 or negative, don't proceed
      return;
    }

    try {
      const itemToAdd = {
        qty: selectedQuantity,
        name: productDetail.name,
        price: productDetail.price,
        usertoken: auth,
        sellerEmail:productDetail.sellerEmail,
        imagePaths: productDetail.imagePaths || [],
      };

      const response = await fetch("http://localhost:8080/wedease/carted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
        body: JSON.stringify(itemToAdd),
      });

      if (response.ok) {
        navigate("/CartPage");
      } else {
        alert("Error in buying product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wedease/catelog/product/${productID}`,
          { headers: { Authentication: `Bearer ${auth}` } }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProductDetail(data);

          // Check if the product is out of stock
          if (data.qty <= 0) {
            setOutOfStock(true);
          }
        } else {
          throw new Error("Error fetching product data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

   const handleBuyNow=()=>{}

  return (
    <div>
    <div className="body"> <Header /></div>
    <section className={classes["product_details"]}>
      
      {productDetail && (
        <div className={classes["product_detail__container"]}>
          <div className={classes["product_detail__image_container"]}>
          
            <Carousel showThumbs={true} infiniteLoop>
              {productDetail.imagePaths.map((imagePath, index) => (
                <div key={`image-carousel-${index}`}>
                  <img
                    className="product__image"
                    src={`http://localhost:8080/pimages/${String(
                      imagePath
                    ).substring(9)}`}
                    alt={`profile-${index}`}
                  />
                </div>
              ))}
            </Carousel>
            
            
            <p className={classes["product__description"]}>
              <th> {productDetail.description}</th>
              </p>
            <p className={classes["product__price"]}>
              <h5> Price: ₹ {productDetail.price}</h5>
            </p>
          </div>
          <div className={classes["product_detail__details_container"]}>
            <h2 className={classes["product__title"]}>
              {productDetail.name}
            </h2>
            <div className={classes["product__quantity-select-container"]}>
              <div className={classes["product__quantity-select"]}>
                <label htmlFor="quantity">Quantity : </label>
                <select
                  id="quantity"
                  value={selectedQuantity}
                  onChange={(e) =>
                    setSelectedQuantity(parseInt(e.target.value))
                  }
                >
                  {Array.from({ length: productDetail.qty }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {outOfStock ? (
              <p className={classes["out-of-stock-message"]}>Out of Stock</p>
            ) : (
              <>
                <button
                  className={classes["button--primary"]}
                  onClick={handleBuyNow}
                  disabled={outOfStock || selectedQuantity <= 0}
                >
                  Buy Now
                </button>
                <button
                  className={classes["button--secondary"]}
                  onClick={handleAddToCart}
                  disabled={outOfStock || selectedQuantity <= 0}
                >
                  Add To Cart
                </button>
              </>
            )}
            <p className={classes["product__description"]}>
              <h5>Product details:</h5>
              {productDetail.description}
            </p>
            <table className={classes["product__info-table"]}>
              <tr>
                <th>Price:</th>
                <td>₹ {productDetail.price}</td>
                </tr>
                <tr>
                <th>In Stock:</th>
                <td> {productDetail.qty}</td>
                
              </tr>
              <tr>
                <th>Colour:</th>
                <td>{productDetail.colour}</td>
              </tr>
              <tr>
                <th>Brand:</th>
                <td>{productDetail.brand}</td>
              </tr>
              <tr>
                <th>Material:</th>
                <td>{productDetail.material}</td>
              </tr>
            </table>
          </div>
        </div>
      )} 
    </section><Footer />
    </div>
    
  );
};

export default ProductDetails;
