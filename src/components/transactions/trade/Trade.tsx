import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import SelectTraded from "./select-traded/SelectTraded";
import SelectReceived from "./select-received/SelectReceived";
import ConfirmTrade from "./confirm/ConfirmTrade";
import { CardFormData } from "../quick-add/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import { addTransaction } from "../../../store/collection/transactions/thunks";
import * as Styled from "./styled";
type StepNumbers = 1 | 2 | 3;

export default function Trade() {
  const dispatch = useDispatch();

  // track current step of trade data entry use is on
  const [currentStep, setCurrentStep] = useState<StepNumbers>(1);

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
    setCurrentStep(2);
  }
  function submitReceivedCards(cardData: CardData[]) {
    setReceivedCardData(cardData);
    setCurrentStep(3);
  }

  function submitTrade() {
    // send data to api

    // get current date for transaction
    const date = new Date();
    let dateString = String(date.getFullYear()) + "-";
    dateString += String(date.getMonth() + 1).padStart(2, "0") + "-";
    dateString += String(date.getDate()).padStart(2, "0");

    // dispatch(
    //   addTransaction({
    //     type: "TRADE",
    //     date: dateString,
    //     cardsAdded: receivedCardData,
    //     userCardsRemoved: tradedCardData
    //   })
    // );
  }

  return (
    <>
      <TransactionsHeader title="Enter Trade" />
      <Styled.StepContainer>
        <Styled.TradeStep>
          <Styled.StepNumber>Step 1</Styled.StepNumber>
          <Styled.StepTitle>Cards Traded</Styled.StepTitle>
        </Styled.TradeStep>
        <Styled.TradeStep>
          <Styled.StepNumber>Step 2</Styled.StepNumber>
          <Styled.StepTitle>Cards Received</Styled.StepTitle>
        </Styled.TradeStep>
        <Styled.TradeStep>
          <Styled.StepNumber>Step 3</Styled.StepNumber>
          <Styled.StepTitle>Confirm</Styled.StepTitle>
        </Styled.TradeStep>
      </Styled.StepContainer>

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
          <ConfirmTrade
            tradedCards={tradedCards}
            receivedCards={receivedCards}
          />
        </>
      )}
    </>
  );
}
