import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const medium = (props) => {
  return css`
    @media only screen and (max-width: 420px) {
      ${props}
    }
  `;
};
