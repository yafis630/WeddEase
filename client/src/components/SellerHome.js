import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button,Modal } from "react-bootstrap";
import "../styles/WorkerHome.css";
import Header from "./Header";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";
import Footer from "./Footer";


const SellerHome = () => {
  const navigate = useNavigate();

const [sellerList, setsellerList] = useState([]);
const {auth, isAuth}  = useContext(AuthContext);
let flag = true;
  if (typeof(isAuth)==="boolean") flag = isAuth;
  else {
     flag = (isAuth  === "true"? true:false);
  }
const { category , sellerId} = useParams();

useEffect(() => {
  if(!flag){
    navigate("/SellerLogin");
  }
  else{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/sellerhome`,
          {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          const sellerItems = data.map((seller) => (
            <div className="seller-home" key={seller.id}>
                <img
                  className="worker-profile-pic"
                  src={'http://localhost:8080/images/'+String(seller.imagePath).substring(8)}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{seller.name}</p>
                <h3>Address</h3>
                <p>{seller.address}</p>
                <h3>Email</h3>
                <p>{seller.email}</p>
                <h3>Phone Number</h3>
                <p>{seller.phoneNumber}</p>
                <h3>DOB</h3>
                <p>{seller.DOB}</p>
                <h3>Category</h3>
                <p>{seller.category}</p>
                <h3>Gender</h3>
                <p>{seller.gender}</p>
                <h3>Bio</h3>
                <p>{seller.bio}</p>
                <Button className="update-btn" variant="info" href="/UpdateProfileSeller">
        Update Profile
      </Button>
            </div>

          ));
       setsellerList(sellerItems);
        } else {
          throw new Error("Error fetching worker data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();}
  }, []);

  return (
    <div className="back"> <Header />
    
    
      <div className="seller-home-container">
        <Logout />
      
     <div className="worker-display">{sellerList}</div>
     <div className="seller-buttons-container">
      <Button variant="success" className="update-product-button" href="/SellerPr">
        Upload Product
      </Button>
      <Button variant="info" className="update-product-button" href="/Catelog2">
        Uploaded Product
      </Button>
      <Button variant="danger" className="update-product-button" href="/SellerRequests">
         Purchase Requests
      </Button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default SellerHome;
