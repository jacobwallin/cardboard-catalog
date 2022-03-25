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
import columns, { Row, createTableData } from "./dataTableColumns";
import { Card } from "../../../store/library/series/types";
import { DataTableWrapper } from "../components/WrappedDataTable";
import { NoDataMessage } from "../../shared/NoDataMessage";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import { Header, SubHeader } from "../components/PageHeader";
import EditCardModal from "./edit_card_modal/EditCardModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import StyledButton from "../components/StyledButton";

const isLoadingSelector = createLoadingSelector(["GET_SERIES"]);
const updateCardStatusSelector = createStatusSelector("UPDATE_CARD");
const deleteCardsStatusSelector = createStatusSelector("DELETE_CARDS");
const modalLoadingSelector = createLoadingSelector([
  "DELETE_CARDS",
  "UPDATE_CARD",
]);

export default function AdminSeries() {
  const dispatch = useDispatch();
  let { seriesId } = useParams<"seriesId">();

  const [tableData, setTableData] = useState<Row[]>([]);
  const [editCard, setEditCard] = useState<Card | undefined>(undefined);
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [selectableRows, setSelectableRows] = useState(false);

  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));
  const deleteCardsStatus = useSelector((state: RootState) =>
    deleteCardsStatusSelector(state)
  );
  const loadingChanges = useSelector((state: RootState) =>
    modalLoadingSelector(state)
  );

  const series = useSelector((state: RootState) => state.library.series.series);

  useEffect(() => {
    if (seriesId) dispatch(fetchSeriesById(+seriesId));
  }, []);

  useEffect(() => {
    if (series.cards.length > 0) {
      setTableData(createTableData(series));
    }
  }, [series]);

  // hide either modal once a card or series has been created
  useEffect(() => {
    if (!loadingChanges) {
      setEditCard(undefined);
    }
  }, [loadingChanges]);

  function showEditCardModal(card: Card) {
    setEditCard(card);
  }
  function hideEditCardModal() {
    setEditCard(undefined);
  }

  interface Stuff {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<Row>;
  }

  function selectedRowsChange(stuff: Stuff) {
    setSelectedCardIds(stuff.selectedRows.map((row) => row.card.id));
  }

  function deleteCard() {
    dispatch(deleteCards(selectedCardIds));
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
      <Header>
        {series.name}
        {series.subset.baseSeriesId === series.id || " Parallel"}
      </Header>
      <SubHeader>{`${series.subset.set.name} - ${series.subset.name}`}</SubHeader>
      <EditSeries seriesId={+seriesId} />
      <DataTableWrapper>
        {selectableRows ? (
          <StyledButton
            color="GRAY"
            height="27px"
            width="125px"
            fontSize=".9rem"
            onClick={() => setSelectableRows(false)}
          >
            Cancel
          </StyledButton>
        ) : (
          <StyledButton
            color="RED"
            height="27px"
            width="125px"
            fontSize=".9rem"
            onClick={() => setSelectableRows(true)}
          >
            Delete Cards
          </StyledButton>
        )}
        <DataTable
          noHeader
          dense
          highlightOnHover
          pagination
          paginationPerPage={20}
          selectableRows={selectableRows}
          onSelectedRowsChange={selectedRowsChange}
          clearSelectedRows={false}
          noDataComponent={
            <NoDataMessage>No cards have been added to this set.</NoDataMessage>
          }
          columns={columns(showEditCardModal, selectableRows)}
          data={tableData}
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
