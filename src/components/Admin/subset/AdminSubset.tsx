import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../store";
import { CardData } from "../../../store/library/subsets/types";
import { fetchSubset } from "../../../store/library/subsets/thunks";
import { deleteCard } from "../../../store/library/subsets/thunks";
import WrappedDataTable from "../components/WrappedDataTable";
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
]);
const deletingCardSelector = createStatusSelector("DELETE_CARD");

interface Params {
  subsetId: string;
}

export default function AdminSubset(props: RouteComponentProps<Params>) {
  const dispatch = useDispatch();
  const [showCreateSeriesModal, setShowCreateSeriesModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showScrapeCardModal, setShowScrapeCardModal] = useState(false);
  const [editCardData, setEditCardData] = useState<CardData | undefined>(
    undefined
  );
  const [deleteCardId, setDeleteCardId] = useState(0);

  const subset = useSelector(
    (state: RootState) => state.library.subsets.subset
  );
  const loadingPage = useSelector((state: RootState) =>
    pageLoadingSelector(state)
  );
  const loadingChanges = useSelector((state: RootState) =>
    modalLoadingSelector(state)
  );

  const deletingCardStatus = useSelector((state: RootState) => {
    return deletingCardSelector(state);
  });

  useEffect(() => {
    dispatch(fetchSubset(+props.match.params.subsetId));
  }, []);

  // hide either modal once a card or series has been created
  useEffect(() => {
    if (!loadingChanges) {
      setShowCreateCardModal(false);
      setShowCreateSeriesModal(false);
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

  const baseSeries = subset.series.find((series) => {
    return subset.baseSeriesId === series.id;
  });

  return (
    <AdminPageContainer>
      {showCreateSeriesModal && (
        <CreateSeriesModal
          subsetId={+props.match.params.subsetId}
          handleCancel={toggleCreateSeriesModal}
        />
      )}
      {showCreateCardModal && (
        <CreateCardModal
          handleCancel={toggleCreateCardModal}
          subsetId={+props.match.params.subsetId}
        />
      )}
      {showScrapeCardModal && (
        <CardScrapeModal
          handleCancel={toggleScrapeCardModal}
          subsetId={+props.match.params.subsetId}
        />
      )}
      {editCardData && (
        <EditCardModal
          cardData={editCardData}
          handleCancel={hideEditCardModal}
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
      <Styled.Header> {`${subset.name}`} </Styled.Header>
      <Styled.SubHeader>{`${subset.set.name}`}</Styled.SubHeader>
      <EditSubset subsetId={+props.match.params.subsetId} />
      <WrappedDataTable
        title={`Base Set`}
        columns={seriesDataTableColumns}
        data={baseSeries ? [baseSeries] : []}
        dense
        highlightOnHover
      />
      <WrappedDataTable
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
      <WrappedDataTable
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
            <CreateButton onClick={toggleScrapeCardModal}>
              Bulk Add
            </CreateButton>
            <CreateButton onClick={toggleCreateCardModal}>
              Create Card
            </CreateButton>
          </>
        }
      />
    </AdminPageContainer>
  );
}
