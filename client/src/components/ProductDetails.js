import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Header from "./Header";
import classes from "../styles/ProductDetail.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
const ProductDetails = (props) => {
  const { productID } = useParams();
  const { auth } = useContext(AuthContext);
  const [category, setCategory] = useState("");

  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wedease/catelog/product/${productID}`,
          { headers: { Authentication: `Bearer ${auth}` } }
        );
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data);
          setCategory(() => data.Category);
        } else {
          throw new Error("Error fetching seller data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={classes["product_details"]}>
      <Header />
      {productDetails && (
        <div className={classes["product_detail__container"]}>
          {/* Section for product image */}
          <div className={classes["product_detail__image_container"]}>
          <Carousel showThumbs={true} infiniteLoop>
                  {productDetails.imagePaths.map((imagePath, index) => (
                    <div key={`image-carousel-${index}`}>
                      <img
                        className="worker-picture-list-P"
                        src={`http://localhost:8080/pimages/${String(
                          imagePath
                        ).substring(9)}`}
                        alt={`profile-${index}`}
                      />
                    </div>

                  ))}
                </Carousel>
                </div>

          {/* Section for product details */}
          <div className={classes["product_detail__details_container"]}>
            <h2 className={classes["product__title"]}>{productDetails.name}</h2>

            <p className={classes["product__description"]}>
              {productDetails.description}
            </p>

            <table className={classes["product__info-table"]}>
              <tr>
                <th>Qty:</th>
                <td> {productDetails.qty}</td>
                
              </tr>
              <tr>
                <th>price:</th>
                <td>₹ {productDetails.price}</td>
              </tr>
            </table>

            <button className={classes["button--primary"]}>Buy Now</button>
            <button className={classes["button--secondary"]}>
              Add To Cart
            </button>
          </div>
        </div>
      )} 
     
    </section>
    
  );
};

export default ProductDetails;