import React, { useState } from "react";
import SelectTraded from "./select-traded/SelectTraded";
import SelectReceived from "./select-received/SelectReceived";
import ConfirmTrade from "./confirm/ConfirmTrade";

type StepNumbers = 1 | 2 | 3;

export default function Trade() {
  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState<StepNumbers>(1);

  // need to track state for cards traded, cards received, and trade details

  // need to be able to pass in current state to each component so it persists when user switches from on step to another

  switch (currentStep) {
    case 1:
      return <SelectTraded />;
    case 2:
      return <SelectReceived />;
    case 3:
      return <ConfirmTrade />;
  }
}
