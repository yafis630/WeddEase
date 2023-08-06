import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../styles/WorkerHome.css";
import Header from "./Header";
import profile from "../data/profile-placeholder.png";

const WorkerHome = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);


  const [workerProfile, setWorkerProfile] = useState({
    name: "",
    profilePic: "", // URL to the profile picture
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/wedease/workers/' + new URLSearchParams({ category }))

        if (response.ok) {
          const data = await response.json();
          const workerItems = data.map((worker) => (
            <div className="worker-card" key={worker.id}>
              <Link
                to={`/workers/${category}/${worker.id}`}
                className="worker-card-link"
              
              >
                <img
                  className="worker-picture-list"
                  src={profile}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{worker.name}</p>
                <h3>Bio</h3>
                <p>{worker.bio}</p>
              </Link>
              
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

  const handleRangeChange = (ranges) => {
    setSelectedRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    // Perform your submit logic with the selectedRange values
    const { startDate, endDate } = selectedRange[0];
    if (startDate && endDate) {
      const response = await fetch("/update-worker-availability", {
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

  const handleLogout = () => {
    window.location.href = "/WorkerLogin";
  };

  return (
    <div className="worker-home-container">
      <Header />
      <Button variant="secondary" className="logout-button" onClick={handleLogout}>
        Logout
      </Button>
      <div>
      <br />
      <h2 className="worker-type">{category}</h2>
      <div className="worker-card-container">{workerList}</div>
      </div>
      {/* Add buttons to navigate to update profile and upload product pages */}
      <Button variant="info" href="/UpdateProfile">
        Update Profile
      </Button>
      <Button variant="success" href="/UploadProduct">
        Upload Product
      </Button>

      <div className="date-range-picker-container">
        <h4>Select Unavailable Date Range</h4>
        <DateRangePicker
          ranges={selectedRange}
          onChange={handleRangeChange}
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

