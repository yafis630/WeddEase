import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth, setIsAuth, auth } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      if (res.ok) {
        setAuth({});
        setIsAuth(false);
        localStorage.clear();
        
        navigate("/");
      } else {
        console.error("Logout request failed.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
