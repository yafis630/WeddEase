/*import React from "react";
import Header from './Header';
import Footer from './Footer';
import sellerCategories from "../data/sellerCategories";
import SellerHolder from "./SellerHolder";
import "../styles/ShoppingServices.css";

const ShoppingServices = () => {
  const categoryItems = sellerCategories.map((category) => (
    <li className="category-card" key={category.id}>
      <a href={`/sellers/${category.name}`}>
        <img src={category.image} alt={category.name} />
      </a>
      <div className="category-card-content">
        <h3>{category.name}</h3>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="back-img">
        <Header />
        <div className="shopping-services-container">
          <h1>Explore Shopping Services</h1>
          <ul className="category-list">{categoryItems}</ul>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingServices;*/
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import sellerCategories from "../data/sellerCategories";
import { Link } from "react-router-dom";

import "../styles/ShoppingServices.css";

const ShoppingServices = () => {
  const categoryItems = sellerCategories.map((category) => (
    <li className="category-card" key={category.id}>
      {/* <a href={`/sellers/${category.name}`}>
        <img src={category.image} alt={category.name} />
      </a> */}
      <Link to={`/catelog/${category.name}`}>
        <img src={category.image} alt={category.name} />
      </Link>
      <div className="category-card-content">
        <h3>{category.name}</h3>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="back-img">
        <Header />
        <div className="shopping-services-container">
          <h1>Explore Shopping Services</h1>
          <ul className="category-list">{categoryItems}</ul>
          {/* <Link to="/productscard">View Products</Link> Link to ProductsCard */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingServices;
