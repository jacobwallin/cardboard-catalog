import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../../store";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import AddCardsForm, { CardFormData } from "../select-cards-form/AddCardsForm";
import { CardData } from "../../../store/collection/browse/types";
import { addTransaction } from "../../../store/collection/transactions/thunks";
import { getDateString } from "../../../utils/formatTimestamp";
import { createStatusSelector } from "../../../store/loading/reducer";
const addTradeStatusSelector = createStatusSelector("ADD_TRANSACTION");

export default function QuickAdd() {
  const dispatch = useDispatch();

  const [cardsAdded, setCardsAdded] = useState<CardFormData[]>([]);
  const [transactionSubmitted, setTransactionSubmitted] = useState(false);

  const addTransactionStatus = useSelector((state: RootState) =>
    addTradeStatusSelector(state)
  );

  function setCardData(cardData: CardFormData[]) {
    setCardsAdded(cardData);
  }

  function submitTrade(cardData: CardData[]) {
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
    return <Redirect to="/transactions" />;
  }

  return (
    <>
      <TransactionsHeader title="Add To Your Collection" />
      <AddCardsForm
        selectFrom="DATABASE"
        cardData={cardsAdded}
        submit={submitTrade}
        setCardData={setCardData}
        title="Select Cards"
      />
    </>
  );
}
