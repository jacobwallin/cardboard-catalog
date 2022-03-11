import React from "react";
import * as Styled from "./styled";

export type StepNumbers = 1 | 2 | 3 | 4;

interface Props {
  number: StepNumbers;
  currentStepNumber: StepNumbers;
  title: string;
  returnToStep(number: StepNumbers): void;
}

export default function Step(props: Props) {
  const { currentStepNumber, number, title, returnToStep } = props;

  return (
    <>
      <Styled.TradeStep
        status={
          currentStepNumber < number
            ? "INACTIVE"
            : currentStepNumber > number
            ? "COMPLETE"
            : "ACTIVE"
        }
        onClick={(e) => {
          if (number < currentStepNumber) {
            returnToStep(number);
          }
        }}
      >
        <Styled.StepNumber>Step {number}</Styled.StepNumber>
        <Styled.StepTitle>{title}</Styled.StepTitle>
      </Styled.TradeStep>
    </>
  );
}
