import React, { useState, useEffect,useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns"; // Import addDays function
import "../styles/WorkerHome.css";
import Header from "./Header";
import profile from "../data/profile-placeholder.png";
import AuthContext from "../context/AuthProvider";
import Logout from "./Logout";

const WorkerHome = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);
  const [workerdata, setWorkerdata] = useState([]);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/workerHome`,
          {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setWorkerdata(data);
          console.log(workerdata);
        } else {
          throw new Error("Error fetching worker data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[workerdata]);

  useEffect(() => {
    if (workerList.length > 0) {
      const unavailableDates = workerList.map((worker) => worker.unavailableDates).flat();
      const markedUnavailableDates = convertDatesToMarkedFormat(unavailableDates);
      setMarkedDates(markedUnavailableDates);
    }
  }, [workerList]);

  const convertDatesToMarkedFormat = (dates) => {
    return dates.map((date) => ({
      startDate: new Date(date),
      endDate: addDays(new Date(date), 1),
      color: "#FF5733", // Red color for unavailable dates
    }));
  };

  const handleRangeChange = (ranges) => {
    setSelectedRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    const { startDate, endDate } = selectedRange[0];
    if (startDate && endDate) {
      const response = await fetch("http://localhost:8080/wedease/update-worker-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    }
  };

  return (
    <div className="worker-home-container">
      <Header />
      <Logout />
      <div>
                <img
                  className="worker-picture-list"
                  src={'http://localhost:8080/images/'+String(workerdata.imagePath).substring(8)}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{workerdata.name}</p>
                <h3>Email</h3>
                <p>{workerdata.email}</p>
                <h3>Bio</h3>
                <p>{workerdata.bio}</p>

              
            </div>
      <Button variant="info" href="/UpdateProfile">
        Update Profile
      </Button>
      <Button variant="success" href="/UploadProduct">
        Upload Images
      </Button>
      <div className="date-range-picker-container">
        <h4>Select Unavailable Date Range</h4>
        <DateRangePicker
          ranges={selectedRange}
          onChange={handleRangeChange}
          markedDates={markedDates}
          className="date-range-picker"
        />
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default WorkerHome;
