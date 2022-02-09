import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductDetails } from "./productDetails";

const CardWrapper = styled.div`
  width: 100%;
  perspective: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 30px;
  transition: all 1s linear;
`;

const CardContainer = styled(motion.div)`
  width: 250px;
  height: 320px;
  display: flex;
  flex-direction: column;
   border-radius: 5px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: #fff;
  color: #222;
  position: relative;
  cursor: pointer;
  transition: all 1s linear;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1.5;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 1em 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 0.5;
  padding: 0 1em;
`;

const ProductWrapper = styled.div`
  width: 80%;
  height: 80%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Clothes = styled(motion.div)`
  width: auto;
  height: 190px;
  z-index: 99;
  

  img {
    width: 200px;
    border-radius: 10px;
    height: 200px;
    transition: all 1s linear;
  }
`;

export function ProductCard({ product }) {
  return (
    <CardWrapper>
      <CardContainer>
        <TopContainer>
          <ProductWrapper>
            <Clothes className="img-container">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-top"
                />
              </Link>
            </Clothes>
          </ProductWrapper>
        </TopContainer>
        <BottomContainer>
          <ProductDetails product={product} />
        </BottomContainer>
      </CardContainer>
    </CardWrapper>
  );
}
