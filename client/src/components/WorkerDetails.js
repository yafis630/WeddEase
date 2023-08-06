// WorkerDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import profile from "../data/profile-placeholder.png";

const WorkerDetails = () => {
  const { workerId } = useParams(); 

  const [workerDetails, setWorkerDetails] = useState({});

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wedease/workers/${workerId}`
        );

        if (response.ok) {
          const data = await response.json();
          setWorkerDetails(data);
        } else {
          throw new Error("Error fetching worker details.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  return (
    <div className="worker-details-container">
      
      <h2>{workerDetails.name}</h2>
      <img src={profile} alt="profile" />
      <p>Email: {workerDetails.email}</p>
      <p>Phone Number: {workerDetails.phoneNumber}</p>
      <p>Bio: {workerDetails.bio}</p>
      
    </div>
  );
};

export default WorkerDetails;
