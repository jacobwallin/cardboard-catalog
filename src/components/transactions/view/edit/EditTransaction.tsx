import React, { useState } from "react";
import { SingleTransaction } from "../../../../store/collection/transactions/types";
import { UserCardWithTransaction } from "../../../../store/collection/transactions/types";
import { CardData } from "../../../../store/collection/browse/types";
import TransactionForm, { FormData } from "../../form/TransactionForm";
import DataTable from "react-data-table-component";
import { SelectedCardsTitle } from "../../shared/SelectedCardsTitle";
import { columns } from "./dataTable";
import StyledButton from "../../../Admin/components/StyledButton";
import * as Styled from "./styled";
import AddCardsForm, {
  CardFormData,
} from "../../select-cards-form/AddCardsForm";

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

  const [removeAdditionalCards, setRemoveAdditionalCards] = useState(false);
  const [addAdditionalCards, setAddAdditionalCards] = useState(false);

  const [addedCardsRemoved, setAddedCardsRemoved] = useState<number[]>([]);
  const [deletedCardsRemoved, setDeletedCardsRemoved] = useState<number[]>([]);

  const [newCardsAddedFormData, setNewCardsAddedFormData] = useState<
    CardFormData[]
  >([]);
  const [newCardsRemovedFormData, setNewCardsRemovedFormData] = useState<
    CardFormData[]
  >([]);

  function toggleRemoveAdditional() {
    setRemoveAdditionalCards(!removeAdditionalCards);
  }
  function toggleAddAdditional() {
    setAddAdditionalCards(!addAdditionalCards);
  }

  function removeAdded(userCard: UserCardWithTransaction) {
    console.log("REMOVE ADDED CARD");
  }

  function removeDeleted(userCard: UserCardWithTransaction) {
    console.log("REMOVE DELETED CARD");
  }

  function addAdditional(cardData: CardFormData[]) {
    setNewCardsAddedFormData(cardData);
  }
  function submitAddAdditional(cardData: CardData[]) {}

  function removeAdditional(cardData: CardFormData[]) {
    setNewCardsRemovedFormData(cardData);
  }
  function submitRemoveAdditional(cardData: CardData[]) {}

  function handleSubmit(formData: FormData) {}

  const showAddedCards =
    transaction.type !== "DELETE" && transaction.type !== "SALE";
  const showRemovedCards =
    transaction.type !== "ADD" &&
    transaction.type !== "PURCHASE" &&
    transaction.type !== "RIP";

  return (
    <>
      {addAdditionalCards && (
        <AddCardsForm
          selectFrom="DATABASE"
          cardData={newCardsAddedFormData}
          setCardData={addAdditional}
          canEditSelectedCards
          submit={submitAddAdditional}
          title="Add Additional Cards"
        />
      )}
      {removeAdditionalCards && (
        <AddCardsForm
          selectFrom="COLLECTION"
          cardData={newCardsRemovedFormData}
          setCardData={removeAdditional}
          canEditSelectedCards
          submit={submitRemoveAdditional}
          title="Remove Additional Cards"
        />
      )}
      {!addAdditionalCards && !removeAdditionalCards && (
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
          {showAddedCards && (
            <>
              <Styled.CardTableHeader>
                <SelectedCardsTitle>Cards Added</SelectedCardsTitle>
                <StyledButton
                  color="GRAY"
                  width="250px"
                  height="25px"
                  onClick={toggleAddAdditional}
                >
                  Add Additional Cards
                </StyledButton>
              </Styled.CardTableHeader>
              <DataTable
                data={cardsAdded}
                columns={columns(removeAdded)}
                dense
                noHeader
              />
            </>
          )}
          {showRemovedCards && (
            <>
              <Styled.CardTableHeader>
                <SelectedCardsTitle>Cards Removed</SelectedCardsTitle>
                <StyledButton
                  color="GRAY"
                  width="250px"
                  height="25px"
                  onClick={toggleRemoveAdditional}
                >
                  Remove Additional Cards
                </StyledButton>
              </Styled.CardTableHeader>
              <DataTable
                data={cardsRemoved}
                columns={columns(removeDeleted)}
                dense
                noHeader
              />
            </>
          )}
        </>
      )}
    </>
  );
}
