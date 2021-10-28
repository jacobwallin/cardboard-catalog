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
import * as Styled from "../styled";
import sortSeries from "../sortSeries";

import { createStatusSelector } from "../../../../store/loading/reducer";

const deleteStatusSelector = createStatusSelector("DELETE_CARDS");

interface Props {
  tableData: any[];
  userCardTableData: any[];
}
export default function CollectionSubset(props: Props) {
  const dispatch = useDispatch();
  const subset = useSelector((state: RootState) => state.library.subsets.subset);
  const deleteRequestStatus = useSelector((state: RootState) => deleteStatusSelector(state));

  const [selectedSeriesId, setSelectedSeriesId] = useState(subset.baseSeriesId || 1);
  const [showAllCards, setShowAllCards] = useState(false);
  // toggles showing checkboxes to select cards to add to collection
  const [deleteCardsToggle, setDeleteCardsToggle] = useState(false);
  const [clearSelected, setClearSelected] = useState(true);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

  const [numCardsDeleted, setNumCardsDeleted] = useState(0);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
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
      <Styled.PageTitle>Your Collection</Styled.PageTitle>
      {showAddCardForm && (
        <Background>
          <ModalWindow>
            <Styled.ConfirmDeleteTitle>Confirm Delete</Styled.ConfirmDeleteTitle>
            {deleteRequestStatus === "SUCCESS" && numCardsDeleted > 0 ? (
              <Styled.DeleteConfirmMessage>{`${numCardsDeleted} ${
                numCardsDeleted > 1 ? "cards have" : "card has"
              } been deleted from your collection.`}</Styled.DeleteConfirmMessage>
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

            <Styled.ConfirmDeleteButtons>
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
            </Styled.ConfirmDeleteButtons>
          </ModalWindow>
        </Background>
      )}

      <Styled.ShowAllCards>
        <Styled.SelectLabel>Show All: </Styled.SelectLabel>
        <input type="checkbox" onChange={handleShowAllChange} checked={showAllCards} />
      </Styled.ShowAllCards>
      {selectedCardIds.length > 0 && (
        <Styled.AddCardsContainer>
          <Styled.AddCardsTotal>
            {`${selectedCardIds.length} ${selectedCardIds.length > 1 ? "Cards" : "Card"} Selected`}
          </Styled.AddCardsTotal>
          <StyledButton
            color="RED"
            height="25px"
            width="100px"
            fontSize="13px"
            onClick={toggleConfirmDeleteModal}
          >
            Delete
          </StyledButton>
        </Styled.AddCardsContainer>
      )}

      <Styled.TableHeader>
        <Styled.SelectParallel>
          <Styled.SelectLabel>Select Parallel Set</Styled.SelectLabel>
          <Styled.SeriesSelect value={selectedSeriesId} onChange={handleSeriesChange}>
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
          </Styled.SeriesSelect>
        </Styled.SelectParallel>
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
      </Styled.TableHeader>

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
                You don't have any cards from this set in your collection.
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
                return selectedSeriesId === 0 || card.seriesId === selectedSeriesId;
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
                You don't have any cards from this set in your collection.
              </NoDataMessage>
            }
          />
        )}
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
