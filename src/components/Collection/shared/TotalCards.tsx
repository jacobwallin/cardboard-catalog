import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  margin: 15px 0 30px 0;
`;

const NumCards = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export default function TotalCards(props: { totalCards: number }) {
  return (
    <>
      <Title>
        Total Cards: <NumCards>{props.totalCards}</NumCards>
      </Title>
    </>
  );
}
