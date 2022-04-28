import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PageHeader from "../../shared/PageHeader";
import SelectTraded from "./select-traded/SelectTraded";
import SelectReceived from "./select-received/SelectReceived";
import ConfirmTrade from "./confirm/ConfirmTrade";
import { CardFormData } from "../select-cards-form/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import { addTransaction } from "../../../store/collection/transactions/thunks";
import { FormData } from "../form/TransactionForm";
import { StepContainer } from "../shared/StepContainer";
import Step from "../shared/transaction-step/Step";
import { RootState } from "../../../store";
import { createStatusSelector } from "../../../store/loading/reducer";
const addTradeStatusSelector = createStatusSelector("ADD_TRANSACTION");

export default function Trade() {
  const dispatch = useDispatch();

  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState(1);

  // form state for cards traded and received
  const [tradedCards, setTradedCards] = useState<CardFormData[]>([]);
  const [receivedCards, setReceivedCards] = useState<CardFormData[]>([]);

  // data formatted to send to server
  const [tradedCardData, setTradedCardData] = useState<CardData[]>([]);
  const [receivedCardData, setReceivedCardData] = useState<CardData[]>([]);

  const [tradeSubmitted, setTradeSubmitted] = useState<boolean>(false);
  const addTransactionStatus = useSelector((state: RootState) =>
    addTradeStatusSelector(state)
  );

  function handleTradedCardsChange(tradedCards: CardFormData[]) {
    setTradedCards(tradedCards);
  }
  function handleReceivedCardsChange(receivedCards: CardFormData[]) {
    setReceivedCards(receivedCards);
  }

  function submitTradedCards(cardData: CardData[]) {
    setTradedCardData(cardData);
    setCurrentStep(2);
  }
  function submitReceivedCards(cardData: CardData[]) {
    setReceivedCardData(cardData);
    setCurrentStep(3);
  }

  function returnToPreviousStep(stepNumber: number) {
    setCurrentStep(stepNumber);
  }

  function submitTrade(tradeDetails: FormData) {
    // step 3 will be shown as completed
    setCurrentStep(4);

    dispatch(
      addTransaction(
        {
          type: "TRADE",
          ...tradeDetails,
          cardsAdded: receivedCardData,
          userCardsRemoved: tradedCardData.map((userCard) => userCard.cardId),
        },
        false
      )
    );
    setTradeSubmitted(true);
  }

  // redirect to transaction page once trade is successfully created
  if (addTransactionStatus === "SUCCESS" && tradeSubmitted) {
    return <Navigate to="/transactions" />;
  }

  return (
    <>
      <PageHeader title="Enter Trade" />
      <StepContainer>
        <Step
          currentStepNumber={currentStep}
          number={1}
          title="Cards Traded"
          returnToStep={returnToPreviousStep}
        />
        <Step
          currentStepNumber={currentStep}
          number={2}
          title="Cards Received"
          returnToStep={returnToPreviousStep}
        />
        <Step
          currentStepNumber={currentStep}
          number={3}
          title="Submit"
          returnToStep={returnToPreviousStep}
        />
      </StepContainer>

      {currentStep === 1 && (
        <>
          <SelectTraded
            tradedCards={tradedCards}
            handleTradedCardsChange={handleTradedCardsChange}
            submit={submitTradedCards}
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <SelectReceived
            receivedCards={receivedCards}
            handleReceivedCardsChange={handleReceivedCardsChange}
            submit={submitReceivedCards}
          />
        </>
      )}
      {(currentStep === 3 || currentStep === 4) && (
        <>
          <ConfirmTrade
            tradedCards={tradedCards}
            receivedCards={receivedCards}
            handleSubmit={submitTrade}
          />
        </>
      )}
    </>
  );
}
