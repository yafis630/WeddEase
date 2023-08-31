import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Catelog2 = () => {
  const [productList, setProductList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/wedease/catelog2",
          { headers: { Authentication: `Bearer ${auth}` } }
        );

        if (response.ok) {
          const data = await response.json();
          const productItems = data.map((product) => (
            <div className="worker-card" key={product._id}>
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
              <div className="Discription">
                <h6>Name</h6>
                <p>{product.name}</p>
                <p>₹ {product.price}</p>
              </div>
              <div className="buttons-container">
                <Link to={`/ProductDetail/${product._id}`}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="details-button"
                  >
                    View Details
                  </Button>
                </Link>
                {
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                    className="delete-button"
                  >
                    Delete
                  </Button>
                }
              </div>
            </div>
          ));

          setProductList(productItems);
        } else {
          throw new Error("Error fetching seller data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category, auth]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/wedease/delProducts/${productId}`,
        {
          method: "DELETE",
          headers: { Authentication: `Bearer ${auth}` },
        }
      );

      if (response.ok) {
        // Remove the deleted product from the state
        setProductList((prevList) =>
          prevList.filter((product) => product.key !== productId)
        );
      } else {
        throw new Error("Error deleting product.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="back-img">
        <Header />
        <br />
        <h2 className="worker-type">{category}</h2>
        {productList.length > 0 ? (
          <div className="worker-card-container">{productList}</div>
        ) : (
          <p className="para">No products found </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Catelog2;
