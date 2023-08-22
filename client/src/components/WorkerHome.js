import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns"; // Import addDays function
import "../styles/WorkerHome.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";
import WorkerLogin from "./WorkerLogin";

const WorkerHome = () => {
const navigate = useNavigate();
  const [workerList, setWorkerList] = useState([]);
  const { category, workerId } = useParams();

  const [markedDates, setMarkedDates] = useState([]);
  const { auth, isAuth } = useContext(AuthContext);
  let flag = true;
  if (typeof(isAuth)==="boolean") flag = isAuth;
  else {
     flag = (isAuth  === "true"? true:false);
  }
  
  console.log(isAuth);
  console.log(flag);
  console.log(typeof(isAuth));

  useEffect(() => {
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
    <div className="back"><Header />
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


        <div className="worker-display">{workerList}</div>

        <Logout />

        <div className="calendar-container">
          <h4>Select Unavailable Dates</h4>
          <div className="calendar-wrapper">
            <Calendar
              className="react-calendar"
              tileDisabled={({ date }) => markedDates.some((markedDate) => isSameDay(new Date(markedDate), date))}
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
      </div>
      <Footer />
    </div>
  );
};

export default WorkerHome;



