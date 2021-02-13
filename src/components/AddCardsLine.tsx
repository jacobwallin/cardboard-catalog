import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px 0 10px;
  background: white;
  border-bottom: 1px solid lightgrey;
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

const StyledInput = styled.input`
  width: 80px;
  height: 75%;
  padding: 5px;
`;

interface Props {
  cardNumber: string;
  cardName: string;
  serialized: boolean;
  index: number;
  serialNumber: string;
  grade: string;
  gradingCompanyId: string;
  handleDelete(cardIndex: number): any;
  handleSerializedChange(cardIndex: number, serialNumber: string): any;
  handleGradeChange(cardIndex: number, grade: string): any;
  handleGradingCompanyIdChange(
    cardIndex: number,
    gradingCompanyId: string
  ): any;
}

export default function AddCardsLine(props: Props) {
  const gradingCompanies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );
  return (
    <Container>
      <CardNumber>{props.cardNumber}</CardNumber>
      <CardName>{props.cardName}</CardName>
      {true && (
        <StyledInput
          type="number"
          inputMode="numeric"
          name="serialized"
          placeholder="Serial #"
          value={props.serialNumber}
          onChange={(event) => {
            props.handleSerializedChange(props.index, event.target.value);
          }}
        />
      )}

      <StyledInput
        type="number"
        name="card-grade"
        placeholder="grade"
        value={props.grade}
        onChange={(event) => {
          props.handleGradeChange(props.index, event.target.value);
        }}
      />
      <select disabled={props.grade === ""}>
        {gradingCompanies.map((gradingComp) => {
          return (
            <option key={gradingComp.id} value={gradingComp.id}>
              {gradingComp.name}
            </option>
          );
        })}
      </select>
      <button onClick={() => props.handleDelete(props.index)}>Delete</button>
    </Container>
  );
}
