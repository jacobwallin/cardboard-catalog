import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addTransaction } from "../../../../store/collection/transactions/thunks";
import DataTable from "react-data-table-component";
import { columns, deleteColumns } from "./dataTableColumns";
import dataTableConditionalStyles from "./dataTableConditionalStyles";
import { DeleteTableDataPoint } from "../createTableData";
import { DataTableContainer } from "../../shared";
import ModalWindow from "../../../Admin/components/modal/ModalWindow";
import Background from "../../../shared/Background";
import StyledButton from "../../../Admin/components/StyledButton";
import PageContainer from "../../../shared/PageContainer";
import { NoDataMessage } from "../../../shared/NoDataMessage";
import * as SharedStyled from "../styled";
import * as Styled from "./styled";
import MedalIcon from "./medal.svg";
import { SeriesTableData } from "../createTableData";
import { TotalCards } from "../../shared";
import { getDateString } from "../../../../utils/formatTimestamp";

import { createStatusSelector } from "../../../../store/loading/reducer";

const deleteStatusSelector = createStatusSelector("ADD_TRANSACTION");

interface Props {
  tableData: SeriesTableData;
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
    dispatch(
      addTransaction({
        type: "DELETE",
        date: getDateString(new Date()),
        userCardsRemoved: selectedCardIds,
      })
    );
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
    <PageContainer>
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
                data={props.tableData.userCards.filter((userCard) =>
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
        <Styled.CardsInCollection>
          {props.tableData.distinctCards > 0 &&
            props.tableData.distinctCards === props.tableData.cards.length && (
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
          <TotalCards totalCards={props.tableData.totalCards} />
          {props.tableData.totalCards > 0 && (
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

      <DataTableContainer>
        {deleteCardsToggle && (
          <DataTable
            noHeader
            dense
            columns={deleteColumns(selectedSeriesId === subset.baseSeriesId)}
            data={props.tableData.userCards}
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
    </PageContainer>
  );
}
