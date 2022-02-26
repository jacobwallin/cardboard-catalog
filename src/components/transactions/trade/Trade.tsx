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

  // form state for cards traded and received
  const [tradedCards, setTradedCards] = useState<CardFormData[]>([]);
  const [receivedCards, setReceivedCards] = useState<CardFormData[]>([]);

  // data formatted to send to server
  const [tradedCardData, setTradedCardData] = useState<CardData[]>([]);
  const [receivedCardData, setReceivedCardData] = useState<CardData[]>([]);

  function handleTradedCardsChange(tradedCards: CardFormData[]) {
    setTradedCards(tradedCards);
  }
  function handleReceivedCardsChange(receivedCards: CardFormData[]) {
    setReceivedCards(receivedCards);
  }

  function submitTradedCards(cardData: CardData[]) {
    setTradedCardData(cardData);
  }
  function submitReceivedCards(cardData: CardData[]) {
    setReceivedCardData(cardData);
  }

  function submitTrade() {
    // send data to api
  }

  return (
    <>
      <div>Enter A Trade</div>

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
      {currentStep === 3 && (
        <>
          <ConfirmTrade />
        </>
      )}
    </>
  );
}
