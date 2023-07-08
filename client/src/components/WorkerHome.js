import React, { useState } from "react";
import { Route, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import WorkerLogin from "./WorkerLogin";
import "../styles/WorkerHome.css";

const WorkerHome = () => {
  const { available } = useParams();

  const [checked, setChecked] = useState(available === "true");

  const handleChange = async () => {
    const response = await fetch("/update-worker-availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: !checked }),
    });

    if (response.ok) {
      setChecked(!checked);
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

      <div className="toggle-container">
        <h3>Availability Toggle</h3>
        <Form.Check
          type="switch"
          id="availability-toggle"
          className="toggle-switch"
          checked={checked}
          label={checked ? "Available" : "Unavailable"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default WorkerHome;
