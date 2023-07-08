import React, { useState } from "react";
import { Route, useParams } from "react-router-dom";
import { Button, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Main from "./Main";
import WorkerLogin from "./WorkerLogin";

const WorkerHome = () => {
  const name = useParams().fullName;
  const available = useParams().available;

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
    // Add code to handle logout here
    // For example, redirect to the homepage
    window.location.href = "/WorkerLogin";

    <Route path="/WorkerLogin" element={<WorkerLogin />} />
  };
  

  return (
    <div>
      <h3 className="name-heading">
        Hello!
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </h3>

      <div className="ui inverted compact segment">
        <h3>Availability Toggle</h3>
        <ToggleButtonGroup
          type="checkbox"
          className="mb-2"
          value={checked ? ["1"] : []}
        >
          <ToggleButton
            id="availability-toggle"
            variant="outline-primary"
            value="1"
            onChange={handleChange}
          >
            {checked ? "Available" : "Unavailable"}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default WorkerHome;
