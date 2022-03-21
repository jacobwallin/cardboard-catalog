import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../store";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import AddCardsForm, { CardFormData } from "../select-cards-form/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import { addTransaction } from "../../../store/collection/transactions/thunks";
import { getDateString } from "../../../utils/formatTimestamp";
import { createStatusSelector } from "../../../store/loading/reducer";
const addTradeStatusSelector = createStatusSelector("ADD_TRANSACTION");

export default function AddCards() {
  const dispatch = useDispatch();

  const [cardsAdded, setCardsAdded] = useState<CardFormData[]>([]);
  const [transactionSubmitted, setTransactionSubmitted] = useState(false);

  const addTransactionStatus = useSelector((state: RootState) =>
    addTradeStatusSelector(state)
  );

  function setCardData(cardData: CardFormData[]) {
    setCardsAdded(cardData);
  }

  function submit(cardData: CardData[]) {
    dispatch(
      addTransaction(
        {
          type: "ADD",
          date: getDateString(new Date()),
          cardsAdded: cardData,
        },
        false
      )
    );
    setTransactionSubmitted(true);
  }

  // redirect to transaction page once transaction is successfully created
  if (addTransactionStatus === "SUCCESS" && transactionSubmitted) {
    return <Navigate to="/transactions" />;
  }

  return (
    <>
      <TransactionsHeader title="Add To Your Collection" />
      <AddCardsForm
        selectFrom="DATABASE"
        cardData={cardsAdded}
        submit={submit}
        setCardData={setCardData}
        canEditSelectedCards={true}
        title="Select Cards"
      />
    </>
  );
}
