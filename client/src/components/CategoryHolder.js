import React from "react";
import { Link } from "react-router-dom";

const CategoryHolder = (props) => {
  return (
    <div className="category-holder">
      <img src={props.image} alt={props.name} />
      <Link to={`/workers/${props.name}`}>{props.name}</Link>
    </div>
  );
};

export default CategoryHolder;
