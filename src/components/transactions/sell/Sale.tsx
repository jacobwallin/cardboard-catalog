import React, { useState } from "react";
import Step from "../shared/transaction-step/Step";
import { StepContainer } from "../shared/transaction-step/styled";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import AddCardsForm, { CardFormData } from "../select-cards-form/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import SalePurchaseForm from "../shared/sale-purchase-form/SalePurchaseForm";

export default function Sale() {
  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState(1);
  const [soldCards, setSoldCards] = useState<CardFormData[]>([]);

  function returnToPreviousStep(stepNumber: number) {
    setCurrentStep(stepNumber);
  }

  function handleSoldCardsChange(soldCards: CardFormData[]) {
    setSoldCards(soldCards);
  }

  function submitSoldCards(cardData: CardData[]) {
    setCurrentStep(2);
  }

  return (
    <>
      <TransactionsHeader title="Enter Sale" />
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

      {currentStep === 1 && (
        <AddCardsForm
          selectFrom="COLLECTION"
          cardData={soldCards}
          setCardData={handleSoldCardsChange}
          submit={submitSoldCards}
          title="Select Cards Sold"
          canEditSelectedCards={false}
        />
      )}
      {currentStep === 2 && <SalePurchaseForm />}
    </>
  );
}
