import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function Card({ category }) {
  return (
    <CategoryWrapper>
      <div className="card">
        <div className="img-container p-5">
          <Link to={`/products/${category.cat}`}>
            <img
              src={category.image}
              alt={category.title}
              className="card-img-top"
            />
          </Link>
        </div>
        <div className="card-footer">
          <p className="align-self-center mb-0">{category.title}</p>
        </div>
      </div>
    </CategoryWrapper>
  );
}

const CategoryWrapper = styled.div`
  .card {
    border: 1.5px solid lightslategrey;
    box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
    min-height: 70px;
    border-radius: 20px;
    display: flex;
    width: 90%;
    transition: all 1s linear;
    overflow: hidden;
  }

  .card-footer {
    border-top: transparent;
    background: transparent;
    transition: all 1s linear;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background: rgba(247, 247, 247);

      color: #926f34;
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    transition: all 1s linear;
    width: 150px;
    height: 130px;
  }

  .img-container:hover .card-img-top {
    transform: scale(1.2);
    transition: all 1000ms linear;
  }

  .img-container:hover {
    transform: translate(0, 0);
  }
`;
