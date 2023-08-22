import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import Header from "./Header";
import Logout from "./Logout";
import Footer from "./Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import AuthContext from "../context/AuthProvider";
import Modal from "react-modal"; // Import react-modal

const WorkerProfile = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);
  const [markedDates, setMarkedDates] = useState([]);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false); // State to control modal visibility

  const Handle = () => {
    if (workerList.length > 0) {
      const unavailableDates = workerList.map((worker) => worker.unavailableDates).flat();
      setMarkedDates(unavailableDates);
    }
    setIsCalendarModalOpen(true); // Open the modal when the "hire" button is clicked
  };

  const handleSubmit = () => {
    setIsCalendarModalOpen(false); // Close the modal when the submit button is clicked
    // Add your submit logic here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workers/`+ new URLSearchParams({ category }), {
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

  return (
    <>
    <div className="back-img">
      <Header />
      <br />
      <h2 className="worker-type">{category}</h2>
      
      {workerList.map((worker) => (
        <div className="worker-card" key={worker.id}>
          <img
            className="worker-picture-list"
            src={`http://localhost:8080/images/${String(worker.imagePath).substring(8)}`}
            alt="profile"
          />
          <h3>Name</h3>
          <p>{worker.name}</p>
          <h3>Email</h3>
          <p>{worker.email}</p>
          <h3>Bio</h3>
          <p>{worker.bio}</p>
        
      <Button className="update-btn" variant="info" onClick={Handle}>
        Hire
      </Button>
      </div>
      ))}

      <Modal // Define the modal
        isOpen={isCalendarModalOpen}
        onRequestClose={() => setIsCalendarModalOpen(false)} // Close the modal when the overlay is clicked
        contentLabel="Calendar Modal"
        style={{
          content: {
            width: '650px', // Set the width to your desired value
            height: '450px', // Set the height to your desired value
            margin: 'auto', // Center the modal horizontally
          },
        }}
      >
        <div className="calendar-container">
          <h4>Select Hiring Dates</h4>
          <div className="calendar-wrapper">
            <Calendar
              className="react-calendar"
              tileDisabled={({ date }) =>
                markedDates.some((markedDate) => isSameDay(new Date(markedDate), date))
              }
              onChange={(date) => {
                const updatedMarkedDates = [...markedDates, date];
                setMarkedDates(updatedMarkedDates);
              }}
            />
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal>
      <Logout />
    </div>
    <Footer />
    </>
  );
};

export default WorkerProfile;
