import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%),
    0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
  width: 100%;
  height: 40px;
`;

const CardNumber = styled.div`
  width: 30px;
`;

const CardName = styled.div`
  width: 200px;
`;

interface Props {
  cardNumber: string;
  cardName: string;
  serialized: boolean;
  index: number;
  handleDelete(cardIndex: number): any;
}

export default function AddCardsLine(props: Props) {
  return (
    <Container>
      <CardNumber>{props.cardNumber}</CardNumber>
      <CardName>{props.cardName}</CardName>
      <button onClick={() => props.handleDelete(props.index)}>Delete</button>
    </Container>
  );
}
