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
import SubtleButton from "../../../shared/SubtleButton";

interface Props {
  transaction: SingleTransaction;
  cancel: () => void;
}

export default function EditTransaction(props: Props) {
  const { transaction } = props;

  // master table data
  const [cardsAdded, setCardsAdded] = useState<UserCardWithTransaction[]>(
    transaction.user_cards.filter((t) => !t.transaction_user_card.deleted)
  );
  const [cardsRemoved, setCardsRemoved] = useState<UserCardWithTransaction[]>(
    transaction.user_cards.filter((t) => t.transaction_user_card.deleted)
  );

  // toggle selectable rows and add card forms
  const [removeAdditionalCards, setRemoveAdditionalCards] = useState(false);
  const [addAdditionalCards, setAddAdditionalCards] = useState(false);
  const [addedCardsSelectable, setAddedCardsSelectable] = useState(false);
  const [removedCardsSelectable, setRemovedCardsSelectable] = useState(false);
  function toggleRemoveAdditional() {
    setRemoveAdditionalCards(!removeAdditionalCards);
  }
  function toggleAddAdditional() {
    setAddAdditionalCards(!addAdditionalCards);
  }
  function toggleAddedSelectable() {
    setClearAddedSelected(!clearAddedSelected);
    setAddedCardsSelectable(!addedCardsSelectable);
  }
  function toggleRemovedSelectable() {
    setClearRemovedSelected(!clearRemovedSelected);
    setRemovedCardsSelectable(!removedCardsSelectable);
  }

  // disabled checkbox on cards that were deleted in another transaction
  function disabledSelectable(row: UserCardWithTransaction) {
    return row.deletedAt !== null;
  }

  // manage selected cards
  const [selectedAddedCards, setSelectedAddedCards] = useState<
    UserCardWithTransaction[]
  >([]);
  const [selectedRemovedCards, setSelectedRemovedCards] = useState<
    UserCardWithTransaction[]
  >([]);
  const [clearAddedSelected, setClearAddedSelected] = useState(false);
  const [clearRemovedSelected, setClearRemovedSelected] = useState(false);
  interface SelectableRows {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<UserCardWithTransaction>;
  }
  function addSelectedCardsChange(selectableRows: SelectableRows) {
    setSelectedAddedCards(selectableRows.selectedRows);
  }
  function removeSelectedCardsChange(selectableRows: SelectableRows) {
    setSelectedRemovedCards(selectableRows.selectedRows);
  }
  const [addedCardsRemoved, setAddedCardsRemoved] = useState<number[]>([]);
  const [deletedCardsRemoved, setDeletedCardsRemoved] = useState<number[]>([]);
  function removeAddedCards() {
    // filter out selected cards from table data
    setCardsAdded(
      cardsAdded.filter(
        (c) =>
          !selectedAddedCards.some((selectedCard) => selectedCard.id === c.id)
      )
    );
    // append selected cards to addedCardsRemoved
    setAddedCardsRemoved([
      ...addedCardsRemoved,
      ...selectedAddedCards.map((c) => c.id),
    ]);

    toggleAddedSelectable();
  }
  function removeDeletedCards() {
    setCardsRemoved(
      cardsRemoved.filter(
        (c) =>
          !selectedRemovedCards.some((selectedCard) => selectedCard.id === c.id)
      )
    );
    setDeletedCardsRemoved([
      ...deletedCardsRemoved,
      ...selectedRemovedCards.map((c) => c.id),
    ]);
    toggleRemovedSelectable();
  }

  // additional cards that are added or removed in transaction
  const [newCardsAddedFormData, setNewCardsAddedFormData] = useState<
    CardFormData[]
  >([]);
  const [newCardsRemovedFormData, setNewCardsRemovedFormData] = useState<
    CardFormData[]
  >([]);
  function addAdditional(cardData: CardFormData[]) {
    setNewCardsAddedFormData(cardData);
  }
  function submitAddAdditional(cardData: CardData[]) {}

  function removeAdditional(cardData: CardFormData[]) {
    setNewCardsRemovedFormData(cardData);
  }
  function submitRemoveAdditional(cardData: CardData[]) {}

  // SUBMIT TRANSACTION PUT
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
        <>
          <Styled.ReturnWrapper>
            <SubtleButton onClick={toggleAddAdditional}>
              {"Cancel"}
            </SubtleButton>
          </Styled.ReturnWrapper>
          <AddCardsForm
            selectFrom="DATABASE"
            cardData={newCardsAddedFormData}
            setCardData={addAdditional}
            canEditSelectedCards
            submit={submitAddAdditional}
            title="Add Additional Cards"
          />
        </>
      )}
      {removeAdditionalCards && (
        <>
          <Styled.ReturnWrapper>
            <SubtleButton onClick={toggleRemoveAdditional}>
              {"Cancel"}
            </SubtleButton>
          </Styled.ReturnWrapper>
          <AddCardsForm
            selectFrom="COLLECTION"
            cardData={newCardsRemovedFormData}
            setCardData={removeAdditional}
            canEditSelectedCards
            submit={submitRemoveAdditional}
            title="Remove Additional Cards"
          />
        </>
      )}
      {!addAdditionalCards && !removeAdditionalCards && (
        <>
          <Styled.CancelWrapper>
            <StyledButton
              color="GRAY"
              width="60px"
              height="23px"
              onClick={props.cancel}
            >
              Cancel
            </StyledButton>
          </Styled.CancelWrapper>
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
            <Styled.TableWrapper>
              <Styled.CardTableHeader>
                <SelectedCardsTitle>Cards Added</SelectedCardsTitle>
                <Styled.ButtonContainer>
                  {!addedCardsSelectable && (
                    <StyledButton
                      color="BLUE"
                      width="160px"
                      height="22px"
                      onClick={toggleAddAdditional}
                      fontSize=".8rem"
                    >
                      Add Additional Cards
                    </StyledButton>
                  )}
                  {addedCardsSelectable && selectedAddedCards.length > 0 && (
                    <StyledButton
                      color="RED"
                      width="160px"
                      height="22px"
                      onClick={removeAddedCards}
                      fontSize=".8rem"
                    >
                      Remove Cards
                    </StyledButton>
                  )}
                  <StyledButton
                    color="GRAY"
                    width="160px"
                    height="22px"
                    onClick={toggleAddedSelectable}
                    fontSize=".8rem"
                    disabled={cardsAdded.length === 0}
                  >
                    {addedCardsSelectable ? "Cancel" : "Manage Added Cards"}
                  </StyledButton>
                </Styled.ButtonContainer>
              </Styled.CardTableHeader>
              <DataTable
                data={cardsAdded}
                columns={columns()}
                dense
                noHeader
                selectableRows={addedCardsSelectable}
                selectableRowDisabled={disabledSelectable}
                onSelectedRowsChange={addSelectedCardsChange}
                clearSelectedRows={clearAddedSelected}
              />
            </Styled.TableWrapper>
          )}
          {showRemovedCards && (
            <Styled.TableWrapper>
              <Styled.CardTableHeader>
                <SelectedCardsTitle>Cards Removed</SelectedCardsTitle>
                <Styled.ButtonContainer>
                  {!removedCardsSelectable && (
                    <StyledButton
                      color="BLUE"
                      width="160px"
                      height="22px"
                      onClick={toggleRemoveAdditional}
                      fontSize=".8rem"
                    >
                      Remove Additional Cards
                    </StyledButton>
                  )}
                  {removedCardsSelectable && selectedRemovedCards.length > 0 && (
                    <StyledButton
                      color="RED"
                      width="160px"
                      height="22px"
                      onClick={removeDeletedCards}
                      fontSize=".8rem"
                    >
                      Remove Cards
                    </StyledButton>
                  )}
                  <StyledButton
                    color="GRAY"
                    width="160px"
                    height="22px"
                    onClick={toggleRemovedSelectable}
                    fontSize=".8rem"
                    disabled={cardsRemoved.length === 0}
                  >
                    {removedCardsSelectable ? "Cancel" : "Manage Removed Cards"}
                  </StyledButton>
                </Styled.ButtonContainer>
              </Styled.CardTableHeader>
              <DataTable
                data={cardsRemoved}
                columns={columns()}
                dense
                noHeader
                selectableRows={removedCardsSelectable}
                onSelectedRowsChange={removeSelectedCardsChange}
                clearSelectedRows={clearRemovedSelected}
              />
            </Styled.TableWrapper>
          )}
        </>
      )}
    </>
  );
}
