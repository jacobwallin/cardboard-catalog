import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import {
  fetchSeriesById,
  deleteCards,
  addCards,
} from "../../../store/library/series/thunks";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../store/loading/reducer";
import EditSeries from "./series_form/EditSeries";
import AdminPageContainer from "../components/AdminPageContainer";
import DataTable from "react-data-table-component";
import { LoadingDots } from "../../shared/Loading";
import {
  Row,
  cardColumns,
  createTableData,
  cardDataColumns,
  createCardDataTableData,
} from "./dataTableColumns";
import { Card, SeriesCardData } from "../../../store/library/series/types";
import { DataTableWrapper } from "../components/WrappedDataTable";
import { NoDataMessage } from "../../shared/NoDataMessage";
import { Header, SubHeader } from "../components/PageHeader";
import EditCardModal from "./edit_card_modal/EditCardModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import StyledButton from "../components/StyledButton";
import * as TableHeader from "../components/DataTableHeader";

const isLoadingSelector = createLoadingSelector(["GET_SERIES"]);
const updateCardStatusSelector = createStatusSelector("UPDATE_CARD");
const deleteCardsStatusSelector = createStatusSelector("DELETE_CARDS");
const modalLoadingSelector = createLoadingSelector([
  "DELETE_CARDS",
  "ADD_CARDS",
  "UPDATE_CARD",
]);

export default function AdminSeries() {
  const dispatch = useDispatch();
  let { seriesId } = useParams<"seriesId">();

  const [tableData, setTableData] = useState<Row[]>([]);
  const [cardDataTableData, setCardDataTableData] = useState<SeriesCardData[]>(
    []
  );
  const [editCard, setEditCard] = useState<Card | undefined>(undefined);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [selectedCardDataIds, setSelectedCardDataIds] = useState<number[]>([]);
  const [selectableRows, setSelectableRows] = useState(false);
  const [clearSelectedRows, setClearSelectedRows] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addCardData, setAddCardData] = useState(false);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const deleteCardsStatus = useSelector((state: RootState) =>
    deleteCardsStatusSelector(state)
  );
  const loadingChanges = useSelector((state: RootState) =>
    modalLoadingSelector(state)
  );

  const series = useSelector((state: RootState) => state.library.series.series);
  const subsetCardData = useSelector(
    (state: RootState) => state.library.series.subsetCardData
  );

  // initial data fetch
  useEffect(() => {
    if (seriesId) dispatch(fetchSeriesById(+seriesId));
  }, []);

  // create table data
  useEffect(() => {
    setTableData(createTableData(series));
    setCardDataTableData(createCardDataTableData(series, subsetCardData));
  }, [series]);

  // reset UI state when a request is completed
  useEffect(() => {
    if (!loadingChanges) {
      setEditCard(undefined);
      setShowDeleteModal(false);
      if (selectableRows) {
        toggleSelectableRows();
      }
      if (addCardData) {
        toggleShowChecklist();
      }
    }
  }, [loadingChanges]);

  function showEditCardModal(card: Card) {
    setEditCard(card);
  }
  function hideEditCardModal() {
    setEditCard(undefined);
  }

  interface Selected<Row> {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<Row>;
  }

  // keep track of selected cards and card data
  function selectedCardRowsChange(stuff: Selected<Row>) {
    setSelectedCardIds(stuff.selectedRows.map((row) => row.card.id));
  }
  function selectedCardDataRowsChange(stuff: Selected<SeriesCardData>) {
    setSelectedCardDataIds(stuff.selectedRows.map((row) => row.id));
  }

  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal);
  }

  // toggle showing card data checklist to add cards to series
  function toggleShowChecklist() {
    setAddCardData(!addCardData);
    if (addCardData) {
      setSelectedCardDataIds([]);
    }
  }

  // toggle making cards selectable to delete from series
  function toggleSelectableRows() {
    setSelectableRows(!selectableRows);
    setClearSelectedRows(!clearSelectedRows);
    if (clearSelectedRows) {
      setSelectedCardIds([]);
    }
  }

  // dispatch thunks to delete or add cards to the series
  function submitDeleteCards() {
    dispatch(deleteCards(selectedCardIds));
  }
  function submitAddCards() {
    dispatch(addCards(selectedCardDataIds, series.id));
  }

  if (isLoading || String(series.id) !== seriesId) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      {editCard && (
        <EditCardModal
          card={editCard}
          dismiss={hideEditCardModal}
          seriesSerialized={series.serialized}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          handleDismiss={toggleDeleteModal}
          handleDelete={submitDeleteCards}
          deleteStatus={deleteCardsStatus}
          message="This will delete the card from any user collections it is part of."
        />
      )}
      <Header>
        {series.name}
        {series.subset.baseSeriesId === series.id || " Parallel"}
      </Header>
      <SubHeader>{`${series.subset.set.name} - ${series.subset.name}`}</SubHeader>
      <EditSeries seriesId={+seriesId} />
      <DataTableWrapper>
        <TableHeader.DataTableHeader>
          <TableHeader.DataTableTitle>
            {addCardData ? "Add Cards From Checklist" : "Cards"}
          </TableHeader.DataTableTitle>
          <TableHeader.DataTableButtonsContainer>
            {selectedCardIds.length > 0 && (
              <StyledButton
                color="RED"
                height="27px"
                width="125px"
                fontSize=".9rem"
                onClick={toggleDeleteModal}
              >
                {selectedCardIds.length > 1
                  ? `Delete ${selectedCardIds.length} Cards`
                  : `Delete ${selectedCardIds.length} Card`}
              </StyledButton>
            )}
            {selectedCardDataIds.length > 0 && (
              <StyledButton
                color="GREEN"
                height="27px"
                width="125px"
                fontSize=".9rem"
                onClick={submitAddCards}
                disabled={loadingChanges}
              >
                {selectedCardDataIds.length > 1
                  ? `Add ${selectedCardDataIds.length} Cards`
                  : `Add ${selectedCardDataIds.length} Card`}
              </StyledButton>
            )}
            {selectableRows ? (
              <StyledButton
                color="GRAY"
                height="27px"
                width="125px"
                fontSize=".9rem"
                onClick={toggleSelectableRows}
              >
                Cancel
              </StyledButton>
            ) : addCardData ? (
              <StyledButton
                color="GRAY"
                height="27px"
                width="125px"
                fontSize=".9rem"
                onClick={toggleShowChecklist}
                disabled={loadingChanges}
              >
                Cancel
              </StyledButton>
            ) : (
              <>
                <StyledButton
                  color="RED"
                  height="27px"
                  width="125px"
                  fontSize=".9rem"
                  onClick={toggleSelectableRows}
                >
                  Delete Cards
                </StyledButton>
                <StyledButton
                  color="GREEN"
                  height="27px"
                  width="125px"
                  fontSize=".9rem"
                  onClick={toggleShowChecklist}
                >
                  Add Cards
                </StyledButton>
              </>
            )}
          </TableHeader.DataTableButtonsContainer>
        </TableHeader.DataTableHeader>
        {!addCardData && (
          <DataTable
            noHeader
            dense
            highlightOnHover
            pagination
            paginationPerPage={20}
            selectableRows={selectableRows}
            onSelectedRowsChange={selectedCardRowsChange}
            clearSelectedRows={clearSelectedRows}
            noDataComponent={
              <NoDataMessage>
                No cards have been added to this set.
              </NoDataMessage>
            }
            columns={cardColumns(showEditCardModal, selectableRows)}
            data={tableData}
          />
        )}
        {addCardData && (
          <DataTable
            noHeader
            dense
            highlightOnHover
            pagination
            paginationPerPage={20}
            selectableRows
            onSelectedRowsChange={selectedCardDataRowsChange}
            // clearSelectedRows={clearSelectedRows}
            noDataComponent={
              <NoDataMessage>
                This set already contains the full card checklist.
              </NoDataMessage>
            }
            columns={cardDataColumns}
            data={cardDataTableData}
          />
        )}
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
