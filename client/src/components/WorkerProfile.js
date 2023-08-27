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
import Modal from "react-modal";

Modal.setAppElement("#root");

const WorkerProfile = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [userSelectedDates, setUserSelectedDates] = useState([]); // State to store user's selected dates

  const Handle = (worker) => {
    setSelectedWorker(worker);
    setIsCalendarModalOpen(true); // Open the modal when the "hire" button is clicked
  };

  const handleDateSelection = (date) => {
    // Check if the selected date is not in the blocked dates for the selected worker
    if (!selectedWorker?.unavailableDates.some((blockedDate) => isSameDay(new Date(blockedDate), date))) {
      setUserSelectedDates((prevSelectedDates) => [...prevSelectedDates, date]);
    }
  };

  const handleSubmit = () => {
    // Handle submission of userSelectedDates, e.g., send them to the server
    console.log("Selected Dates:", userSelectedDates);
    setIsCalendarModalOpen(false); // Close the modal after submission
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workers/` + new URLSearchParams({ category }), {
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

  return (
    <>
      <div className="back-img">
        <Header />
        <br />
        <h2 className="worker-type">{category}</h2>

        {workerList.length === 0 ? (
          <p className="para">No workers available</p>
        ) : (
          workerList.map((worker) => (
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

              <Button className="update-btn" variant="info" onClick={() => Handle(worker)}>
                Hire
              </Button>
            </div>
          ))
        )}

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
            <h4>Select hiring dates for {selectedWorker?.name}</h4>
            <div className="calendar-wrapper">
              <Calendar
                className="react-calendar"
                tileDisabled={({ date }) =>
                  selectedWorker?.unavailableDates.some((blockedDate) => isSameDay(new Date(blockedDate), date))
                }
                onChange={(date) => {
                  handleDateSelection(date);
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
