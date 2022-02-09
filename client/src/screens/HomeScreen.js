import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "../components/carousel/Carousel";

import Meta from "../components/Meta";

import Category from "../components/category/index";
import { Products } from "../components/Products";

export const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <Carousel />
          <Category />
        </>
      ) : (
        <Link to="/" className="btn btn-light my-3 mx-3">
          Go Back
        </Link>
      )}

      <hr />
      <h1 className = "home-prod-title">
        Featured Products
      </h1>
      <hr />

      <Products match={match} />
    </>
  );
};
