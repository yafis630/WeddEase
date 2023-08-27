import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns"; // Import addDays function
import "../styles/WorkerHome.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";
import WorkerLogin from "./WorkerLogin";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WorkerHome = () => {
const navigate = useNavigate();

const [showModal, setShowModal] = useState(false);
const [selectedDates, setSelectedDates] = useState([]); // State to store selected dates
const [userName, setUserName] = useState("");

  const [workerList, setWorkerList] = useState([]);
  const { category, workerId } = useParams();

  const [markedDates, setMarkedDates] = useState([]);
  const { auth, isAuth } = useContext(AuthContext);
  let flag = true;
  if (typeof(isAuth)==="boolean") flag = isAuth;
  else {
     flag = (isAuth  === "true"? true:false);
  }
  
  
  useEffect(() => {
    if(!flag){
      navigate("/WorkerLogin");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workerHome`, {
          headers: { Authentication: `Bearer ${auth}` },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkerList(data); // Set the worker data in the state
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


  const handleSubmit = async () => {
    console.log(markedDates)
    if (markedDates.length > 0) {
      try {
        const response = await fetch(`http://localhost:8080/wedease/update-unavailable-dates`, {
          method: "POST",
          body: JSON.stringify(markedDates),
          headers: {
            "Content-Type": "application/json",
            Authentication: `Bearer ${auth}`}});
        if (response.ok) {
            alert("dates pushed")
        } else {
         
        }
      } catch (error) {
        console.error(error);
        // Handle error
      }
      setSelectedDates(markedDates);
    setShowModal(true);
    }
  };
 
  return (
    <div className="back"><Header />
     <FontAwesomeIcon
  className="notification-icon"
  icon={faBell}
  onClick={() => setShowModal(true)}
  size="2x" // Adjust the size of the icon (2x for example)
  style={{ float: "right", marginRight: "130px" }} // Position on the right side with margin
/>
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
          </div>
          ))};

        <Logout />

        <div className="calendar-container">
          <h4>Select Unavailable Dates</h4>
          <div className="calendar-wrapper">
            <Calendar
              className="react-calendar"
              tileDisabled={({ date }) => markedDates.some((markedDate) => isSameDay(new Date(markedDate), date))}
              onChange={(date) => {
                setUserName("User Name"); // Set the user's name here
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
    <p>{userName} has selected the following dates:</p>
    <ul>
      {selectedDates.map((date, index) => (
        <li key={index}>{date.toString()}</li>
      ))}
    </ul>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="success">Accept</Button>
    <Button variant="danger">Reject</Button>
  </Modal.Footer>
</Modal>
      <Footer />
    </div>
  );
};

export default WorkerHome;



