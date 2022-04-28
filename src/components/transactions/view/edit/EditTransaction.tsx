import React, { useState } from "react";
import { SingleTransaction } from "../../../../store/collection/transactions/types";
import { UserCardWithTransaction } from "../../../../store/collection/transactions/types";
import TransactionForm, { FormData } from "../../form/TransactionForm";
import DataTable from "react-data-table-component";
import { SelectedCardsTitle } from "../../shared/SelectedCardsTitle";
import { columns } from "./dataTable";

interface Props {
  transaction: SingleTransaction;
}

export default function EditTransaction(props: Props) {
  const { transaction } = props;

  const [cardsAdded, setCardsAdded] = useState<UserCardWithTransaction[]>(
    transaction.user_cards.filter((t) => !t.transaction_user_card.deleted)
  );
  const [cardsRemoved, setCardsRemoved] = useState<UserCardWithTransaction[]>(
    transaction.user_cards.filter((t) => t.transaction_user_card.deleted)
  );

  function removeAdded(userCard: UserCardWithTransaction) {
    console.log("REMOVE ADDED CARD");
  }

  function removeDeleted(userCard: UserCardWithTransaction) {
    console.log("REMOVE DELETED CARD");
  }

  function handleSubmit(formData: FormData) {}

  return (
    <>
      <TransactionForm
        type={transaction.type}
        handleSubmit={handleSubmit}
        initialValues={{
          date: transaction.date,
          note: transaction.note,
          platform: transaction.platform,
          individual: transaction.individual,
          money: transaction.money,
        }}
      />
      {cardsAdded.length > 0 && (
        <>
          <SelectedCardsTitle>Cards Added</SelectedCardsTitle>
          <DataTable
            data={cardsAdded}
            columns={columns(removeAdded)}
            dense
            noHeader
          />
        </>
      )}
      {cardsRemoved.length > 0 && (
        <>
          <SelectedCardsTitle>Cards Removed</SelectedCardsTitle>
          <DataTable
            data={cardsRemoved}
            columns={columns(removeDeleted)}
            dense
            noHeader
          />
        </>
      )}
    </>
  );
}
