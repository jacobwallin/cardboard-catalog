import React from "react";
import TransactionsHeader from "../../Collection/header/TransactionsHeader";
import AddCardsForm from "./AddCardsForm";

export default function QuickAdd() {
  return (
    <>
      <TransactionsHeader title="Add To Your Collection" />
      <AddCardsForm />
    </>
  );
}
