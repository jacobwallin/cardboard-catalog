import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { deleteCards } from "../../../../store/collection/browse/thunks";
import DataTable from "react-data-table-component";
import { columns, deleteColumns } from "./dataTableColumns";
import dataTableConditionalStyles from "./dataTableConditionalStyles";
import { DeleteTableDataPoint } from "../createTableData";
import { CollectionPageContainer, DataTableContainer } from "../../shared";
import ModalWindow from "../../../Admin/components/modal/ModalWindow";
import Background from "../../../shared/Background";
import StyledButton from "../../../Admin/components/StyledButton";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import * as SharedStyled from "../styled";
import * as Styled from "./styled";
import sortSeries from "../sortSeries";
import MedalIcon from "./medal.svg";
import { TableDataPoint } from "../createTableData";
import sortCardNumbers from "../../../../utils/sortCardNumbers";
import { TotalCards } from "../../shared";

import { createStatusSelector } from "../../../../store/loading/reducer";

const deleteStatusSelector = createStatusSelector("DELETE_CARDS");

interface Props {
  tableData: TableDataPoint[];
  userCardTableData: any[];
}
export default function CollectionSubset(props: Props) {
  const dispatch = useDispatch();
  const subset = useSelector((state: RootState) => state.library.subsets);
  const deleteRequestStatus = useSelector((state: RootState) =>
    deleteStatusSelector(state)
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState(
    subset.baseSeriesId || 1
  );
  const [showAllCards, setShowAllCards] = useState(false);
  // toggles showing checkboxes to select cards to add to collection
  const [deleteCardsToggle, setDeleteCardsToggle] = useState(false);
  const [clearSelected, setClearSelected] = useState(true);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [numCardsDeleted, setNumCardsDeleted] = useState(0);

  // show how many cards user has in each series, and the total cards in each series
  interface CardsBySeries {
    [key: string]: {
      qty: number;
      distinct: number;
      total: number;
      name: string;
    };
  }
  const [cardsBySeries, setCardsBySeries] = useState<CardsBySeries>(
    props.tableData.reduce((totals: any, card) => {
      if (totals[card.seriesId]) {
        totals[card.seriesId] = {
          qty: totals[card.seriesId].qty + card.quantity,
          distinct:
            card.quantity > 0
              ? totals[card.seriesId].distinct + 1
              : totals[card.seriesId].distinct,
          total: totals[card.seriesId].total + 1,
        };
      } else {
        totals[card.seriesId] = {
          qty: card.quantity,
          distinct: card.quantity > 0 ? 1 : 0,
          total: 1,
          name: card.series.name,
        };
      }
      return totals;
    }, {})
  );

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("selected series id: ", event.target.value);
    setSelectedSeriesId(+event.target.value);
  }

  useEffect(() => {
    if (deleteRequestStatus === "SUCCESS") {
      setNumCardsDeleted(selectedCardIds.length);
      setClearSelected(true);
    }
  }, [deleteRequestStatus]);

  interface Stuff {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<DeleteTableDataPoint>;
  }
  function addSelectedCardsChange(stuff: Stuff) {
    if (clearSelected) {
      setClearSelected(false);
    }
    setSelectedCardIds(
      stuff.selectedRows.map((row) => {
        return row.id;
      })
    );
  }

  function handleShowAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowAllCards(!showAllCards);
  }

  function handleDelete() {
    dispatch(deleteCards(selectedCardIds));
  }

  function toggleDeleteChecklist() {
    setDeleteCardsToggle(!deleteCardsToggle);
    if (deleteCardsToggle) {
      setSelectedCardIds([]);
    }
  }

  function toggleConfirmDeleteModal() {
    if (showAddCardForm) {
      setNumCardsDeleted(0);
    }
    setShowAddCardForm(!showAddCardForm);
  }

  return (
    <CollectionPageContainer>
      <SharedStyled.PageTitle>Your Collection</SharedStyled.PageTitle>
      {showAddCardForm && (
        <Background>
          <ModalWindow>
            <SharedStyled.ConfirmDeleteTitle>
              Confirm Delete
            </SharedStyled.ConfirmDeleteTitle>
            {deleteRequestStatus === "SUCCESS" && numCardsDeleted > 0 ? (
              <SharedStyled.DeleteConfirmMessage>{`${numCardsDeleted} ${
                numCardsDeleted > 1 ? "cards have" : "card has"
              } been deleted from your collection.`}</SharedStyled.DeleteConfirmMessage>
            ) : (
              <DataTable
                dense
                noHeader
                columns={deleteColumns}
                data={props.userCardTableData.filter((userCard) =>
                  selectedCardIds.some((id) => id === userCard.id)
                )}
                highlightOnHover
                pagination
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                paginationPerPage={20}
                defaultSortField={"Card #"}
              />
            )}

            <SharedStyled.ConfirmDeleteButtons>
              <StyledButton
                color="GRAY"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={toggleConfirmDeleteModal}
              >
                Close
              </StyledButton>
              <StyledButton
                color="RED"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={handleDelete}
              >
                Delete
              </StyledButton>
            </SharedStyled.ConfirmDeleteButtons>
          </ModalWindow>
        </Background>
      )}

      {props.tableData.length > 0 && (
        <>
          {selectedCardIds.length > 0 && (
            <SharedStyled.AddCardsContainer>
              <SharedStyled.AddCardsTotal>
                {`${selectedCardIds.length} ${
                  selectedCardIds.length > 1 ? "Cards" : "Card"
                } Selected`}
              </SharedStyled.AddCardsTotal>
              <StyledButton
                color="RED"
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={toggleConfirmDeleteModal}
              >
                Delete
              </StyledButton>
            </SharedStyled.AddCardsContainer>
          )}

          <SharedStyled.SelectParallel>
            <SharedStyled.SelectLabel>
              Select Parallel Set
            </SharedStyled.SelectLabel>
            <SharedStyled.SeriesSelect
              value={selectedSeriesId}
              onChange={handleSeriesChange}
            >
              {subset.series
                .sort((a, b) => {
                  return sortSeries(a, b, subset.baseSeriesId || 0);
                })
                .map((series) => {
                  return (
                    <option key={series.id} value={series.id}>
                      {series.name}
                      {series.serialized && ` /${series.serialized}`}
                      {cardsBySeries[series.id].qty > 0 &&
                        ` (${cardsBySeries[series.id].qty} Cards)`}
                    </option>
                  );
                })}
            </SharedStyled.SeriesSelect>
          </SharedStyled.SelectParallel>

          <Styled.Collection>
            <Styled.CardsInCollection>
              {cardsBySeries[selectedSeriesId].distinct > 0 &&
                cardsBySeries[selectedSeriesId].distinct ===
                  cardsBySeries[selectedSeriesId].total && (
                  <Styled.Svg>
                    <img src={MedalIcon} alt="medal" />
                  </Styled.Svg>
                )}
              <Styled.CardCount>{`${cardsBySeries[selectedSeriesId].distinct} / ${cardsBySeries[selectedSeriesId].total} cards`}</Styled.CardCount>
            </Styled.CardsInCollection>
            <Styled.ProgressBar>
              <Styled.Progress
                percentage={
                  cardsBySeries[selectedSeriesId].total === 0
                    ? 0
                    : (cardsBySeries[selectedSeriesId].distinct /
                        cardsBySeries[selectedSeriesId].total) *
                      100
                }
              >
                {`${Number(
                  (cardsBySeries[selectedSeriesId].total === 0
                    ? 0
                    : (cardsBySeries[selectedSeriesId].distinct /
                        cardsBySeries[selectedSeriesId].total) *
                      100
                  ).toFixed(1)
                )}%`}
              </Styled.Progress>
            </Styled.ProgressBar>
          </Styled.Collection>
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
          <SharedStyled.TableHeader>
            <TotalCards totalCards={cardsBySeries[selectedSeriesId].qty} />
            {props.tableData.filter((card: any) => {
              return card.quantity > 0;
            }).length > 0 && (
              <StyledButton
                color={deleteCardsToggle ? "YELLOW" : "GRAY"}
                height="25px"
                width="100px"
                fontSize="13px"
                onClick={toggleDeleteChecklist}
              >
                {deleteCardsToggle ? "Cancel" : "Delete"}
              </StyledButton>
            )}
          </SharedStyled.TableHeader>
        </>
      )}
      <DataTableContainer>
        {deleteCardsToggle && (
          <DataTable
            noHeader
            dense
            columns={deleteColumns}
            data={props.userCardTableData}
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            selectableRows
            onSelectedRowsChange={addSelectedCardsChange}
            clearSelectedRows={clearSelected}
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
            columns={columns}
            data={props.tableData
              .filter((card: any) => {
                return (
                  selectedSeriesId === 0 || card.seriesId === selectedSeriesId
                );
              })
              .filter((card: any) => {
                return showAllCards || card.quantity > 0;
              })
              .sort((cardA, cardB) => {
                return sortCardNumbers(
                  cardA.cardData.number,
                  cardB.cardData.number
                );
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
    </CollectionPageContainer>
  );
}
