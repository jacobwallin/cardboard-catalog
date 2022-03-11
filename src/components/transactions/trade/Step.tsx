import React from "react";
import * as Styled from "./styled";

interface Props {
  status: Styled.StepStatus;
  number: number;
  title: string;
}

export default function Step(props: Props) {
  const { status, number, title } = props;
  return (
    <>
      <Styled.TradeStep status={status}>
        <Styled.StepNumber>Step {number}</Styled.StepNumber>
        <Styled.StepTitle>{title}</Styled.StepTitle>
      </Styled.TradeStep>
    </>
  );
}
