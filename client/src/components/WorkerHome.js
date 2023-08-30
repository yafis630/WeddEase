import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import "../styles/WorkerHome.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";
import WorkerLogin from "./WorkerLogin";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkerHome = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const { category, workerId } = useParams();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  const [markedDates, setMarkedDates] = useState([]);
  const { auth, isAuth } = useContext(AuthContext);

  let flag = true;
  if (typeof isAuth === "boolean") flag = isAuth;
  else {
    flag = isAuth === "true" ? true : false;
  }

  useEffect(() => {
    if (!flag) {
      navigate("/WorkerLogin");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workerHome`, {
          headers: { Authentication: `Bearer ${auth}` },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkerList(data);
        } else {
          throw new Error("Error fetching worker data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (workerList.length > 0) {
      const unavailableDates = workerList.map((worker) => worker.unavailableDates).flat();
      setMarkedDates(unavailableDates);
    }
  }, [workerList]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/notification`, {
          headers: { Authentication: `Bearer ${auth}` },
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          const pendingCount = data.filter(notification => notification.isAccepted === undefined).length;
          setPendingRequestsCount(pendingCount);
          console.log(pendingCount)
        } else {
          throw new Error("Error fetching worker data.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotification();
  }, []);

  const handleAccept = async (notification) => {
    try {
      const requestData = {
        isAccepted: true,
        usersEmail:notification.usersEmail,
        selectedDates:notification.selectedDates
      };

      const response = await fetch(`http://localhost:8080/wedease/request`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
       
        setNotifications((prevNotifications) =>
          prevNotifications.filter((item) => item !== notification)
        );
        setPendingRequestsCount((prevCount) => prevCount - 1);
        alert("Request accepted successfully");
      } else {
        alert("Error accepting the request");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (notification) => {
    try {
      const requestData = {
        isAccepted: false,
        usersEmail:notification.usersEmail,
        selectedDates:notification.selectedDates
      };
      const response = await fetch(`http://localhost:8080/wedease/request`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
          setNotifications((prevNotifications) =>
          prevNotifications.filter((item) => item !== notification)
        );
        setPendingRequestsCount((prevCount) => prevCount - 1);
        alert("Request rejected");
      } else {
        alert("Error rejecting the request");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const handleSubmit = async () => {
    if (markedDates.length > 0) {
      try {
        const response = await fetch(`http://localhost:8080/wedease/update-unavailable-dates`, {
          method: "POST",
          body: JSON.stringify(markedDates),
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${auth}`,
          },
        });
        if (response.ok) {
          alert("Dates pushed");
        } else {
          alert("Some error occurred");
        }
      } catch (error) {
        console.error(error);
      }
      setSelectedDates(markedDates);
      setShowModal(true);
    }
  };

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  return (
    <div className="back">
      <Header />
      <div className="notification-container">
      <FontAwesomeIcon
       className="notification-icon"
       icon={faBell}
       onClick={handleNotificationClick}
       size="2x"
       
  
>
    </FontAwesomeIcon>
         {pendingRequestsCount > 0 && (
          <span className="notification-badge">{pendingRequestsCount}</span>
        )}
       </div>

      <div className="worker-home-container">
  
      {workerList.map((worker) => (
        <div className="worker-home" key={worker.id}>
          <img
            className="worker-profile-pic"
            src={`http://localhost:8080/images/${String(worker.imagePath).substring(8)}`}
            alt="profile"
          />
          <h3>Name</h3>
          <p>{worker.name}</p>
          <h3>Email</h3>
          <p>{worker.email}</p>           
          <h3>Phone Number</h3>
          <p>{worker.phoneNumber}</p>
          <h3>DOB</h3>
          <p>{worker.DOB}</p>
          <h3>Profession</h3>
          <p>{worker.profession}</p>
          <h3>Gender</h3>
          <p>{worker.gender}</p>
          <h3>Bio</h3>
          <p>{worker.bio}</p>
          <Button className="update-btn" variant="info" href="/UpdateProfile">
           Update Profile
           </Button>
           <Button className="update-btn" variant="info" href="/UploadProduct">
           Upload Images
           </Button>
          </div>
        ))}

        <Logout />

        <div className="calendar-container">
          <h4>Select Unavailable Dates</h4>
          <div className="calendar-wrapper">
            <Calendar
              className="react-calendar"
              tileDisabled={({ date }) => markedDates.some((markedDate) => isSameDay(new Date(markedDate), date))}
              onChange={(date) => {
                setUserName("User Name");
                const updatedMarkedDates = [...markedDates, date];
                setMarkedDates(updatedMarkedDates);
              }}
            />
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notifications.map((notification, index) => (
            <div key={index}>
              <p>{notification.usersName} has selected the following dates:</p>
              <ul>
                {notification.selectedDates.map((date, dateIndex) => (
                  <li key={dateIndex}>{formatDate(date)}</li>
                ))}
              </ul>
              <p>Contact No: {notification.phoneNo}</p>

              {notification.isAccepted !== undefined ? (
                notification.isAccepted ? (
                  <p>Request Accepted</p>
                ) : (
                  <p>Request Rejected</p>
                )
              ) : (
                <>
                  <Button variant="success" onClick={() => handleAccept(notification)}>
                    Accept
                  </Button>
                  <Button variant="danger" onClick={() => handleReject(notification)}>
                    Reject
                  </Button>
                </>
              )}
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

export default WorkerHome;
