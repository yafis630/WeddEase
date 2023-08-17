import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns"; // Import addDays function
import "../styles/WorkerHome.css";
import Header from "./Header";
import Footer from "./Footer";
import profile from "../data/profile-placeholder.png";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";

const WorkerHome = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category, workerId } = useParams();
  
  const [markedDates, setMarkedDates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wedease/workers/${category}`);
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

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    if (workerList.length > 0) {
      const unavailableDates = workerList.map((worker) => worker.unavailableDates).flat();
      setMarkedDates(unavailableDates);
    }
  }, [workerList]);


  const handleSubmit = async () => {
    if (markedDates.length > 0) {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workers/${workerId}/update-unavailable-dates`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ unavailableDates: markedDates }),
        });
  
        if (response.ok) {
          // Update the workerList or fetch updated data
        } else {
          // Handle error
        }
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  };
  

  return (
    <div className="worker-home-container">
      <Header />
      <Logout />
      <div>
        <br />
        <h2 className="worker-type">{category}</h2>
        <div className="worker-card-container">
          {workerList.map((worker) => (
            <div className="worker-card" key={worker.id}>
              <Link to={`/workers/${category}/${worker.id}`} className="worker-card-link">
                <img className="worker-picture-list" src={profile} alt="profile" />
                <h3>{worker.name}</h3>
                <p>{worker.bio}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Button variant="info" href="/UpdateProfile">
        Update Profile
      </Button>
      <Button variant="success" href="/UploadProduct">
        Upload Images
      </Button>
      <div className="calendar-container">
        <h4>Select Unavailable Dates</h4>
        <Calendar
          tileDisabled={({ date }) => markedDates.some((markedDate) => isSameDay(new Date(markedDate), date))}
          onChange={(date) => {
            const updatedMarkedDates = [...markedDates, date];
            setMarkedDates(updatedMarkedDates);
          }}
        />
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default WorkerHome;
