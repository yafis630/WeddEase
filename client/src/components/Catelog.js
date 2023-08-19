import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";

const Catelog = () => {
  const [productList, setproductList] = useState([]);
  const { pcategory } = useParams();
  const {auth}  = useContext(AuthContext);
 
  const Handle = () => {
    alert("Hired");

  }

  useEffect(() => {
    const fetchData = async () => {
   
      try {
        const response = await fetch('http://localhost:8080/wedease/catelog/' + new URLSearchParams({ pcategory }),
        {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          const productItems = data.map((seller) => (
            <div className="worker-card" key={seller.id}>
              
              
                <img
                  className="worker-picture-list"
                  src={'http://localhost:8080/pimages/'+String(seller.imagePath).substring(9)}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{seller.name}</p>
                <h3>Email</h3>
                <p>{seller.description}</p>
                <h3>Bio</h3>
                <p>{seller.price}</p>
            
              <Button variant="primary" size="lg" onClick={Handle} className="hire-button">
                cart
              </Button>
            </div>

          ));

          setproductList(productItems);
        } else {
          throw new Error("Error fetching seller data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pcategory]);

  return (
    <>
    
    <div className="back-img">
    <Header />
      <br />
      <h2 className="worker-type">{pcategory}</h2>
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
