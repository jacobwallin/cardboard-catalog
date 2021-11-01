import React from "react";
import styled from "styled-components";
import Kelly from "../../page_not_found.jpg";

const ImageWrapper = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  img {
    border-radius: 25px;
    width: 400px;
    @media only screen and (max-width: 575px) {
      width: 70%;
    }
  }
`;

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

export default function PageNotFound() {
  return (
    <ImageWrapper>
      <Title>Page Not Found</Title>
      <img src={Kelly} alt="page not found" />
    </ImageWrapper>
  );
}
