import React from "react";
import Header from './Header';
import Footer from './Footer';
import Sellerholder from "./Sellerholder";
import "../styles/sellerCategory.css"; 
import sellerCategories from "../data/sellerCategories"


const sellers = sellerCategories.map((category, i) => (
  <li className="category-list" key={i}>
    <Sellerholder name={category.name} image={category.image} />
  </li>
));

const Sellercategory = () => {
  return (
    <div >
      
      <div className="back-img"> <Header />
      <h1 className="name-heading">Explore your shopping</h1>
      <ul className="category-container">{sellers}</ul>
      
    </div><Footer /></div>
  );
};

export default Sellercategory;
