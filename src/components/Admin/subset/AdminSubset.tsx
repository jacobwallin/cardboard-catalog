import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { CardData } from "../../../store/library/subsets/types";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { deleteCards } from "../../../store/library/subsets/thunks";
import DataTable from "react-data-table-component";
import {
  createLoadingSelector,
  createStatusSelector,
} from "../../../store/loading/reducer";
import EditSubset from "./subset_form/EditSubset";
import AdminPageContainer from "../components/AdminPageContainer";
import CreateSeriesModal from "./series_modal/CreateSeriesModal";
import CreateCardModal from "./card_modal/CreateCardModal";
import CardScrapeModal from "./scrape_cards/CardScrapeModal";
import EditCardModal from "./edit_card_modal/EditCardModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import CreateButton from "../components/CreateButton";
import { NoDataMessage } from "../../shared/NoDataMessage";
import sortCardNumbers from "../../../utils/sortCardNumbers";
import { LoadingDots } from "../../shared/Loading";
import StyledButton from "../components/StyledButton";
import * as Styled from "./styled";
import * as DataTableComponents from "../components/DataTableComponents";

import {
  cardsDataTableColumns,
  seriesDataTableColumns,
} from "./dataTableColumns";

const pageLoadingSelector = createLoadingSelector(["GET_SUBSET"]);
const modalLoadingSelector = createLoadingSelector([
  "CREATE_CARD",
  "CREATE_SERIES",
  "UPDATE_CARD",
  "DELETE_CARDS",
]);
const deletingCardsSelector = createStatusSelector("DELETE_CARDS");

export default function AdminSubset() {
  const dispatch = useDispatch();
  let { subsetId } = useParams<"subsetId">();
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showScrapeCardModal, setShowScrapeCardModal] = useState(false);
  const [showDeleteCardsModal, setShowDeleteCardsModal] = useState(false);
  const [editCardData, setEditCardData] = useState<CardData | undefined>(
    undefined
  );
  const [selectableRows, setSelectableRows] = useState(false);
  const [clearSelectedRows, setClearSelectedRows] = useState(false);
  const [selectedCardDataIds, setSelectedCardDataIds] = useState<number[]>([]);

  const subset = useSelector((state: RootState) => state.library.subsets);
  const loadingPage = useSelector((state: RootState) =>
    pageLoadingSelector(state)
  );
  const loadingChanges = useSelector((state: RootState) =>
    modalLoadingSelector(state)
  );

  const deletingCardsStatus = useSelector((state: RootState) => {
    return deletingCardsSelector(state);
  });

  useEffect(() => {
    if (subsetId) dispatch(fetchSubset(+subsetId));
  }, []);

  // hide either modal once a card or series has been created
  useEffect(() => {
    if (!loadingChanges) {
      setShowCreateCardModal(false);
      setShowCreateSeriesModal(false);
      setShowDeleteCardsModal(false);
      setEditCardData(undefined);
      if (selectableRows) {
        toggleSelectableRows();
      }
    }
  }, [loadingChanges]);

  interface Selected<Row> {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Array<Row>;
  }

  function selectedCardDataRowsChange(stuff: Selected<CardData>) {
    setSelectedCardDataIds(stuff.selectedRows.map((row) => row.id));
  }

  function toggleCreateSeriesModal() {
    setShowCreateSeriesModal(!showCreateSeriesModal);
  }
  function toggleCreateCardModal() {
    setShowCreateCardModal(!showCreateCardModal);
  }
  function toggleScrapeCardModal() {
    setShowScrapeCardModal(!showScrapeCardModal);
  }
  function toggleDeleteCardsModal() {
    setShowDeleteCardsModal(!showDeleteCardsModal);
  }
  function showEditCardModal(cardData: CardData) {
    setEditCardData(cardData);
  }
  function hideEditCardModal() {
    setEditCardData(undefined);
  }

  // toggle showing card data checklist to add card data to subset
  function toggleSelectableRows() {
    setSelectableRows(!selectableRows);
    setClearSelectedRows(!clearSelectedRows);
    if (selectableRows) {
      setSelectedCardDataIds([]);
    }
  }

  function handleDeleteCards() {
    dispatch(deleteCards(selectedCardDataIds));
  }

  const baseSeries = subset.series.find((series) => {
    return subset.baseSeriesId === series.id;
  });

  if (loadingPage || !subsetId || subset.id !== +subsetId) {
    return (
      <AdminPageContainer>
        <LoadingDots />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      {showCreateSeriesModal && (
        <CreateSeriesModal
          subsetId={+subsetId}
          handleCancel={toggleCreateSeriesModal}
        />
      )}
      {showCreateCardModal && (
        <CreateCardModal
          handleCancel={toggleCreateCardModal}
          subsetId={+subsetId}
        />
      )}
      {showScrapeCardModal && (
        <CardScrapeModal
          handleCancel={toggleScrapeCardModal}
          subsetId={+subsetId}
        />
      )}
      {editCardData && (
        <EditCardModal
          cardData={editCardData}
          handleCancel={hideEditCardModal}
          subsetId={+subsetId}
        />
      )}
      {showDeleteCardsModal && (
        <ConfirmDeleteModal
          handleDelete={handleDeleteCards}
          handleDismiss={toggleDeleteCardsModal}
          deleteStatus={deletingCardsStatus}
          message={`Deleting a card from the checklist will remove it from the base set, and all parallel sets as well. \n\n This will also remove these cards from any user collections they are a part of.`}
        />
      )}
      <EditSubset subsetId={+subsetId} />
      <DataTableComponents.DataTableWrapper>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Base Cards
          </DataTableComponents.DataTableTitle>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          columns={seriesDataTableColumns}
          data={baseSeries ? [baseSeries] : []}
          dense
          highlightOnHover
        />
      </DataTableComponents.DataTableWrapper>
      <DataTableComponents.DataTableWrapper>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Parallels
          </DataTableComponents.DataTableTitle>
          <DataTableComponents.DataTableButtonsContainer>
            <CreateButton onClick={toggleCreateSeriesModal}>
              Create Parallel
            </CreateButton>
          </DataTableComponents.DataTableButtonsContainer>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          columns={seriesDataTableColumns}
          data={subset.series
            .filter((series) => {
              return series.id !== subset.baseSeriesId;
            })
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })}
          dense
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          highlightOnHover
          noDataComponent={
            <NoDataMessage>There are no parallels in this set.</NoDataMessage>
          }
        />
      </DataTableComponents.DataTableWrapper>
      <DataTableComponents.DataTableWrapper>
        <DataTableComponents.DataTableHeader>
          <DataTableComponents.DataTableTitle>
            Checklist
          </DataTableComponents.DataTableTitle>
          <DataTableComponents.DataTableButtonsContainer>
            {!selectableRows ? (
              <>
                <CreateButton onClick={toggleScrapeCardModal}>
                  Scrape Cards
                </CreateButton>
                <CreateButton onClick={toggleCreateCardModal}>
                  Create Card
                </CreateButton>
                <StyledButton
                  color="RED"
                  height="27px"
                  width="125px"
                  fontSize=".9rem"
                  onClick={toggleSelectableRows}
                  disabled={subset.card_data.length === 0}
                >
                  Delete Cards
                </StyledButton>
              </>
            ) : (
              <>
                {selectedCardDataIds.length > 0 && (
                  <StyledButton
                    color="RED"
                    height="27px"
                    width="125px"
                    fontSize=".9rem"
                    onClick={toggleDeleteCardsModal}
                    disabled={loadingChanges}
                  >
                    {selectedCardDataIds.length > 1
                      ? `Delete ${selectedCardDataIds.length} Cards`
                      : `Delete ${selectedCardDataIds.length} Card`}
                  </StyledButton>
                )}
                <StyledButton
                  color="GRAY"
                  height="27px"
                  width="125px"
                  fontSize=".9rem"
                  onClick={toggleSelectableRows}
                >
                  Cancel
                </StyledButton>
              </>
            )}
          </DataTableComponents.DataTableButtonsContainer>
        </DataTableComponents.DataTableHeader>
        <DataTable
          noHeader
          columns={cardsDataTableColumns(showEditCardModal, selectableRows)}
          data={subset.card_data.sort((a, b) => {
            return sortCardNumbers(a.number, b.number);
          })}
          defaultSortFieldId={1}
          highlightOnHover
          pagination
          paginationPerPage={20}
          dense
          selectableRows={selectableRows}
          onSelectedRowsChange={selectedCardDataRowsChange}
          clearSelectedRows={clearSelectedRows}
          noDataComponent={
            <NoDataMessage>No cards have been added to this set.</NoDataMessage>
          }
        />
      </DataTableComponents.DataTableWrapper>
    </AdminPageContainer>
  );
}
