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
import * as Styled from "../styled";

import { createStatusSelector } from "../../../../store/loading/reducer";
const deleteStatusSelector = createStatusSelector("DELETE_CARDS");

interface Props {
  tableData: any[];
  userCardTableData: any[];
}
export default function CollectionSubset(props: Props) {
  const dispatch = useDispatch();
  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const deleteRequestStatus = useSelector((state: RootState) =>
    deleteStatusSelector(state)
  );

  const [selectedSeriesId, setSelectedSeriesId] = useState(
    subset.baseSeriesId || 1
  );
  const [showAllCards, setShowAllCards] = useState(false);
  // toggles showing checkboxes to select cards to add to collection
  const [deleteCardsToggle, setDeleteCardsToggle] = useState(false);
  // toggles add card form modal when user wants to add cards to collection
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

  const [toggleCleared, setToggleCleared] = useState(false);
  const [numCardsDeleted, setNumCardsDeleted] = useState(0);

  function handleSeriesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSeriesId(+event.target.value);
  }

  useEffect(() => {
    if (deleteRequestStatus === "SUCCESS") {
      setNumCardsDeleted(selectedCardIds.length);
      setToggleCleared(true);
    }
  }, [deleteRequestStatus]);

  interface Stuff {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<DeleteTableDataPoint>;
  }
  function addSelectedCardsChange(stuff: Stuff) {
    if (toggleCleared) {
      setToggleCleared(false);
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
            <Styled.ConfirmDeleteTitle>
              Confirm Delete
            </Styled.ConfirmDeleteTitle>
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

      <Styled.SelectParallel>
        <Styled.SelectLabel>Select Parallel Set: </Styled.SelectLabel>
        <Styled.SeriesSelect
          value={selectedSeriesId}
          onChange={handleSeriesChange}
        >
          <option value={0}>Show All Parallels</option>
          {subset.series.map((series) => {
            return (
              <option key={series.id} value={series.id}>
                {series.name}
              </option>
            );
          })}
        </Styled.SeriesSelect>
      </Styled.SelectParallel>
      <Styled.SelectParallel>
        <Styled.SelectLabel>Show Missing Cards: </Styled.SelectLabel>
        <input
          type="checkbox"
          onChange={handleShowAllChange}
          checked={showAllCards}
        />
      </Styled.SelectParallel>
      {selectedCardIds.length > 0 && (
        <Styled.AddCardsContainer>
          <Styled.AddCardsTotal>
            {`${selectedCardIds.length} ${
              selectedCardIds.length > 1 ? "Cards" : "Card"
            } Ready to Delete`}
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
      <DataTableContainer>
        {deleteCardsToggle && (
          <DataTable
            dense
            actions={
              <StyledButton
                color="YELLOW"
                height="25px"
                width="110px"
                fontSize="13px"
                onClick={toggleDeleteChecklist}
              >
                Cancel
              </StyledButton>
            }
            columns={deleteColumns}
            data={props.userCardTableData}
            highlightOnHover
            pagination
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
            paginationPerPage={20}
            defaultSortField={"Card #"}
            clearSelectedRows={toggleCleared}
            selectableRows
            onSelectedRowsChange={addSelectedCardsChange}
          />
        )}
        {!deleteCardsToggle && (
          <DataTable
            dense
            actions={
              <StyledButton
                color="GRAY"
                height="25px"
                width="110px"
                fontSize="13px"
                onClick={toggleDeleteChecklist}
              >
                Delete Cards
              </StyledButton>
            }
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
          />
        )}
      </DataTableContainer>
    </CollectionPageContainer>
  );
}
