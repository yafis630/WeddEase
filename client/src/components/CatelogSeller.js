import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

const SortingDropdown = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="latest">Latest</option>
      <option value="priceHighToLow">Price High to Low</option>
      <option value="priceLowToHigh">Price Low to High</option>
    </select>
  );
};

const CatelogSeller = () => {
  const [productList, setproductList] = useState([]);
  const [sortingOption, setSortingOption] = useState("latest");

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

          let sortedProducts = [...data];
          if (sortingOption === "latest") {
            sortedProducts.sort((a, b) => {
              if (!a.createdAt || !b.createdAt) {
                return 0; // Handle undefined createdAt values
              }
              return b.createdAt.localeCompare(a.createdAt);
            });
    } else if (sortingOption === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortingOption === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
          

          const productItems = sortedProducts.map((product) => {
            console.log("product is", product);
            return (
              <div className="worker-card" key={product.id}>
                <Carousel showThumbs={false} infiniteLoop>
                  {product.imagePaths.map((imagePaths, index) => (
                    <div key={`image-carousel-${index}`}>
                      <img
                        className="worker-picture-list-P"
                        src={`http://localhost:8080/pimages/${String(
                          imagePaths
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
  }, [category, sortingOption]);

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  return (
    <>
      <div className="back-img">
        <Header />
        <br />
        <div className="sorting-container">
          <h2 className="worker-type">{category}</h2>
          <SortingDropdown onChange={handleSortingChange} />
        </div>
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

export default CatelogSeller;
