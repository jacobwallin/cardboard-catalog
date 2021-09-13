import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components";
import StyledButton from "../Admin/components/StyledButton";
import { CardFormData } from "./AddCardsForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  background: white;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%),
    0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 5px 5px 5px;
  width: 100%;
  height: 45px;
`;

const GradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 0 10px;
  width: 100%;
  height: 30px;
`;

const GradeErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 10px 0 10px;
  width: 100%;
  height: 20px;
`;

const CardNumber = styled.div`
  flex-grow: 0;
  padding: 0 15px 0 15px;
`;

const CardName = styled.div`
  /* width: 200px; */
  flex-grow: 1;
`;

interface StyledInputProps {
  error?: boolean;
}
const StyledInput = styled.input<StyledInputProps>`
  width: 60px;
  padding: 5px;
  height: 65%;
  border: ${(props) => props.error && "1px solid red"};
`;

const SerialNumberLabel = styled.label<StyledInputProps>`
  height: 35%;
  font-size: 0.7em;
  color: ${(props) => props.error && "red"};
`;
const GradeLabel = styled.label`
  font-size: 0.8em;
  margin: 0 5px 0 15px;
`;

const EnterSNContainer = styled.div`
  height: 100%;
  /* padding: 0px 10px 0px 10px; */
  padding: 0;
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  serialized: number | null;
  index: number;
  card: CardFormData;
  handleDelete(cardIndex: number): any;
  handleSerializedChange(cardIndex: number, serialNumber: string): any;
  handleGradeChange(cardIndex: number, grade: string): any;
  handleGradingCompanyIdChange(
    cardIndex: number,
    gradingCompanyId: number
  ): any;
  clearGradeData(cardIndex: number): any;
}

export default function AddCardsLine(props: Props) {
  const [addCardGrade, setAddCardGrade] = useState(false);
  const gradingCompanies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );

  function handleGradedChange() {
    if (addCardGrade) {
      props.clearGradeData(props.index);
    }
    setAddCardGrade(!addCardGrade);
  }
  return (
    <Container>
      <CardInfoContainer>
        <StyledButton
          color="RED"
          width="30px"
          height="30px"
          onClick={() => props.handleDelete(props.index)}
        >
          X
        </StyledButton>
        <CardNumber>{`${props.card.card.card_datum.number}`}</CardNumber>
        <CardName>{props.card.card.card_datum.name}</CardName>

        {props.serialized && (
          <EnterSNContainer>
            <StyledInput
              id="SN"
              type="number"
              inputMode="numeric"
              name="serialized"
              placeholder={`/${props.serialized}`}
              value={props.card.serialNumber}
              onChange={(event) => {
                props.handleSerializedChange(props.index, event.target.value);
              }}
              error={props.card.serialNumberError}
            />
            <SerialNumberLabel
              error={props.card.serialNumberError}
              htmlFor="SN"
            >
              {props.card.serialNumberError ? "Invalid S/N" : "Enter Card S/N"}
            </SerialNumberLabel>
          </EnterSNContainer>
        )}
        <EnterSNContainer>
          <input
            id="graded"
            type="checkbox"
            checked={addCardGrade}
            onChange={handleGradedChange}
            style={{ height: "65%" }}
          />
          <SerialNumberLabel htmlFor="graded">Graded</SerialNumberLabel>
        </EnterSNContainer>
      </CardInfoContainer>
      {addCardGrade && (
        <>
          <GradeContainer>
            <GradeLabel htmlFor="grade">Grade: </GradeLabel>
            <StyledInput
              type="number"
              id="grade"
              name="card-grade"
              placeholder="1-10"
              value={props.card.grade}
              onChange={(event) => {
                props.handleGradeChange(props.index, event.target.value);
              }}
            />
            <GradeLabel htmlFor="company">Company: </GradeLabel>
            <select
              id="company"
              disabled={props.card.grade === ""}
              value={props.card.gradingCompanyId}
              onChange={(event) => {
                props.handleGradingCompanyIdChange(
                  props.index,
                  +event.target.value
                );
              }}
            >
              <option value={-1}>Select</option>
              {gradingCompanies.map((gradingComp) => {
                return (
                  <option key={gradingComp.id} value={gradingComp.id}>
                    {gradingComp.name}
                  </option>
                );
              })}
            </select>
          </GradeContainer>
          {(props.card.gradeError || props.card.gradingCompanyError) && (
            <GradeErrorContainer>
              <div
                style={{
                  width: "100px",
                  fontSize: "0.7em",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {props.card.gradeError && "Invalid Grade"}
              </div>
              <div
                style={{
                  width: "138px",
                  fontSize: "0.7em",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {props.card.gradingCompanyError && "Invalid Company"}
              </div>
            </GradeErrorContainer>
          )}
        </>
      )}
    </Container>
  );
}
