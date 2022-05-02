import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { SingleTransaction } from "../../../../store/collection/transactions/types";
import { UserCardWithTransaction } from "../../../../store/collection/transactions/types";
import { CardData } from "../../../../store/collection/browse/types";
import { updateTransaction } from "../../../../store/collection/transactions/thunks";
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
import { LoadingDots } from "../../../shared/Loading";
import { createStatusSelector } from "../../../../store/loading/reducer";
const updateTradeStatusSelector = createStatusSelector("UPDATE_TRANSACTION");

interface Props {
  transaction: SingleTransaction;
  cancel: () => void;
}

export default function EditTransaction(props: Props) {
  const dispatch = useDispatch();
  const { transaction } = props;

  const updateTransactionStatus = useSelector((state: RootState) =>
    updateTradeStatusSelector(state)
  );
  const [transactionUpdated, setTransactionUpdated] = useState(false);

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
    if (addedCardsSelectable) {
      setSelectedAddedCards([]);
    }
  }
  function toggleRemovedSelectable() {
    setClearRemovedSelected(!clearRemovedSelected);
    setRemovedCardsSelectable(!removedCardsSelectable);
    if (removedCardsSelectable) {
      setSelectedRemovedCards([]);
    }
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

    // append selected cards to addedCardsRemoved if they were originally part of the transaction (transaction_user_id will be 0)
    setAddedCardsRemoved([
      ...addedCardsRemoved,
      ...selectedAddedCards
        .filter((c) => c.transaction_user_card.id !== 0)
        .map((c) => c.transaction_user_card.id),
    ]);

    // remove any newly added cards
    setNewCardsAdded(
      newCardsAdded.filter((c) =>
        selectedAddedCards.some((selectedCard) => selectedCard.id === c.cardId)
      )
    );

    // turn off row selection
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
      ...selectedRemovedCards
        .filter((c) => c.transaction_user_card.id !== 0)
        .map((c) => c.transaction_user_card.id),
    ]);

    // remove any newly removed cards
    setNewCardsRemoved(
      newCardsRemoved.filter((c) =>
        selectedRemovedCards.some(
          (selectedCard) => selectedCard.id === c.cardId
        )
      )
    );
    toggleRemovedSelectable();
  }

  // additional cards that are added or removed in transaction
  const [newCardsAddedFormData, setNewCardsAddedFormData] = useState<
    CardFormData[]
  >([]);
  const [newCardsRemovedFormData, setNewCardsRemovedFormData] = useState<
    CardFormData[]
  >([]);
  const [newCardsAdded, setNewCardsAdded] = useState<CardData[]>([]);
  const [newCardsRemoved, setNewCardsRemoved] = useState<CardData[]>([]);
  function addAdditional(cardData: CardFormData[]) {
    setNewCardsAddedFormData(cardData);
  }

  function removeAdditional(cardData: CardFormData[]) {
    setNewCardsRemovedFormData(cardData);
  }
  function submitAddAdditional(cardData: CardData[]) {
    setNewCardsAdded([...cardData, ...newCardsAdded]);
    setNewCardsAddedFormData([]);
    toggleAddAdditional();
    // add cards to table
    setCardsAdded([
      ...cardsAdded,
      ...newCardsAddedFormData.map((card, index) => {
        return {
          id: parseInt(String(cardsAdded.length + index) + String(card.id)),
          serialNumber: card.formData.serialNumber
            ? +card.formData.serialNumber
            : null,
          grade: card.formData.grade ? +card.formData.grade : null,
          gradingCompanyId: card.formData.gradingCompanyId,
          createdAt: "",
          updatedAt: "string",
          deletedAt: null,
          userId: 0,
          cardId: card.id,
          grading_company: null,
          card: {
            ...card.card,
          },
          transaction_user_card: {
            id: 0,
            deleted: false,
            createdAt: "",
            updatedAt: "",
            transactionId: 0,
            userCardId: 0,
          },
        };
      }),
    ]);
  }
  function submitRemoveAdditional(cardData: CardData[]) {
    setNewCardsRemoved([...cardData, ...newCardsRemoved]);
    setNewCardsRemovedFormData([]);
    toggleRemoveAdditional();
    setCardsRemoved([
      ...cardsAdded,
      ...newCardsRemovedFormData.map((card, index) => {
        return {
          id: parseInt(String(cardsAdded.length + index) + String(card.id)),
          serialNumber: card.formData.serialNumber
            ? +card.formData.serialNumber
            : null,
          grade: card.formData.grade ? +card.formData.grade : null,
          gradingCompanyId: card.formData.gradingCompanyId,
          createdAt: "",
          updatedAt: "string",
          deletedAt: null,
          userId: 0,
          cardId: card.id,
          grading_company: null,
          card: {
            ...card.card,
          },
          transaction_user_card: {
            id: 0,
            deleted: false,
            createdAt: "",
            updatedAt: "",
            transactionId: 0,
            userCardId: 0,
          },
        };
      }),
    ]);
  }

  // SUBMIT TRANSACTION PUT
  function handleSubmit(formData: FormData) {
    dispatch(
      updateTransaction(
        {
          ...formData,
          cardsAdded: newCardsAdded,
          userCardsRemoved: newCardsRemoved.map((c) => c.cardId),
          addedCardsRemoved,
          removedCardsAdded: deletedCardsRemoved,
        },
        transaction.id
      )
    );
    setTransactionUpdated(true);
  }

  function deleteTransaction() {}

  // show added and removed card tables based on transaction type
  const showAddedCards =
    transaction.type !== "DELETE" && transaction.type !== "SALE";
  const showRemovedCards =
    transaction.type !== "ADD" &&
    transaction.type !== "PURCHASE" &&
    transaction.type !== "RIP";

  // handle loading
  if (transactionUpdated) {
    if (updateTransactionStatus === "REQUEST") {
      return <LoadingDots />;
    }
    if (updateTransactionStatus === "SUCCESS") {
      props.cancel();
    }
  }

  return (
    <>
      {addAdditionalCards && (
        <>
          <Styled.ReturnWrapper>
            <SubtleButton onClick={toggleAddAdditional}>{"Close"}</SubtleButton>
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
              {"Close"}
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
          <TransactionForm
            type={transaction.type}
            handleSubmit={handleSubmit}
            cancel={props.cancel}
            delete={deleteTransaction}
            initialValues={{
              date: transaction.date,
              note: transaction.note,
              platform: transaction.platform,
              individual: transaction.individual,
              money: transaction.money,
              pending: transaction.pending,
            }}
          />
          {showAddedCards && (
            <Styled.TableWrapper>
              <Styled.CardTableHeader>
                <SelectedCardsTitle>Cards Added</SelectedCardsTitle>
                <Styled.ButtonContainer>
                  {!addedCardsSelectable && transaction.type !== "ADD" && (
                    <StyledButton
                      color="BLUE"
                      width="160px"
                      height="23px"
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
                      height="23px"
                      onClick={removeAddedCards}
                      fontSize=".8rem"
                    >
                      Remove Cards
                    </StyledButton>
                  )}
                  <StyledButton
                    color="GRAY"
                    width="160px"
                    height="23px"
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
                pagination
              />
            </Styled.TableWrapper>
          )}
          {showRemovedCards && (
            <Styled.TableWrapper>
              <Styled.CardTableHeader>
                <SelectedCardsTitle>Cards Removed</SelectedCardsTitle>
                <Styled.ButtonContainer>
                  {!removedCardsSelectable && transaction.type !== "DELETE" && (
                    <StyledButton
                      color="BLUE"
                      width="160px"
                      height="23px"
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
                      height="23px"
                      onClick={removeDeletedCards}
                      fontSize=".8rem"
                    >
                      Restore Cards
                    </StyledButton>
                  )}
                  <StyledButton
                    color="GRAY"
                    width="160px"
                    height="23px"
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
                pagination
              />
            </Styled.TableWrapper>
          )}
        </>
      )}
    </>
  );
}
