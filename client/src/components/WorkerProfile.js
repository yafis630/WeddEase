import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import profile from "../data/profile-placeholder.png";

const WorkerProfile = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/workers/${category}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          const workerItems = data.map((worker, i) => (
            <li className="worker-details" key={i}>
              <img
                className="worker-picture-list"
                src={profile}
                alt="profile"
              />
              <h3>Name</h3>
              <p>{worker.name}</p>
              <h3>Email</h3>
              <p>{worker.email}</p>
              <h3>Phone Number</h3>
              <p>{worker.phoneNumber}</p>
              <h3>Bio</h3>
              <p>{worker.bio}</p>
            </li>
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

  return (
    <div>
      <br />
      <h2 className="worker-type">{category}s</h2>
      <ul>{workerList}</ul>
    </div>
  );
};

export default WorkerProfile;
