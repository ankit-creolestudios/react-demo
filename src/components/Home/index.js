import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import Loader from "../Layout/Loader";
import ProductCard from "./ProductCard";

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to SHOPVI</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>Scroll </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <ProductCard />
      </div>
    </Fragment>
  );
};

export default Home;
