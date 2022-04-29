import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addTransaction } from "../../../../store/collection/transactions/thunks";
import DataTable from "react-data-table-component";
import { columns, deleteColumns } from "./dataTableColumns";
import dataTableConditionalStyles from "./dataTableConditionalStyles";
import { DeleteTableDataPoint } from "../createTableData";
import { DataTableContainer } from "../../shared";
import StyledButton from "../../../Admin/components/StyledButton";
import PageContainer from "../../../shared/PageContainer";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import * as SharedStyled from "../styled";
import * as Styled from "./styled";
import MedalIcon from "./medal.svg";
import { SeriesTableData } from "../createTableData";
import { TotalCards } from "../../shared";
import { getDateString } from "../../../../utils/formatTimestamp";
import AddCardsForm, {
  CardFormData,
} from "../../../transactions/select-cards-form/AddCardsForm";
import { CardData } from "../../../../store/collection/browse/types";

import { createStatusSelector } from "../../../../store/loading/reducer";

const deleteStatusSelector = createStatusSelector("ADD_TRANSACTION");

interface Props {
  tableData: SeriesTableData;
  toggleDisableSeriesSelect(): void;
}
export default function CollectionSubset(props: Props) {
  const dispatch = useDispatch();
  const deleteRequestStatus = useSelector((state: RootState) =>
    deleteStatusSelector(state)
  );
  const collectionFriend = useSelector(
    (state: RootState) => state.collection.browse.friend
  );
  const subset = useSelector((state: RootState) => state.library.subsets);

  const [showAllCards, setShowAllCards] = useState(false);
  // toggles showing checkboxes to select cards to add to collection
  const [deleteCardsToggle, setDeleteCardsToggle] = useState(false);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [selectedCards, setSelectedCards] = useState<DeleteTableDataPoint[]>(
    []
  );
  const [cardFormData, setCardFormData] = useState<CardFormData[]>([]);
  const [numCardsDeleted, setNumCardsDeleted] = useState(0);

  useEffect(() => {
    if (deleteRequestStatus === "SUCCESS") {
      setNumCardsDeleted(selectedCards.length);
    }
  }, [deleteRequestStatus, selectedCards]);

  interface Stuff {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<DeleteTableDataPoint>;
  }
  function addSelectedCardsChange(stuff: Stuff) {
    setSelectedCards(stuff.selectedRows);
  }

  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
  }

  function handleDelete(cardData: CardData[]) {
    dispatch(
      addTransaction(
        {
          type: "DELETE",
          date: getDateString(new Date()),
          userCardsRemoved: selectedCards.map((card) => card.id),
        },
        true
      )
    );
  }

  function toggleDeleteChecklist() {
    setDeleteCardsToggle(!deleteCardsToggle);
    if (deleteCardsToggle) {
      setSelectedCards([]);
    }
  }

  function setAddCardFormData(cardFormData: CardFormData[]) {
    setCardFormData(cardFormData);
  }

  function hideForm() {
    setShowAddCardForm(!showAddCardForm);
    setSelectedCards([]);
    props.toggleDisableSeriesSelect();
  }

  function showForm() {
    const formData: CardFormData[] = selectedCards.reduce(
      (data: CardFormData[], card) => {
        data.push({
          id: card.id,
          formData: {
            serialNumber: "",
            grade: "",
            gradingCompanyId: -1,
          },
          validation: {
            serialNumberError: false,
            gradeError: false,
            gradingCompanyError: false,
          },
          qtyInCollection: props.tableData.userCards.filter(
            (userCard) => userCard.cardId === card.cardId
          ).length,
          card: {
            id: card.card.id,
            seriesId: card.card.seriesId,
            cardDataId: card.card.cardDataId,
            card_datum: card.card.cardData,
            serializedTo: card.card.serializedTo,
            value: null,
            series: {
              ...card.card.series,
              subset: {
                id: subset.id,
                name: subset.name,
                baseSeriesId: subset.baseSeriesId,
                prefix: subset.prefix,
                code: subset.code,
                auto: subset.auto,
                relic: subset.relic,
                manufacturedRelic: subset.manufacturedRelic,
                shortPrint: subset.shortPrint,
                setId: subset.setId,
                set: {
                  ...subset.set,
                },
              },
            },
          },
        });

        return data;
      },
      []
    );

    setAddCardFormData(formData);

    setShowAddCardForm(true);

    props.toggleDisableSeriesSelect();
  }

  return (
    <PageContainer>
      {showAddCardForm && (
        <>
          <SharedStyled.CloseButtonWrapper>
            <SharedStyled.BackButton onClick={hideForm}>
              Return to Checklist
            </SharedStyled.BackButton>
          </SharedStyled.CloseButtonWrapper>
          <AddCardsForm
            selectFrom="NONE"
            cardData={cardFormData}
            submit={handleDelete}
            setCardData={setAddCardFormData}
            canEditSelectedCards={false}
            title="Delete Cards from My Collection"
          />
        </>
      )}
      {!showAddCardForm && (
        <>
          <SharedStyled.PageTitle>
            {collectionFriend.id !== 0
              ? `${collectionFriend.username}'s Collection`
              : "My Collection"}
          </SharedStyled.PageTitle>
          <Styled.Collection>
            <Styled.CardsInCollection>
              {props.tableData.distinctCards > 0 &&
                props.tableData.distinctCards ===
                  props.tableData.cards.length && (
                  <Styled.Svg>
                    <img src={MedalIcon} alt="medal" />
                  </Styled.Svg>
                )}
              <Styled.CardCount>{`${props.tableData.distinctCards} / ${props.tableData.cards.length} cards in set`}</Styled.CardCount>
            </Styled.CardsInCollection>
            <Styled.ProgressBar>
              <Styled.Progress
                percentage={
                  props.tableData.cards.length === 0
                    ? 0
                    : (props.tableData.distinctCards /
                        props.tableData.cards.length) *
                      100
                }
              >
                {`${Number(
                  (props.tableData.cards.length === 0
                    ? 0
                    : (props.tableData.distinctCards /
                        props.tableData.cards.length) *
                      100
                  ).toFixed(1)
                )}%`}
              </Styled.Progress>
            </Styled.ProgressBar>
          </Styled.Collection>
          {props.tableData.distinctCards < props.tableData.cards.length && (
            <SharedStyled.ShowAllCards>
              <SharedStyled.SelectLabel>
                Show Missing Cards:
              </SharedStyled.SelectLabel>
              <input
                type="checkbox"
                onChange={handleShowAllChange}
                checked={showAllCards}
                disabled={deleteCardsToggle}
              />
            </SharedStyled.ShowAllCards>
          )}
          <SharedStyled.TableHeader>
            {selectedCards.length > 0 && (
              <SharedStyled.AddCardsContainer>
                <SharedStyled.AddCardsTotal>
                  {`${selectedCards.length} ${
                    selectedCards.length > 1 ? "Cards" : "Card"
                  } Selected`}
                </SharedStyled.AddCardsTotal>
                <StyledButton
                  color="RED"
                  height="25px"
                  width="100px"
                  fontSize="13px"
                  onClick={showForm}
                >
                  Delete
                </StyledButton>
              </SharedStyled.AddCardsContainer>
            )}
            <SharedStyled.TableHeaderRow>
              <TotalCards totalCards={props.tableData.totalCards} />
              {props.tableData.totalCards > 0 && collectionFriend.id === 0 && (
                <StyledButton
                  color="GRAY"
                  height="25px"
                  width="100px"
                  fontSize="13px"
                  onClick={toggleDeleteChecklist}
                >
                  {deleteCardsToggle ? "Cancel" : "Delete"}
                </StyledButton>
              )}
            </SharedStyled.TableHeaderRow>
          </SharedStyled.TableHeader>

          <DataTableContainer>
            {deleteCardsToggle && (
              <DataTable
                noHeader
                dense
                columns={deleteColumns()}
                data={props.tableData.userCards}
                highlightOnHover
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                paginationPerPage={20}
                selectableRows
                onSelectedRowsChange={addSelectedCardsChange}
                selectableRowsHighlight
                noDataComponent={
                  <NoDataMessage>
                    There are no cards from this set in your collection.
                  </NoDataMessage>
                }
              />
            )}
            {!deleteCardsToggle && (
              <DataTable
                noHeader
                dense
                columns={columns()}
                data={props.tableData.cards.filter((card) => {
                  return showAllCards || card.quantity > 0;
                })}
                highlightOnHover
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                paginationPerPage={20}
                conditionalRowStyles={dataTableConditionalStyles}
                noDataComponent={
                  <NoDataMessage>
                    There are no cards from this set in your collection.
                  </NoDataMessage>
                }
              />
            )}
          </DataTableContainer>
        </>
      )}
    </PageContainer>
  );
}
