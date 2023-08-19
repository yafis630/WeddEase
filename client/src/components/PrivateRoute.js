import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
  const { isAuth, auth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && auth.role === requiredRole ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={requiredRole === "seller" ? "/SellerLogin" : "/WorkerLogin"}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
