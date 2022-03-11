import React from "react";
import * as Styled from "./styled";

interface Props {
  number: number;
  currentStepNumber: number;
  title: string;
}

export default function Step(props: Props) {
  const { currentStepNumber, number, title } = props;

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
      >
        <Styled.StepNumber>Step {number}</Styled.StepNumber>
        <Styled.StepTitle>{title}</Styled.StepTitle>
      </Styled.TradeStep>
    </>
  );
}
