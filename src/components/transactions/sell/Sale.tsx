import React, { useState } from "react";
import Step from "../shared/transaction-step/Step";
import { StepContainer } from "../shared/transaction-step/styled";

export default function Sale() {
  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState(1);

  function returnToPreviousStep(stepNumber: number) {
    setCurrentStep(stepNumber);
  }

  return (
    <StepContainer>
      <Step
        currentStepNumber={currentStep}
        number={1}
        title="Cards Sold"
        returnToStep={returnToPreviousStep}
      />
      <Step
        currentStepNumber={currentStep}
        number={2}
        title="Submit"
        returnToStep={returnToPreviousStep}
      />
    </StepContainer>
  );
}
