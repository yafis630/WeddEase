import React, { useState } from "react";
import { Route, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../styles/WorkerHome.css";

const WorkerHome = () => {
  const { available } = useParams();

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

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
      <Button variant="secondary" className="logout-button" onClick={handleLogout}>
        Logout
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
