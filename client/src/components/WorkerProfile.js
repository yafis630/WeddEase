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
import Modal from "react-modal";


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
          console.log(data)
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
        <h2 className="work-type">{category}</h2>

        {workerList.length === 0 ? (
          <p className="para">No workers available</p>
        ) : (
          workerList.map((worker) => (
            <div className="work-card" key={worker.id}>
            
              <Link to = {`/WorkerDetails/${worker._id}`} className="work-card-link">
              <img
                className="work-picture-list"
                src={`http://localhost:8080/images/${String(worker.imagePath).substring(8)}`}
                alt="profile"
              />
              <h3>Name</h3>
              <p>{worker.name}</p>
              <h3>Email</h3>
              <p>{worker.email}</p>
              <h3>Bio</h3>
              <p>{worker.bio}</p>
              <p>{worker._id}</p>
              </Link>

              <Button color="primary" size="lg" variant="info" onClick={() => Handle(worker)}>
                Hire
              </Button>
            </div>
          ))
        )}

<Modal
  isOpen={isCalendarModalOpen}
  onRequestClose={() => setIsCalendarModalOpen(false)}
  contentLabel="Calendar Modal"
  style={{
    content: {
      display: "flex", // Use flex display to create two columns
      alignItems: "center", // Vertically align content in the center
      width: "1300px", // Set the total width of the modal
      height: "500px", // Set the height to your desired value
      margin: "auto", // Center the modal horizontally
    },
  }}
>
  <div style={{ flex: 1 }}>
    <div className="calendar-container">
      <h4>Select hiring dates for {selectedWorker?.name}</h4>
      <div className="calendar-wrapper">
        <Calendar
          className="react-calendar"
          tileDisabled={({ date }) =>
            selectedWorker?.unavailableDates.some((blockedDate) =>
              isSameDay(new Date(blockedDate), date)
            ) ||
            userSelectedDates.some((selectedDate) => isSameDay(new Date(selectedDate), date))
          }
          onChange={(date) => {
            handleDateSelection(date);
          }}
        />
      </div>
    </div>
  </div>
  <div style={{ flex: 1 }}>
    <Container className="registration-form-container">
      <h2 className="mt-5 mb-4 text-center">Hiring Details</h2>
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
  </div>
</Modal>

        <Logout />
      </div>
      <Footer />
    </>
  );
};

export default WorkerProfile;
