import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth, setIsAuth, auth, isAuth } = useContext(AuthContext);
  const handleLogout = async () => {
    
      const res = await fetch('http://localhost:8080/wedease/log',
      {headers: {Authentication: `Bearer ${auth}`}})
      
        setAuth({});
        setIsAuth(false);
        localStorage.clear();
        console.log(res)
        navigate("/");
     
  };
  let flag = true;
  if (typeof(isAuth)==="boolean") flag = isAuth;
  else {
     flag = (isAuth  === "true"? true:false);
  }
  return (
    <div>
      {flag && (<button className="logout-button" onClick={handleLogout}>
        Logout
      </button>)}
    </div>
  );
};

export default Logout;
