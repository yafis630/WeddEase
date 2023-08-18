import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import classes from "../styles/catelog_page.module.css";

import dummy_products from "../data/dummy_products";

const Catelog = () => {
  const { product_category } = useParams();

  const [products, setProducts] = useState(dummy_products);

  return (
    <main className={classes["catelog__page"]}>
      <div className={classes["catelog__cards-container"]}>
        <Link to="/" className={classes["catelog__backlink"]}>
          Home
        </Link>
        <h1 className={classes["catelog__heading"]}>
          Catelog: {product_category}
        </h1>

        {products.length !== 0 &&
          products.map((cur) => {
            return <ProductCard product_details={cur} />;
          })}
      </div>
    </main>
  );
};

/**
 * title
 * description
 * image
 * price
 * details link
 */

export default Catelog;
