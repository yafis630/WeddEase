import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/catelog.css";
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
            <div className="catelog2-card" key={product._id}>
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
                <h6>Quantity</h6>
                <p>{product.qty}</p>
                
                <h6>price</h6>
                <p>₹ {product.price}</p>
                <h6>colour</h6>
                <p>{product.colour}</p>
                <h6>Brand</h6>
                <p>{product.brand}</p>
                <h6>Material</h6>
                <p>{product.material}</p>
                <h6>description</h6>
                <p>{product.description}</p>
              </div>
              <div className="buttons-container">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    href={`/UpdateQuantity/${product._id}`}>
                     Update Quantity
                  </Button>
                
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
        <h2 className="mt-2 mb-4 text-center">Uploaded Products</h2>
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
