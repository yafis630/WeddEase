import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button,Modal } from "react-bootstrap";
import "../styles/WorkerHome.css"; // Create a CSS file for styling SellerHome
import Header from "./Header";
import profile from "../data/profile-placeholder.png";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";


const UserHome = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [updates,setUpdates]=useState([])
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

  useEffect(() => {
    const fetchUpdates= async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/updates`, {
          headers: { Authentication: `Bearer ${auth}` },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUpdates(data);

        } else {
          throw new Error("Error fetching worker data.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpdates();
  }, []);

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  return (
    <div className="back"> <Header />

<FontAwesomeIcon
        className="notification-icon"
        icon={faBell}
        onClick={handleNotificationClick}
        size="2x"
        style={{ float: "right", marginRight: "130px" }}
      />
    <div className="seller-home-container">
        <Logout />
      
     < div className="worker-display">{userList}</div>
      <Button variant="success" className="update-product-button" href="#">
        Orders
      </Button>
    </div>
    

<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Updates</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {updates.map((update, index) => (
      <div key={index}>
        {update.isAccepted !== undefined ? (
          update.isAccepted ? (
            <p>{update.workersName} has accepted your request</p>
          ) : (
            <p>{update.workersName} has rejected your request</p>
          )
        ) : null
        }
      </div>
    ))}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
<Footer />

    </div>
  );
};

export default UserHome;
