import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "../styles/WorkerHome.css";
import Header from "./Header";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const UserHome = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [userList, setuserList] = useState([]);
  const [unseenRequestCount, setUnseenRequestCount] = useState(0); 
  const { auth, isAuth } = useContext(AuthContext);
  let flag = true;
  if (typeof isAuth === "boolean") flag = isAuth;
  else {
    flag = isAuth === "true" ? true : false;
  }

  useEffect(() => {
    if (!flag) {
      navigate("/LoginForm");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/wedease/userhome`, {
            headers: { Authentication: `Bearer ${auth}` },
          });

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

      fetchData();
    }
  }, []);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/updates`, {
          headers: { Authentication: `Bearer ${auth}` },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const unseenCount = data.filter((update) => !update.isSeen).length;
          setUnseenRequestCount(unseenCount);
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

  const acknowledgeUpdate = async (updateId) => {
    try {
      const response = await fetch(`http://localhost:8080/wedease/requests/${updateId}`, {
        method: "POST",
        body: JSON.stringify({ isSeen: true }),
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        const updatedUpdates = updates.map((update) => {
          if (update._id === updateId) {
            return { ...update, isSeen: true };
          }
          return update;
        });
        setUpdates(updatedUpdates);
        const unseenCount = updatedUpdates.filter((update) => !update.isSeen).length;
        setUnseenRequestCount(unseenCount);
      } else {
        console.error("Error acknowledging update.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="back">
      <Header />

      <FontAwesomeIcon
        className="notification-icon"
        icon={faBell}
        onClick={handleNotificationClick}
        size="2x"
        style={{ float: "right", marginRight: "130px" }}
      />
       {unseenRequestCount > 0 && (
          <span className="notification-badge">{unseenRequestCount}</span>
        )}
      
      <div className="seller-home-container">
        <Logout />
        <div className="worker-display">{userList}</div>
        <Button variant="info" className="order-button" href="/OrderPage">
          My Orders
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
                  <p>{update.workersName} has accepted your request and will contact you soon</p>
                  
                )  : (
                  <p>{update.workersName} has rejected your request</p>
                )
              ) : null}
               {!update.isSeen && ( 
               <div>
               <Button variant="info" onClick={() => acknowledgeUpdate(update._id)}>
               OK
              </Button>
              </div>
                )}
                <hr /> 
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
