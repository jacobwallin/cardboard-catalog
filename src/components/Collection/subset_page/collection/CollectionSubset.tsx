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

import { createStatusSelector } from "../../../../store/loading/reducer";

const deleteStatusSelector = createStatusSelector("DELETE_CARDS");

interface Props {
  tableData: any[];
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

  const [cardsInChecklist, setCardsInChecklist] = useState(0);
  const [userCardsInSeries, setUserCardsInSeries] = useState(0);

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
    // calculate how many cards user's collection has in the selected series, and the total cards that belong to the series

    const userCardsTotal = props.tableData.filter((card: any) => {
      return (
        (selectedSeriesId === 0 || card.seriesId === selectedSeriesId) &&
        card.quantity > 0
      );
    }).length;
    const seriesCardsTotal = props.tableData.filter((card: any) => {
      return selectedSeriesId === 0 || card.seriesId === selectedSeriesId;
    }).length;

    setUserCardsInSeries(userCardsTotal);
    setCardsInChecklist(seriesCardsTotal);
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
      <SharedStyled.PageTitle>Your Collection</SharedStyled.PageTitle>{" "}
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
      <Styled.Collection>
        <Styled.CardCount>{`${userCardsInSeries} / ${cardsInChecklist} cards`}</Styled.CardCount>
        <Styled.ProgressBar>
          <Styled.Progress
            percentage={(userCardsInSeries / cardsInChecklist) * 100}
          >
            {`${Number(
              ((userCardsInSeries / cardsInChecklist) * 100).toFixed(2)
            )}%`}
          </Styled.Progress>
        </Styled.ProgressBar>
        {userCardsInSeries === cardsInChecklist && (
          <Styled.SetComplete>
            <Styled.Svg>
              <img src={MedalIcon} alt="medal" />
            </Styled.Svg>
            <Styled.CompleteMessage>Set Completed</Styled.CompleteMessage>
          </Styled.SetComplete>
        )}
      </Styled.Collection>
      <SharedStyled.ShowAllCards>
        <SharedStyled.SelectLabel>Show Missing: </SharedStyled.SelectLabel>
        <input
          type="checkbox"
          onChange={handleShowAllChange}
          checked={showAllCards}
        />
      </SharedStyled.ShowAllCards>
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
      <SharedStyled.TableHeader>
        <SharedStyled.SelectParallel>
          <SharedStyled.SelectLabel>
            Select Parallel Set
          </SharedStyled.SelectLabel>
          <SharedStyled.SeriesSelect
            value={selectedSeriesId}
            onChange={handleSeriesChange}
          >
            <option value={0}>Show All Parallels</option>
            {subset.series
              .sort((a, b) => {
                return sortSeries(a, b, subset.baseSeriesId || 0);
              })
              .map((series) => {
                return (
                  <option key={series.id} value={series.id}>
                    {series.name}
                    {series.serialized && ` /${series.serialized}`}
                  </option>
                );
              })}
          </SharedStyled.SeriesSelect>
        </SharedStyled.SelectParallel>
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
            defaultSortField={"Card #"}
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
              })}
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            defaultSortField={"Card #"}
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
