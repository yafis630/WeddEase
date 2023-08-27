import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerHome.css"; // Create a CSS file for styling SellerHome
import Header from "./Header";
import profile from "../data/profile-placeholder.png";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";


const UserHome = () => {
  const navigate = useNavigate();

const [userList, setuserList] = useState([]);
const {auth, isAuth}  = useContext(AuthContext);
let flag = true;
  if (typeof(isAuth)==="boolean") flag = isAuth;
  else {
     flag = (isAuth  === "true"? true:false);
  }


useEffect(() => {
  if(!flag){
    navigate("/LoginForm");
    console.log("hi");
  }
  else{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/userhome`,
          {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          const userItems = data.map((user) => (
            <div className="worker-home" key={user.id}>
                
                <h3>Name</h3>
                <p>{user.name}</p>
                
                <h3>Email</h3>
                <p>{user.email}</p>
                <h3>Phone Number</h3>
                <p>{user.phoneNumber}</p>
                
                <h3>Gender</h3>
                <p>{user.gender}</p>
                
                <Button className="update-btn" variant="info" href="/UpdateProfileUser">
        Update Profile
      </Button>
            </div>

          ));
       setuserList(userItems);
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
      
     < div className="worker-display">{userList}</div>
      <Button variant="success" className="update-product-button" href="#">
        Orders
      </Button>
    </div>
    </div>
  );
};

export default UserHome;
