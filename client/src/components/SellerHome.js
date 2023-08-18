import React from "react";
import { Button } from "react-bootstrap";
import "../styles/SellerHome.css"; // Create a CSS file for styling SellerHome
import Header from "./Header";
import profile from "../data/profile-placeholder.png";

const SellerHome = () => {
  const handleLogout = () => {
    window.location.href = "/SellerLogin";

  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/sellerhome`,
          {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const workerItems = data.map((worker) => (
            <div className="worker-home" key={worker.id}>
                <img
                  className="worker-profile-pic"
                  src={'http://localhost:8080/images/'+String(worker.imagePath).substring(8)}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{worker.name}</p>
                <h3>Email</h3>
                <p>{worker.email}</p>
                <h3>Phone Number</h3>
                <p>{worker.phoneNumber}</p>
                <h3>DOB</h3>
                <p>{worker.DOB}</p>
                <h3>Profession</h3>
                <p>{worker.profession}</p>
                <h3>Gender</h3>
                <p>{worker.gender}</p>
                <h3>Bio</h3>
                <p>{worker.bio}</p>
              
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
  }, []);

  return (
    <div className="seller-home-container">
      <Header />
      <Button variant="secondary" className="logout-button" onClick={handleLogout}>
        Logout
      </Button>
      <div className="seller-profile">
        <img className="profile-picture" src={profile} alt="profile" />
      </div>
      <Button variant="info" className="update-profile-button" href="/UpdateProfileSeller">
        Update Profile
      </Button>
      <Button variant="success" className="update-product-button" href="/SellerPr">
        Upload Product
      </Button>
    </div>
  );
};

export default SellerHome;
