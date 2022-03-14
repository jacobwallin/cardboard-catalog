import React, { useState } from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Step from "../shared/transaction-step/Step";
import { StepContainer } from "../shared/transaction-step/styled";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import AddCardsForm, { CardFormData } from "../select-cards-form/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import SalePurchaseForm from "./sale-purchase-form/SalePurchaseForm";
import { addTransaction } from "../../../store/collection/transactions/thunks";
import { FormData } from "./sale-purchase-form/SalePurchaseForm";
import { createStatusSelector } from "../../../store/loading/reducer";
import { PageContainer } from "./styled";
import SelectedCards from "../select-cards-form/selected-cards/SelectedCards";
import { SelectedCardsTitle } from "../shared/SelectedCardsTitle";
const addTradeStatusSelector = createStatusSelector("ADD_TRANSACTION");

interface Props {
  transactionType: "SALE" | "PURCHASE";
}

export default function SalePurchase(props: Props) {
  const dispatch = useDispatch();
  // track current step of sale data entry use is on
  const [currentStep, setCurrentStep] = useState(2);
  const [soldCards, setSoldCards] = useState<CardFormData[]>([]);
  const [saleSubmitted, setSaleSubmitted] = useState<boolean>(false);

  const addTransactionStatus = useSelector((state: RootState) =>
    addTradeStatusSelector(state)
  );

  function returnToPreviousStep(stepNumber: number) {
    setCurrentStep(stepNumber);
  }

  function handleSoldCardsChange(soldCards: CardFormData[]) {
    setSoldCards(soldCards);
  }

  function submitSoldCards(cardData: CardData[]) {
    setCurrentStep(2);
  }

  function submitSale(saleDetails: FormData) {
    // step 3 will be shown as completed
    setCurrentStep(4);

    dispatch(
      addTransaction(
        {
          type: "SALE",
          ...saleDetails,
          userCardsRemoved: soldCards.map((userCard) => userCard.cardId),
        },
        false
      )
    );
    setSaleSubmitted(true);
  }

  // redirect to transaction page once sale is successfully created
  if (addTransactionStatus === "SUCCESS" && saleSubmitted) {
    return <Redirect to="/transactions" />;
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
      {currentStep === 2 && (
        <PageContainer>
          <SalePurchaseForm handleSubmit={submitSale} />
          <SelectedCardsTitle>Cards Sold</SelectedCardsTitle>
          <SelectedCards cardData={soldCards} preventGradeChanges={true} />
        </PageContainer>
      )}
    </>
  );
}
