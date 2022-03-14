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
const addTransactionStatusSelector = createStatusSelector("ADD_TRANSACTION");

export default function RemoveCards() {
  const dispatch = useDispatch();

  const [cardsRemoved, setCardsRemoved] = useState<CardFormData[]>([]);
  const [transactionSubmitted, setTransactionSubmitted] = useState(false);

  const addTransactionStatus = useSelector((state: RootState) =>
    addTransactionStatusSelector(state)
  );

  function setCardData(cardData: CardFormData[]) {
    setCardsRemoved(cardData);
  }

  function submit(cardData: CardData[]) {
    dispatch(
      addTransaction(
        {
          type: "DELETE",
          date: getDateString(new Date()),
          userCardsRemoved: cardData.map((card) => card.cardId),
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
      <TransactionsHeader title="Remove Cards" />
      <AddCardsForm
        selectFrom="COLLECTION"
        cardData={cardsRemoved}
        submit={submit}
        setCardData={setCardData}
        canEditSelectedCards={true}
        title="Select Cards"
      />
    </>
  );
}
