import React from "react";
import * as Styled from "./styled";

interface Props {
  number: number;
  currentStepNumber: number;
  title: string;
  returnToStep(number: number): void;
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
