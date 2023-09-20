// Import the necessary components and libraries
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faInfoCircle,
  faAddressBook,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import AuthContext from "../context/AuthProvider";

function Header() {
  const { isAuth, role } = useContext(AuthContext);
  const isSeller = role === "seller";
  const isWorker = role === "worker";
  const isUser = role === "user";

  let flag = true;
  if (typeof isAuth === "boolean") flag = isAuth;
  else {
    flag = isAuth === "true" ? true : false;
  }

  const { auth } = useContext(AuthContext);
  const [count, setCount] = useState(0); // Initialize count to 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/wedease/cartedItems`, {
          headers: { Authentication: `Bearer ${auth}` },
        });
        if (response.ok) {
          const data = await response.json();
          
          const filteredData = data.filter((item) => item.isSuccessful === undefined);
          
          setCount(filteredData.length);
        } else {
          throw new Error("Error fetching product data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 400);
    return () => clearInterval(interval);
  }, [auth]);

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="/" className="brand-logo text-shadow-pop-bl">
          WeddEase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
            </Nav.Link>
            <Nav.Link href="/CategoryButtons" className="nav-link">
              <FontAwesomeIcon icon={faList} className="nav-icon" /> Categories
            </Nav.Link>
            <Nav.Link href="/AboutUs" className="nav-link">
              <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" /> About
            </Nav.Link>
            <Nav.Link href="/contact" className="nav-link">
              <FontAwesomeIcon icon={faAddressBook} className="nav-icon" /> Our Team
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {flag && (
              <>
                {isSeller && (
                  <NavLink to="/SellerHome" className="home-button">
                    <FontAwesomeIcon icon={faUser} className="nav-icon" />
                    Dashboard
                  </NavLink>
                )}
                {isWorker && (
                  <NavLink to="/WorkerHome" className="home-button">
                    <FontAwesomeIcon icon={faUser} className="nav-icon" />
                    Dashboard
                  </NavLink>
                )}
                {isUser && (
                  <NavLink to="/UserHome" className="home-button">
                    <FontAwesomeIcon icon={faUser} className="nav-icon" />
                    Dashboard
                  </NavLink>
                )}
              </>
            )}
            <NavLink to="/CartPage" className="cart-button">
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              {count > 0 && <Badge pill variant="danger" className="carts-count">{count}</Badge>}
              Cart
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
