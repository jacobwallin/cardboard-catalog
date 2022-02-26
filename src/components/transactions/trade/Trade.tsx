import React, { useState } from "react";
import SelectTraded from "./select-traded/SelectTraded";
import SelectReceived from "./select-received/SelectReceived";
import ConfirmTrade from "./confirm/ConfirmTrade";
import { CardFormData } from "../quick-add/AddCardsForm";
type StepNumbers = 1 | 2 | 3;

export default function Trade() {
  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState<StepNumbers>(1);

  // state for cards traded and received
  const [tradedCards, setTradedCards] = useState<CardFormData[]>([]);
  const [receivedCards, setReceivedCards] = useState<CardFormData[]>([]);

  function handleTradedCardsChange(tradedCards: CardFormData[]) {
    setTradedCards(tradedCards);
  }
  function handleReceivedCardsChange(receivedCards: CardFormData[]) {
    setReceivedCards(receivedCards);
  }

  switch (currentStep) {
    case 1:
      return (
        <SelectTraded
          tradedCards={tradedCards}
          handleTradedCardsChange={handleTradedCardsChange}
        />
      );
    case 2:
      return (
        <SelectReceived
          receivedCards={receivedCards}
          handleReceivedCardsChange={handleReceivedCardsChange}
        />
      );
    case 3:
      return <ConfirmTrade />;
  }
}
