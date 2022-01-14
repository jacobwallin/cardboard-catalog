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
import { SeriesTableData } from "../createTableData";
import { TotalCards } from "../../shared";

import { createStatusSelector } from "../../../../store/loading/reducer";

const deleteStatusSelector = createStatusSelector("DELETE_CARDS");

interface Props {
  tableData: any[];
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

  // holds data for selected series
  const [cardsBySeries, setCardsBySeries] = useState<SeriesTableData>(
    props.tableData.find((series) => series.seriesId === selectedSeriesId)
  );

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

  useEffect(() => {
    if (deleteRequestStatus === "SUCCESS") {
      setNumCardsDeleted(selectedCardIds.length);
      setClearSelected(true);
    }
  }, [deleteRequestStatus]);

  useEffect(() => {
    setCardsBySeries(
      props.tableData.find((series) => series.seriesId === selectedSeriesId)
    );
  }, [selectedSeriesId, props.tableData]);

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
                columns={deleteColumns(
                  selectedSeriesId === subset.baseSeriesId
                )}
                data={cardsBySeries.userCards.filter((userCard) =>
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
          {subset.series.length > 1 && (
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
                        {props.tableData.find((s) => s.seriesId === series.id)!
                          .totalCards > 0 &&
                          ` (${
                            props.tableData.find(
                              (s) => s.seriesId === series.id
                            )!.totalCards
                          } Cards)`}
                      </option>
                    );
                  })}
              </SharedStyled.SeriesSelect>
            </SharedStyled.SelectParallel>
          )}

          <Styled.Collection>
            <Styled.CardsInCollection>
              {cardsBySeries.distinctCards > 0 &&
                cardsBySeries.distinctCards === cardsBySeries.cards.length && (
                  <Styled.Svg>
                    <img src={MedalIcon} alt="medal" />
                  </Styled.Svg>
                )}
              <Styled.CardCount>{`${cardsBySeries.distinctCards} / ${cardsBySeries.cards.length} cards in set`}</Styled.CardCount>
            </Styled.CardsInCollection>
            <Styled.ProgressBar>
              <Styled.Progress
                percentage={
                  cardsBySeries.cards.length === 0
                    ? 0
                    : (cardsBySeries.distinctCards /
                        cardsBySeries.cards.length) *
                      100
                }
              >
                {`${Number(
                  (cardsBySeries.cards.length === 0
                    ? 0
                    : (cardsBySeries.distinctCards /
                        cardsBySeries.cards.length) *
                      100
                  ).toFixed(1)
                )}%`}
              </Styled.Progress>
            </Styled.ProgressBar>
          </Styled.Collection>
          {cardsBySeries.distinctCards < cardsBySeries.cards.length && (
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
            <SharedStyled.TableHeaderRow>
              <TotalCards totalCards={cardsBySeries.totalCards} />
              {cardsBySeries.totalCards > 0 && (
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
            </SharedStyled.TableHeaderRow>
          </SharedStyled.TableHeader>
        </>
      )}
      <DataTableContainer>
        {deleteCardsToggle && (
          <DataTable
            noHeader
            dense
            columns={deleteColumns(selectedSeriesId === subset.baseSeriesId)}
            data={cardsBySeries.userCards}
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            selectableRows
            onSelectedRowsChange={addSelectedCardsChange}
            clearSelectedRows={clearSelected}
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
            columns={columns(selectedSeriesId === subset.baseSeriesId)}
            data={cardsBySeries.cards.filter((card) => {
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
    </CollectionPageContainer>
  );
}
