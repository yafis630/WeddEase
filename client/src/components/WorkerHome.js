import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  
const[workerdata,setWorkerdata]=useState([]);
const [workerList, setWorkerList] = useState([]);
const { category , workerId} = useParams();
  
  const [markedDates, setMarkedDates] = useState([]);
  const {auth}  = useContext(AuthContext)
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workerHome`,
          {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const workerItems = data.map((worker) => (
            <div className="worker-home" key={worker.id}>
                <img
                  className="worker-profile-pic"
                  src={'http://localhost:8080/images/'+String(worker.imagePath).substring(8)}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{worker.name}</p>
                <h3>Bio</h3>
                <p>{worker.bio}</p>
              
            </div>

          ));

          setWorkerList(workerItems);
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
    if (markedDates.length > 0) {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workers/update-unavailable-dates`, {
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
    <div className="back"><Header />
    <div className="worker-home-container">
      
      <div className="worker-display">{workerList}</div>
      <Logout />
      <Button className="update-btn" variant="info" href="/UpdateProfile">
        Update Profile
      </Button>
      <Button className="update-btn" variant="success" href="/UploadProduct">
        Upload Images
      </Button>
      <div className="calendar-container">
        <h4>Unavailable Dates</h4>
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
      </div>
      <Footer />
    </div>
  );
};

export default WorkerHome;
