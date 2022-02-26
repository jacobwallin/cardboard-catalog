import React, { useState } from "react";

type StepNumbers = 1 | 2 | 3;

export default function Trade() {
  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState<StepNumbers>(1);

  // step 1: enter cards traded

  // step 2: enter cards received

  // step 3: enter trade details and confirm transaction

  return <div>Do we have a deal?</div>;
}
