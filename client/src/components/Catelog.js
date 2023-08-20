import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

const Catelog = () => {
  const [productList, setproductList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);

  // const Handle = () => {
  //   alert("Hired ");
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/wedease/catelog/" +
            new URLSearchParams({ category }),
          { headers: { Authentication: `Bearer ${auth}` } }
        );

        if (response.ok) {
          const data = await response.json();
          const productItems = data.map((product) => {
            console.log("product is", product);
            return (
              <div className="worker-card" key={product.id}>
                <Carousel showThumbs={false} infiniteLoop>
                  {product.imagePaths.map((imagePath, index) => (
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

                <h6>Name</h6>
                <p>{product.name}</p>
                <h6>Description</h6>
                <p>{product.description}</p>
                <h6>Price</h6>
                <p>₹ {product.price}</p>

                <Link to={`/ProductDetail/${product._id}`}>
                  <Button
                    variant="primary"
                    size="lg"
                    // onClick={Handle}
                    className="hire-button"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            );
          });

          setproductList(productItems);
        } else {
          throw new Error("Error fetching seller data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <div className="back-img">
        <Header />
        <br />
        <h2 className="worker-type">{category}</h2>
        {productList.length > 0 ? (
          <div className="worker-card-container">{productList}</div>
        ) : (
          <p className="para">No products found in this category.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Catelog;
