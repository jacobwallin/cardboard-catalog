import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import StyledButton from "../../../Admin/components/StyledButton";
import { CardFormData } from "../AddCardsForm";
import { ReactComponent as XIcon } from "./close.svg";
import CardNumber from "../../../Collection/subset_page/CardNumber";
import * as Styled from "./styled";

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
  preventGradeChanges: boolean;
}

export default function AddCardsLine(props: Props) {
  const [addCardGrade, setAddCardGrade] = useState(false);
  const gradingCompanies = useSelector(
    (state: RootState) => state.library.gradingCompanies
  );

  // automatically select graded if a card is deleted and the card prop changes
  useEffect(() => {
    if (props.card.grade !== "") {
      setAddCardGrade(true);
    }
  }, [props.card.grade]);

  function handleGradedChange() {
    if (addCardGrade) {
      props.clearGradeData(props.index);
    }
    setAddCardGrade(!addCardGrade);
  }

  return (
    <Styled.Container>
      <Styled.CardInfoContainer>
        <Styled.DeleteButtonContainer>
          <StyledButton
            as="div"
            color="RED"
            width="30px"
            height="30px"
            onClick={() => props.handleDelete(props.index)}
          >
            <Styled.CloseIcon>
              <XIcon />
            </Styled.CloseIcon>
          </StyledButton>
        </Styled.DeleteButtonContainer>
        <Styled.CardNumber>
          <CardNumber
            number={props.card.card.card_datum.number}
            serialized={props.card.serialized}
            shortPrint={props.card.shortPrint}
            auto={props.card.auto}
            relic={props.card.relic}
            manufacturedRelic={props.card.manufacturedRelic}
            refractor={props.card.refractor}
            rookie={props.card.card.card_datum.rookie}
          />
        </Styled.CardNumber>
        <Styled.NameContainer>
          <Styled.CardName>{props.card.card.card_datum.name}</Styled.CardName>
          {props.card.qtyInCollection > 0 && (
            <Styled.QtyInCollection>
              {`You have ${props.card.qtyInCollection} in your collection`}
            </Styled.QtyInCollection>
          )}
        </Styled.NameContainer>

        {props.serialized && (
          <Styled.EnterSNContainer>
            <Styled.StyledInput
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
              disabled={props.preventGradeChanges}
            />
            <Styled.SerialNumberLabel
              error={props.card.serialNumberError}
              htmlFor="SN"
            >
              {props.card.serialNumberError
                ? "Invalid S/N"
                : props.preventGradeChanges
                ? "S/N"
                : "Enter S/N"}
            </Styled.SerialNumberLabel>
          </Styled.EnterSNContainer>
        )}
        {(!props.preventGradeChanges || addCardGrade === true) && (
          <Styled.GradedContainer>
            <input
              id="graded"
              type="checkbox"
              checked={addCardGrade}
              onChange={handleGradedChange}
              style={{ height: "14px" }}
              disabled={props.preventGradeChanges}
            />
            <Styled.SerialNumberLabel htmlFor="graded">
              Graded
            </Styled.SerialNumberLabel>
          </Styled.GradedContainer>
        )}
      </Styled.CardInfoContainer>

      {addCardGrade && (
        <>
          <Styled.GradeContainer>
            <Styled.GradeLabel htmlFor="grade">Grade: </Styled.GradeLabel>
            <Styled.StyledInput
              type="number"
              id="grade"
              name="card-grade"
              placeholder="1-10"
              value={props.card.grade}
              onChange={(event) => {
                props.handleGradeChange(props.index, event.target.value);
              }}
              disabled={props.preventGradeChanges}
            />
            <Styled.GradeLabel htmlFor="company">Company: </Styled.GradeLabel>
            <select
              id="company"
              disabled={props.card.grade === "" || props.preventGradeChanges}
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
          </Styled.GradeContainer>
          {(props.card.gradeError || props.card.gradingCompanyError) && (
            <Styled.GradeErrorContainer>
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
            </Styled.GradeErrorContainer>
          )}
        </>
      )}
    </Styled.Container>
  );
}
