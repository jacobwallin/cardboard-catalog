import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { CardData } from "../../../store/library/subsets/types";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import {
  deleteCard,
  deleteAllCards,
} from "../../../store/library/subsets/thunks";
import DataTable from "react-data-table-component";
import { DataTableWrapper } from "../components/WrappedDataTable";
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

import {
  cardsDataTableColumns,
  seriesDataTableColumns,
} from "./dataTableColumns";

const pageLoadingSelector = createLoadingSelector(["GET_SUBSET"]);
const modalLoadingSelector = createLoadingSelector([
  "CREATE_CARD",
  "CREATE_SERIES",
  "UPDATE_CARD",
  "DELETE_CARD",
  "DELETE_ALL_CARDS",
]);
const deletingCardSelector = createStatusSelector("DELETE_CARD");
const deletingAllCardsSelector = createStatusSelector("DELETE_ALL_CARDS");

export default function AdminSubset() {
  const dispatch = useDispatch();
  let { subsetId } = useParams<"subsetId">();
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showScrapeCardModal, setShowScrapeCardModal] = useState(false);
  const [showDeleteAllCardsModeal, setShowDeleteAllCardsModeal] =
    useState(false);
  const [editCardData, setEditCardData] = useState<CardData | undefined>(
    undefined
  );
  const [deleteCardId, setDeleteCardId] = useState(0);

  const subset = useSelector((state: RootState) => state.library.subsets);
  const loadingPage = useSelector((state: RootState) =>
    pageLoadingSelector(state)
  );
  const loadingChanges = useSelector((state: RootState) =>
    modalLoadingSelector(state)
  );

  const deletingCardStatus = useSelector((state: RootState) => {
    return deletingCardSelector(state);
  });
  const deletingAllCardsStatus = useSelector((state: RootState) => {
    return deletingAllCardsSelector(state);
  });

  useEffect(() => {
    if (subsetId) dispatch(fetchSubset(+subsetId));
  }, []);

  // hide either modal once a card or series has been created
  useEffect(() => {
    if (!loadingChanges) {
      setShowCreateCardModal(false);
      setShowCreateSeriesModal(false);
      setShowDeleteAllCardsModeal(false);
      setEditCardData(undefined);
      setDeleteCardId(0);
    }
  }, [loadingChanges]);

  function toggleCreateSeriesModal() {
    setShowCreateSeriesModal(!showCreateSeriesModal);
  }
  function toggleCreateCardModal() {
    setShowCreateCardModal(!showCreateCardModal);
  }
  function toggleScrapeCardModal() {
    setShowScrapeCardModal(!showScrapeCardModal);
  }
  function toggleDeleteAllModal() {
    setShowDeleteAllCardsModeal(!showDeleteAllCardsModeal);
  }
  function showEditCardModal(cardData: CardData) {
    setEditCardData(cardData);
  }
  function hideEditCardModal() {
    setEditCardData(undefined);
  }
  function handleDeleteClick(cardData: CardData) {
    setDeleteCardId(cardData.id);
  }
  function deleteCardData() {
    dispatch(deleteCard(deleteCardId));
  }
  function deleteAllCardData() {
    if (subsetId) dispatch(deleteAllCards(+subsetId));
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
      {deleteCardId !== 0 && (
        <ConfirmDeleteModal
          handleDelete={deleteCardData}
          handleDismiss={() => setDeleteCardId(0)}
          message="This will delete the card from any user's collections that have it."
          deleteStatus={deletingCardStatus}
        />
      )}
      {showDeleteAllCardsModeal && (
        <ConfirmDeleteModal
          handleDelete={deleteAllCardData}
          handleDismiss={toggleDeleteAllModal}
          deleteStatus={deletingAllCardsStatus}
          message={`All cards will be deleted from ${subset.set.name} ${subset.name}. If any of the cards are in user's collections they will be deleted as well.`}
        />
      )}
      <Styled.Header> {`${subset.name}`} </Styled.Header>
      <Styled.SubHeader>{`${subset.set.name}`}</Styled.SubHeader>
      <EditSubset subsetId={+subsetId} />
      <DataTableWrapper>
        <DataTable
          title={`Base Set`}
          columns={seriesDataTableColumns}
          data={baseSeries ? [baseSeries] : []}
          dense
          highlightOnHover
        />
      </DataTableWrapper>
      <DataTableWrapper>
        <DataTable
          title={`Parallels`}
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
          actions={
            <CreateButton onClick={toggleCreateSeriesModal}>
              Create Parallel
            </CreateButton>
          }
        />
      </DataTableWrapper>
      <DataTableWrapper>
        <DataTable
          title={`Checklist`}
          columns={cardsDataTableColumns(showEditCardModal, handleDeleteClick)}
          data={subset.card_data.sort((a, b) => {
            return sortCardNumbers(a.number, b.number);
          })}
          defaultSortFieldId={1}
          highlightOnHover
          pagination
          paginationPerPage={20}
          dense
          noDataComponent={
            <NoDataMessage>No cards have been added to this set.</NoDataMessage>
          }
          actions={
            <>
              <StyledButton
                color="RED"
                height="27px"
                width="125px"
                fontSize=".9rem"
                onClick={toggleDeleteAllModal}
                disabled={subset.card_data.length === 0}
              >
                Delete All Cards
              </StyledButton>
              <CreateButton onClick={toggleScrapeCardModal}>
                Scrape Cards
              </CreateButton>
              <CreateButton onClick={toggleCreateCardModal}>
                Create Card
              </CreateButton>
            </>
          }
        />
      </DataTableWrapper>
    </AdminPageContainer>
  );
}
