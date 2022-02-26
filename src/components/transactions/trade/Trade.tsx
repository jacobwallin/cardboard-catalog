import React, { useState } from "react";
import SelectTraded from "./select-traded/SelectTraded";
import SelectReceived from "./select-received/SelectReceived";
import ConfirmTrade from "./confirm/ConfirmTrade";
import { CardFormData } from "../quick-add/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
type StepNumbers = 1 | 2 | 3;

export default function Trade() {
  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState<StepNumbers>(2);

  // state for cards traded and received
  const [tradedCards, setTradedCards] = useState<CardFormData[]>([]);
  const [receivedCards, setReceivedCards] = useState<CardFormData[]>([]);

  function handleTradedCardsChange(tradedCards: CardFormData[]) {
    setTradedCards(tradedCards);
  }
  function handleReceivedCardsChange(receivedCards: CardFormData[]) {
    setReceivedCards(receivedCards);
  }

  function submitTradedCards(cardData: CardData[]) {
    // save card data
    //
  }
  function submitReceivedCards(cardData: CardData[]) {}

  return (
    <>
      <div>Enter A Trade</div>

      {currentStep === 1 && (
        <>
          <SelectTraded
            tradedCards={tradedCards}
            handleTradedCardsChange={handleTradedCardsChange}
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <SelectReceived
            receivedCards={receivedCards}
            handleReceivedCardsChange={handleReceivedCardsChange}
          />
        </>
      )}
      {currentStep === 3 && (
        <>
          <ConfirmTrade />
        </>
      )}
    </>
  );
}
