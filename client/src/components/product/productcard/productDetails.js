import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Marginer } from "../marginer";
import Rating from "../../Rating";
import { addToCart } from "../../../actions/cartActions";

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5em 6px 0 6px;
  line-height: 1.4;
`;

const MediumText = styled.span`
  font-size: 14px;
  color: #222;
  font-weight: 600;
  text-transform: uppercase;
  padding: "8px";
`;

const SpacedHorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BuyButton = styled.button`
  padding: 4px 12px;

  background-color: darkorange;
  color: #121212;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  font-style: italic;
  border: 2px solid transparent;
  margin-bottom: 5px;
  margin-right: -10px;
  outline: none;
  cursor: pointer;
  transition: all 1s linear;
  border-radius: 8px;

  &:hover {
    background-color: transparent;
    color: darkorange;
    border: 3px solid darkorange;
  }
`;

export function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const [qty] = useState(1);

  const addToCartHandler = () => dispatch(addToCart(product._id, qty));

  return (
    <DetailsContainer>
      <SpacedHorizontalContainer>
        <MediumText>{product.name}</MediumText>
      </SpacedHorizontalContainer>
      <SpacedHorizontalContainer>
        <MediumText>Price:</MediumText>
        <MediumText
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
            letterSpacing: "2px",
          }}
        >
          <strong>&#x20a6;{product.price}</strong>
        </MediumText>
      </SpacedHorizontalContainer>
      <Marginer direction="vertical" margin="1.2em" />
      <SpacedHorizontalContainer>
        <MediumText>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </MediumText>
        <BuyButton
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
        >
          ADD TO CART
        </BuyButton>
      </SpacedHorizontalContainer>
    </DetailsContainer>
  );
}
