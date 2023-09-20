import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import profile from "../data/profile-placeholder.png";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";

const WorkerDetails = () => {
  const [worker, setWorker] = useState(null); 
  const { auth } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wedease/worker/${id}`,
          { headers: { Authentication: `Bearer ${auth}` } }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setWorker(data);
        } else {
          throw new Error("Error fetching images");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="back-img">
        <Header />
        <br />
        <h2 className="worker-type"></h2>
        {worker ? (
            <div className="image-gallery">
              {worker.imagePaths.map((imagePath, index) => (
                <img
                  key={index}
                  src={`http://localhost:8080/pimages/${String(
                    imagePath
                  ).substring(8)}`}
                  alt={`Image ${index}`}
                  className="worker-image-details"
                />
              ))}
            </div>
        ) : (
          <p className="para">Worker details not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WorkerDetails;
