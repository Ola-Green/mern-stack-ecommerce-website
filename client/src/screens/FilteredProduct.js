import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { Products } from "../components/Products";

export function FilteredProducts({ match }) {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters] = useState({});

  return (
    <>
      <Link to="/" className="btn btn-light m-3 ">
        Go Back
      </Link>
      <h1
      
        style={{
          fontStyle: "oblique",
          padding: "20px",
          marginRight: "10px",
          marginLeft: "10px",
          textAlign: "center",
        }}
      >
        { cat.toUpperCase()}
      </h1>

      <Products cat={cat} filters={filters} match={match} /> 
    </>
  );
}
