import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
`;

const NumCards = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
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
