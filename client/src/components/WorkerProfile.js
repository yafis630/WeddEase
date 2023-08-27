import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/WorkerProfile.css";
import Header from "./Header";
import Logout from "./Logout";
import Footer from "./Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import AuthContext from "../context/AuthProvider";
import "../styles/forms.css";
import Modal from "react-modal"; // Import react-modal

import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

Modal.setAppElement("#root");

const WorkerProfile = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const { auth } = useContext(AuthContext);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [userSelectedDates, setUserSelectedDates] = useState([]);
  const [form, setForm] = useState({});
  const [selectedDatesString, setSelectedDatesString] = useState("");

  const [formData, setFormData] = useState({
    usersName: "",
    usersEmail: "",
    phoneNo:""
  });

  const Handle = (worker) => {
    setSelectedWorker(worker);
    setIsCalendarModalOpen(true);
  };

  const handleDateSelection = (date) => {
    if (!selectedWorker?.unavailableDates.some((blockedDate) => isSameDay(new Date(blockedDate), date))) {
      const updatedSelectedDates = [...userSelectedDates, date];
      setUserSelectedDates(updatedSelectedDates);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    if (userSelectedDates.length === 0) {
      alert("Select dates first");
      setIsCalendarModalOpen(false);
      return;
    }

    try {
      const requestData = {
        selectedDates: userSelectedDates,
        formData: formData,
        workersEmail: selectedWorker.email,
        workersName:selectedWorker.name
      };
      console.log(requestData);

      const response = await fetch(`http://localhost:8080/wedease/hiredWorker`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
      });

      if (response.ok) {
        alert("request sent, Will be updated");
      } else {
        alert("Error in hiring worker");
      }
    } catch (error) {
      console.error(error);
    }

    setIsCalendarModalOpen(false);
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

  const { usersName, usersEmail, phoneNo } = formData;
 
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
            <Button className="update-btn" variant="info" onClick={() => Handle(worker)}>
              Hire
            </Button>
          </div>
        ))}

        <Modal
          isOpen={isCalendarModalOpen}
          onRequestClose={() => setIsCalendarModalOpen(false)}
          contentLabel="Calendar Modal"
          style={{
            content: {
              width: "650px", // Set the width to your desired value
              height: "450px", // Set the height to your desired value
              margin: "auto", // Center the modal horizontally
            },
          }}
        >
          <div className="calendar-container">
            <h4>Select hiring dates for {selectedWorker?.name}</h4>
            <div className="calendar-wrapper">
              <Calendar
                className="react-calendar"
                tileDisabled={({ date }) =>
                  selectedWorker?.unavailableDates.some((blockedDate) => isSameDay(new Date(blockedDate), date)) ||
                  userSelectedDates.some((selectedDate) => isSameDay(new Date(selectedDate), date))
                }
                onChange={(date) => {
                  handleDateSelection(date);
                }}
              />
            </div>
          </div>
          <Container className="registration-form-container">
            <h2 className="mt-5 mb-4 text-center">hiring details </h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="usersName">Name</Label>
                <Input
                  type="text"
                  name="usersName"
                  id="usersName"
                  value={usersName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input-field"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="usersEmail">Email</Label>
                <Input
                  type="text"
                  name="usersEmail"
                  id="usersEmail"
                  value={usersEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input-field"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNo">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  value={phoneNo}
                  onChange={handleChange}
                  placeholder="Enter worker name"
                  className="input-field"
                  required
                />
              </FormGroup>
              
              <Button color="primary" block className="submit-button">
                SUBMIT
              </Button>
            </Form>
          </Container>
        </Modal>
        <Logout />
      </div>
      <Footer />
    </>
  );
};

export default WorkerProfile;
